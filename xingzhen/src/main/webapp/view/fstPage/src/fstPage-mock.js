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
    'text!/view/fstPage/tpl/knowledgeOne.html',
    'text!/view/fstPage/tpl/toolDownloadList.html',
    'text!/view/fstPage/tpl/areaSolveCaseList.html',
    'text!/view/fstPage/tpl/areaCreateCaseList.html',
    '../dat/fstPage.js'], function (_, ec, fstPageTpl,todoListTpl,achievementListTpl,newsListTpl,messageListTpl,knowledgeListTpl,knowledgeOneTpl,toolDownloadListTpl,areaSolveCaseListTpl,areaCreateCaseListTpl,
                                    fstPageAjax) {
    return {
        showFstPage: function () {
            _self = this;
            $("#main-div").empty().html(_.template(fstPageTpl));
            //显示待办
            _self.showTodoList();

            //显示平台成果
            _self.showAchievementsList();
            //显示通知公告
            _self.showNewsList();
            //显示信息提醒
            _self.showMessageList();

            //显示知识库
            _self.showKnowledgeList();

            //显示系统工具下载
            _self.showToolDownloadList();

            //显示各区域专案组破案情况
            _self.showAreaSolveCaseList();

            //显示各区域专案组创建情况
            _self.showAreaCreateCaseList();

            _self.newsOne();//点击通知公告每列
            _self.messageOne();//点击信息提醒每列
            _self.knowledgeOne();//点击知识库每列
        },

        showTodoList:function () {//待办任务
            _self = this;
            fstPageAjax.getTaskCountInfo({userId:top.userId},function(r){
                if(r.flag==1){
                    $("#todoDiv").empty().html(_.template(todoListTpl, {data: r.data}));
                    //点击切换 反馈待确认
                    $(".list-todo#feedback").on("click", function () {
                        var modelNo = $(this).attr("modelNo");
                        var en = $(this).attr("en");
                        var status = $(this).attr("status");
                        var fkqrzt = $(this).attr("fkqrzt");
                        $('#root-menu', window.parent.document).find('li').each(function (i, item) {
                            if (modelNo == $(item).attr("page-no")) {
                                $($(item).find("a")[0]).attr('en', en);
                                $($(item).find("a")[0]).attr('status', status);
                                $($(item).find("a")[0]).attr('fkqrzt', fkqrzt);
                                $($(item).find("a")[0]).attr('taskType', "");
                                $($(item).find("a")[0]).attr('overdue', "");
                                $(item).parent().parent().find('a')[0].click();
                                $(item).find("a")[0].click();
                            }
                        });
                    });
                    //点击切换 待接收
                    $(".list-todo#received").on("click", function () {
                        var modelNo = $(this).attr("modelNo");
                        var en = $(this).attr("en");
                        var status = $(this).attr("status");
                        var taskType = $(this).attr("taskType");
                        $('#root-menu', window.parent.document).find('li').each(function (i, item) {
                            if (modelNo == $(item).attr("page-no")) {
                                $($(item).find("a")[0]).attr('en', en);
                                $($(item).find("a")[0]).attr('status', status);
                                $($(item).find("a")[0]).attr('fkqrzt', "");
                                $($(item).find("a")[0]).attr('taskType', taskType);
                                $($(item).find("a")[0]).attr('overdue', "");
                                $(item).parent().parent().find('a')[0].click();
                                $(item).find("a")[0].click();
                            }
                        });
                    });
                    //点击切换 超期未处理
                    $(".list-todo#delay").on("click", function () {
                        var modelNo = $(this).attr("modelNo");
                        var en = $(this).attr("en");
                        var status = $(this).attr("status");
                        var overdue = $(this).attr("overdue");
                        $('#root-menu', window.parent.document).find('li').each(function (i, item) {
                            if (modelNo == $(item).attr("page-no")) {
                                $($(item).find("a")[0]).attr('en', en);
                                $($(item).find("a")[0]).attr('status', status);
                                $($(item).find("a")[0]).attr('fkqrzt', "");
                                $($(item).find("a")[0]).attr('taskType', "");
                                $($(item).find("a")[0]).attr('overdue', overdue);
                                $(item).parent().parent().find('a')[0].click();
                                $(item).find("a")[0].click();
                            }
                        });
                    });
                }else{
                    toast(r.msg,600).err();
                }
            });
            //var todoData = {
            //    "feedback":{
            //        "number":1
            //    },
            //    "received":{
            //        "number":3
            //    },
            //    "delay":{
            //        "number":1
            //    }
            //};
        },

        showAchievementsList:function () {//平台成果展示
            _self = this;
            fstPageAjax.getAchievement({end:8},function(r){
                if(r.flag==1){
                    $("#achieveDiv").empty().html(_.template(achievementListTpl, {data: r.data}));
                    if(r.data && r.data.length<=0){
                        $("#achieveContent").empty().html("<img src='../../../img/no-data-table.png' class='standMiddle'>");
                    }
                    //平台成果点击更多
                    $('#achieveDiv .more-link').on('click', function () {
                        var htmlPage = 'fstPage/achievementMoreList.html';
                        _self.clcikMore(this,htmlPage);
                    });
                    //平台成果展示点击每列
                    $("#achieveContent").on("click", "a.listOne", function (e) {
                        e.preventDefault();
                        var groupId=$(this).attr("data-groupid");
                        var htmlPage = 'fstPage/achievementMoreList.html';
                        //如果已经打开过,并且没有被关闭清除, 那就直接选中现在这个
                        var tabTitle='<em id="newsTitle" data-id="' + groupId + '">平台成果展示</em>';
                        if (typeof window.msgTab == 'object' && window.msgTab.children().length > 0) {
                            //$openOnce(getViewPath(htmlPage), tabTitle)
                            window.msgTab = $open(getViewPath(htmlPage), tabTitle);
                        } else {
                            window.msgTab = $open(getViewPath(htmlPage), tabTitle);
                        }
                    })
                }else{
                    toast(r.msg,600).err();
                }
            });
        },
        getAjGroupPage:function(groupId){//平台成果展示(点击每列--涉及案件)
            _self=this;
            fstPageAjax.getAjGroupPage({groupId:groupId},function(r){
                if(r.flag==1){
                    $("#caseTable tbody").empty().html(_.template(achievementInfoAjTrTpl,{data: r.data}));
                }else{
                    toast(r.msg,600).err();
                }
            });
        },
        getGroupMemberList:function(groupId){//平台成果展示(点击每列--获取所有组内成员)
            _self=this;
            $.ajax({
                url:top.servicePath_xz+'/usergroup/getGroupMemberList',
                type:"post",
                contentType: "application/x-www-form-urlencoded",
                data:{groupId:groupId},
                success:function(r){
                    if(r.flag==1){
                        $("#staffTable tbody").empty().html(_.template(achievementInfoGroupMemberTrTpl,{data: r.data}));
                        $("#staffTableChild").empty().html(_.template(achievementInfoGroupMemberChildTrTpl,{data: r.data}));
                    }else{
                        toast(r.msg,600).err();
                    }
                }
            });
        },
        showNewsList:function () {//通知公告
            _self = this;
            fstPageAjax.findRePage({type: 1, receiverId: top.userName, end: 8}, function (r) {//通知公告
                if (r.flag == 1) {
                    $("#newsDiv").empty().html(_.template(newsListTpl, {data: r.data}));
                    if(r.data && r.data.length<=0){
                        $("#newsContent").empty().html("<img src='../../../img/no-data-table.png' class='standMiddle'>");
                    }
                    //通知公告点击更多
                    $('#newsDiv .more-link').on('click', function () {
                        //如果已经打开过,并且没有被关闭清除, 那就直接选中现在这个
                        if (typeof window.msgTab == 'object' && window.msgTab.children().length > 0) {
                            var html = '<em id="newsTitle">通知公告</em>';
                            window.msgTab = $openOnce(getViewPath('fstPage/newsMoreList.html'), html);
                        } else {
                            var html = '<em id="newsTitle">通知公告</em>';
                            window.msgTab = $open(getViewPath('fstPage/newsMoreList.html'), html);
                        }
                    });
                }else{
                    toast(r.msg,600).err();
                }
            });
            //fstPageAjax.findRePage({},function(r){
            //    if(r.flag==1){
            //        $("#newsDiv").empty().html(_.template(newsListTpl, {data: r.data}));
            //        if(r.data && r.data.length<=0){
            //            $("#newsContent").empty().html("<img src='../../../img/no-data-table.png' class='standMiddle'>");
            //        }
            //        //通知公告点击更多
            //        $('#newsDiv .more-link').on('click', function () {
            //            var htmlPage = 'fstPage/messageMoreList.html';
            //            _self.clcikMore(this,htmlPage);
            //        });
            //    }else{
            //        toast(r.msg,600).err();
            //    }
            //});
        },
        showMessageList:function () {//信息提醒
            _self = this;
            fstPageAjax.findReceivePage({receiverId: top.userId,receiverType:3, end: 5, msgState: "1"}, function (r) {//1是未读
                debugger
                if (r.flag == 1) {
                    $("#messageDiv").empty().html(_.template(messageListTpl,{data:r.data}));
                    if(r.data && r.data.length<=0){
                        $("#messageContent").empty().html("<img src='../../../img/no-data-table.png' class='standMiddle'>");
                    }
                    $('#messageMore').on('click', function () {
                        //如果已经打开过,并且没有被关闭清除, 那就直接选中现在这个
                        if (typeof window.msgTab == 'object' && window.msgTab.children().length > 0) {
                            var html = '<em id="noticeTitle">信息提醒</em>';
                            $openOnce(getViewPath('fstPage/messageMoreList.html'), html)
                        } else {
                            var html = '<em id="noticeTitle">信息提醒</em>';
                            window.msgTab = $open(getViewPath('fstPage/messageMoreList.html'), html);
                        }
                    })
                }else{
                    toast(r.msg,600).err();
                }
            });
            //var messageData = {
            //    "code":0,
            //    "data":[
            //        {
            //            "createDate":"2017-09-08 11:42:11",
            //            "id":"C11607D4E132424B80ACD5F83BA8458B",
            //            "msgContent":"新案件：您所在“张三被枪杀专案组”关联了",
            //            "msgTitle":"新案件：您所在“张三被枪杀专案组”关联了",
            //            "rownum":"1"
            //        },
            //        {
            //            "createDate":"2017-09-08 11:30:39",
            //            "id":"3AD948322B064223AD70169F4F1CFF7E",
            //            "msgContent":"新专案组：您已被添加到张三被枪杀专案组",
            //            "msgTitle":"新专案组：您已被添加到张三被枪杀专案组",
            //            "rownum":"2"
            //        },
            //        {
            //            "createDate":"2017-09-07 11:58:30",
            //            "id":"9D263D9CB95E4482B96166F50995C779",
            //            "msgContent":"催办：八两金催促您尽快办理“人口拐卖专...",
            //            "msgTitle":"催办：八两金催促您尽快办理“人口拐卖专...",
            //            "rownum":"3"
            //        },
            //        {
            //            "createDate":"2017-09-07 11:42:28",
            //            "id":"FC7114D4977044539129A4C34716EBDB",
            //            "msgContent":"移交：“人口拐卖专案组”中你下发的“周边...",
            //            "msgTitle":"移交：“人口拐卖专案组”中你下发的“周边...",
            //            "rownum":"4"
            //        },
            //        {
            //            "createDate":"2017-09-07 11:05:30",
            //            "id":"53A8D6BF5A6C486D8BC72F2751A51A53",
            //            "msgContent":"广播：“人口拐卖专案组”中你下发的“周边...",
            //            "msgTitle":"广播：“人口拐卖专案组”的李狗蛋广播了...",
            //            "rownum":"5"
            //        }
            //    ],
            //    "flag":1,
            //    "totalCount":6
            //};
            //$("#messageDiv").empty().html(_.template(messageListTpl, {data: messageData.data}));
        },
        //点击通知公告每列
        newsOne: function () {
            _self = this;
            $("#newsDiv").on("click", "a.new-column", function (e) {
                e.preventDefault();
                var id = $(this).attr("data-id");
                var type = $(this).attr("msg-type");
                //如果已经打开过,并且没有被关闭清除, 那就直接选中现在这个
                if (typeof window.msgTab == 'object' && window.msgTab.children().length > 0) {
                    window.msgTab.$close();
                    var html = '<em id="newsTitle" data-id="' + id + '" msg-type="' + type + '">通知公告</em>';
                    window.msgTab = $open(getViewPath('fstPage/newsMoreList.html'), html);
                } else {
                    var html = '<em id="newsTitle" data-id="' + id + '" msg-type="' + type + '">通知公告</em>';
                    window.msgTab = $open(getViewPath('fstPage/newsMoreList.html'), html);
                }
            });
        },
        //点击信息提醒每列
        messageOne: function () {
            _self = this;
            $("#messageDiv").on("click", "a.new-column", function (e) {
                e.preventDefault();
                var id = $(this).attr("data-id");
                var type = $(this).attr("msg-type");

                //如果已经打开过,并且没有被关闭清除, 那就直接选中现在这个
                if (typeof window.msgTab == 'object' && window.msgTab.children().length > 0) {
                    window.msgTab.$close();
                    var html = '<em id="newsTitle" data-id="' + id + '" msg-type="' + type + '">信息提醒</em>';
                    window.msgTab = $open(getViewPath('fstPage/messageMoreList.html'), html);
                } else {
                    var html = '<em id="newsTitle" data-id="' + id + '" msg-type="' + type + '">信息提醒</em>';
                    window.msgTab = $open(getViewPath('fstPage/messageMoreList.html'), html);
                }
            });
        },
        showKnowledgeList:function () {
            _self = this;
            fstPageAjax.findPage({type: 2, end: 8}, function (r) {
                if (r.flag == 1) {
                    $("#knowledgeDiv").empty().html(_.template(knowledgeListTpl, {data: r.data}));
                    if(r.data && r.data.length<=0){
                        $("#knowledgeDiv .rule").empty().html("<img src='../../../img/no-data-table.png' class='standMiddle'>");
                    }
                    //知识库点击更多
                    $('#knowledgeDiv .more-link').on('click', function () {
                        $('#root-menu', window.parent.document).find('li').each(function (i, item) {
                            if ("tzgg" == $(item).attr("page-no")) {
                                $(item).find('a')[0].click();
                                $(item).find("li a")[0].click();
                                $('.tabs-selected', window.parent.document).find('span.tabs-title').attr('data-noticeid',"02");
                            }
                        });
                    });
                }else{
                    toast(r.msg,600).err();
                }
            });
        },
        //点击知识库每列
        knowledgeOne: function () {
            _self = this;
            $("#knowledgeDiv").on("click", "a.knowledgeOne", function (e) {
                e.preventDefault();
                var id = $(this).attr("data-id");
                fstPageAjax.findById({id: id}, function (res) {
                    if (res.flag == 1) {
                        //打开弹出框
                        $('#myModal').modal('show');
                        $('#myModal').on('shown.bs.modal', function (e) {
                            $(".modal-body").height($(".modal-content").outerHeight(true) - $(".panel-header").outerHeight(true) - 35)
                        });
                        $(".modal-content").empty().html(_.template(knowledgeOneTpl, {data: res.data}));
                        if ($.trim($("#ruleRev1").find("a").html()) == "") {
                            $("#ruleRev1").hide();
                        }
                    }else{
                        toast(res.msg,600).err();
                    }
                })
            })
        },
        showToolDownloadList:function () {
            _self = this;
            fstPageAjax.findPage({type: 3, end: 5}, function (r) {//表格下载
                if (r.flag == 1) {
                    $("#toolDownloadDiv").empty().html(_.template(toolDownloadListTpl, {data: r.data}));
                    if(r.data && r.data.length<=0){
                        $("#toolDownloadDiv .tabledown").empty().html("<img src='../../../img/no-data-table.png' class='standMiddle'>");
                    }
                    $('#toolDownloadDiv .more-link').on('click', function () {
                        $('#root-menu', window.parent.document).find('li').each(function (i, item) {
                            if ("tzgg" == $(item).attr("page-no")) {
                                $(item).find('a')[0].click();
                                $(item).find("li a")[0].click();
                                $('.tabs-selected', window.parent.document).find('span.tabs-title').attr('data-noticeid',"03");
                            }
                        });
                    });
                }
            });

        },
        showAreaSolveCaseList:function () {//各区域专案组创建情况
            _self = this;
            $("#areaSolveCaseDiv").empty().html(_.template(areaSolveCaseListTpl));
            //var areaSolveCaseData = {
            //    "code":0,
            //    "data":[
            //        {
            //            "createDate":"2017-09-08 11:42:11",
            //            "id":"C11607D4E132424B80ACD5F83BA8458B",
            //            "area":"天河区",
            //            "caseNum":10,
            //            "rownum":"1"
            //        },
            //        {
            //            "createDate":"2017-09-08 11:30:39",
            //            "id":"3AD948322B064223AD70169F4F1CFF7E",
            //            "area":"荔湾区",
            //            "caseNum":12,
            //            "rownum":"2"
            //        },
            //        {
            //            "createDate":"2017-09-07 11:58:30",
            //            "id":"9D263D9CB95E4482B96166F50995C779",
            //            "area":"番禺区",
            //            "caseNum":4,
            //            "rownum":"3"
            //        },
            //        {
            //            "createDate":"2017-09-07 11:42:28",
            //            "id":"FC7114D4977044539129A4C34716EBDB",
            //            "area":"海珠区",
            //            "caseNum":12,
            //            "rownum":"4"
            //        },
            //        {
            //            "createDate":"2017-09-07 11:05:30",
            //            "id":"53A8D6BF5A6C486D8BC72F2751A51A53",
            //            "area":"萝岗区",
            //            "caseNum":3,
            //            "rownum":"5"
            //        },
            //        {
            //            "createDate":"2017-09-07 10:43:02",
            //            "id":"9D5632A8E72E459B80879033DC9BC53A",
            //            "area":"白云区",
            //            "caseNum":5,
            //            "rownum":"6"
            //        }
            //    ],
            //    "flag":1,
            //    "totalCount":6
            //};
            var myChart = ec.init(byid('getSolveCaseInfo'));
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
            if (!dateType) {
                var dateType = 0;
            }


            //切换月度，季度，年度
            $("#getSolveCaseInfoQuest").on("click", "li", function () {
                $(this).addClass("active").siblings(".active").removeClass("active");
                if ($(this).index() == 0) {
                    fstPageAjax.getSolveCaseInfo({dateType:dateType},function(r){
                        if(r.flag==1){
                            var name = [];
                            var value = [];
                            for (var i = 0, len = r.data.length; i < len; i++) {
                                name[i] = r.data[i].NAME;
                                value[i] = r.data[i].NUM;
                            }
                            option.color = [colors[0]];
                            option.xAxis[0].data = name;
                            option.series[0].data = value;
                            myChart.clear();
                            myChart.hideLoading();
                            if(name.length>0||value.length>0){
                                myChart.setOption(option);
                            }else{
                                $("#getSolveCaseInfo").empty().html("<img src='../../../img/no-data-table.png' class='standMiddle'>");
                            }
                        }else{
                            toast(r.msg,600).err();
                        }
                    });
                } else if ($(this).index() == 1) {
                    fstPageAjax.getSolveCaseInfo({dateType:dateType},function(r){
                        if(r.flag==1){
                            var name = [];
                            var value = [];
                            for (var i = 0, len = r.data.length; i < len; i++) {
                                name[i] = r.data[i].NAME;
                                value[i] = r.data[i].NUM;
                            }
                            option.color = [colors[6]];
                            option.xAxis[0].data = name;
                            option.series[0].data = value;
                            myChart.clear();
                            myChart.hideLoading();
                            if(name.length>0||value.length>0){
                                myChart.setOption(option);
                            }else{
                                $("#getSolveCaseInfo").empty().html("<img src='../../../img/no-data-table.png' class='standMiddle'>");
                            }
                        }else{
                            toast(r.msg,600).err();
                        }
                    });
                } else {
                    fstPageAjax.getSolveCaseInfo({dateType:dateType},function(r){
                        if(r.flag==1){
                            var name = [];
                            var value = [];
                            for (var i = 0, len = r.data.length; i < len; i++) {
                                name[i] = r.data[i].NAME;
                                value[i] = r.data[i].NUM;
                            }
                            option.color = [colors[8]];
                            option.xAxis[0].data = name;
                            option.series[0].data = value;
                            myChart.clear();
                            myChart.hideLoading();
                            if(name.length>0||value.length>0){
                                myChart.setOption(option);
                            }else{
                                $("#getSolveCaseInfo").empty().html("<img src='../../../img/no-data-table.png' class='standMiddle'>");
                            }
                        }else{
                            toast(r.msg,600).err();
                        }
                    });
                }
            });
            $("#getSolveCaseInfoQuest li").eq(0).click();
        },
        showAreaCreateCaseList:function () {
            _self = this;
            $("#areaCreateCaseDiv").empty().html(_.template(areaCreateCaseListTpl));
            //var areaCreateCaseData = {
            //    "code":0,
            //    "data":[
            //        {
            //            "createDate":"2017-09-08 11:42:11",
            //            "id":"C11607D4E132424B80ACD5F83BA8458B",
            //            "area":"天河区",
            //            "caseNum":3,
            //            "rownum":"1"
            //        },
            //        {
            //            "createDate":"2017-09-08 11:30:39",
            //            "id":"3AD948322B064223AD70169F4F1CFF7E",
            //            "area":"荔湾区",
            //            "caseNum":8,
            //            "rownum":"2"
            //        },
            //        {
            //            "createDate":"2017-09-07 11:58:30",
            //            "id":"9D263D9CB95E4482B96166F50995C779",
            //            "area":"番禺区",
            //            "caseNum":4,
            //            "rownum":"3"
            //        },
            //        {
            //            "createDate":"2017-09-07 11:42:28",
            //            "id":"FC7114D4977044539129A4C34716EBDB",
            //            "area":"海珠区",
            //            "caseNum":12,
            //            "rownum":"4"
            //        },
            //        {
            //            "createDate":"2017-09-07 11:05:30",
            //            "id":"53A8D6BF5A6C486D8BC72F2751A51A53",
            //            "area":"萝岗区",
            //            "caseNum":6,
            //            "rownum":"5"
            //        },
            //        {
            //            "createDate":"2017-09-07 10:43:02",
            //            "id":"9D5632A8E72E459B80879033DC9BC53A",
            //            "area":"白云区",
            //            "caseNum":5,
            //            "rownum":"6"
            //        }
            //    ],
            //    "flag":1,
            //    "totalCount":6
            //};

            var myChart = ec.init(byid('getCreateInfo'));
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
            // 为echarts对象加载数据
            if (!dateType) {
                var dateType = 0;
            }

            //切换月度，季度，年度
            $("#getCreateInfoQuest").on("click", "li", function () {
                $(this).addClass("active").siblings(".active").removeClass("active");
                if ($(this).index() == 0) {
                    fstPageAjax.getCreateInfo({dateType:dateType},function(r){
                        if(r.flag==1){
                            var name = [];
                            var value = [];
                            for (var i = 0, len = r.data.length; i < len; i++) {
                                name[i] = r.data[i].NAME;
                                value[i] = r.data[i].NUM;
                            }
                            option.color = [colors[7]];
                            option.xAxis[0].data = name;
                            option.series[0].data = value;
                            myChart.clear();
                            myChart.hideLoading();
                            if(name.length>0||value.length>0){
                                myChart.setOption(option);
                            }else{
                                $("#getCreateInfo").empty().html("<img src='../../../img/no-data-table.png' class='standMiddle'>");
                            }
                        }else{
                            toast(r.msg,600).err();
                        }

                    });

                } else if ($(this).index() == 1) {
                    fstPageAjax.getCreateInfo({dateType:dateType},function(r){
                        if(r.flag==1){
                            var name = [];
                            var value = [];
                            for (var i = 0, len = r.data.length; i < len; i++) {
                                name[i] = r.data[i].NAME;
                                value[i] = r.data[i].NUM;
                            }
                            option.color = [colors[5]];
                            option.xAxis[0].data = name;
                            option.series[0].data = value;
                            myChart.clear();
                            myChart.hideLoading();
                            if(name.length>0||value.length>0){
                                myChart.setOption(option);
                            }else{
                                $("#getCreateInfo").empty().html("<img src='../../../img/no-data-table.png' class='standMiddle'>");
                            }
                        }else{
                            toast(r.msg,600).err();
                        }

                    });
                } else {
                    fstPageAjax.getCreateInfo({dateType:dateType},function(r){
                        if(r.flag==1){
                            var name = [];
                            var value = [];
                            for (var i = 0, len = r.data.length; i < len; i++) {
                                name[i] = r.data[i].NAME;
                                value[i] = r.data[i].NUM;
                            }
                            option.color = [colors[9]];
                            option.xAxis[0].data = name;
                            option.series[0].data = value;
                            myChart.clear();
                            myChart.hideLoading();
                            if(name.length>0||value.length>0){
                                myChart.setOption(option);
                            }else{
                                $("#getCreateInfo").empty().html("<img src='../../../img/no-data-table.png' class='standMiddle'>");
                            }
                        }else{
                            toast(r.msg,600).err();
                        }

                    });
                }
            });
            $("#getCreateInfoQuest li").eq(0).click();
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
