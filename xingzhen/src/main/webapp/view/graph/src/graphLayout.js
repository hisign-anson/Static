importing('currentDate');
//画板大小,固定值,不能自适应
var width = 1200,
    height = 900;
//节点图片大小
var img_w = 48,
    img_h = 48;

var zTreeObj;
var jsonContext, edges_line, edges_text, node_img, node_text;

define(['underscore',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/baseInfo.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCase.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCaseTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupStaff.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupStaffTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/userList.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/userListTr.html',
    'text!/view/caseInvestigation/tpl/task/taskAdd.html',
    'text!/view/caseInvestigation/tpl/task/taskEdit.html',
    'text!/view/caseInvestigation/tpl/task/taskInfo.html',
    'text!/view/caseInvestigation/tpl/task/feedBackInfo.html',
    '../../caseInvestigation/dat/specialCaseGroup.js',
    '../../caseInvestigation/src/specialCaseGroup.js',
    '../../caseInvestigation/dat/task.js',
    '../../caseInvestigation/src/task.js',
    '../../dictManage/src/dictOpener.js',
    '../src/graphAction.js'], function (_, baseInfoTpl, relationCaseTpl, relationCaseTrTpl, groupStaffTpl, groupStaffTrTpl, userListTpl, userListTrTpl, taskAddTpl, taskEditTpl, taskInfoTpl, feedBackInfoTpl,
                                        specialCaseGroupAjax, specialCaseGroup, taskAjax, task, dictOpener, graphAction) {

    return {
        showList: function (groupid, type) {
            _selfGraphLayout = this;
            var jsonInitUrl = "/graph/getGraph?limitLevel=20&maxNode=50&detail=false&startNodeValue=" + groupid + "&startNodeType=" + type;
            //根据链接更新
            _selfGraphLayout.updateGraphURL(jsonInitUrl, type);

            //显示脉络图查询条件
            _selfGraphLayout.showCondition(groupid, type);
        },
        updateGraphURL: function (jsonInitUrl, graphType) {
            _selfGraphLayout = this;
            d3.json(jsonInitUrl, function (error, json) {
                if (error) {
                    return console.log(error);
                }
                //画图
                _selfGraphLayout.updateGraphJSON(json, graphType);
            });
        },
        //根据json更新
        updateGraphJSON: function (json, graphType, param) {
            _selfGraphLayout = this;

            jsonContext = json;
            //查询
            if (param) {
                $.each(jsonContext.nodes, function (index, value) {
                    //判断时间范围
                    var isInTimeRange = _selfGraphLayout.isInTimeRange(param.startTime, param.endTime, value.taskCreateTime);
                    if (
                        (param.startTime && param.endTime && value.taskCreateTime && isInTimeRange == false) ||
                        (param.taskStatus && value.taskStatus && param.taskStatus != value.taskStatus) ||
                        (param.feedbackUser && value.taskReceiveUserId && param.feedbackUser != value.taskReceiveUserId) ||
                        // (param.feedbackUser && value.feedBackUserId && param.feedbackUser != value.feedBackUserId) ||
                        (param.sponsor && value.taskCreatorUserId && param.sponsor != value.taskCreatorUserId)
                    ) {
                        //不符合查询条件的节点数据
                        // _selfGraphLayout.removeNode(index);
                        node_img[0][index].setAttribute("href", "images/graph/disabled_img.png");
                        node_img[0][index].setAttribute("class", "nomenu");
                    } else {
                        //符合查询条件的节点数据
                        var edges_lineIndex = edges_line[0][index];
                        var edges_textIndex = edges_text[0][index];
                        var node_textIndex = node_text[0][index];
                        var node_imgIndex = node_img[0][index];
                        var image;
                        var type = node_imgIndex.attributes["imgtype"].value;
                        if (type == "groupid") {
                            image = "images/graph/type_group.png";

                        } else if (type == "taskid") {
                            image = "images/graph/type_task.png";

                        } else if (type == "fkid") {
                            image = "images/graph/type_feedback.png";

                        } else if (type == "ajid") {
                            image = "images/graph/type_case.png";

                        } else {
                            image = "../../img/replace_photo.png";

                        }
                        node_imgIndex.setAttribute("href", image);
                        node_imgIndex.setAttribute("class", "");
                    }
                });
            }
            else {
                // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
                var setting = {
                    view: {
                        //可以允许节点名称支持 HTML 内容
                        nameIsHTML: true,
                        //是否允许节点显示title属性
                        showTitle: false
                    },
                    callback: {
                        //单击菜单节点之前的事件回调函数
                        beforeClick: function (treeId, treeNode, clickFlag) {
                            console.info("[ beforeClick ]:" + treeNode.name);
                        },
                        //菜单节点被点击的事件回调函数
                        onClick: function (event, treeId, treeNode, clickFlag) {
                            _selfGraphLayout.menuHanle(event, treeId, treeNode, graphType);
                            return (treeNode.click != false);
                        }
                    }
                };
                //鼠标缩放
                // var zoom = d3.behavior.zoom()
                //     .scaleExtent([0.1, 3])
                //     .on("zoom", function(){
                //         svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                //     });
                //清除原有的画板
                d3.select("svg").remove();
                //定义svg画板
                var svg = d3.select("body").append("svg")
                    .attr("width", '100%')
                    .attr("height", "100vh");//vh css3单位属性,相对于视窗高度

                var tick = function () {
                    //限制结点的边界
                    jsonContext.nodes.forEach(function (d, i) {
                        d.x = d.x - img_w / 2 < 0 ? img_w : d.x;
                        d.x = d.x + img_w / 2 > width ? width - img_w / 2 : d.x;
                        d.y = d.y - img_h / 2 < 0 ? img_h / 2 : d.y;
                        d.y = d.y + img_h > height ? height - img_h : d.y;
                    });

                    //刷新连接线的位置
                    edges_line.attr("x1", function (d) {
                        return d.source.x;
                    }).attr("y1", function (d) {
                        return d.source.y;
                    }).attr("x2", function (d) {
                        return d.target.x;
                    }).attr("y2", function (d) {
                        return d.target.y;
                    });

                    //刷新连接线上的文字位置
                    edges_text.attr("x", function (d) {
                        return (d.source.x + d.target.x) / 2;
                    }).attr("y", function (d) {
                        return (d.source.y + d.target.y) / 2;
                    });

                    //刷新结点图片位置
                    node_img.attr("x", function (d) {
                        return d.x - img_w / 2;
                    }).attr("y", function (d) {
                        return d.y - img_h / 2
                    });

                    //刷新结点文字位置
                    node_text.attr("x", function (d) {
                        return d.x
                    }).attr("y", function (d) {
                        return d.y + img_h / 2.5
                    });
                };
                //定义力学图的布局
                var layout = d3.layout.force()
                    .on("tick", tick)
                    .size([width, height])
                    .linkDistance(200)
                    .linkStrength(1)
                    .friction(0.6)
                    .charge(-2000)
                    .gravity(0.08);
                //拖拽开始后设定被拖拽对象为固定
                var drag = layout.drag().on("dragstart", function (d) {
                    //本节点固定
                    d.fixed = true;
                });

                layout.nodes(json.nodes).links(json.edges).start();

                svg.selectAll("line").remove();
                var edges_lineSVG = svg.selectAll("line").data(json.edges);

                svg.selectAll(".linetext").remove();
                var edges_textSVG = svg.selectAll(".linetext").data(json.edges);

                svg.selectAll("image").remove();
                var node_imgSVG = svg.selectAll("image").data(json.nodes);

                svg.selectAll(".nodetext").remove();
                var node_textSVG = svg.selectAll(".nodetext").data(json.nodes);

                //绘制连接线
                edges_line = edges_lineSVG.enter()
                    .append("line")
                    .style("stroke", "#808080")//颜色
                    .style("stroke_width", 1)
                    .style("marker-end", "url(#resolved)")
                    .attr("source", function (d) {
                        return d.source.index;
                    });
                edges_lineSVG.exit().remove();

                //连线上的字
                edges_text = edges_textSVG
                    .enter()
                    .append("text")
                    .attr("class", "linetext")
                    .text(function (d) {
                        return d.name;
                    });
                edges_textSVG.exit().remove();
                //绘制结点
                node_img = node_imgSVG
                    .enter()
                    .append("image")
                    .attr("width", img_w)
                    .attr("height", img_h)
                    .attr("edges", function (d) {
                        var nodeInEdges = d.inEdges;
                        var nodeOutEdges = d.outEdges;
                        var nodeEdges;
                        if (!nodeInEdges && nodeOutEdges) {
                            nodeEdges = nodeOutEdges;
                        } else if (!nodeOutEdges && nodeInEdges) {
                            nodeEdges = nodeInEdges;
                        } else if (nodeInEdges && nodeOutEdges) {
                            nodeEdges = nodeInEdges.concat(nodeOutEdges);
                        } else {
                            return;
                        }
                        var result = "";
                        for (var i = 0; i < nodeEdges.length; i++) {
                            result += nodeEdges[i].index + ",";
                        }
                        return result;
                    })
                    .attr("imgtype", function (d) {
                        return d.type;
                    })
                    .attr("xlink:href", function (d) {
                        var image;
                        switch (d.type) {
                            case "groupid":
                                image = "images/graph/type_group.png";
                                break;
                            case "taskid":
                                image = "images/graph/type_task.png";
                                break;
                            case "fkid":
                                image = "images/graph/type_feedback.png";
                                break;
                            case "ajid":
                                image = "images/graph/type_case.png";
                                break;
                            default:
                                image = "../../img/replace_photo.png";
                        }
                        return image;
                    })
                    //去掉默认的contextmenu事件，否则会和右键事件同时出现。
                    .on("contextmenu", function () {
                        //DOM事件对象——d3.event
                        d3.event.preventDefault();
                    })
                    //右键节点显示菜单
                    .on("mousedown", function (d, i) {
                        var that = d3.event;
                        //节点class名字
                        var className = that.target.classList.value;
                        //判断节点是否是过滤掉的节点，若是，则不可右键；
                        if (className != "nomenu") {
                            //根据button判断鼠标点击类型 0（左键） 1（中键） 2（右键）
                            if (that.button == 2) {
                                $(document).on("contextmenu", function (e) {
                                    e.preventDefault();
                                });
                                //创建右键菜单div容器
                                if ($("#tooltip" + i).length <= 0) {
                                    var tooltipDiv = "<div id='tooltip" + i + "' class='tooltip-box'><ul id='menuTree" + i + "' class='ztree deploy'></ul></div>";
                                    $("body").append(tooltipDiv);
                                }
                                console.info(d);
                                //获取节点id（专案组id，任务id，反馈id，案件id）  d.id
                                //根据id和type加载不同的菜单数据
                                var menuByGroupType = [];//专案组右键菜单数据
                                var menuByTaskType = [];//任务右键菜单数据
                                var menuByFeedbackType = [];//反馈右键菜单数据
                                var menuByCaseType = [];//案件右键菜单数据

                                if (d.type == "groupid") {//专案组右键菜单
                                    menuByGroupType = [
                                        {name: "<span class='groupHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='1'>专案组详情</span>"},
                                        {name: "<span class='groupHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='2'>专案组成员</span>"},
                                        {name: "<span class='groupHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='3'>任务下发</span>"}
                                    ];
                                    zTreeObj = $.fn.zTree.init($("#menuTree" + i), setting, menuByGroupType);

                                } else if (d.type == "taskid") {//任务右键菜单
                                    menuByTaskType = [{name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='5'>任务详情</span>"}];

                                    if (d.taskCreatorUserId == top.userId && d.taskStatus == 0) {
                                        //显示催办任务
                                        var urge = {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='4'>催办任务</span>"};
                                        menuByTaskType.push(urge);
                                    }
                                    taskAjax.taskDetail({id: d.id, userId: top.userId}, function (r) {
                                        if (r.flag == 1) {
                                            var taskinfo = r.data;
                                            if (taskinfo.jsr == top.userId) {
                                                //显示反馈任务(反馈次数小于3)  移交任务  补充任务
                                                var feedback = {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='1'>反馈任务</span>"};
                                                var transfer = {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='2'>移交任务</span>"};
                                                var append_bc = {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='3'>补充任务</span>"};
                                                // if (taskinfo.yjzt == 0 && taskinfo.fkCount < 3) {返回的fkCount数值不对，不能使用此方法判断
                                                if (taskinfo.yjzt == 0 && (!taskinfo.taskFks || (taskinfo.taskFks && taskinfo.taskFks.length < 3))) {
                                                    menuByTaskType.push(feedback);
                                                }
                                                if (taskinfo.yjzt == 0 && taskinfo.fkzt == 0) {
                                                    menuByTaskType.push(transfer);
                                                    menuByTaskType.push(append_bc);
                                                }
                                                zTreeObj = $.fn.zTree.init($("#menuTree" + i), setting, menuByTaskType);
                                            } else {
                                                zTreeObj = $.fn.zTree.init($("#menuTree" + i), setting, menuByTaskType);
                                            }
                                        } else {
                                            toast(r.msg, 600).err();
                                        }
                                    });
                                } else if (d.type == "fkid") {//反馈右键菜单
                                    //通过当前反馈节点的index找到上一个任务节点的相关信息
                                    var inEdgesIndex = d.index;
                                    if (!node_img[0][inEdgesIndex]) {
                                        return;
                                    }
                                    var node = node_img[0];
                                    var edgesArray = node[inEdgesIndex].attributes["edges"];
                                    if (!edgesArray) {
                                        return;
                                    }
                                    var edgesStr = edgesArray.value;
                                    var edges = edgesStr.split(",");
                                    var edgeIndex;
                                    for (var index = 0; index < edges.length; index++) {
                                        //节点的上一条线
                                        edgeIndex = edges[0];
                                    }
                                    if (edgeIndex != "") {
                                        //线的上一个节点
                                        var findLine = json.edges[edgeIndex];
                                        var lineSource = findLine.source;
                                        var feedbackInfo = {name: "<span class='feedbackHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' taskid='" + lineSource.id + "' val='2'>反馈信息详情</span>"};
                                        menuByFeedbackType.push(feedbackInfo);
                                        if (d.type == "fkid" && lineSource.taskCreatorUserId == top.userId) {//反馈的对应任务的下发人
                                            var append_zj = {name: "<span class='feedbackHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' taskid='" + lineSource.id + "' val='1'>追加任务</span>"};
                                            menuByFeedbackType.push(append_zj);
                                        }
                                    }
                                    zTreeObj = $.fn.zTree.init($("#menuTree" + i), setting, menuByFeedbackType);

                                } else if (d.type == "ajid") {//案件右键菜单
                                    menuByCaseType = [{name: "<span class='caseHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='1'>查看案件详情</span>"}];
                                    zTreeObj = $.fn.zTree.init($("#menuTree" + i), setting, menuByCaseType);
                                }

                                var tooltipCurrent = $("#tooltip" + i);
                                var tooltipSiblings = tooltipCurrent.siblings(".tooltip-box");
                                //显示菜单
                                tooltipCurrent.css({
                                    "position": "absolute",
                                    "top": (d.y - (img_h / 2)) + "px",
                                    "left": (d.x + 35) + "px"
                                }).show();

                                //start 判断当前节点的位置
                                var a = (d.x + 35) + tooltipCurrent.width();
                                var b = (d.y - (img_h / 2)) + tooltipCurrent.height();
                                if (a > $(window).width()) {
                                    tooltipCurrent.css({
                                        "left": (d.x - tooltipCurrent.width() - 30) + "px"
                                    })
                                }
                                if (b > $(window).height()) {
                                    tooltipCurrent.css({
                                        "top": (d.y - tooltipCurrent.height()) + "px"
                                    });
                                } else {
                                    var winST = $(window).scrollTop();
                                    if ((d.y - (img_h / 2)) <= winST) {
                                        tooltipCurrent.css({
                                            "top": (winST + 5) + "px"
                                        });
                                    }
                                }
                                //end 判断当前节点的位置

                                //如果还有兄弟元素tooltip显示，则remove兄弟元素
                                if (tooltipSiblings.length > 0) {
                                    tooltipSiblings.remove();
                                }
                                $(document).click(function (e) {
                                    var isShowTooltip = $(e.target).parents(".tooltip-box").is(":visible");
                                    //当点击的区域是菜单之外时
                                    if (!isShowTooltip) {
                                        tooltipCurrent.remove();
                                    }
                                });
                            }

                        }
                    })
                    .on("dblclick", function (d, i) {
                        d.fixed = false;
                    })
                    .on("mousemove", function (d, i) {
                        var tooltipCurrent = $("#tooltip" + i);
                        tooltipCurrent.css({
                            "top": (d.y - (img_h / 2)) + "px",
                            "left": (d.x + 35) + "px"
                        });
                        //start 判断当前节点的位置
                        var a = (d.x + 35) + tooltipCurrent.width();
                        var b = (d.y - (img_h / 2)) + tooltipCurrent.height();
                        if (a > $(window).width()) {
                            tooltipCurrent.css({
                                "left": (d.x - tooltipCurrent.width() - 30) + "px"
                            })
                        }
                        if (b > $(window).height()) {
                            tooltipCurrent.css({
                                "top": (d.y - tooltipCurrent.height()) + "px"
                            });
                        } else {
                            var winST = $(window).scrollTop();
                            if ((d.y - (img_h / 2)) <= winST) {
                                tooltipCurrent.css({
                                    "top": (winST + 5) + "px"
                                });
                            }
                        }
                        //end 判断当前节点的位置
                    })
                    .call(layout.drag);
                node_imgSVG.exit().remove();
                var node_dx = 0;
                var node_dy = 20;
                //节点上的字
                node_text = node_textSVG
                    .enter()
                    .append("text")
                    .attr("class", "nodetext")
                    .attr("dx", node_dx)
                    .attr("dy", node_dy)
                    .html(function (d) {
                        var arr = [];
                        arr = d.name.split("@");
                        var name = arr[0];
                        var time = arr[1];
                        name = name ? name : "";
                        time = rangeUtil.formatDate(time ? time : "", 'yyyy-MM-dd');

                        var nameHtml = "<tspan class='name-text' dx='" + (node_dx) + "' dy='" + node_dy + "'>" + name + "</tspan>";
                        var timeHtml = "<tspan class='time-text' dx='" + (node_dx - 40) + "' dy='" + node_dy + "'>" + time + "</tspan>";

                        return nameHtml + (nameHtml ? timeHtml : "");
                    });
                node_textSVG.exit().remove();

                //箭头
                var marker = svg.append("marker")
                    .attr("id", "resolved")
                    .attr("markerUnits", "userSpaceOnUse")
                    .attr("viewBox", "0 -5 10 10")//坐标系的区域
                    .attr("refX", 30)//箭头坐标
                    .attr("refY", 0)
                    .attr("markerWidth", 12)//标识的大小
                    .attr("markerHeight", 12)
                    .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
                    .attr("stroke-width", 2)//箭头宽度
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5")//箭头的路径
                    .attr('fill', '#808080');//箭头颜色
            }
        },

        showCondition: function (groupid, type) {
            _selfCommand = this;
            var conditionDiv = $("#mapConditionWrap");
            conditionDiv.add(conditionDiv.children()).addClass("hide");
            $.ajax({
                url: top.servicePath_xz + '/group/groupDetail/' + groupid,
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                success: function (r) {
                    if (r.data) {
                        $("#groupName").empty().text(r.data.groupname);
                    }
                }
            });
            //专案组小组
            var param = {
                userId: top.userId,
                groupId: groupid,
                memberName: ""
            };
            $.ajax({
                url: top.servicePath_xz + '/group/getChildGroupList',
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                data: param,
                success: function (r) {
                    if (r.flag == 1) {
                        if (r.data && r.data.length > 0) {
                            var option = "<option val=''></option>";
                            $.each(r.data, function (i, o) {
                                option += "<option val='" + o.id + "'>" + o.groupname + "</option>"
                            });
                            $("#smallGroup").empty().html(option);
                        } else {
                            // toast("该专案组没有小组！", 600).warn();
                            $("#smallGroup").empty();
                        }
                    }
                }
            });
            //下发人   //反馈人
            var param = {
                isInGroup: true,
                groupId: groupid
            };
            $post(top.servicePath_xz + '/usergroup/getUsergroupPage', param, function (r) {
                if (r.flag == 1) {
                    if (r.data && r.data.length > 0) {
                        var option = "<option val=''></option>";
                        $.each(r.data, function (i, o) {
                            option += "<option val='" + o.userId + "'>" + o.userName + "</option>"
                        });
                        $("#sponsor").empty().html(option);
                        $("#feedbackUser").empty().html(option);
                    }
                }

            }, true);
            // 时间段
            $("#dateRange").daterangepicker({
                separator: ' 至 ',
                showWeekNumbers: true,
                pickTime: true
            }, function (start, end, label) {
                $('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                $('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
            });
            //时间插件确定按钮点击事件
            $('#dateRange').on('apply.daterangepicker', function (e, picker) {
                $('#startTime').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss'));
                $('#endTime').val(picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
                $("#changeTimeScope u").removeClass("active");
            });
            // 任务状态
            selectUtils.selectTextOption("#changeTaskStatus", "#taskStatus");
            $("#searchBtn", parent.document).off("click").on("click", function () {
                if (conditionDiv.is(":visible")) {
                    conditionDiv.add(conditionDiv.children()).addClass("hide");
                    conditionDiv.addClass("hide");
                    $(".form-btn-block").siblings("form").find("select,input").val("");
                    $(".form-btn-block").siblings("form").find("span.option").each(function () {
                        $(this).children("u").removeClass("active").eq(0).addClass("active");
                    });
                } else {
                    conditionDiv.add(conditionDiv.children()).removeClass("hide");
                    conditionDiv.removeClass("hide");
                }
                return false;
            });

            //点击确定按钮
            $("#okBtn").on("click", function () {
                var $form = $(this).parents(".form-btn-block").siblings("form");
                var param = {
                    smallGroup: $form.find("#smallGroup option:selected").attr("val"),
                    sponsor: $form.find("#sponsor option:selected").attr("val"),
                    feedbackUser: $form.find("#feedbackUser option:selected").attr("val"),
                    startTime: $form.find("#startTime").val(),
                    endTime: $form.find("#endTime").val(),
                    taskStatus: $form.find("#taskStatus").val()
                };
                var groupid = $form.find("#smallGroup option:selected").attr("val");
                if (groupid) {
                    //选择小组
                    _selfGraphLayout.showList(groupid, "groupid");
                } else {
                    _selfGraphLayout.updateGraphJSON(jsonContext, type, param);

                }
                return false;
            });
            $("#closeBtn").on("click", function () {
                conditionDiv.add(conditionDiv.children()).addClass("hide");
                conditionDiv.addClass("hide");
                $(this).parents(".form-btn-block").siblings("form").find("select,input").val("");
                $(this).parents(".form-btn-block").siblings("form").find("span.option").each(function () {
                    $(this).children("u").removeClass("active").eq(0).addClass("active");
                });
                return false;
            });
        },
        isInTimeRange: function (start, end, time) {
            _selfGraphLayout = this;
            if (start && end && time) {
                //比较所选时间是否大于开始时间
                var start_time = parseInt(time.replace(/-/g, "").replace(/ /g, "")) > parseInt(start.replace(/-/g, "").replace(/ /g, ""));
                //比较结束时间是否大于所选时间
                var time_end = parseInt(end.replace(/-/g, "").replace(/ /g, "")) > parseInt(time.replace(/-/g, "").replace(/ /g, ""));
                if (start_time && time_end) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        removeNode: function (index) {
            _selfGraphLayout = this;
            if (!node_img[0][index]) {
                return;
            }
            node_img[0][index].remove();
            var node = node_img[0];
            node_text[0][index].remove();

            var edgesArray = node[index].attributes["edges"];
            if (!edgesArray) {
                return;
            }
            var edgesStr = edgesArray.value;
            var edges = edgesStr.split(",");
            for (var i = 0; i < edges.length; i++) {
                var edgeIndex = edges[i];
                if (edgeIndex != "") {
                    edges_line[0][edgeIndex].remove();
                    edges_text[0][edgeIndex].remove();
                }
            }
        },


        menuHanle: function (event, treeId, treeNode, graphType) {
            _selfGraphLayout = this;
            var $target = $(event.currentTarget).find("#" + treeNode.tId).find("#" + treeNode.tId + "_span>span");
            var className = $target.attr("class");
            var id = $target.attr("id");
            var val = $target.attr("val");
            var infoattr = $target.attr("infoattr");
            var taskid = $target.attr("taskid");

            switch (className) {
                case "groupHandle":
                    //专案组右键菜单处理
                    _selfGraphLayout.groupHandle(id, val, graphType);
                    break;
                case "taskHandle":
                    //任务右键菜单处理
                    _selfGraphLayout.taskHandle(id, val, graphType);
                    break;
                case "feedbackHandle":
                    //反馈右键菜单处理
                    _selfGraphLayout.feedbackHandle(id, val, taskid, graphType);
                    break;
                case "caseHandle":
                    //案件右键菜单处理
                    _selfGraphLayout.caseHandle(id, val, graphType);
                    break;
            }
        },
        groupHandle: function (id, val, graphType) {
            _selfGraphLayout = this;
            switch (val) {
                case "1":
                    //查看专案组基本信息
                    _selfGraphLayout.showGroupInfo(id);
                    break;
                case "2":
                    //查看专案组成员
                    _selfGraphLayout.showGroupStaff(id);
                    break;
                case "3":
                    //在专案组上新增任务
                    _selfGraphLayout.addTask(id, graphType);
                    break;
            }
        },
        taskHandle: function (id, val, graphType) {
            _selfGraphLayout = this;
            switch (val) {
                case "1":
                    //接收人在任务上反馈任务
                    _selfGraphLayout.feedbackTask(id, graphType);
                    break;
                case "2":
                    //接收人移交任务
                    _selfGraphLayout.transferTask(id);
                    break;
                case "3":
                    //接收人在任务上补充任务
                    _selfGraphLayout.addTaskHandle(id, "补充任务", "", graphType);
                    break;
                case "4":
                    //下发人催办任务
                    _selfGraphLayout.urgeTask(id);
                    break;
                case "5":
                    //查看任务基本信息
                    _selfGraphLayout.showTaskInfo(id);
                    break;
            }
        },
        feedbackHandle: function (id, val, taskid, graphType) {
            _selfGraphLayout = this;
            switch (val) {
                case "1":
                    //下发人在反馈上追加任务
                    _selfGraphLayout.addTaskHandle(id, "追加任务", taskid, graphType);
                    break;
                case "2":
                    //查看反馈信息
                    _selfGraphLayout.feedbackInfo(id, taskid);
                    break;
            }
        },
        caseHandle: function (id, val) {
            _selfGraphLayout = this;
            switch (val) {
                case "1":
                    //查看案件详情
                    specialCaseGroup.showCaseInfo(id);
                    break;
            }
        },
        showGroupInfo: function (id) {
            _selfGraphLayout = this;
            $.ajax({
                url: top.servicePath_xz + '/group/groupDetail/' + id,
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                success: function (r) {
                    if (r.data) {
                        var groupInfo = r.data;
                        //弹框id
                        var openerId = "#groupInfoDiv";
                        $open(openerId, {width: 800, title: '&nbsp专案组基本信息'});
                        var openerDiv = $(openerId);
                        openerDiv.find(".panel-container").empty().html(_.template(baseInfoTpl));

                        $("#grouptype").siblings("i#chooseGroupType").remove();
                        $("#baseInfo").find("input,select").attr("disabled", "disabled");
                        //赋值
                        $("#groupname").val(groupInfo.groupname);
                        $("#grouptype").val(groupInfo.grouptype);
                        $("#grouptypeName").val(groupInfo.grouptypeName);
                        $("#createname").val(groupInfo.createname);
                        $("#deparmentcode").val(groupInfo.deparmentname);
                        $("#createtime").val(rangeUtil.formatDate(groupInfo.createtime, 'yyyy-MM-dd'));
                    }
                }
            });
        },
        showGroupStaff: function (id) {
            _selfGraphLayout = this;
            $.ajax({
                url: top.servicePath_xz + '/group/groupDetail/' + id,
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                success: function (r) {
                    if (r.data) {
                        var groupInfo = r.data;
                        //弹框id
                        var openerId = "#userListDiv";
                        $open(openerId, {width: 800, title: '&nbsp查看专案组成员'});
                        var $openerDiv = $(openerId);
                        $openerDiv.find(".panel-container").empty().html(_.template(groupStaffTpl));
                        $openerDiv.find("#chooseUint").on('click', function () {
                            dictOpener.openOrg($(this));
                        });
                        $openerDiv.find("#resetBtn").on("click", function () {
                            selectUtils.clearQueryValue();
                            return false;
                        });
                        $openerDiv.find("#queryBtn").on("click", function () {
                            _selfGraphLayout.queryAddedStaffList(groupInfo, $openerDiv);
                            return false;
                        });
                        //加载已添加的成员
                        _selfGraphLayout.queryAddedStaffList(groupInfo, $openerDiv);

                        //成员添加
                        $openerDiv.find("#addStaff").on("click", function () {
                            //弹框id
                            var openerIdAdd = "#userAllListDiv";
                            $open(openerIdAdd, {width: 800, title: '&nbsp用户列表'});
                            var $openerAddDiv = $(openerIdAdd);
                            $openerAddDiv.find(".panel-container").empty().html(_.template(userListTpl, {
                                checkboxMulti: true,
                                groupInfo: groupInfo
                            }));
                            $openerAddDiv.find("#chooseUint").on('click' , function () {
                                dictOpener.openOrg($(this));
                            });
                            $openerAddDiv.find("#resetBtn").on("click" , function () {
                                selectUtils.clearQueryValueByEle($(this).parents("form"));
                                return false;
                            });
                            $openerAddDiv.find("#queryBtn").on("click", function () {
                                _selfGraphLayout.queryUserList(true, groupInfo);
                                return false;
                            });

                            //加载用户列表
                            _selfGraphLayout.queryUserList(true, groupInfo);

                            $openerAddDiv.find("#selectAll").on('click', function () {
                                $('#userTable').find('tbody input:checkbox').prop('checked', this.checked);
                            });
                            $openerAddDiv.find("#saveStaffBtn").on('click', function () {
                                //专案组添加成员
                                _selfGraphLayout.saveStaff(groupInfo,$openerAddDiv);

                            });
                            $openerAddDiv.find("#cancelBtn").on('click', function () {
                                $openerAddDiv.$close();
                            });
                        });
                    }
                }
            });
        },
        //由于弹框打开 ，导致页面id不唯一，需要传入目标元素到新的方法
        queryAddedStaffList: function (groupInfo, ele) {
            _selfGraphLayout = this;
            var param = {
                isInGroup: true,
                groupId: groupInfo.id,
                orgId: $.trim(ele.find("#orgId").val()),
                policeId: $.trim(ele.find("#policeId").val()),
                userName: $.trim(ele.find("#userName").val())
            };
            $('#groupStaffResult').pagingList({
                action: top.servicePath_xz + '/usergroup/getUsergroupPage',
                jsonObj: param,
                callback: function (data) {
                    $("#staffTable tbody").empty().html(_.template(groupStaffTrTpl, {
                        data: data,
                        groupcreator: groupInfo.creator,
                        isOperation: true
                    }));
                    $('.span').span();

                    $(".into-delete").on("click", function () {
                        specialCaseGroup.delGroupStaff(groupInfo, $(this).attr('id'), $(this).attr('username'));
                    });

                }
            });
        },
        queryUserList: function (isCheckboxMulti, groupInfo) {
            _selfGraphLayout = this;
            //弹框id
            var openerIdAdd = "#userAllListDiv";
            var $openerAddDiv = $(openerIdAdd);
            var param = {
                excludeGroupId: groupInfo.pgroupid ? groupInfo.id : "",
                groupId: groupInfo.pgroupid ? groupInfo.pgroupid : groupInfo.id,
                isInGroup: groupInfo.pgroupid ? true : false,
                orgId: $.trim($openerAddDiv.find("#orgId").val()),
                userName: $.trim($openerAddDiv.find("#userName").val()),
                policeId: $.trim($openerAddDiv.find("#policeId").val())
            };

            $openerAddDiv.find('#userTableResult').pagingList({
                action: top.servicePath_xz + '/usergroup/getUsergroupPage',
                jsonObj: param,
                callback: function (data) {
                    $("#userTable tbody").empty().html(_.template(userListTrTpl, {
                        data: data,
                        checkboxMulti: isCheckboxMulti,
                        taskInfoFqr: null
                    }));
                    $('.span').span();
                }
            });
        },
        saveStaff: function (groupInfo,$openerAddDiv) {
            _selfGraphLayout = this;
            var checkbox = [];
            $('#userTable').find('tbody input:checkbox:checked').each(function (i, e) {
                var userInfo = {
                    jh: $(e).attr("jh"),
                    userid: $(e).attr("userid"),
                    username: $(e).attr("username"),
                    creator: top.userId,
                    deparmentcode: top.orgCode,
                    groupid: groupInfo.id
                };
                checkbox.push(userInfo);
            });
            if (checkbox.length > 0) {
                specialCaseGroupAjax.addUserGroupList(checkbox, function (r) {
                    if (r.flag == 1) {
                        toast('添加成功！', 600, function () {
                            $openerAddDiv.$close();
                            _selfGraphLayout.queryAddedStaffList(groupInfo, $("#userListDiv"));
                        }).ok()
                    } else {
                        toast(r.msg, 600).err();
                    }
                });
            } else {
                toast("请至少选择一个用户！", 600).warn()
            }
        },

        addTask: function (id, graphType) {
            _selfGraphLayout = this;
            //弹框id
            var openerId = "#taskAddDiv";
            var text = "";
            $open(openerId, {width: 800, title: '&nbsp下发任务'});
            var $openerDiv = $(openerId);
            $openerDiv.find(".panel-container").empty().html(_.template(taskAddTpl, {text: text}));
            $("#fkjzTime").datetimepicker({
                format: "yyyy-mm-dd hh:ii:ss",
                autoclose: true,
                startDate: rangeUtil.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                minuteStep: 10,
                language: 'zh-CN'
            });

            $("#groupid").siblings("i#chooseGroup").remove();
            var groupInfo = {};
            $.ajax({
                url: top.servicePath_xz + '/group/groupDetail/' + id,
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                success: function (r) {
                    if (r.data) {
                        groupInfo = r.data;
                        $("#groupid").val(groupInfo.groupname);
                    }
                }
            });
            //选择接收人
            $openerDiv.find('#chooseReceive').on('click',function () {
                if ($("#groupid").val()) {
                    var param = {
                        groupId: id,
                        isInGroup: true
                    };
                    dictOpener.openGroupRecipient($(this),param);

                    // var obj = $(this);
                    // var title = obj.attr("title");
                    // $open('#dict-block', {width: 400, height: 300, top: 100, title: '选择' + title});
                    // $("#dict-block .dict-container").find(".query-block-row").empty();
                    // $post(top.servicePath_xz + '/usergroup/getUsergroupPage', param, function (r) {
                    //     if (r.flag == 1) {
                    //         var target = $("#dict-wrap");
                    //         var tpl = '';
                    //         $.each(r.data, function (i, o) {
                    //             o.userId == top.currentUser.userInfo.userId ? tpl += "" : tpl += "<div class='item-value'><u><span paramattr='" + obj2str(o) + "' val='" + o.userId + "' phone='" + o.phone + "'>" + o.userName + ',' + o.orgName + "</span></div></u>";
                    //         });
                    //         target.html(tpl);
                    //         var opener = $(".panel #dict-block");
                    //         $(".query-block-row input").val("");
                    //         opener.find("#dict-wrap").off("click").on("click", "div:not(.disabled)", function () {
                    //             toast("不能选择自己！", 600).warn();
                    //         });
                    //         opener.find("#dict-wrap").off("click").on("click", "div:not(.disabled)", function () {
                    //             var input = obj.siblings("input[type='text']");//页面上需要填入的input
                    //             input.val($(this).find("span").text());
                    //             var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                    //             inputHidden.val($(this).find("span").attr("val"));
                    //
                    //             var paramAttr = $(this).find("span").attr("paramattr");
                    //             input.attr("paramattr", paramAttr);
                    //             if ($("#jsrLxfs").length > 0) {
                    //                 $("#jsrLxfs").val($(this).find("span").attr("phone"));
                    //             }
                    //             opener.$close();
                    //         });
                    //     }
                    // }, true);


                } else {
                    toast("请先选择专案组！", 600).warn();
                }
            });
            $openerDiv.find('#saveBtn').on('click', function () {
                $('.task-valid').validatebox();
                if ($('.validatebox-invalid').length > 0) {
                    return false;
                }
                var param = $("#taskAddForm").serializeObject();
                var jsrParam = str2obj($("#jsr").attr("paramattr"));
                var groupParam = groupInfo;
                $.extend(param, {
                    fqr: top.userId,
                    fqrname: top.trueName,
                    fqrDeptCode: top.orgCode,
                    fqrDeptName: top.orgName,
                    bcrwid: "",
                    fkid: "",
                    taskName: $.trim($("#taskName").val()),
                    groupid: groupParam.id,
                    jsr: jsrParam.userId,
                    jsrname: jsrParam.userName,
                    fqrLxfs: top.phone,
                    jsrLxfs: $.trim($("#jsrLxfs").val()),
                    taskContent: $.trim($("#taskContent").val()),
                    fkjzTime: $.trim($("#fkjzTime").val()),
                    fqTime: $.trim($("#createtime").val())
                });
                taskAjax.addTask(param, function (r) {
                    if (r.flag == 1) {
                        toast('保存成功！', 600, function () {
                            $openerDiv.$close();
                            //重新画图
                            _selfGraphLayout.showList(groupParam.id, graphType);
                        }).ok();
                    } else {
                        toast(r.msg, 600).err()
                    }
                });
            });
            //绑定返回事件
            $openerDiv.find("#cancelBtn").on("click", function () {
                $openerDiv.$close();
            });

        },
        showTaskInfo: function (id) {
            _selfGraphLayout = this;
            taskAjax.taskDetail({id: id, userId: top.userId}, function (r) {
                if (r.flag == 1) {
                    //弹框id
                    var openerId = "#taskInfoDiv";
                    $open(openerId, {width: 800, title: '&nbsp任务详情'});
                    var $openerDiv = $(openerId);
                    $openerDiv.find(".panel-container").empty().html(_.template(taskInfoTpl, {
                        data: r.data,
                        isOperation: true
                    }));
                    $openerDiv.find("#cancelBtn").on("click",function () {
                        $openerDiv.$close();
                    });
                }
            });
        },
        feedbackInfo: function (id, taskid) {
            _selfGraphLayout = this;
            taskAjax.taskDetail({id: taskid, userId: top.userId}, function (r) {
                if (r.flag == 1) {
                    //弹框id
                    var openerId = "#userListDiv";
                    $open(openerId, {width: 800, title: '&nbsp反馈详情'});
                    var $openerDiv = $(openerId);
                    $openerDiv.find(".panel-container").empty().html(_.template(feedBackInfoTpl, {data: r.data}));

                    $openerDiv.find("#cancelBtn").on("click", function () {
                        $openerDiv.$close();
                    });
                }
            });
        },
        addTaskHandle: function (id, text, taskid, graphType) {
            _selfGraphLayout = this;
            var bcrwid, fkid;
            var paramId;
            if (text == "补充任务") {
                paramId = id;
            } else if (text == "追加任务") {
                paramId = taskid;
            }
            taskAjax.taskDetail({id: paramId, userId: top.userId}, function (r) {
                if (r.flag == 1) {
                    var taskinfo = r.data;
                    if (taskinfo) {
                        switch (text) {
                            case "补充任务":
                                bcrwid = taskinfo.id;
                                break;
                            case "追加任务":
                                fkid = id;
                                break;
                            default:
                        }
                    }
                    $.ajax({
                        url: top.servicePath_xz + '/group/groupDetail/' + taskinfo.groupid,
                        type: "post",
                        contentType: "application/x-www-form-urlencoded",
                        success: function (r) {
                            if (r.data) {
                                var groupinfo = r.data;
                                //弹框id
                                var openerId = "#taskAddDiv";
                                $open(openerId, {width: 800, title: '&nbsp' + text});
                                var $openerDiv = $(openerId);
                                $openerDiv.find(".panel-container").empty().html(_.template(taskAddTpl, {
                                    taskInfo: taskinfo,
                                    text: text
                                }));
                                $("#fkjzTime").datetimepicker({
                                    format: "yyyy-mm-dd hh:ii:ss",
                                    autoclose: true,
                                    startDate: rangeUtil.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                                    minuteStep: 10,
                                    language: 'zh-CN'
                                });
                                $openerDiv.find("#chooseReceive").attr("groupinfoid", groupinfo.id).attr("taskinfoid", taskinfo.groupid);
                                $openerDiv.find("#chooseGroup").on('click', function () {
                                    dictOpener.openChoosePort($(this), null, null, {userId: top.userId});
                                });
                                $openerDiv.find("#chooseReceive").on('click', function () {
                                    if ($("#groupid").val()) {
                                        var groupInfoId = $(this).attr("groupinfoid");
                                        var taskInfoId = $(this).attr("taskinfoid");
                                        var param = {
                                            groupId: text ? taskInfoId : groupInfoId,
                                            isInGroup: true
                                        };
                                        dictOpener.openGroupRecipient($(this),param);

                                        // dictOpener.getUserByGroupIdPortList($(this), {
                                        //     groupId: text ? taskInfoId : groupInfoId,
                                        //     isInGroup: true
                                        // })
                                    } else {
                                        toast("请先选择专案组！", 600).warn();
                                    }
                                });
                                $openerDiv.find("#cancelBtn").on("click", function () {
                                    $openerDiv.find("#chooseReceive").attr("groupinfo", "").attr("taskinfo", "");
                                    $openerDiv.$close();
                                });
                                $openerDiv.find("#saveBtn").on("click", function () {
                                    $('.task-valid').validatebox();
                                    if ($('.validatebox-invalid').length > 0) {
                                        return false;
                                    }
                                    var param = $("#taskAddForm").serializeObject();
                                    var jsrParam = str2obj($("#jsr").attr("paramattr"));
                                    var groupParam = str2obj($("#groupid").attr("paramattr"));
                                    var taskParam;
                                    //由追加任务 补充任务跳转过来
                                    if (text) {
                                        taskParam = str2obj($("#groupid").attr("taskparamattr"));
                                    }
                                    var jsr, jsrname;
                                    if ($("#jsr").attr("paramattr")) {
                                        jsr = jsrParam.userId;
                                        jsrname = jsrParam.userName;
                                    } else {
                                        jsr = taskParam.jsr;
                                        jsrname = taskParam.jsrname;
                                    }
                                    $.extend(param, {
                                        fqr: top.userId,
                                        fqrname: top.trueName,
                                        fqrDeptCode: top.orgCode,
                                        fqrDeptName: top.orgName,
                                        bcrwid: bcrwid ? bcrwid : "",
                                        fkid: fkid ? fkid : "",
                                        taskName: $.trim($("#taskName").val()),
                                        groupid: text ? taskParam.groupid : groupParam.id,
                                        jsr: jsr,
                                        jsrname: jsrname,
                                        fqrLxfs: top.phone,
                                        jsrLxfs: $.trim($("#jsrLxfs").val()),
                                        taskContent: $.trim($("#taskContent").val()),
                                        fkjzTime: $.trim($("#fkjzTime").val()),
                                        fqTime: $.trim($("#createtime").val())
                                    });
                                    taskAjax.addTask(param, function (r) {
                                        if (r.flag == 1) {
                                            toast('保存成功！', 600, function () {
                                                //关闭弹框（在图上新增节点：需要刷新图的数据，重调接口）
                                                $openerDiv.$close();
                                                _selfGraphLayout.showList(r.data.groupid, graphType);
                                            }).ok();
                                        } else {
                                            toast(r.msg, 600).err()
                                        }
                                    });
                                });
                            }
                        }
                    });
                }
            });
        },
        //生成32位的id
        getGuid: function () {
            _selfGraphLayout = this;
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }

            return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
        },
        feedbackTask: function (id, graphType) {
            _selfGraphLayout = this;
            taskAjax.taskDetail({id: id, userId: top.userId}, function (r) {
                if (r.flag == 1) {
                    //弹框id
                    var openerId = "#userListDiv";
                    $open(openerId, {width: 800, title: '&nbsp反馈任务'});
                    var $openerDiv = $(openerId);
                    $openerDiv.find(".panel-container").empty().html(_.template(taskEditTpl, {
                        data: r.data,
                        isOperation: true,
                        replenishTaskBtnOper: false
                    }));
                    var filesArr = []; //存放文件的数组...
                    $("#addVideo").siblings("input[type='file']").val("");
                    $("#addVideo").siblings("input[type='file']").off("change").on("change", function () {
                        var $this = $(this)[0];
                        //未上传前，在展示区域显示要上传内容的图片
                        var fileList = $this.files;
                        if (fileList.length == 0) {
                            return false;
                        }
                        for (var i = 0; i < fileList.length; i++) {
                            var tpObj = {};
                            var file = fileList[i];
                            //大小限制
                            if (file.size > 10 * 1024 * 1024) {
                                $alert('单个视频大小超过10M， 上传速度将过慢，请重新上传');
                                break;
                            }
                            tpObj.fileMd5 = _selfGraphLayout.getGuid();//图片对应fileMd5
                            if (file.type.indexOf('image') > -1) {
                                tpObj.src = '../../../img/tp-img.png';
                            } else {
                                tpObj.src = '../../../img/tp-word.png';
                            }
                            tpObj.proofName = file.name.replace(/\.\w+$/, '');//图片的名字
                            tpObj.size = file.size;//(file.size / (1024 * 1024)).toFixed(2) + 'M';//图片的大小
                            tpObj.file = file;//存放input的file值
                            tpObj.flag = 1;
                            tpObj.createTime = new Date().format('yyyy-mm-dd hh:mm:ss');//时间

                            var fileType = file.type;
                            tpObj.fileMd5 = _selfGraphLayout.getGuid();
                            tpObj.fileName = file.name;
                            tpObj.fileSuffix = fileType.substr(fileType.indexOf('/') + 1);
                            tpObj.type = fileType.substr(fileType.indexOf('/') + 1);
                            filesArr.push(tpObj);
                        }
                        var picWrap = $('#pics-wrap');
                        //h5表单文件上传
                        //将对象元素转换成字符串以作比较
                        function obj2key(obj, keys) {
                            var n = keys.length,
                                key = [];
                            while (n--) {
                                key.push(obj[keys[n]]);
                            }
                            return key.join('|');
                        }

                        //去重操作
                        function uniqeByKeys(array, keys) {
                            var arr = [];
                            var hash = {};
                            for (var i = 0, j = array.length; i < j; i++) {
                                var k = obj2key(array[i], keys);
                                if (!(k in hash)) {
                                    hash[k] = true;
                                    arr.push(array[i]);
                                }
                            }
                            return arr;
                        }

                        filesArr = uniqeByKeys(filesArr, ['fileName']);
                        if (filesArr) {
                            var html = "";
                            $.each(filesArr, function (index, value) {
                                html += '<span>' + value.fileName + '</span>';
                            });
                            $('.upload-block .state').html(html);
                            $('[href="#uploadMat"]').text("查看")
                        }
                    });

                    $("#addImg").siblings("input[type='file']").val("");
                    $("#addImg").siblings("input[type='file']").off("change").on("change", function () {
                        var $this = $(this)[0];
                        var fileList = $this.files;
                        if (fileList.length == 0) {
                            return false;
                        }
                        for (var i = 0; i < fileList.length; i++) {
                            var tpObj = {};
                            var file = fileList[i];
                            //大小限制
                            if (file.size > 10 * 1024 * 1024) {
                                $alert('单张图片大小超过10M， 上传速度将过慢，请压缩后重新上传');
                                break;
                            }
                            tpObj.fileMd5 = _selfGraphLayout.getGuid();//图片对应fileMd5
                            if (file.type.indexOf('image') > -1) {
                                tpObj.src = '../../../img/tp-img.png';
                            } else {
                                tpObj.src = '../../../img/tp-word.png';
                            }
                            tpObj.proofName = file.name.replace(/\.\w+$/, '');//图片的名字
                            tpObj.size = file.size;//(file.size / (1024 * 1024)).toFixed(2) + 'M';//图片的大小
                            tpObj.file = file;//存放input的file值
                            tpObj.flag = 1;
                            tpObj.createTime = new Date().format('yyyy-mm-dd hh:mm:ss');//时间

                            var fileType = file.type;
                            tpObj.fileMd5 = _selfGraphLayout.getGuid();
                            tpObj.fileName = file.name;
                            tpObj.fileSuffix = fileType.substr(fileType.indexOf('/') + 1);
                            tpObj.type = fileType.substr(fileType.indexOf('/') + 1);
                            filesArr.push(tpObj);

                        }
                        var picWrap = $('#pics-wrap');
                        //h5表单文件上传
                        //将对象元素转换成字符串以作比较
                        function obj2key(obj, keys) {
                            var n = keys.length,
                                key = [];
                            while (n--) {
                                key.push(obj[keys[n]]);
                            }
                            return key.join('|');
                        }

                        //去重操作
                        function uniqeByKeys(array, keys) {
                            var arr = [];
                            var hash = {};
                            for (var i = 0, j = array.length; i < j; i++) {
                                var k = obj2key(array[i], keys);
                                if (!(k in hash)) {
                                    hash[k] = true;
                                    arr.push(array[i]);
                                }
                            }
                            return arr;
                        }

                        filesArr = uniqeByKeys(filesArr, ['fileName']);
                        if (filesArr) {
                            var html = "";
                            $.each(filesArr, function (index, value) {
                                html += '<span>' + value.fileName + '</span>';
                            });
                            $('.upload-block .state').html(html);
                            $('[href="#uploadMat"]').text("查看")
                        }
                    });

                    $openerDiv.find("#feedbackBtn").on("click", function () {
                        _selfGraphLayout.saveFeedback(id, filesArr, graphType);
                    });
                    $openerDiv.find("#cancelBtn").on("click", function () {
                        $openerDiv.$close();
                    });
                }

            });
        },
        saveFeedback: function (taskId, filesArr, graphType) {
            _selfGraphLayout = this;
            $('.feedback-valid').validatebox();
            if ($('.validatebox-invalid').length > 0) {
                return false;
            }
            var fileInfoArr = []; //传入后台参数的文件数组...
            var taskFkFiles = []; //传入后台参数的文件数组...
            if (filesArr && filesArr.length > 0) {
                var filesArrProcessed = 0;
                //图片或视频上传
                filesArr.forEach(function (item, i) {
                    if (item.file) {
                        var data = new FormData();
                        data.append('file', item.file);
                        //调用远程服务器上传文件
                        $.ajax({
                            url: top.servicePath + '/sys/file/upload?isResize=true',
                            type: 'POST',
                            data: data,
                            async: true,
                            cache: false,
                            processData: false,
                            contentType: false,
                            beforeSend: function () {
                            },
                            success: function (res) {
                                if (res.flag == 1) {
                                    //上传成功后的操作
                                    // $(".pic-info").removeClass("hide");
                                    debugger
                                    var itemObj = {
                                        fileName: res.data.source.substring(12),
                                        fileOldName: res.data.oldName,
                                        filePath: res.data.source,
                                        fileSize: filesArr[i].size,
                                        fileType: filesArr[i].type
                                    }
                                    fileInfoArr.push(itemObj);
                                    filesArrProcessed++;
                                    //遍历循环结束后将反馈参数上传
                                    if (filesArrProcessed === filesArr.length) {
                                        if (fileInfoArr && fileInfoArr.length > 0) {
                                            //将对象元素转换成字符串以作比较
                                            function obj2key(obj, keys) {
                                                var n = keys.length,
                                                    key = [];
                                                while (n--) {
                                                    key.push(obj[keys[n]]);
                                                }
                                                return key.join('|');
                                            }

                                            //去重操作
                                            function uniqeByKeys(array, keys) {
                                                var arr = [];
                                                var hash = {};
                                                for (var i = 0, j = array.length; i < j; i++) {
                                                    var k = obj2key(array[i], keys);
                                                    if (!(k in hash)) {
                                                        hash[k] = true;
                                                        arr.push(array[i]);
                                                    }
                                                }
                                                return arr;
                                            }
                                            fileInfoArr = uniqeByKeys(fileInfoArr, ['fileName']);
                                            taskFkFiles = fileInfoArr;
                                            console.info(taskFkFiles);
                                            var param = {
                                                bz: $.trim($("#bz").val()),
                                                createname: top.trueName,
                                                creator: top.userId,
                                                deparmentcode: top.orgCode,
                                                fkTime: $("#fkTime").val(),
                                                fkr: top.userId,
                                                fkrname: top.trueName,
                                                fkxs: $("#fkxs").val(),
                                                taskFkFiles: taskFkFiles,
                                                taskid: taskId
                                            };
                                            taskAjax.addTaskFk(param, function (r) {
                                                if (r.flag == 1) {
                                                    toast('反馈成功！', 600, function () {
                                                        if ($("#userListDiv")) {//如果是从指挥协作的图右键打开还要关闭
                                                            $("#userListDiv").$close();
                                                            _selfGraphLayout.showList(r.data.groupid, graphType);
                                                        }
                                                    }).ok();
                                                } else {
                                                    toast(r.msg, 600).err()
                                                }
                                            });
                                        }
                                    }
                                } else {
                                    console.info(res);
                                }
                            },
                            error: function () {
                                //远程调用错误时，调用本地的上传文件接口
                                //TODO
                            }
                        });
                    }
                });
                //图片或视频上传end
            } else {
                var param = {
                    bz: $.trim($("#bz").val()),
                    createname: top.trueName,
                    creator: top.userId,
                    deparmentcode: top.orgCode,
                    fkTime: $("#fkTime").val(),
                    fkr: top.userId,
                    fkrname: top.trueName,
                    fkxs: $("#fkxs").val(),
                    taskFkFiles: taskFkFiles,
                    taskid: taskId
                };
                taskAjax.addTaskFk(param, function (r) {
                    debugger
                    if (r.flag == 1) {
                        toast('反馈成功！', 600, function () {
                            if ($("#userListDiv")) {//如果是从指挥协作的图右键打开还要关闭
                                $("#userListDiv").$close();
                                _selfGraphLayout.showList(r.data.groupid, graphType);
                            }
                        }).ok();
                    } else {
                        toast(r.msg, 600).err()
                    }
                });

            }
        },
        transferTask: function (id) {
            _selfGraphLayout = this;
            taskAjax.taskDetail({id: id, userId: top.userId}, function (r) {
                if (r.flag == 1) {
                    var taskInfo = r.data;
                    //弹框id
                    var openerId = "#userListDiv";
                    $open(openerId, {width: 800, title: '&nbsp用户列表'});
                    var $openerDiv = $(openerId);
                    $openerDiv.find(".panel-container").empty().html(_.template(userListTpl, {checkboxMulti: false}));
                    $openerDiv.find("#chooseUint").on('click',  function () {
                        // dictOpener.openUnitChoosePort($(this));
                        dictOpener.openOrg($(this));
                    });
                    $openerDiv.find("#resetBtn").on("click" , function () {
                        selectUtils.clearQueryValue();
                        return false;
                    });
                    $openerDiv.find("#queryBtn").on("click" , function () {
                        task.queryUserList(false, id, taskInfo);
                        return false;
                    });

                    //加载用户列表
                    task.queryUserList(false, id, taskInfo);
                    //任务移交给用户
                    task.saveTransfer(id);
                    $openerDiv.find("#cancelBtn").on('click' , function () {
                        $openerDiv.$close();
                    });
                }
            });
        },
        urgeTask: function (id) {
            _selfGraphLayout = this;
            $confirm('催办任务？', function (bol) {
                if (bol) {
                    var param = {
                        taskid: id,
                        userId: top.userId,
                        deparmentcode: top.orgCode
                    };
                    taskAjax.addCb(param, function (r) {
                        if (r.flag == 1) {
                            toast('催办成功！', 600, function () {
                            }).ok()
                        } else {
                            toast(r.msg, 600).err()
                        }
                    })
                }
            });
        }
    }
});
