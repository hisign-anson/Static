importing('currentDate');
define(['underscore',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/baseInfo.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCase.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCaseTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupStaff.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupStaffTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/userList.html',
    'text!/view/caseInvestigation/tpl/task/taskAdd.html',
    'text!/view/caseInvestigation/tpl/task/taskEdit.html',

    // '../dat/task.js',

    '../../caseInvestigation/dat/specialCaseGroup.js',
    '../../caseInvestigation/src/specialCaseGroup.js',
    '../../caseInvestigation/dat/task.js',
    '../../caseInvestigation/src/task.js',
    '../../dictManage/src/dictOpener.js'], function (_, baseInfoTpl, relationCaseTpl, relationCaseTrTpl, groupStaffTpl, groupStaffTrTpl, userListTpl, taskAddTpl, taskEditTpl,
                                                     specialCaseGroupAjax, specialCaseGroup, taskAjax, task, dictOpener) {

    var width = 1200,
        height = 900;

    var img_w = 48,
        img_h = 48;

    var zTreeObj;
// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
    var setting = {
        view: {
            //可以允许节点名称支持 HTML 内容
            nameIsHTML: true
        },
        callback: {
            //单击菜单节点之前的事件回调函数
            beforeClick: function (treeId, treeNode, clickFlag) {
                console.info("[ beforeClick ]:" + treeNode.name);
                return (treeNode.click != false);
            },
            //菜单节点被点击的事件回调函数
            onClick: function (event, treeId, treeNode, clickFlag) {
                _selfGraph.menuHanle(event, treeId, treeNode, clickFlag);
                return (treeNode.click != false);
            }
        }
    };
    //菜单数据
    var menuDefault = [
        {
            name: "默认菜单1",
            open: true,
            children: [
                {name: "默认菜单1的子节点1"},
                {name: "默认菜单1的子节点2"}
            ]
        },
        {
            name: "默认菜单2",
            open: true,
            children: [
                {name: "默认菜单2的子节点1"},
                {name: "默认菜单2的子节点2"}
            ]
        },
        {
            name: "没有子节点的默认菜单3"
        }
    ];
    var menuById = [
        {
            "menuName": "zNodes0",
            "type": "1",
            "menuData": [
                {
                    name: "001菜单1",
                    open: true,
                    children: [
                        {name: "001菜单1的子节点1"},
                        {name: "001菜单1的子节点2"}
                    ]
                },
                {
                    name: "001菜单2",
                    open: true,
                    children: [
                        {name: "001菜单2的子节点1"},
                        {name: "001菜单2的子节点2"}
                    ]
                },
                {
                    name: "001没有子节点的菜单2"
                }
            ]
        },
        {
            "menuName": "zNodes1",
            "type": "1",
            "menuData": [
                {
                    name: "002菜单1",
                    open: true,
                    children: [
                        {name: "002菜单1的子节点1"},
                        {name: "002菜单1的子节点2"}
                    ]
                }
            ]
        },
        {
            "menuName": "zNodes2",
            "type": "1",
            "menuData": [
                {
                    name: "003没有子节点的菜单1"
                }
            ]
        },
        {
            "menuName": "zNodes3",
            "type": "1",
            "menuData": [
                {
                    name: "004菜单1",
                    open: true,
                    children: [
                        {name: "004菜单1的子节点1"},
                        {name: "004菜单1的子节点2"}
                    ]
                },
                {
                    name: "004菜单2",
                    open: true,
                    children: [
                        {name: "004菜单2的子节点1"}
                    ]
                },
                {
                    name: "004没有子节点的菜单2"
                }
            ]
        },
        {
            "menuName": "zNodes4",
            "type": "1",
            "menuData": [
                {
                    name: "005菜单1",
                    open: true,
                    children: [
                        {name: "005菜单1的子节点1"}
                    ]
                },
                {
                    name: "005菜单2",
                    open: true,
                    children: [
                        {name: "005菜单2的子节点1"},
                        {name: "005菜单2的子节点2"}
                    ]
                },
                {
                    name: "005没有子节点的菜单2"
                }
            ]
        },
        {
            "menuName": "zNodes5",
            "type": "1",
            "menuData": [
                {
                    name: "006菜单1",
                    open: true,
                    children: [
                        {
                            name: "006菜单1的子节点1",
                            open: true,
                            children: [
                                {name: "006菜单1的子节点1的子节点1"},
                                {name: "006菜单1的子节点1的子节点2"}
                            ]
                        },
                        {name: "006菜单1的子节点2"}
                    ]
                }
            ]
        },
        {
            "menuName": "zNodes6",
            "type": "1",
            "menuData": [
                {
                    name: "007菜单1",
                    open: true,
                    children: [
                        {name: "007菜单1的子节点1"},
                        {name: "007菜单1的子节点2"}
                    ]
                }
            ]
        },
        {
            "menuName": "zNodes7",
            "type": "1",
            "menuData": [
                {
                    name: "008菜单1",
                    open: true,
                    children: [
                        {name: "008菜单1的子节点1"}
                    ]
                }
            ]
        },
        {
            "menuName": "zNodes8",
            "type": "1",
            "menuData": [
                {
                    name: "009菜单1",
                    open: true,
                    children: [
                        {name: "009菜单1的子节点1"},
                        {name: "009菜单1的子节点2"}
                    ]
                },
                {
                    name: "009菜单2",
                    open: true,
                    children: [
                        {name: "009菜单2的子节点1"},
                        {name: "009菜单2的子节点2"}
                    ]
                }
            ]
        },
        {
            "menuName": "zNodes9",
            "type": "1",
            "menuData": [
                {
                    name: "010菜单1",
                    open: true,
                    children: [
                        {name: "010菜单1的子节点1"},
                        {name: "010菜单1的子节点2"}
                    ]
                },
                {
                    name: "010菜单2",
                    open: true,
                    children: [
                        {name: "010菜单2的子节点1"}
                    ]
                }
            ]
        },
        {
            "menuName": "zNodes10",
            "type": "1",
            "menuData": [
                {
                    name: "011菜单1",
                    open: true,
                    children: [
                        {name: "011菜单1的子节点1"},
                        {name: "011菜单1的子节点2"}
                    ]
                },
                {
                    name: "011菜单2",
                    open: true,
                    children: [
                        {name: "011菜单2的子节点1"},
                        {name: "011菜单2的子节点2"}
                    ]
                },
                {
                    name: "011没有子节点的菜单2"
                }
            ]
        },
        {
            "menuName": "zNodes11",
            "type": "1",
            "menuData": [
                {
                    name: "012没有子节点的菜单1"
                }
            ]
        },
        {
            "menuName": "zNodes12",
            "type": "1",
            "menuData": [
                {
                    name: "013没有子节点的菜单1"
                }
            ]
        },
        {
            "menuName": "zNodes13",
            "type": "1",
            "menuData": [
                {
                    name: "014菜单1",
                    open: true,
                    children: [
                        {name: "014菜单1的子节点1"},
                        {name: "014菜单1的子节点2"}
                    ]
                }
            ]
        },
        {
            "menuName": "zNodes14",
            "type": "1",
            "menuData": [
                {
                    name: "015菜单1",
                    open: true,
                    children: [
                        {name: "015菜单1的子节点1"}
                    ]
                },
                {
                    name: "015菜单2",
                    open: true,
                    children: [
                        {name: "015菜单2的子节点1"},
                        {name: "015菜单2的子节点2"}
                    ]
                }
            ]
        }
    ];

    return {
        showList: function (groupid) {
            debugger
            _selfGraph = this;
            // var jsonInitUrl = "huangshijinTest.json";
            var jsonInitUrl = "/graph/getGraph?limitLevel=20&maxNode=50&detail=false&startNodeValue=" + groupid + "&startNodeType=groupid";
            _selfGraph.updateGraphURL(jsonInitUrl);
            $("#updateGraph").on("click", function () {
                _selfGraph.updateGraphURL('relation.json');
            });
            $("#addGraphNodes").on("click", function () {
                _selfGraph.addNodes();
            });
        },
        addNodes: function () {
            _selfGraph = this;
            var nodeStr1 = "{\n" +
                "      \"id\":\"011\",\n" +
                "      \"name\": \"反馈线索ccccc\",\n" +
                "      \"image\": \"images/xkdna.jpg\",\n" +
                "      \"type\": \"3\",\n" +
                "      \"depth\": 0\n" +
                "    }";
            var nodeStr2 =
                "{\n" +
                "      \"id\":\"011\",\n" +
                "      \"name\": \"反馈线索sssss\",\n" +
                "      \"image\": \"images/xkdna.jpg\",\n" +
                "      \"type\": \"3\",\n" +
                "      \"depth\": 0\n" +
                "    }";
            var linkStr1 = "\n" +
                "    {\n" +
                "      \"source\": 3,\n" +
                "      \"target\": 16,\n" +
                "      \"relation\": \"\"\n" +
                "    }";
            var linkStr2 = "\n" +
                "    {\n" +
                "      \"source\": 4,\n" +
                "      \"target\": 15,\n" +
                "      \"relation\": \"\"\n" +
                "    }";
            var node1 = JSON.parse(nodeStr1);
            var node2 = JSON.parse(nodeStr2);
            var link1 = JSON.parse(linkStr1);
            var nodeArray = new Array();
            nodeArray.push(node1);
            nodeArray.push(node2);
            var linkArray = new Array();
            linkArray.push(link1);
            _selfGraph.addNode(nodeArray, linkArray);
        },
        addNode: function (nodeArrays, linkArrays) {
            _selfGraph = this;
            var lenNodes = nodeArrays.length;
            var lenLinks = linkArrays.length;
            console.info(jsonContext)
            if (lenNodes > 0) {
                for (var i = 0; i < lenNodes; i = i + 5000) {
                    jsonContext.nodes.push.apply(jsonContext.nodes, nodeArrays.slice(i, Math.max(i + 5000, lenNodes)));
                }
            }
            if (lenLinks > 0) {
                for (var i = 0; i < lenLinks; i = i + 5000) {
                    jsonContext.edges.push.apply(jsonContext.edges, linkArrays.slice(i, Math.max(i + 5000, lenNodes)));
                }
            }
            _selfGraph.updateGraphJSON(jsonContext);
        },
        //根据链接更新
        updateGraphURL: function (jsonInitUrl) {
            _selfGraph = this;
            d3.json(jsonInitUrl, function (error, json) {
                debugger
                if (error) {
                    return console.log(error);
                }
                _selfGraph.updateGraphJSON(json);
            });
        },
        //根据json更新
        updateGraphJSON: function (json) {
            _selfGraph = this;
            debugger
            var edges_line, edges_text, node_img, node_text;
            var jsonContext = json;


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
            // .attr("preserveAspectRatio", "xMidYMid meet")
            // //自适应------- x:左上角横坐标，y:左上角纵坐标，width:宽度，height:高度
            // .attr("viewBox", "0 0 1200 900")
                .attr("width", width)
                .attr("height", height);

//箭头
            var marker =
                svg.append("marker")
                //.attr("id", function(d) { return d; })
                    .attr("id", "resolved")
                    //.attr("markerUnits","strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
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
                //释放其他节点
                // jsonContext.nodes.forEach(function (d, i) {
                //     d.fixed = false;
                // });
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
            edges_lineSVG.exit().remove();

            //连线上的字
            edges_text = edges_textSVG
                .enter()
                .append("text")
                .attr("class", "linetext")
                .text(function (d) {
                    return d.relation;
                });
            edges_textSVG.exit().remove();
            //绘制结点
            node_img = node_imgSVG
                .enter()
                .append("image")
                .attr("width", img_w)
                .attr("height", img_h)
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
                        if ($("#tooltip" + i).length <= 0) {
                            var tooltipDiv = "<div id='tooltip" + i + "' class='tooltip-box'><ul id='menuTree" + i + "' class='ztree deploy'></ul></div>";
                            $("body").append(tooltipDiv);
                        }
                        console.info(d);
                        console.info(i);
                        //获取节点id（专案组id，任务id，反馈id，案件id）  d.id
                        //根据id和type显示不同的菜单
                        var zNodes;
                        var menuByGroupType = [
                            {name: "<span class='groupHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='1'>专案组详情</span>"},
                            {name: "<span class='groupHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='2'>专案组成员</span>"},
                            {name: "<span class='groupHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='3'>任务下发</span>"}
                        ];
                        // var menuByTaskType = [
                        //     {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='1'>接收人反馈任务</span>"},
                        //     {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='2'>接收人移交任务</span>"},
                        //     {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='3'>接收人补充任务</span>"},
                        //     {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='4'>下发人催办任务</span>"}
                        // ];
                        var menuByTaskType = [];
                        if (d.type == "taskid") {
                            if (d.taskCreatorUserId == top.userId) {
                                //显示催办任务
                                var urge = {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='4'>下发人催办任务</span>"};
                                menuByTaskType.push(urge);
                            }


                            taskAjax.taskDetail({id: d.id, userId: top.userId}, function (r) {
                                $(document).on("contextmenu", function (e) {
                                    //DOM事件对象——d3.event
                                    e.preventDefault();
                                })

                                if (r.flag == 1) {
                                    var taskinfo = r.data;
                                    if (taskinfo.jsr == top.userId) {
                                        //显示反馈任务  移交任务  补充任务
                                        var feedback = {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='1'>接收人反馈任务</span>"};
                                        var transfer = {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='2'>接收人移交任务</span>"};
                                        var append_bc = {name: "<span class='taskHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='3'>接收人补充任务</span>"};
                                        menuByTaskType.push(feedback);
                                        menuByTaskType.push(transfer);
                                        menuByTaskType.push(append_bc);
                                    }
                                }
                            });
                        }
                        var menuByFeedbackType = [];
                        // if(d.type == "fkid" && 反馈的上一条任务的下发人 == top.userId){
                        //     var append_zj = {name: "<span class='feedbackHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='1'>下发人追加任务</span>"};
                        //     menuByFeedbackType.push(append_zj)
                        // }
                        var menuByCaseType = [{name: "<span class='caseHandle' infoattr='" + obj2str(d) + "' id='" + d.id + "' val='1'>查看案件详情</span>"}];
                        switch (d.type) {
                            case "groupid":
                                zNodes = menuByGroupType;
                                break;
                            case "taskid":
                                zNodes = menuByTaskType;
                                // //登录人是否是任务的创建人
                                // if(d.taskCreatorUserId == top.userId){
                                //     //菜单显示催办任务
                                // }
                                break;
                            case "fkid":
                                zNodes = menuByFeedbackType;
                                break;
                            case "ajid":
                                zNodes = menuByCaseType;
                                break;

                        }
                        // if (d.id) {
                        //     // 加载不同的树形菜单数据
                        //     // var zNodes = "zNodes" + i;
                        //     // zNodes = eval('(' + zNodes + ')');
                        //     zNodes = menuById[i].menuData;
                        // } else {
                        //     if (d.type) {
                        //         debugger
                        //         switch (d.type) {
                        //             case "1":
                        //                 zNodes = menuByType[1].menuData;
                        //                 break;
                        //             case "2":
                        //                 zNodes = menuByType[2].menuData;
                        //                 break;
                        //             case "3":
                        //                 zNodes = menuByType[3].menuData;
                        //                 break;
                        //             default:
                        //                 zNodes = menuDefault;
                        //         }
                        //     } else {
                        //         //加载同一个树形菜单数据
                        //         zNodes = menuDefault;
                        //     }
                        // }
                        zTreeObj = $.fn.zTree.init($("#menuTree" + i), setting, zNodes);

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
                                console.info("top");
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
                            console.info("top");
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
                // .html(html)
                .text(function (d) {
                    console.info(d.name);
                    var arr = [];
                    arr = d.name.split("@");
                    var name = arr[0];
                    var time = arr[1];
                    name = name ? name : "";
                    time = time ? time : "";

                    // return d.name.substring(0,9) + "...";
                    return name;
                });

            node_textSVG.exit().remove();

        },
        menuHanle: function (event, treeId, treeNode, clickFlag) {
            _selfGraph = this;
            var $target = $(event.currentTarget).find("#" + treeNode.tId).find("#" + treeNode.tId + "_span>span");
            var className = $target.attr("class");
            var id = $target.attr("id");
            var text = $target.text();
            var val = $target.attr("val");
            var infoattr = $target.attr("infoattr");
            switch (className) {
                case "groupHandle":
                    _selfGraph.groupHandle(id, val, infoattr);
                    break;
                case "taskHandle":
                    _selfGraph.taskHandle(id, val, infoattr);
                    break;
                case "feedbackHandle":
                    _selfGraph.feedbackHandle(id, val, infoattr);
                    break;
                case "caseHandle":
                    _selfGraph.caseHandle(id, val, infoattr);
                    break;
            }
        },
        groupHandle: function (id, val, infoattr) {
            _selfGraph = this;
            switch (val) {
                case "1":
                    _selfGraph.showGroupInfo(id, infoattr);
                    break;
                case "2":
                    _selfGraph.showGroupStaff(id, infoattr);
                    break;
                case "3":
                    _selfGraph.addTask(id, infoattr);
                    break;
            }
        },
        taskHandle: function (id, val, infoattr) {
            _selfGraph = this;
            switch (val) {
                case "1":
                    _selfGraph.feedbackTask(id);
                    break;
                case "2":
                    _selfGraph.transferTask(id);
                    break;
                case "3":
                    _selfGraph.addTaskHandle(id, "补充任务");
                    break;
                case "4":
                    _selfGraph.urgeTask(id);
                    break;
            }
        },
        feedbackHandle: function (id, val) {
            _selfGraph = this;
            switch (val) {
                case "1":
                    // _selfGraph.addTaskHandle(id,"追加任务");
                    break;
            }
        },
        caseHandle: function (id, val) {
            _selfGraph = this;
            switch (val) {
                case "1":
                    //查看案件详情
                    specialCaseGroup.showCaseInfo(id);
                    break;
            }
        },

        //查看专案组基本信息
        showGroupInfo: function (id, infoattr) {
            _selfGraph = this;
            var groupInfo;
            $.ajax({
                url: top.servicePath_xz + '/group/groupDetail/' + id,
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                success: function (r) {
                    if (r.data) {
                        groupInfo = r.data;
                        $("#top-mask", parent.document).height(0);
                        $open('#userListDiv', {width: 800, title: '&nbsp专案组基本信息'});
                        $("#top-mask", window.top).height(0);
                        var openerDiv = $("#userListDiv");
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
        //查看专案组成员
        showGroupStaff: function (id, infoattr) {
            _selfGraph = this;
            $.ajax({
                url: top.servicePath_xz + '/group/groupDetail/' + id,
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                success: function (r) {
                    if (r.data) {
                        var groupInfo = r.data;

                        $open('#userListDiv', {width: 800, title: '&nbsp查看专案组成员'});
                        var openerDiv = $("#userListDiv");
                        openerDiv.find(".panel-container").empty().html(_.template(groupStaffTpl));
                        $("#userListDiv").on('click', "#chooseUint", function () {
                            dictOpener.openUnitChoosePort($(this));
                        });
                        $("#userListDiv").on("click", "#resetBtn", function () {
                            selectUtils.clearQueryValue();
                            return false;
                        });
                        $("#userListDiv").on("click", "#queryBtn", function () {
                            specialCaseGroup.queryAddedStaffList(groupInfo);
                            return false;
                        });
                        //加载已添加的成员
                        specialCaseGroup.queryAddedStaffList(groupInfo);

                        //成员添加
                        $("#addStaff").on("click", function () {
                            $open('#userListDiv', {width: 800, title: '&nbsp用户列表'});
                            $("#userListDiv .panel-container").empty().html(_.template(userListTpl, {
                                checkboxMulti: true,
                                groupInfo: groupInfo
                            }));
                            $("#userListDiv").on('click', "#chooseUint", function () {
                                dictOpener.openUnitChoosePort($(this));
                            });
                            $("#userListDiv").on("click", "#resetBtn", function () {
                                selectUtils.clearQueryValue();
                                return false;
                            });
                            $("#userListDiv").on("click", "#queryBtn", function () {
                                specialCaseGroup.queryUserList(true, groupInfo);
                                return false;
                            });

                            //加载用户列表
                            specialCaseGroup.queryUserList(true, groupInfo);
                        });
                    }
                }
            });
        },
        addTask: function (id) {
            _selfGraph = this;
            var text = "";
            var bcrwid, fkid;
            $open('#userListDiv', {width: 800, title: '&nbsp下发任务'});
            var openerDiv = $("#userListDiv");
            openerDiv.find(".panel-container").empty().html(_.template(taskAddTpl, {text: text}));
            $("#fkjzTime").datetimepicker({format: 'YYYY-MM-DD', pickTime: false});

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
            $("#chooseReceive").on('click', function () {
                if ($("#groupid").val()) {
                    dictOpener.openChoosePort($(this), $post, top.servicePath_xz + '/usergroup/getUsergroupPage', {groupId: id,isInGroup: true,}, "user");
                } else {
                    toast("请先选择专案组！", 600).warn();
                }
            });
            //绑定返回事件
            $("#cancelBtn").on("click", function () {
                openerDiv.$close();
            });
            $("#saveBtn").on("click", function () {
                $('.task-valid').validatebox();
                if ($('.validatebox-invalid').length > 0) {
                    return false;
                }
                var param = $("#taskAddForm").serializeObject();
                var jsrParam = str2obj($("#jsr").attr("paramattr"));
                var groupParam = groupInfo;
                $.extend(param, {
                    creator: top.userId,
                    createname: top.trueName,
                    deparmentcode: top.orgCode,
                    deparmentname: top.orgName,
                    bcrwid: bcrwid ? bcrwid : "",
                    fkid: fkid ? fkid : "",
                    taskName: $.trim($("#taskName").val()),
                    groupid: groupParam.id,
                    jsr: jsrParam.userId,
                    jsrname: jsrParam.userName,
                    fqrLxfs: top.phone,
                    jsrLxfs: $.trim($("#jsrLxfs").val()),
                    taskContent: $.trim($("#taskContent").val()),
                    fkjzTime: $.trim($("#fkjzTime").val()),
                    createtime: $.trim($("#createtime").val())
                });
                taskAjax.addTask(param, function (r) {
                    if (r.flag == 1) {
                        toast('保存成功！', 600, function () {
                            openerDiv.$close();
                            _selfGraph.showList(id);
                        }).ok();
                    } else {
                        toast(r.msg, 600).err()
                    }
                });
            });

        },
        addTaskHandle: function (id, text) {
            _selfGraph = this;
            var bcrwid, fkid;
            taskAjax.taskDetail({id: id, userId: top.userId}, function (r) {
                if (r.flag == 1) {
                    var taskinfo = r.data;
                    if (taskinfo) {
                        bcrwid = taskinfo.bcrwid;
                        fkid = taskinfo.fkid;
                    }
                    $.ajax({
                        url: top.servicePath_xz + '/group/groupDetail/' + taskinfo.groupid,
                        type: "post",
                        contentType: "application/x-www-form-urlencoded",
                        success: function (r) {
                            if (r.data) {
                                var groupinfo = r.data;
                                $open('#userListDiv', {width: 800, title: '&nbsp' + text});
                                var openerDiv = $("#userListDiv");
                                openerDiv.find(".panel-container").empty().html(_.template(taskAddTpl, {
                                    taskInfo: taskinfo,
                                    text: text
                                }));
                                $("#fkjzTime").datetimepicker({format: 'YYYY-MM-DD', pickTime: false});

                                $("#chooseGroup").on('click', function () {
                                    dictOpener.openChoosePort($(this), null, null, {userId: top.userId});
                                });
                                $("#chooseReceive").on('click', function () {
                                    if ($("#groupid").val()) {
                                        var groupinfo = groupinfo;
                                        var taskinfo = taskinfo;
                                        dictOpener.openChoosePort($(this), $post, top.servicePath_xz + '/usergroup/getUsergroupPage', {groupId: text ? taskinfo.groupid : groupinfo.id,isInGroup: true,}, "user");
                                    } else {
                                        toast("请先选择专案组！", 600).warn();
                                    }
                                });
                                //绑定返回事件
                                $("#cancelBtn").on("click", function () {
                                    openerDiv.$close();
                                });
                                $("#saveBtn").on("click", function () {

                                    debugger;
                                    $('.task-valid').validatebox();
                                    if ($('.validatebox-invalid').length > 0) {
                                        return false;
                                    }
                                    var param = $("#taskAddForm").serializeObject();
                                    var jsrParam = str2obj($("#jsr").attr("paramattr"));
                                    var groupParam = groupinfo;
                                    var taskParam;
                                    //由追加任务 补充任务跳转过来
                                    if (text) {
                                        taskParam = taskinfo;
                                        debugger;
                                    }
                                    debugger;
                                    $.extend(param, {
                                        creator: top.userId,
                                        createname: top.trueName,
                                        deparmentcode: top.orgCode,
                                        deparmentname: top.orgName,
                                        bcrwid: bcrwid ? bcrwid : "",
                                        fkid: fkid ? fkid : "",
                                        taskName: $.trim($("#taskName").val()),
                                        groupid: text ? taskParam.groupid : groupParam.id,
                                        jsr: text ? taskParam.jsr : jsrParam.userId,
                                        jsrname: text ? taskParam.jsrname : jsrParam.userName,
                                        fqrLxfs: top.phone,
                                        jsrLxfs: $.trim($("#jsrLxfs").val()),
                                        taskContent: $.trim($("#taskContent").val()),
                                        fkjzTime: $.trim($("#fkjzTime").val()),
                                        createtime: $.trim($("#createtime").val())
                                    });
                                    taskAjax.addTask(param, function (r) {
                                        if (r.flag == 1) {
                                            toast('保存成功！', 600, function () {
                                                _selfGraph.showList();
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
        feedbackTask: function (id) {
            _selfGraph = this;
            taskAjax.taskDetail({id: id, userId: top.userId}, function (r) {
                if (r.flag == 1) {
                    $open('#userListDiv', {width: 800, title: '&nbsp反馈任务'});
                    $("#userListDiv .panel-container").empty().html(_.template(taskEditTpl, {
                        data: r.data,
                        isOperation: true
                    }));
                    var fileInfoArr = []; //传入后台参数的文件数组...
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
                            tpObj.fileMd5 = _self.getGuid();//图片对应fileMd5
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
                            tpObj.fileMd5 = _self.getGuid();
                            tpObj.fileName = file.name;
                            tpObj.fileSuffix = fileType.substr(fileType.indexOf('/') + 1);
                            tpObj.type = fileType.substr(fileType.indexOf('/') + 1);

                            filesArr.push(tpObj);
                        }
                        var picWrap = $('#pics-wrap');
                        //h5表单文件上传
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
                                        debugger
                                        //设置进度条
                                        // var $progressActive = $slide.find('.progress>span');
                                        //
                                        // $slide.find('.state').html('上传中...');
                                        // $slide.find('.progress').show();
                                        //
                                        // //添加css3动画
                                        // $progressActive.addClass('progress-bar-animate');

                                    },
                                    success: function (res) {
                                        debugger
                                        if (res.flag == 1) {
                                            debugger
                                            //上传成功后的操作
                                            item.responseName = res.data.source.substring(12);
                                            item.responseOldName = res.data.oldName;
                                            item.responsePath = res.data.source;
                                            if (filesArr) {
                                                $.each(filesArr, function (index, value) {
                                                    var item = {
                                                        fileName: value.responseName,
                                                        fileOldName: value.responseOldName,
                                                        filePath: value.responsePath,
                                                        fileSize: value.size,
                                                        fileType: value.type
                                                    }
                                                    fileInfoArr.push(item);
                                                });
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
                    });

                    $("#addImg").siblings("input[type='file']").val("");
                    $("#addImg").siblings("input[type='file']").off("change").on("change", function () {
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
                                $alert('单张图片大小超过10M， 上传速度将过慢，请压缩后重新上传');
                                break;
                            }
                            tpObj.fileMd5 = _self.getGuid();//图片对应fileMd5
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
                            tpObj.fileMd5 = _self.getGuid();
                            tpObj.fileName = file.name;
                            tpObj.fileSuffix = fileType.substr(fileType.indexOf('/') + 1);
                            tpObj.type = fileType.substr(fileType.indexOf('/') + 1);

                            filesArr.push(tpObj);
                        }
                        var picWrap = $('#pics-wrap');
                        //h5表单文件上传
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
                                        debugger
                                        //设置进度条
                                        // var $progressActive = $slide.find('.progress>span');
                                        //
                                        // $slide.find('.state').html('上传中...');
                                        // $slide.find('.progress').show();
                                        //
                                        // //添加css3动画
                                        // $progressActive.addClass('progress-bar-animate');

                                    },
                                    success: function (res) {
                                        debugger
                                        if (res.flag == 1) {
                                            debugger
                                            //上传成功后的操作
                                            item.responseName = res.data.source.substring(12);
                                            item.responseOldName = res.data.oldName;
                                            item.responsePath = res.data.source;
                                            if (filesArr) {
                                                $.each(filesArr, function (index, value) {
                                                    var item = {
                                                        fileName: value.responseName,
                                                        fileOldName: value.responseOldName,
                                                        filePath: value.responsePath,
                                                        fileSize: value.size,
                                                        fileType: value.type
                                                    }
                                                    fileInfoArr.push(item);
                                                });
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
                    });

                    $('.slick-list').slick({
                        dots: true
                    });

                    //反馈任务
                    $("#feedbackBtn").on("click", function () {
                        console.info(fileInfoArr);
                        task.saveFeedback(id, fileInfoArr);
                    });
                    $("#cancelBtn").on("click", function () {
                        $("#userListDiv").$close();
                    });
                }

            });
        },
        transferTask: function (id) {
            _selfGraph = this;
            taskAjax.taskDetail({id: id, userId: top.userId}, function (r) {
                if (r.flag == 1) {
                    $open('#userListDiv', {width: 800, title: '&nbsp用户列表'});
                    $("#userListDiv .panel-container").empty().html(_.template(userListTpl, {checkboxMulti: false}));
                    var taskInfo = r.data;
                    $("#userListDiv").on('click', "#chooseUint", function () {
                        dictOpener.openUnitChoosePort($(this));
                    });
                    $("#userListDiv").on("click", "#resetBtn", function () {
                        selectUtils.clearQueryValue();
                        return false;
                    });
                    $("#userListDiv").on("click", "#queryBtn", function () {
                        task.queryUserList(false, id, taskInfo);
                        return false;
                    });

                    //加载用户列表
                    task.queryUserList(false, id, taskInfo);
                }
            });
        },
        urgeTask: function (id) {
            _selfGraph = this;
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
        },
    }
});
