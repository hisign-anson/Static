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
    'text!/view/chatPage/tpl/chatPage.html',
    '../dat/command.js',
    '../../caseInvestigation/dat/specialCaseGroup.js',
    '../../caseInvestigation/src/specialCaseGroup.js',
    '../../caseInvestigation/dat/task.js',
    '../../caseInvestigation/src/task.js',
    '../../dictManage/src/dictOpener.js',
    '../../chatPage/src/chat.js'], function (_, d3, commandPage,groupLiTpl, taskListTpl,taskListTrTpl, relationCaseTpl, relationCaseTrTpl,caseListTpl,chatPageTpl,
                                             commandAjax,specialCaseGroupAjax,specialCaseGroup,taskAjax,task,dictOpener,chat) {
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
            $(".map-content,#mapSvgFrame").on("contextmenu", function (e) {
                e.preventDefault();
            });
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
            $(".group-content .into-communication,.full-actived .into-communication").on("click", function () {
                if(groupinfo){
                    _selfCommand.intoCommunication(groupinfo);
                } else {
                    toast("请先选择专案组！").warn();
                }
            });
            //打印
            $(".group-content .into-print,.full-actived .into-print").on("click", function () {
                if(groupinfo){
                    $("#mapSvgFrame").contents().find("svg").jqprint();
                } else {
                    toast("请先选择专案组！").warn();
                }
            });
            //跳转到任务清单
            $(".group-content .into-taskList,.full-actived .into-taskList").on("click", function () {
                if(groupinfo){
                    _selfCommand.intoTaskList(groupinfo);
                } else {
                    toast("请先选择专案组！").warn();
                }
            });
            //跳转到涉及案件
            $(".group-content .into-relationCase,.full-actived .into-relationCase").on("click", function () {
                if(groupinfo){
                    _selfCommand.intoRelatedCase(groupinfo);
                } else {
                    toast("请先选择专案组！").warn();
                }
            });
            // //生成案件侦办过程报告
            // $(".group-content .into-report").on("click", function () {
            //
            // });
        },
        intoCommunication: function (groupinfo) {
            var groupinfo = str2obj(groupinfo);
            var groupid = groupinfo.id;
            var jmgid =  groupinfo.jmgid;

            $open('#taskListDiv', {width: 840,height: 700, title: '&nbsp专案组群聊'});
            var fullActivedCheck = $(".map-list").hasClass("full-panel");
            if(fullActivedCheck){
                $("#top-mask",parent.document).height(0);
            }
            $("#taskListDiv .panel-container").css("margin-top","0").empty().html(_.template(chatPageTpl));
            window.parent.jchatGloabal.getUserInfo();
            window.parent.jchatGloabal.getGroupInfo(jmgid);
            window.parent.jchatGloabal.getGroupMembers(jmgid);
            // //离线消息同步监听
            // window.parent.jchatGloabal.onSyncConversation(jmgid);
            // //聊天消息实时监听
            // window.parent.jchatGloabal.onMsgReceive(jmgid);
            //打开弹框显示所有聊天消息
            window.parent.jchatGloabal.showAllMsg(jmgid);
            $("#sendFileBtn").on("click", function () {
                window.parent.clickHandle.sendFile(jmgid);
            });
            $("#sendFileImagesBtn").on("click", function () {
                window.parent.clickHandle.sendFileImages(jmgid);
            });
            $("#sendEmojiBtn").on("click", function (event) {
                window.parent.clickHandle.choseEmoji(this);
            });
            $("#setTextSizeBtn").on("click", function (event) {
                window.parent.clickHandle.setTextSize(this);
            });
            $("#sendBtn").on("click", function () {
                window.parent.clickHandle.sendText(jmgid);
            });

            $("#messageContent").on('keyup', function (event) {
                var e = event || window.event;
                if (e.keyCode === 13) {
                    window.parent.clickHandle.sendText(jmgid);
                }
            });
            $("#taskListDiv").parents(".window").find(".panel-tool-close").click(function () {
                var chatParam = {
                    reserveField1 :groupid,
                    createTime: rangeUtil.formatDate(rangeUtil.getCurrentDate(),'yyyy-MM-dd'),
                    creator: top.userId,
                    content:"hah"
                };
                specialCaseGroupAjax.addChatLog(chatParam,function () {

                })
            });
        },
        intoTaskList: function (groupinfo) {
            _selfCommand = this;
            var groupinfo = str2obj(groupinfo);
            $open('#taskListDiv', {width: 800, title: '&nbsp任务清单'});

            var fullActivedCheck = $(".map-list").hasClass("full-panel");
            if(fullActivedCheck){
                $("#top-mask",parent.document).height(0);
            }

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
            //时间插件确定按钮点击事件
            $('#createDate').on('apply.daterangepicker', function (e, picker) {
                $('#startTime').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss'));
                $('#endTime').val(picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
                $("#changeTimeScope u").removeClass("active");
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
            //时间插件确定按钮点击事件
            $('#submitDate').on('apply.daterangepicker', function (e, picker) {
                $('#startTime').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss'));
                $('#endTime').val(picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
                $("#changeTimeScope u").removeClass("active");
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

            var fullActivedCheck = $(".map-list").hasClass("full-panel");
            if(fullActivedCheck){
                $("#top-mask",parent.document).height(0);
            }
            var openerDiv = $("#taskListDiv");
            openerDiv.find(".panel-container").empty().html(_.template(relationCaseTpl, {isOperation:false,groupcreator: groupinfo.creator,pgroupid:groupinfo.pgroupid}));
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
                isInGroup:true,
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
                        groupcreator:groupInfo.creator,
                        pgroupid:groupInfo.pgroupid
                    }));
                    $('.span').span();
                }
            });
        },
    }
});