/**
 * Created by dell on 2017/9/28.
 */
define(['underscore',
    'd3',
    'text!/view/commandCooperationManage/tpl/commandPage.html',
    'text!/view/commandCooperationManage/tpl/groupLi.html',
    'text!/view/caseInvestigation/tpl/task/taskList.html',
    'text!/view/caseInvestigation/tpl/task/taskListTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCase.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCaseTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/caseList.html',
    '../dat/command.js',
    '../../caseInvestigation/dat/specialCaseGroup.js',
    '../../caseInvestigation/src/specialCaseGroup.js',
    '../../caseInvestigation/dat/task.js',
    '../../caseInvestigation/src/task.js',
    '../../dictManage/src/dictOpener.js',
    '../../chatPage/src/chat.js'], function (_, d3, commandPage,groupLiTpl, taskListTpl,taskListTrTpl, relationCaseTpl, relationCaseTrTpl,
                                                      caseListTpl,commandAjax,specialCaseGroupAjax,specialCaseGroup,taskAjax,task,dictOpener,chat) {
    return {
        showList: function () {
            _selfCommand = this;
            $("#mainDiv").empty().html(_.template(commandPage));
            specialCaseGroupAjax.getGroupPage({userId: top.userId},function (r) {
                if(r.data && r.data.length > 0) {
                    $("#mainDiv .all-group-list ul").empty().html(_.template(groupLiTpl,{data:r.data}));
                    $(".all-group-list ul li").click(function () {
                        var $this = $(this);
                        var groupinfo  = $(this).attr("groupinfo");
                        $(".common-group-ul li.active").removeClass("active");
                        $this.parents("ul").slideToggle();
                        //选中专案组并进行操作
                        _selfCommand.handleGroup($this,groupinfo);
                    });
                } else {
                    $("#mainDiv .all-group-list ul").empty().html(_.template("没有专案组，请先创建专案组。"));
                }
            });
            $.ajax({
                url: top.servicePath_xz + '/xzlog/getCommonGroupList',
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                data: {userId:top.userId},
                success: function (r) {
                    if(r.data && r.data.length > 0) {
                        $("#mainDiv .common-group-list ul").empty().html(_.template(groupLiTpl,{data:r.data}));
                        $(".common-group-ul li").on("click", function () {
                            var $this = $(this);
                            var groupinfo  = $(this).attr("groupinfo");
                            $this.addClass("active").siblings(".active").removeClass("active");
                            //选中专案组并进行操作
                            _selfCommand.handleGroup($this,groupinfo);
                        });
                    } else {

                    }
                }
            });
            //, {allGroupList:r.data,commonGroupList:null}
            // $("#mainDiv").empty().html(_.template(commandPage, {ops: top.opsMap}));
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
            //全屏显示脉络图 fullPanelUtils.fullPanel(触发元素，全屏元素)
            var clickDiv = $("#fullscreenBtn");
            fullPanelUtils.fullPanel(clickDiv, clickDiv.parents(".map-list"));

            //显示脉络图查询条件
            _selfCommand.showCondition();
        },
        handleGroup: function (obj,groupinfo) {
            _selfCommand = this;
            var thisValue = obj.text();
            $(".choose-group").empty().text(thisValue);
            $(".group-btn-div").removeClass("hide");
            $("#mapSvgFrame").attr("src", "/view/graph/d3graphView.html").attr("groupid",str2obj(groupinfo).id);
            $("#mapSvgFrame").css({
                "width": "100%",
                "height": "100%"
            });

            //进入专案组讨论
            $(".into-communication").on("click", function () {
                if(groupinfo){
                    _selfCommand.intoCommunication(groupinfo);
                } else {
                    toast("请先选择专案组！").err();
                }
            });
            //打印
            $(".into-print").on("click", function () {
                if(groupinfo){
                    $("#mapSvgFrame").contents().find("svg").jqprint();
                } else {
                    toast("请先选择专案组！").err();
                }
            });
            //跳转到任务清单
            $(".into-taskList").on("click", function () {
                if(groupinfo){
                    _selfCommand.intoTaskList(groupinfo);
                } else {
                    toast("请先选择专案组！").err();
                }
            });
            //跳转到涉及案件
            $(".into-relationCase").on("click", function () {
                if(groupinfo){
                    _selfCommand.intoRelatedCase(groupinfo);
                } else {
                    toast("请先选择专案组！").err();
                }
            });
            // //生成案件侦办过程报告
            // $(".into-report").on("click", function () {
            //
            // });
        },
        showCondition: function () {
            _selfCommand = this;
            var conditionDiv = $("#mapConditionWrap");
            conditionDiv.add(conditionDiv.children()).addClass("hide");
            $("#searchBtn").on("click", function () {
                if (conditionDiv.is(":visible")) {
                    conditionDiv.add(conditionDiv.children()).addClass("hide");
                    conditionDiv.addClass("hide");
                } else {
                    conditionDiv.add(conditionDiv.children()).removeClass("hide");
                    conditionDiv.removeClass("hide");
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
                }
            });
        },
        intoCommunication: function (groupinfo) {
            _selfCommand = this;

            // $open('#taskListDiv', {width: 840,height: 700, title: '&nbsp专案组群聊'});
            // var iframe = '<iframe id="mapSvgFrame" class="tab-content-frame" src="/view/chatPage/chatPage.html" width="100%" height="640"></iframe>';
            // $("#taskListDiv .panel-container").css("margin","0px").empty().html(_.template(iframe));
            window.open("/view/chatPage/chatPage.html", "nw", "width=840,height=640");
        },
        intoTaskList: function (groupinfo) {
            _selfCommand = this;
            var groupinfo = str2obj(groupinfo);
            $open('#taskListDiv', {width: 800, title: '&nbsp任务清单'});
            var openerDiv = $("#taskListDiv");
            openerDiv.find(".panel-container").empty().html(_.template(taskListTpl, {isOperation:false}));
            selectUtils.selectTextOption("#taskListDiv #changeTaskType", "#taskType");
            selectUtils.selectTextOption("#taskListDiv #changeConfirmStatus", "#fkqrzt");
            //选择任务状态
            task.selectTaskStaOption("#taskListDiv #changeTaskStatus");

            $("#chooseBelongGroup").on('click', function () {
                dictOpener.openChoosePort($(this),null,null,{userId:top.userId});
            });
            $("#chooseCreateName").on('click', function () {
                dictOpener.openUserChoosePort($(this));
            });
            $("#chooseRecipient").on('click', function () {
                dictOpener.openUserChoosePort($(this));
            });
            $("#chooseBelongUnit").on('click', function () {
                dictOpener.openUnitChoosePort($(this));
            });
            $("#createDate").daterangepicker({
                separator: ' 至 ',
                showWeekNumbers: true,
                pickTime: true
            }, function (start, end, label) {
                $('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                $('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
            });
            //点击选择时间范围（当天当月当季当年）
            selectUtils.selectTimeRangeOption("#changeCreateDate", "#createDate", "#startTime", "#endTime");

            $("#submitDate").daterangepicker({
                separator: ' 至 ',
                showWeekNumbers: true,
                pickTime: true
            }, function (start, end, label) {
                $('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                $('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
            });
            //点击选择时间范围（当天当月当季当年）
            selectUtils.selectTimeRangeOption("#changeSubmitDate", "#submitDate", "#fkstartTime", "#fkendTime");

            $("#taskListDiv").on("click","#resetBtn",function () {
                console.info("任务清单重置按钮");
                selectUtils.clearQueryValue();
                return false;
            });
            $("#taskListDiv").on("click","#queryBtn",function () {
                console.info("任务清单查询按钮");
                _selfCommand.queryTaskList(groupinfo.id);
                return false;
            });
            _selfCommand.queryTaskList(groupinfo.id);
            $("#taskListDiv").on("click", "#closeBtn", function () {
                console.info("任务清单关闭弹框按钮");
                if ($("#taskListDiv")) {
                    $("#taskListDiv").$close();
                }
            });

            // $("#taskListDiv .panel-container").empty().html(_.template(groupTaskListTpl));
        },
        queryTaskList: function (groupid) {
            _selfCommand = this;
            var param = {
                userId:top.userId,
                taskType:$.trim($("#taskType").val()),
                taskName:$.trim($("#taskName").val()),
                taskNo:$.trim($("#taskNo").val()),
                groupid:$.trim($("#groupid").val()) || groupid,
                creator:$.trim($("#creator").val()),
                jsr:$.trim($("#jsr").val()),
                startTime:$.trim($("#startTime").val()),
                endTime:$.trim($("#endTime").val()),
                fkqrzt:$.trim($("#fkqrzt").val()),
                fkzt:$.trim($("#fkzt").val()),
                yjzt:$.trim($("#yjzt").val()),
                overdue:$.trim($("#overdue").val()),
                deparmentcode:$.trim($("#deparmentcode").val()),
                fkstartTime:$.trim($("#fkstartTime").val()),
                fkendTime:$.trim($("#fkendTime").val())
            };
            $('#taskListResult').pagingList({
                action:top.servicePath_xz+'/task/getTaskPage',
                jsonObj:param,
                callback:function(data){
                    $("#taskListTable tbody").empty().html(_.template(taskListTrTpl, {data: data,isOperation:false}));
                    $(".link-text").on("click",function () {
                        _selfCommand.handleDetail($(this).attr('id'));
                    });
                }
            });
        },
        intoRelatedCase: function (groupinfo) {
            _selfCommand = this;
            var groupinfo = str2obj(groupinfo);
            $open('#taskListDiv', {width: 800, title: '&nbsp涉及案件'});
            var openerDiv = $("#taskListDiv");
            openerDiv.find(".panel-container").empty().html(_.template(relationCaseTpl, {isOperation:false}));
            $(".form-btn-block").addClass("hide");
            $("#relationCase").removeClass("form-body").find("#queryCondition").addClass("query-block").siblings("#relationCaseResult").removeClass("mrn mln");

            $("#taskListDiv").on('click',"#chooseCaseType" ,function () {
                dictOpener.openChooseDict($(this));
            });
            //点击选择时间范围（当天当月当季当年）
            selectUtils.selectTimeRangeOption("#changeTimeScope", "#createtime", "#startTime", "#endTime");
            $("#taskListDiv #createtime").daterangepicker({
                separator: ' 至 ',
                showWeekNumbers: true,
                pickTime: true
            }, function (start, end, label) {
                $('#taskListDiv #startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                $('#taskListDiv #endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
            });
            //点击多选案件状态
            $("#taskListDiv .dictInLineSelect").dictInLineSelect();
            selectUtils.selectTextMultiOpt("#changeCaseSta", "caseSta");

            $("#taskListDiv").on("click", "#resetBtn", function () {
                selectUtils.clearQueryValue();
                return false;
            });
            $("#taskListDiv").on("click", "#queryBtn", function () {
                _selfCommand.queryRelatedCaseList(groupinfo);
                return false;
            });
            _selfCommand.queryRelatedCaseList(groupinfo);
        },
        queryRelatedCaseList: function (groupInfo) {
            _selfCommand = this;
            var param = {
                groupId:groupInfo.id,
                ab: $.trim($("#ab").val()),
                ajbh: $("#ajbh").val(),
                ajmc: $.trim($("#ajmc").val()),
                ajstate: $("#ajstate").val(),
                endTime: $("#endTime").val(),
                startTime: $("#startTime").val()
            };
            $('#relationCaseResult').pagingList({
                action: top.servicePath_xz + '/asjAj/getAjGroupPage',
                jsonObj: param,
                callback: function (data) {
                    $("#relationCaseTable tbody").empty().html(_.template(relationCaseTrTpl, {
                        data: data,
                        isOperation:false,
                        groupid:groupInfo.id,
                        groupcreator:groupInfo.creator
                    }));
                    $('.span').span();
                }
            });
        }
    }
});