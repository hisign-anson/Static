/**
 * Created by dell on 2017/9/28.
 */
importing('currentDate');
define(['underscore',
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
    '../../dictManage/src/dictOpener.js'], function (_, commandPage, groupLiTpl, taskListTpl, taskListTrTpl, relationCaseTpl, relationCaseTrTpl, caseListTpl, chatPageTpl,
                                                     commandAjax, specialCaseGroupAjax, specialCaseGroup, taskAjax, task, dictOpener) {
    return {
        showList: function () {
            _selfCommand = this;
            $("#mainDiv").empty().html(_.template(commandPage));
            //加载所有专案组
            _selfCommand.showAllGroup();

            //加载常用专案组
            _selfCommand.showCommonGroup();

            //专案组列表右上角按钮
            $("#toggleGroup").on("click", function () {
                $(".group-btn-div").removeClass("hide");
                $(this).parents(".body-agent").toggleClass("group-list-s");
            });
            //点击选择专案组 显示所有列表
            $(".choose-group").on("click", function () {
                var $allGroup = $(this).next("ul");
                if ($allGroup.is(":visible")) {
                    $allGroup.addClass("hide");
                } else {
                    $allGroup.removeClass("hide");
                }
            });

            //进入专案组讨论
            $(".group-content .into-communication,.full-actived .into-communication").on("click", function () {
                var groupinfo = $(".group-btn-div").attr("groupinfo");
                if (groupinfo) {
                    _selfCommand.intoCommunication(groupinfo);
                } else {
                    toast("请先选择专案组！").warn();
                }
            });
            //打印
            $(".group-content .into-print,.full-actived .into-print").on("click", function () {
                var groupinfo = $(".group-btn-div").attr("groupinfo");
                if (groupinfo) {
                    $("#mapSvgFrame").contents().find("svg").jqprint({
                        debug: true, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
                        importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
                        printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
                        operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
                    });
                } else {
                    toast("请先选择专案组！").warn();
                }
            });
            //跳转到任务清单
            $(".group-content .into-taskList,.full-actived .into-taskList").on("click", function () {
                var groupinfo = $(".group-btn-div").attr("groupinfo");
                if (groupinfo) {
                    _selfCommand.intoTaskList(groupinfo);
                } else {
                    toast("请先选择专案组！").warn();
                }
            });
            //跳转到涉及案件
            $(".group-content .into-relationCase,.full-actived .into-relationCase").on("click", function () {
                var groupinfo = $(".group-btn-div").attr("groupinfo");
                if (groupinfo) {
                    _selfCommand.intoRelatedCase(groupinfo);
                } else {
                    toast("请先选择专案组！").warn();
                }
            });

            //全屏显示脉络图 fullPanelUtils.fullPanel(触发元素，全屏元素)
            var clickDiv = $("#fullscreenBtn");
            fullPanelUtils.fullPanel(clickDiv, clickDiv.parents(".map-list"));

            //禁用右键
            $(".map-content,#mapSvgFrame").on("contextmenu", function (e) {
                e.preventDefault();
            });
        },
        showAllGroup: function () {
            _selfCommand = this;
            specialCaseGroupAjax.getGroupPage({userId: top.userId}, function (r) {
                if (r.data && r.data.length > 0) {
                    $("#mainDiv .all-group-list ul").empty().html(_.template(groupLiTpl, {data: r.data}));
                    var groupinfo;
                    $(".all-group-list ul li").click(function () {
                        var $this = $(this);
                        groupinfo = $(this).attr("groupinfo");
                        //点击子元素时父元素隐藏
                        $this.parents(".all-group-ul").addClass("hide");
                        $(".common-group-ul li.active").removeClass("active");
                        //选中专案组并进行操作
                        _selfCommand.handleGroup($this, groupinfo);
                    });
                } else {
                    $("#mainDiv .all-group-list ul").empty().html(_.template("没有专案组，请先创建专案组。"));
                }
            });
        },
        showCommonGroup: function () {
            _selfCommand = this;
            $.ajax({
                url: top.servicePath_xz + '/xzlog/getCommonGroupList',
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                data: {userId: top.userId},
                success: function (r) {
                    if (r.data && r.data.length > 0) {
                        $("#mainDiv .common-group-list ul").empty().html(_.template(groupLiTpl, {data: r.data}));
                        var groupinfo;
                        $(".common-group-ul li").on("click", function () {
                            var $this = $(this);
                            groupinfo = $(this).attr("groupinfo");
                            $this.addClass("active").siblings(".active").removeClass("active");
                            //选中专案组并进行操作
                            _selfCommand.handleGroup($this, groupinfo);
                        });
                    } else {

                    }
                }
            });
        },
        handleGroup: function (obj, groupinfo) {
            _selfCommand = this;
            var thisValue = obj.text();
            $(".choose-group").empty().text(thisValue);

            $(".group-btn-div").removeClass("hide").attr("groupinfo", groupinfo);
            $("#mapSvgFrame").attr("src", "/view/graph/d3graphView.html").attr("groupid", str2obj(groupinfo).id);
            $("#mapSvgFrame").css({
                "width": "100%",
                "height": "100%"
            });
        },
        intoCommunication: function (groupinfo) {
            var groupinfo = str2obj(groupinfo);
            var groupid = groupinfo.id;
            var jmgid = groupinfo.jmgid;

            $open('#chatBlock', {width: 840, height: 700, title: '&nbsp专案组群聊'});
            var fullActivedCheck = $(".map-list").hasClass("full-panel");
            if (fullActivedCheck) {
                $("#top-mask", parent.document).height(0);
            }
            $("#chatBlock .panel-container").attr("jmgid", jmgid).attr("groupid", groupid).css("margin-top", "0").empty().html(_.template(chatPageTpl));
            window.parent.jchatGloabal.getUserInfo();
            window.parent.jchatGloabal.getGroupInfo(jmgid);
            window.parent.jchatGloabal.getGroupMembers(jmgid);
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
            $("#chatBlock").parents(".window").find(".panel-tool-close").click(function () {
                var chatParam = {
                    reserveField1: groupid,
                    createTime: rangeUtil.formatDate(rangeUtil.getCurrentDate(), 'yyyy-MM-dd'),
                    creator: top.userId,
                    content: "hah"
                };
                specialCaseGroupAjax.addChatLog(chatParam, function () {

                })
            });
        },
        intoTaskList: function (groupinfo) {
            _selfCommand = this;
            var groupinfo = str2obj(groupinfo);
            $open('#taskListDiv', {width: 960, title: '&nbsp任务清单'});

            var fullActivedCheck = $(".map-list").hasClass("full-panel");
            if (fullActivedCheck) {
                $("#top-mask", parent.document).height(0);
            }

            var openerDiv = $("#taskListDiv");
            openerDiv.find(".panel-container").empty().html(_.template(taskListTpl, {isOperation: false}));
            selectUtils.selectTextOption("#taskListDiv #changeTaskType", "#taskType");
            selectUtils.selectTextOption("#taskListDiv #changeConfirmStatus", "#fkqrzt");
            //选择任务状态
            task.selectTaskStaOption("#taskListDiv #changeTaskStatus");

            $("#chooseBelongGroup").on('click', function () {
                // dictOpener.openChoosePort($(this), null, null, {userId: top.userId});
                dictOpener.openGroup($(this));
            });
            $("#chooseCreateName").on('click', function () {
                // dictOpener.openUserChoosePort($(this));
                dictOpener.openCreator($(this));
            });
            $("#chooseRecipient").on('click', function () {
                // dictOpener.openUserChoosePort($(this));
                dictOpener.openRecipient($(this));
            });
            $("#chooseBelongUnit").on('click', function () {
                // dictOpener.openUnitChoosePort($(this));
                dictOpener.openOrg($(this));
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

            $("#taskListDiv").on("click", "#resetBtn", function () {
                console.info("任务清单重置按钮");
                selectUtils.clearQueryValue();
                return false;
            });
            $("#taskListDiv").on("click", "#queryBtn", function () {
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
                userId: top.userId,
                taskType: $.trim($("#taskType").val()),
                taskName: $.trim($("#taskName").val()),
                taskNo: $.trim($("#taskNo").val()),
                groupid: $.trim($("#groupid").val()) || groupid,
                creator: $.trim($("#creator").val()),
                jsr: $.trim($("#jsr").val()),
                startTime: $.trim($("#startTime").val()),
                endTime: $.trim($("#endTime").val()),
                fkqrzt: $.trim($("#fkqrzt").val()),
                fkzt: $.trim($("#fkzt").val()),
                yjzt: $.trim($("#yjzt").val()),
                overdue: $.trim($("#overdue").val()),
                deparmentcode: $.trim($("#deparmentcode").val()),
                fkstartTime: $.trim($("#fkstartTime").val()),
                fkendTime: $.trim($("#fkendTime").val())
            };
            $('#taskListResult').pagingList({
                action: top.servicePath_xz + '/task/getTaskPage',
                jsonObj: param,
                callback: function (data) {
                    $("#taskListTable tbody").empty().html(_.template(taskListTrTpl, {data: data, isOperation: false}));
                    $(".link-text").on("click", function () {
                        _selfCommand.handleDetail($(this).attr('id'));
                    });
                }
            });
        },
        intoRelatedCase: function (groupinfo) {
            _selfCommand = this;
            var groupinfo = str2obj(groupinfo);
            $open('#caseListDiv', {width: 800, title: '&nbsp涉及案件'});

            var fullActivedCheck = $(".map-list").hasClass("full-panel");
            if (fullActivedCheck) {
                $("#top-mask", parent.document).height(0);
            }
            var openerDiv = $("#caseListDiv");
            openerDiv.find(".panel-container").empty().html(_.template(relationCaseTpl, {
                isOperation: false,
                groupcreator: groupinfo.creator,
                pgroupid: groupinfo.pgroupid
            }));
            $(".form-btn-block").addClass("hide");
            $("#relationCase").removeClass("form-body").find("#queryCondition").addClass("query-block").siblings("#relationCaseResult").removeClass("mrn mln");

            openerDiv.on('click', "#chooseCaseType", function () {
                dictOpener.openCaseType($(this));
            });
            //点击选择时间范围（当天当月当季当年）
            selectUtils.selectTimeRangeOption("#changeTimeScope", "#createtime", "#startTime", "#endTime");
            $("#caseListDiv #createtime").daterangepicker({
                separator: ' 至 ',
                showWeekNumbers: true,
                pickTime: true
            }, function (start, end, label) {
                $('#caseListDiv #startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                $('#caseListDiv #endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
            });
            //点击多选案件状态
            $("#caseListDiv .dictInLineSelect").dictInLineSelect();
            selectUtils.selectTextMultiOpt("#changeCaseSta", "caseSta");

            openerDiv.on("click", "#resetBtn", function () {
                selectUtils.clearQueryValue();
                return false;
            });
            openerDiv.on("click", "#queryBtn", function () {
                _selfCommand.queryRelatedCaseList(groupinfo);
                return false;
            });
            _selfCommand.queryRelatedCaseList(groupinfo);
        },
        queryRelatedCaseList: function (groupInfo) {
            _selfCommand = this;
            var param = {
                isInGroup: true,
                groupId: groupInfo.id,
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
                        isOperation: false,
                        groupid: groupInfo.id,
                        groupcreator: groupInfo.creator,
                        pgroupid: groupInfo.pgroupid
                    }));
                    $('.span').span();
                }
            });
        },
    }
});