/**
 * Created by dell on 2017/9/28.
 */
define(['underscore',
    'text!/view/commandCooperationManage/tpl/commandPage.html',
    'text!/view/commandCooperationManage/tpl/groupTaskList.html',
    'text!/view/commandCooperationManage/tpl/groupTaskListTr.html',
    'text!/view/commandCooperationManage/tpl/groupTaskEdit.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/caseList.html'], function (_, commandPage,groupTaskListTpl,groupTaskListTrTpl,groupTaskEditTpl,caseListTpl) {
    return {
        showList: function () {
            _self = this;
            $("#mainDiv").empty().html(_.template(commandPage, {ops: top.opsMap}));
            $("#toggleGroup").on("click", function () {
                var $this = $(this);
                $(".group-btn-div").removeClass("hide");
                $this.parents(".body-agent").toggleClass("group-list-s");
            });
            $(".choose-group").on("click", function () {
                var $this = $(this);
                $this.next("ul").slideToggle();
                $this.next("ul li").on("click", function () {
                    $(this).parent("ul").slideToggle();
                });
            });
            $(".all-group-list ul li").click(function () {
                var $this = $(this);
                $(".common-group-ul li.active").removeClass("active");
                $this.parents("ul").slideToggle();
                //选中专案组并进行操作
                _self.handleGroup($this);
            });
            $(".common-group-ul li").on("click", function () {
                var $this = $(this);
                $this.addClass("active").siblings(".active").removeClass("active");
                //选中专案组并进行操作
                _self.handleGroup($this);
            });
            //全屏显示脉络图 fullPanelUtils.fullPanel(触发元素，全屏元素)
            var clickDiv = $("#fullscreenBtn");
            fullPanelUtils.fullPanel(clickDiv,clickDiv.parents(".map-list"));

            //显示脉络图查询条件
            _self.showCondition();
        },
        handleGroup:function (obj) {
            _self = this;
            console.info(obj.index());
            var thisValue = obj.text();
            $(".choose-group").empty().text(thisValue);

            $(".group-btn-div").removeClass("hide");
            $("#mapSvgFrame").attr("src", "/view/commandCooperationManage/graph/d3graphView.html");
            $("#mapSvgFrame").css({
                "width": "100%",
                "height": "calc(100vh - 75px)"
            });

            //进入专案组讨论
            $(".into-communication").on("click", function () {
                _self.intoCommunication();
            });
            //打印
            $(".into-print").on("click", function () {
                $("#mapSvgFrame").contents().find("svg").jqprint();
            });
            // //生成案件侦办过程报告
            // $(".into-report").on("click", function () {
            //
            // });
            //跳转到任务清单
            $(".into-taskList").on("click", function () {
                _self.intoTaskList();
            });
            //跳转到涉及案件
            $(".into-relationCase").on("click", function () {
                _self.intoRelatedCase();
            });
        },
        showCondition:function () {
            _self = this;
            var conditionDiv = $("#mapConditionWrap");
            conditionDiv.add(conditionDiv.children()).addClass("hide");
            $("#searchBtn").on("click", function () {
                conditionDiv.add(conditionDiv.children()).removeClass("hide");
                conditionDiv.removeClass("hide")
                //     .animate({
                //     width:"340px"
                // },"fast");
                $("#dateRange").daterangepicker({
                    separator: ' 至 ',
                    showWeekNumbers: true,
                    pickTime: true
                }, function (start, end, label) {
                    $('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                    $('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
                });
                selectUtils.selectTextOption("#changeYesOrNo", "#taskType");
                selectUtils.selectTextOption("#changeTaskStatus", "#taskStatus");
                $("#closeBtn").on("click", function () {
                    conditionDiv.add(conditionDiv.children()).addClass("hide");
                    conditionDiv.addClass("hide")
                    //     .animate({
                    //     width:"0"
                    // },"fast");
                });
            });
        },
        intoCommunication:function () {
            _self = this;
            $open('#taskListDiv', {width: 840,height: 700, title: '&nbsp专案组群聊'});
            var iframe = '<iframe id="mapSvgFrame" class="tab-content-frame" src="/view/chatPage/chatPage.html" width="100%" height="640"></iframe>';
            $("#taskListDiv .panel-container").css("margin","0px").empty().html(_.template(iframe));
        },
        intoTaskList:function () {
            _self = this;
            $open('#taskListDiv', {width: 800, title: '&nbsp任务清单'});
            _self.showTaskList();
        },
        showTaskList:function() {
            _self = this;
            $("#taskListDiv .panel-container").empty().html(_.template(groupTaskListTpl));
            $("#createDate").daterangepicker({
                separator: ' 至 ',
                showWeekNumbers: true,
                pickTime: true
            }, function (start, end, label) {
                $('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                $('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
            });
            selectUtils.selectTimeRangeOption("#changeCreateDate", "#createDate", "#startTime", "#endTime");
            selectUtils.selectTextOption(".panel-container #changeTaskStatus", "#taskStatus");
            $("#taskListDiv").on("click","#resetBtn",function () {
                console.info("任务清单重置按钮");
            });
            $("#taskListDiv").on("click","#queryBtn",function () {
                console.info("任务清单查询按钮");
                _self.queryTaskList();
            });
            _self.queryTaskList();

            $("#taskListDiv").on("click","#closeBtn", function () {
                console.info("任务清单关闭弹框按钮");
                if ($("#taskListDiv")) {
                    $("#taskListDiv").$close();
                }
            });
        },
        queryTaskList:function() {
            _self = this;
            var param = $("#queryCondition").serializeObject();
            $.extend(param, {

            });
            var taskData = [
                {
                    "rownum": 0,
                    "id": "BD54F18C24874DBE934472CD21EBC6BB",
                    "taskName": "快递费就能发",
                    "taskContent": "发货人挺好挺好太容易",
                    "belongGroup": "情报科",
                    "createName": "超级管理员",
                    "createDate": "2017-07-06 18:00:16",
                    "recipient": "张三",
                    "taskStatus": "10",
                    "recipientStatus": 0,
                    "submitDate": "2017-09-04 11:59:09",
                    "actualSubmitDate": "2017-09-04 11:59:09"
                },
                {
                    "rownum": 1,
                    "id": "E3E47DAB3F1F44C7BD02ED9E91C6D951",
                    "taskName": "发给后台",
                    "taskContent": "v凤于九天洒多少份",
                    "belongGroup": "市公安局",
                    "createName": "李四",
                    "createDate": "2017-07-05 18:00:16",
                    "recipient": "随便",
                    "taskStatus": "10",
                    "recipientStatus": 3,
                    "submitDate": "2017-09-07 11:59:09",
                    "actualSubmitDate": "2017-09-06 19:59:09"
                }
            ];
            $("#taskListTable tbody").empty().html(_.template(groupTaskListTrTpl, {data: taskData}));
            $(".link-text").on("click",function () {
                $("#taskListDiv .panel-container").empty().html(_.template(groupTaskEditTpl));
                $("#cancelBtn").on("click",function () {
                    _self.showTaskList();
                });
                $("#appendTaskBtn").on("click",function () {
                    _self.showTaskList();
                });
            });
        },
        intoRelatedCase:function () {
            _self = this;
            $open('#taskListDiv', {width: 800, title: '&nbsp案件查询'});
            _self.showRelatedCaseList();
        },
        showRelatedCaseList:function () {
            _self = this;
            $("#taskListDiv .panel-container").empty().html(_.template(caseListTpl));
            $("#taskListDiv").on("click","#resetBtn",function () {
                console.info("任务清单重置按钮");
            });
            $("#taskListDiv").on("click","#queryBtn",function () {
                _self.queryRelatedCaseList();
            });
            _self.queryRelatedCaseList();
        },
        queryRelatedCaseList:function () {
            _self = this;
            var param = $("#queryCondition").serializeObject();
            $.extend(param, {

            });
            $("#cancelBtn").on("click",function () {
                if ($("#taskListDiv")) {
                    $("#taskListDiv").$close();
                }
            });
            $("#saveBtn").on("click",function () {
                if ($("#taskListDiv")) {
                    $("#taskListDiv").$close();
                }
            });
        }
    }
});