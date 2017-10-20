/**
 * Created by dell on 2017/9/22.
 */
importing('currentDate');
define([
    'underscore',
    'echarts',
    'text!/view/fstPage/tpl/fstPage.html',
    'text!/view/fstPage/tpl/todoList.html',
    'text!/view/fstPage/tpl/achievementList.html',
    'text!/view/fstPage/tpl/newsList.html',
    'text!/view/fstPage/tpl/messageList.html',
    'text!/view/fstPage/tpl/knowledgeList.html',
    'text!/view/fstPage/tpl/toolDownloadList.html',
    'text!/view/fstPage/tpl/areaSolveCaseList.html',
    'text!/view/fstPage/tpl/areaCreateCaseList.html',
    '../dat/fstPage.js'], function (_, ec, fstPageTpl,todoListTpl,achievementListTpl,newsListTpl,messageListTpl,knowledgeListTpl,toolDownloadListTpl,areaSolveCaseListTpl,areaCreateCaseListTpl,
                                    fstPageAjax) {
    return {
        showFstPage: function () {
            _self = this;
            $("#main-div").empty().html(_.template(fstPageTpl));
            //显示待办
            _self.showTodoList();

            //显示平台成果
            _self.showAchievementsList();
            //平台成果点击更多
            $('#achievementDiv .more-link').on('click', function () {
                var htmlPage = 'fstPage/achievementMoreList.html';
                _self.clcikMore(this,htmlPage);
            });

            //显示通知公告
            _self.showNewsList();
            //通知公告点击更多
            $('#newsDiv .more-link').on('click', function () {
                var htmlPage = 'fstPage/newsMoreList.html';
                _self.clcikMore(this,htmlPage);
            });

            //显示信息提醒
            _self.showMessageList();
            //信息提醒点击更多
            $('#messageDiv .more-link').on('click', function () {
                var htmlPage = 'fstPage/messageMoreList.html';
                _self.clcikMore(this,htmlPage);
            });

            //显示知识库
            _self.showKnowledgeList();
            //知识库点击更多
            $('#knowledgeDiv .more-link').on('click', function () {
                var htmlPage = 'fstPage/knowledgeMoreList.html';
                _self.clcikMore(this,htmlPage);
            });

            //显示系统工具下载
            _self.showToolDownloadList();
            //系统工具下载点击更多
            $('#toolDownloadDiv .more-link').on('click', function () {
                var htmlPage = 'fstPage/toolDownloadMoreList.html';
                _self.clcikMore(this,htmlPage);
            });

            //显示各区域专案组破案情况
            _self.showAreaSolveCaseList();

            //显示各区域专案组创建情况
            _self.showAreaCreateCaseList();
        },
        showTodoList:function () {
            _self = this;
            var todoData = {
                "feedback":{
                    "number":1
                },
                "received":{
                    "number":3
                },
                "delay":{
                    "number":1
                }
            };
            $("#todoDiv").empty().html(_.template(todoListTpl, {data: todoData}));
        },
        showAchievementsList:function () {
            _self = this;
            var achievementData = {
                "code":0,
                "data":[
                    {
                        "createDate":"2017-09-08 11:42:11",
                        "id":"58A65CB316DFA592E050007F01003F1B",
                        "msgContent":"谢斌杀人系列案告破",
                        "msgTitle":"谢斌杀人系列案告破",
                        "rownum":"1"
                    },
                    {
                        "createDate":"2017-09-08 11:30:39",
                        "id":"58A5F3833C5EB497E050007F01005030",
                        "msgContent":"某某被入室盗窃系列案",
                        "msgTitle":"某某被入室盗窃系列案",
                        "rownum":"2"
                    },
                    {
                        "createDate":"2017-09-07 11:58:30",
                        "id":"7E102EB13BCB4103B7748F819F7DBA17",
                        "msgContent":"李四杀人案告破",
                        "msgTitle":"李四杀人案告破",
                        "rownum":"3"
                    },
                    {
                        "createDate":"2017-09-07 11:42:28",
                        "id":"B1EEE28663F742EC8F106DDAB57ED578",
                        "msgContent":"王五被绑架案告破",
                        "msgTitle":"王五被绑架案告破",
                        "rownum":"4"
                    },
                    {
                        "createDate":"2017-09-07 11:05:30",
                        "id":"53A8D6BF5A6C486D8BC72F2751A51A53",
                        "msgContent":"广州某某公司被入室盗窃案告破",
                        "msgTitle":"广州某某公司被入室盗窃案告破",
                        "rownum":"5"
                    },
                    {
                        "createDate":"2017-09-07 10:43:02",
                        "id":"9D5632A8E72E459B80879033DC9BC53A",
                        "msgContent":"广州某某小孩被拐案件告破",
                        "msgTitle":"广州某某小孩被拐案件告破",
                        "rownum":"6"
                    }
                ],
                "flag":1,
                "totalCount":6
            };
            $("#achievementDiv").empty().html(_.template(achievementListTpl, {data: achievementData.data}));
        },
        showNewsList:function () {
            _self = this;
            var newsData = {
                "code":0,
                "data":[
                    {
                        "createDate":"2017-09-08 11:42:11",
                        "id":"C11607D4E132424B80ACD5F83BA8458B",
                        "msgContent":"2017年11月3日系统更新，本...",
                        "msgTitle":"2017年11月3日系统更新，本...",
                        "rownum":"1"
                    },
                    {
                        "createDate":"2017-09-08 11:30:39",
                        "id":"3AD948322B064223AD70169F4F1CFF7E",
                        "msgContent":"2017年11月3日系统更新",
                        "msgTitle":"2017年11月3日系统更新",
                        "rownum":"2"
                    },
                    {
                        "createDate":"2017-09-07 11:58:30",
                        "id":"9D263D9CB95E4482B96166F50995C779",
                        "msgContent":"关于平台使用操作的通知",
                        "msgTitle":"关于平台使用操作的通知",
                        "rownum":"3"
                    },
                    {
                        "createDate":"2017-09-07 11:42:28",
                        "id":"FC7114D4977044539129A4C34716EBDB",
                        "msgContent":"平台新功能上线说明书",
                        "msgTitle":"平台新功能上线说明书",
                        "rownum":"4"
                    },
                    {
                        "createDate":"2017-09-07 11:05:30",
                        "id":"53A8D6BF5A6C486D8BC72F2751A51A53",
                        "msgContent":"省公安厅专题部署开展打击突出刑事犯罪“飓风2017”专项行动",
                        "msgTitle":"省公安厅专题部署开展打击突出刑事犯罪“飓风2017”专项行动",
                        "rownum":"5"
                    },
                    {
                        "createDate":"2017-09-07 10:43:02",
                        "id":"9D5632A8E72E459B80879033DC9BC53A",
                        "msgContent":"广东省公安厅2016年部门决算公开情况说明",
                        "msgTitle":"广东省公安厅2016年部门决算公开情况说明",
                        "rownum":"6"
                    }
                ],
                "flag":1,
                "totalCount":6
            };
            $("#newsDiv").empty().html(_.template(newsListTpl, {data: newsData.data}));
        },
        showMessageList:function () {
            _self = this;
            var messageData = {
                "code":0,
                "data":[
                    {
                        "createDate":"2017-09-08 11:42:11",
                        "id":"C11607D4E132424B80ACD5F83BA8458B",
                        "msgContent":"新案件：您所在“张三被枪杀专案组”关联了",
                        "msgTitle":"新案件：您所在“张三被枪杀专案组”关联了",
                        "rownum":"1"
                    },
                    {
                        "createDate":"2017-09-08 11:30:39",
                        "id":"3AD948322B064223AD70169F4F1CFF7E",
                        "msgContent":"新专案组：您已被添加到张三被枪杀专案组",
                        "msgTitle":"新专案组：您已被添加到张三被枪杀专案组",
                        "rownum":"2"
                    },
                    {
                        "createDate":"2017-09-07 11:58:30",
                        "id":"9D263D9CB95E4482B96166F50995C779",
                        "msgContent":"催办：八两金催促您尽快办理“人口拐卖专...",
                        "msgTitle":"催办：八两金催促您尽快办理“人口拐卖专...",
                        "rownum":"3"
                    },
                    {
                        "createDate":"2017-09-07 11:42:28",
                        "id":"FC7114D4977044539129A4C34716EBDB",
                        "msgContent":"移交：“人口拐卖专案组”中你下发的“周边...",
                        "msgTitle":"移交：“人口拐卖专案组”中你下发的“周边...",
                        "rownum":"4"
                    },
                    {
                        "createDate":"2017-09-07 11:05:30",
                        "id":"53A8D6BF5A6C486D8BC72F2751A51A53",
                        "msgContent":"移交：“人口拐卖专案组”中你下发的“周边...",
                        "msgTitle":"移交：“人口拐卖专案组”中你下发的“周边...",
                        "rownum":"5"
                    }
                ],
                "flag":1,
                "totalCount":6
            };
            $("#messageDiv").empty().html(_.template(messageListTpl, {data: messageData.data}));
        },
        showKnowledgeList:function () {
            _self = this;
            var knowledgeData = {
                "code":0,
                "data":[
                    {
                        "createDate":"2017-09-08 11:42:11",
                        "id":"C11607D4E132424B80ACD5F83BA8458B",
                        "msgContent":"从误划生熟谈侦查思维.",
                        "msgTitle":"从误划生熟谈侦查思维",
                        "rownum":"1"
                    },
                    {
                        "createDate":"2017-09-08 11:30:39",
                        "id":"3AD948322B064223AD70169F4F1CFF7E",
                        "msgContent":"经济犯罪案件侦查的组...",
                        "msgTitle":"经济犯罪案件侦查的组...",
                        "rownum":"2"
                    },
                    {
                        "createDate":"2017-09-07 11:58:30",
                        "id":"9D263D9CB95E4482B96166F50995C779",
                        "msgContent":"被害人权利的逻辑起点",
                        "msgTitle":"被害人权利的逻辑起点",
                        "rownum":"3"
                    },
                    {
                        "createDate":"2017-09-07 11:42:28",
                        "id":"FC7114D4977044539129A4C34716EBDB",
                        "msgContent":"从“疑罪从无”谈测谎技...",
                        "msgTitle":"从“疑罪从无”谈测谎技...",
                        "rownum":"4"
                    },
                    {
                        "createDate":"2017-09-07 11:05:30",
                        "id":"53A8D6BF5A6C486D8BC72F2751A51A53",
                        "msgContent":"从侦查公诉审判的目的...",
                        "msgTitle":"从侦查公诉审判的目的...",
                        "rownum":"5"
                    }
                ],
                "flag":1,
                "totalCount":6
            };
            $("#knowledgeDiv").empty().html(_.template(knowledgeListTpl, {data: knowledgeData.data}));
        },
        showToolDownloadList:function () {
            _self = this;
            var toolDownloadData = {
                "code":0,
                "data":[
                    {
                        "createDate":"2017-09-08 11:42:11",
                        "id":"C11607D4E132424B80ACD5F83BA8458B",
                        "msgContent":"相关控件下载",
                        "msgTitle":"相关控件下载",
                        "fileType":".pdf",
                        "rownum":"1"
                    },
                    {
                        "createDate":"2017-09-08 11:30:39",
                        "id":"3AD948322B064223AD70169F4F1CFF7E",
                        "msgContent":"系统操作手册",
                        "msgTitle":"系统操作手册",
                        "fileType":".doc",
                        "rownum":"2"
                    },
                    {
                        "createDate":"2017-09-07 11:58:30",
                        "id":"9D263D9CB95E4482B96166F50995C779",
                        "msgContent":"平台APP下载",
                        "msgTitle":"平台APP下载",
                        "fileType":".jpg",
                        "rownum":"3"
                    },
                    {
                        "createDate":"2017-09-07 11:58:30",
                        "id":"9D263D9CB95E4482B96166F50995C779",
                        "msgContent":"平台APP下载",
                        "msgTitle":"平台APP下载",
                        "fileType":"未知类型",
                        "rownum":"4"
                    }
                ],
                "flag":1,
                "totalCount":3
            };
            $("#toolDownloadDiv").empty().html(_.template(toolDownloadListTpl, {data: toolDownloadData.data}));
        },
        showAreaSolveCaseList:function () {
            _self = this;
            $("#areaSolveCaseDiv").empty().html(_.template(areaSolveCaseListTpl));

            var areaSolveCaseData = {
                "code":0,
                "data":[
                    {
                        "createDate":"2017-09-08 11:42:11",
                        "id":"C11607D4E132424B80ACD5F83BA8458B",
                        "area":"天河区",
                        "caseNum":10,
                        "rownum":"1"
                    },
                    {
                        "createDate":"2017-09-08 11:30:39",
                        "id":"3AD948322B064223AD70169F4F1CFF7E",
                        "area":"荔湾区",
                        "caseNum":12,
                        "rownum":"2"
                    },
                    {
                        "createDate":"2017-09-07 11:58:30",
                        "id":"9D263D9CB95E4482B96166F50995C779",
                        "area":"番禺区",
                        "caseNum":4,
                        "rownum":"3"
                    },
                    {
                        "createDate":"2017-09-07 11:42:28",
                        "id":"FC7114D4977044539129A4C34716EBDB",
                        "area":"海珠区",
                        "caseNum":12,
                        "rownum":"4"
                    },
                    {
                        "createDate":"2017-09-07 11:05:30",
                        "id":"53A8D6BF5A6C486D8BC72F2751A51A53",
                        "area":"萝岗区",
                        "caseNum":3,
                        "rownum":"5"
                    },
                    {
                        "createDate":"2017-09-07 10:43:02",
                        "id":"9D5632A8E72E459B80879033DC9BC53A",
                        "area":"白云区",
                        "caseNum":5,
                        "rownum":"6"
                    }
                ],
                "flag":1,
                "totalCount":6
            };
            var myChart = ec.init(byid('kaizhiqkT'));
            var colors = ['#22A0E2', '#3BC087', '#FFA700', '#20B7B0','#EB6854', '#A78CF1', '#289358','#FF9016','#CF5748', '#5AC7AD', '#F88764', '#578ABE'];
            var option = {
                color: colors,
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}"
                },
                grid: { // 控制图的大小，调整下面这些值就可以，
                    x: 100,
                    x2: 20
                },
                legend: {
                    data: ['数量']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        //设置字体倾斜
                        axisLabel: {
                            interval: 0,
                            rotate: 30,//倾斜度 -90 至 90 默认为0
                            margin: 2,
                            textStyle: {
                                color: "#878480"
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        barWidth: 20,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        name: "数量",
                        data: []
                    }
                ]
            };
            // 为echarts对象加载数据
            var name = [];
            var value = [];
            for (var i = 0, len = areaSolveCaseData.data.length; i < len; i++) {
                name[i] = areaSolveCaseData.data[i].area;
                value[i] = areaSolveCaseData.data[i].caseNum;
            }
            option.xAxis[0].data = name;
            option.series[0].data = value;
            myChart.clear();
            myChart.hideLoading();
            myChart.setOption(option);

            //切换月度，季度，年度
            $("#expenseQuest").on("click", "li", function () {
                $(this).addClass("active").siblings(".active").removeClass("active");
                if ($(this).index() == 0) {
                    option.color = [colors[0]];
                    option.xAxis[0].data = name;
                    option.series[0].data = value;
                    myChart.clear();
                    myChart.hideLoading();
                    myChart.setOption(option);
                } else if ($(this).index() == 1) {
                    option.color = [colors[6]];
                    option.xAxis[0].data = name;
                    option.series[0].data = value;
                    myChart.clear();
                    myChart.hideLoading();
                    myChart.setOption(option);
                } else {
                    option.color = [colors[8]];
                    option.xAxis[0].data = name;
                    option.series[0].data = value;
                    myChart.clear();
                    myChart.hideLoading();
                    myChart.setOption(option);
                }
            });
        },
        showAreaCreateCaseList:function () {
            _self = this;
            $("#areaCreateCaseDiv").empty().html(_.template(areaCreateCaseListTpl));
            var areaCreateCaseData = {
                "code":0,
                "data":[
                    {
                        "createDate":"2017-09-08 11:42:11",
                        "id":"C11607D4E132424B80ACD5F83BA8458B",
                        "area":"天河区",
                        "caseNum":3,
                        "rownum":"1"
                    },
                    {
                        "createDate":"2017-09-08 11:30:39",
                        "id":"3AD948322B064223AD70169F4F1CFF7E",
                        "area":"荔湾区",
                        "caseNum":8,
                        "rownum":"2"
                    },
                    {
                        "createDate":"2017-09-07 11:58:30",
                        "id":"9D263D9CB95E4482B96166F50995C779",
                        "area":"番禺区",
                        "caseNum":4,
                        "rownum":"3"
                    },
                    {
                        "createDate":"2017-09-07 11:42:28",
                        "id":"FC7114D4977044539129A4C34716EBDB",
                        "area":"海珠区",
                        "caseNum":12,
                        "rownum":"4"
                    },
                    {
                        "createDate":"2017-09-07 11:05:30",
                        "id":"53A8D6BF5A6C486D8BC72F2751A51A53",
                        "area":"萝岗区",
                        "caseNum":6,
                        "rownum":"5"
                    },
                    {
                        "createDate":"2017-09-07 10:43:02",
                        "id":"9D5632A8E72E459B80879033DC9BC53A",
                        "area":"白云区",
                        "caseNum":5,
                        "rownum":"6"
                    }
                ],
                "flag":1,
                "totalCount":6
            };

            var myChart = ec.init(byid('wupinqkT'));
            var colors = ['#22A0E2', '#3BC087', '#FFA700', '#20B7B0','#EB6854', '#A78CF1', '#289358','#FF9016','#CF5748', '#5AC7AD', '#F88764', '#578ABE'];
            var option = {
                color: [colors[7]],
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }

                },
                tooltip: {
                    trigger: 'axis',
                    formatter: "{a} <br/>{b} : {c}"
                },
                legend: {
                    data: ['数量']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        //设置字体倾斜
                        axisLabel: {
                            interval: 0,
                            rotate: 40,//倾斜度 -90 至 90 默认为0
                            margin: 2,
                            textStyle: {
                                color: "#878480"
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        "name": "数量",
                        "type": "bar",
                        "barWidth": 20,
                        "data": []
                    }
                ]
            };
            // 为echarts对象加载数据
            var name = [];
            var value = [];
            for (var i = 0, len = areaCreateCaseData.data.length; i < len; i++) {
                name[i] = areaCreateCaseData.data[i].area;
                value[i] = areaCreateCaseData.data[i].caseNum;
            }
            option.xAxis[0].data = name;
            option.series[0].data = value;
            myChart.clear();
            myChart.hideLoading();
            myChart.setOption(option);

            //切换月度，季度，年度
            $("#goodsQuest").on("click", "li", function () {
                $(this).addClass("active").siblings(".active").removeClass("active");
                if ($(this).index() == 0) {
                    option.color = [colors[7]];
                    option.xAxis[0].data = name;
                    option.series[0].data = value;
                    myChart.clear();
                    myChart.hideLoading();
                    myChart.setOption(option);
                } else if ($(this).index() == 1) {
                    option.color = [colors[5]];
                    option.xAxis[0].data = name;
                    option.series[0].data = value;
                    myChart.clear();
                    myChart.hideLoading();
                    myChart.setOption(option);
                } else {
                    option.color = [colors[9]];
                    option.xAxis[0].data = name;
                    option.series[0].data = value;
                    myChart.clear();
                    myChart.hideLoading();
                    myChart.setOption(option);
                }
            });
        },

        clcikMore: function (element,htmlPage) {
            _self = this;
            var tabTitle = $(element).prev().text();
            //如果已经打开过,并且没有被关闭清除, 那就直接选中现在这个
            if (typeof window.msgTab == 'object' && window.msgTab.children().length > 0) {
                $openOnce(getViewPath(htmlPage), tabTitle)
            } else {
                window.msgTab = $open(getViewPath(htmlPage), tabTitle);
            }
        }

    }
});
