importing('currentDate');

var width = 1200,
    height = 900;

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
    'text!/view/caseInvestigation/tpl/task/taskAdd.html',
    'text!/view/caseInvestigation/tpl/task/taskEdit.html',
    'text!/view/caseInvestigation/tpl/task/taskInfo.html',
    'text!/view/caseInvestigation/tpl/task/feedBackInfo.html',
    '../../caseInvestigation/dat/specialCaseGroup.js',
    '../../caseInvestigation/src/specialCaseGroup.js',
    '../../caseInvestigation/dat/task.js',
    '../../caseInvestigation/src/task.js',
    '../../dictManage/src/dictOpener.js',
    '../src/graphAction.js'], function (_, baseInfoTpl, relationCaseTpl, relationCaseTrTpl, groupStaffTpl, groupStaffTrTpl, userListTpl, taskAddTpl, taskEditTpl, taskInfoTpl, feedBackInfoTpl,
                                                     specialCaseGroupAjax, specialCaseGroup, taskAjax, task, dictOpener,graphAction) {

    return {
        showList: function (groupid, type) {
            _selfGraphLayout = this;
            var jsonInitUrl = "/graph/getGraph?limitLevel=20&maxNode=50&detail=false&startNodeValue=" + groupid + "&startNodeType=" + type;
            _selfGraphLayout.updateGraphURL(jsonInitUrl);

            //显示脉络图查询条件
            _selfGraphLayout.showCondition(groupid);
        },
        //根据链接更新
        updateGraphURL: function (jsonInitUrl) {
            _selfGraphLayout = this;
            d3.json(jsonInitUrl, function (error, json) {
                if (error) {
                    return console.log(error);
                }
                _selfGraphLayout.updateGraphJSON(json);
            });
        },
        //根据json更新
        updateGraphJSON: function (json) {
            _selfGraphLayout = this;
            jsonContext = json;
            // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
            var setting = {
                data:{

                },
                view: {
                    //可以允许节点名称支持 HTML 内容
                    nameIsHTML: true,
                    //是否允许节点显示title属性
                    showTitle:false
                },
                callback: {
                    //单击菜单节点之前的事件回调函数
                    beforeClick: function (treeId, treeNode, clickFlag) {
                        console.info("[ beforeClick ]:" + treeNode.name);
                        return (treeNode.click != false);
                    },
                    //菜单节点被点击的事件回调函数
                    onClick: function (event, treeId, treeNode, clickFlag) {
                        graphAction.menuHanle(event, treeId, treeNode, clickFlag);
                        return (treeNode.click != false);
                    }
                }
            };

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
                })
                    .attr("y1", function (d) {
                        return d.source.y;
                    })
                    .attr("x2", function (d) {
                        return d.target.x;
                    })
                    .attr("y2", function (d) {
                        return d.target.y;
                    });
                //刷新连接线上的文字位置
                edges_text.attr("x", function (d) {
                    return (d.source.x + d.target.x) / 2;
                })
                    .attr("y", function (d) {
                        return (d.source.y + d.target.y) / 2;
                    });
                //刷新结点图片位置
                node_img.attr("x", function (d) {
                    return d.x - img_w / 2;
                })
                    .attr("y", function (d) {
                        return d.y - img_h / 2
                    });
                //刷新结点文字位置
                node_text.attr("x", function (d) {
                    return d.x
                })
                    .attr("y", function (d) {
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


            //清除原有的画板
            d3.select("svg").remove();
            //定义svg画板
            var svg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height);

            //箭头
            var marker =
                svg.append("marker")
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

            //拖拽开始后设定被拖拽对象为固定
            var drag = layout.drag().on("dragstart", function (d) {
                //本节点固定
                d.fixed = true;
            });
            layout
                .nodes(json.nodes)
                .links(json.edges)
                .start();

            svg.selectAll("line").remove();
            var edges_lineSVG = svg.selectAll("line")
                .data(json.edges);
            svg.selectAll(".linetext").remove();
            var edges_textSVG = svg.selectAll(".linetext")
                .data(json.edges);
            svg.selectAll("image").remove();
            var node_imgSVG = svg.selectAll("image")
                .data(json.nodes);
            svg.selectAll(".nodetext").remove();
            var node_textSVG = svg.selectAll(".nodetext")
                .data(json.nodes);
            //绘制连接线
            edges_line = edges_lineSVG
                .enter()
                .append("line")
                .style("stroke", "#808080")//颜色
                .style("stroke_width", 1)
                .style("marker-end", "url(#resolved)")
                .attr("source", function (d) {
                    var source = d.source.index;
                    var sourceLine = [];
                    if (source) {
                        sourceLine.push(source);
                    }
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
                    //根据button判断鼠标点击类型 0（左键） 1（中键） 2（右键）
                    if (that.button == 2) {
                        $(document).on("contextmenu", function (e) {
                            e.preventDefault();
                        });

                        if ($("#tooltip" + i).length <= 0) {
                            var tooltipDiv = "<div id='tooltip" + i + "' class='tooltip-box'><ul id='menuTree" + i + "' class='ztree deploy'></ul></div>";
                            $("body").append(tooltipDiv);
                        }
                        console.info(d);
                        //获取节点id（专案组id，任务id，反馈id，案件id）  d.id
                        //根据id和type显示不同的菜单
                        var menuByGroupType = [];
                        var menuByTaskType = [];
                        var menuByFeedbackType = [];
                        var menuByCaseType = [];
                        if(d.type == "groupid"){//专案组右键菜单
                            menuByGroupType = [
                                {name: "<span class='groupHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='1'>专案组详情</span>"},
                                {name: "<span class='groupHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='2'>专案组成员</span>"},
                                {name: "<span class='groupHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='3'>任务下发</span>"}
                            ];
                            zTreeObj = $.fn.zTree.init($("#menuTree" + i), setting, menuByGroupType);

                        } else if(d.type == "taskid"){//任务右键菜单
                            menuByTaskType = [{name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='5'>任务详情</span>"}];

                            if (d.taskCreatorUserId == top.userId && d.taskStatus == 0) {
                                //显示催办任务
                                var urge = {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='4'>催办任务</span>"};
                                menuByTaskType.push(urge);
                            }
                            taskAjax.taskDetail({id: d.id, userId: top.userId}, function (r) {
                                if (r.flag == 1) {
                                    debugger
                                    var taskinfo = r.data;
                                    if (taskinfo.jsr == top.userId) {
                                        console.info(taskinfo)
                                        //显示反馈任务(反馈次数小于3)  移交任务  补充任务
                                        var feedback = {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='1'>反馈任务</span>"};
                                        var transfer = {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='2'>移交任务</span>"};
                                        var append_bc = {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='3'>补充任务</span>"};
                                        if(taskinfo.yjzt==0 && taskinfo.fkCount<3){
                                            menuByTaskType.push(feedback);
                                        }
                                        if(taskinfo.yjzt==0 && taskinfo.fkzt==0){
                                            menuByTaskType.push(transfer);
                                            menuByTaskType.push(append_bc);
                                        }
                                        zTreeObj = $.fn.zTree.init($("#menuTree" + i), setting, menuByTaskType);
                                    }else{
                                        zTreeObj = $.fn.zTree.init($("#menuTree" + i), setting, menuByTaskType);
                                    }
                                }else{
                                    toast(r.msg,600).err();
                                }
                            });
                        } else if(d.type == "fkid"){//反馈右键菜单
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
                                var findLine = json.edges[edgeIndex]
                                var lineSource = findLine.source;
                                var feedbackInfo = {name: "<span class='feedbackHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' taskid='" + lineSource.id + "' val='2'>反馈信息详情</span>"};
                                menuByFeedbackType.push(feedbackInfo);
                                if (d.type == "fkid" && lineSource.taskCreatorUserId == top.userId) {//反馈的上一条任务的下发人
                                    var append_zj = {name: "<span class='feedbackHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' taskid='"+lineSource.id+"' val='1'>追加任务</span>"};
                                    menuByFeedbackType.push(append_zj);
                                }
                            }
                            zTreeObj = $.fn.zTree.init($("#menuTree" + i), setting, menuByFeedbackType);

                        } else if(d.type == "ajid"){//案件右键菜单
                            menuByCaseType = [{name: "<span class='caseHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='1'>查看案件详情</span>"}];
                            zTreeObj = $.fn.zTree.init($("#menuTree" + i), setting, menuByCaseType);
                        }

                        var tooltipCurrent = $("#tooltip" + i);
                        var tooltipSiblings = tooltipCurrent.siblings(".tooltip-box");
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
                            var target = e.target;
                            var isShowTooltip = $(target).parents(".tooltip-box").is(":visible");
                            //当点击的区域是菜单之外时
                            if (!isShowTooltip) {
                                tooltipCurrent.remove();
                            }
                        });
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

            var node_dx = 0;//-20,
            var node_dy = 20;
            // var html = '<tspan class="name-text" dx="' + node_dx + '" dy="' + node_dy + '" x="' + node_dx + '" y="' + node_dy + '"></tspan>' +
            //     '<tspan class="time-text" x="' + node_dx + '" y="' + node_dy + 20 + '" dx="' + node_dx + '" dy="' + node_dy + 20 + '"></tspan>';
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

        },


        showCondition: function (groupid) {
            _selfCommand = this;
            debugger
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
                userId:top.userId,
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

            $("#closeBtn").on("click", function () {
                conditionDiv.add(conditionDiv.children()).addClass("hide");
                conditionDiv.addClass("hide");
                $(this).parents(".form-btn-block").siblings("form").find("select,input").val("");
                $(this).parents(".form-btn-block").siblings("form").find("span.option").each(function () {
                    $(this).children("u").removeClass("active").eq(0).addClass("active");
                });
                return false;
            });
            $("#okBtn").on("click", function () {
                var $form = $(this).parents(".form-btn-block").siblings("form");
                var param = {
                    smallGroup: $form.find("#smallGroup option:selected").attr("val"),
                    sponsor: $form.find("#sponsor option:selected").attr("val"),
                    feedbackUser: $form.find("#feedbackUser option:selected").attr("val"),
                    // yesOrNo:$form.find("#yesOrNo").val(),
                    startTime: $form.find("#startTime").val(),
                    endTime: $form.find("#endTime").val(),
                    taskStatus: $form.find("#taskStatus").val()
                };
                var groupid  = $form.find("#smallGroup option:selected").attr("val");
                if(groupid){
                    //选择小组
                    _selfGraphLayout.showList(groupid,"groupid");
                }
                // else {
                //     //选择大组
                //     _selfGraphLayout.showList(groupid,"groupid");
                //
                // }
                var json = jsonContext;
                var nodes = [];
                var edges = [];
                // svg.selectAll(".nodetext")
                // for (var i = 0; i < node_img; i++) {
                //
                // }
                $.each(json.nodes, function (index, value) {
                    var isInTimeRange = _selfGraphLayout.isInTimeRange(param.startTime, param.endTime, value.taskCreateTime);
                    console.info(value.id+"status"+param.sponsor);
                    console.info(value.id+"value"+value.taskCreatorUserId);
                    if ((param.startTime && param.endTime && value.taskCreateTime && isInTimeRange == false)
                        || ((param.taskStatus && value.taskStatus && param.taskStatus != value.taskStatus)
                        || (param.feedBackUserId && value.feedbackUser && param.feedBackUserId != value.feedbackUser)
                        || (param.sponsor && value.taskCreatorUserId && param.sponsor != value.taskCreatorUserId))
                    ) {
                        console.info(value);
                        _selfGraphLayout.removeNode(index);
                    }
                });
                // conditionDiv.add(conditionDiv.children()).addClass("hide");
                // conditionDiv.addClass("hide");
                return false;
            });
        },
        isInTimeRange: function (start, end, time) {
            _selfGraphLayout = this;
            if (start && end && time) {
                time = time.split(" ")[0];
                var start_time = parseInt(time.replace(/-/g, "")) > parseInt(start.replace(/-/g, ""));
                var time_end = parseInt(end.replace(/-/g, "")) > parseInt(time.replace(/-/g, ""));
                if (start_time && time_end) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        removeNode: function (index) {
            _selfGraphLayout = this;
            // edges_line, edges_text, node_img, node_text;
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
            // console.log(edges);
            for (var i = 0; i < edges.length; i++) {
                var edgeIndex = edges[i];
                if (edgeIndex != "") {
                    edges_line[0][edgeIndex].remove();
                    edges_text[0][edgeIndex].remove();
                }
            }
        }
    }
});
