/**
 * Created by dell on 2017/9/20.
 */
importing('currentDate');
define(['underscore',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/specialCaseGroupList.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/specialCaseGroupListTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/specialCaseGroupAdd.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/archivePage.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/broadcastPage.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupList.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/caseList.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/caseListTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/caseInfo.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/userList.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/userListTr.html',
    'text!/view/chatPage/chatPage.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/baseInfo.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCase.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCaseTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupStaff.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupStaffTr.html',
    '../dat/specialCaseGroup.js',
    '../../dictManage/src/dictOpener.js'], function (_, specialCaseGroupListTpl, specialCaseGroupListTrTpl, specialCaseGroupAddTpl, archivePageTpl,broadcastPageTpl, groupListTpl, caseListTpl, caseListTrTpl,caseInfoTpl,
                                                     userListTpl, userListTrTpl, chatPageTpl, baseInfoTpl, relationCaseTpl, relationCaseTrTpl, groupStaffTpl, groupStaffTrTpl,
                                                     specialCaseGroupAjax,dictOpener) {
    return {
        showList: function () {
            _self = this;
            //关闭没有关闭的弹框
            dictOpener.closeOpenerDiv();
            $("#mainDiv").empty().html(_.template(specialCaseGroupListTpl, {ops: top.opsMap}));
            $("#createtime").daterangepicker({
                separator: ' 至 ',
                showWeekNumbers: true,
                pickTime: true
            }, function (start, end, label) {
                $('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                $('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
            });
            //点击选择时间范围（当天当月当季当年）
            /***参数：（被点击的div包裹层，显示的时间输入框，传入后台的开始时间，传入后台的结束时间）***/
            selectUtils.selectTimeRangeOption("#changeTimeScope", "#createDate", "#startTime", "#endTime");

            //点击选择是否
            /***参数：（被点击的div包裹层，传入后台的参数）***/
            selectUtils.selectTextOption("#changeBackupStatu", "#backupStatu");

            $("#chooseCreatName").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            $("#chooseStaff").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            $("#chooseUnit").on('click', function () {
                dictOpener.openChooseDict($(this));
            });

            $("#resetBtn").on("click", function () {
                console.info("专案组管理重置按钮");
            });
            $("#queryBtn").on("click", function () {
                console.info("专案组管理查询按钮");
                _self.queryList();
            });
            $("#addSpecialCaseGroup").on("click", function () {
                console.info("专案组新增按钮");
                _self.showAdd();
            });
            $("#addCaseGroupOfGroup").on("click", function () {
                console.info("专案组组内建组按钮");
                _self.addGroupOfGroup();
            });
            _self.queryList();
            _self.oneChoose();//限制单选
        },
        //查询功能
        queryList: function () {
            var param = $("#queryCondition").serializeObject();
            $.extend(param, {
                // startTime:$("#startTime").val(),
                // endTime:$("#endTime").val(),
                // name:$.trim($("#name").val()),
                // regName:$.trim($("#regName").val()),
                // totalFund:parseFloat($.trim($("#totalFund").val()))*10000
            });
            // $('#specialGroupListResult').pagingList({
            //     action:top.servicePath_xz+'/group/getGroupPage',
            //     jsonObj:param,
            //     callback:function(data){
            //
            //     }
            // });
            var data = [
                {
                    "rownum": 0,
                    "id": "BD54F18C24874DBE934472CD21EBC6BB",
                    "groupnum": "ABCDEFGHABCDEFGHABCDEFGH12346157",
                    "groupname": "测试项目1",
                    "grouptype": "0",
                    "caseNum": 4,
                    "creator": "张三",
                    "num": "10",
                    "createtime": "2017-07-06 18:00:16",
                    "backupStatu": 0,
                    "backupTime": "2017-09-04 11:59:09"
                },
                {
                    "rownum": 1,
                    "id": "06FB300E23AB4630B1153637D7C655E6",
                    "groupnum": "E3E47DAB3F1F44C7BD02ED9E91C6D951",
                    "groupname": "一长四必项目",
                    "grouptype": "1",
                    "caseNum": 1,
                    "creator": "超级管理员",
                    "num": "5",
                    "createtime": "2017-07-05 18:00:16",
                    "backupStatu": 1,
                    "backupTime": "2017-09-07 11:59:09"
                }
            ];
            $("#specialGroupListTable tbody").empty().html(_.template(specialCaseGroupListTrTpl, { data: data, ops: top.opsMap }));
            $(".link-text").on("click", function () {
                console.info("专案组详情按钮");
                _self.showEdit();
            });
            $(".into-archive").on("click", function () {
                $open('#archiveBlock', {width: 800, top: 180, title: '&nbsp专案组归档'});
                $("#archiveBlock .panel-container").empty().html(_.template(archivePageTpl));
                $("#archiveBlock").on("click","#cancelBtn",function () {

                    $("#archiveBlock").$close();
                });
                $("#archiveBlock").on("click","#saveBtn",function () {
                    $("#archiveBlock").$close();
                });
            });
            $(".into-broadcast").on("click", function () {
                $open('#archiveBlock', {width: 800, top: 180, title: '&nbsp专案组广播'});
                $("#archiveBlock .panel-container").empty().html(_.template(broadcastPageTpl));
                $("#archiveBlock").on("click","#cancelBtn",function () {

                    $("#archiveBlock").$close();
                });
                $("#archiveBlock").on("click","#saveBtn",function () {
                    $("#archiveBlock").$close();
                });
            });
            $(".into-communication").on("click", function () {
                console.info("进入聊天界面！");
                // $("#mainDiv").empty().html(_.template(chatPageTpl));
                $open('#archiveBlock', {width: 840,height: 700, title: '&nbsp专案组群聊'});
                // $("#archiveBlock .form-content").empty().html(_.template(chatPageTpl));
                var iframe = '<iframe id="mapSvgFrame" class="tab-content-frame" src="/view/chatPage/chatPage.html" width="100%" height="510px"></iframe>';
                $("#archiveBlock .panel-container").css("margin","0px").empty().html(_.template(iframe));
            });
            //嵌套表格的实现--------------------------------------------------------------------------------------------
            $(".into-group").on('click', function () {
                var isOpen = $(this).hasClass("clicked-open");
                var data1 = [
                    {
                        "rownum": 0,
                        "id": "BD54F18C24874DBE934472CD21EBC6BB",
                        "groupId": "ABCDEFGHABCDEFGHABCDEFGH12346157",
                        "groupName": "测试项目1",
                        "groupType": "0",
                        "caseNum": 4,
                        "createName": "张三",
                        "staffNum": "10",
                        "createTime": "2017-07-06 18:00:16",
                        "fileStatus": 0,
                        "fileTime": "2017-09-04 11:59:09"
                    },
                    {
                        "rownum": 1,
                        "id": "06FB300E23AB4630B1153637D7C655E6",
                        "groupId": "E3E47DAB3F1F44C7BD02ED9E91C6D951",
                        "groupName": "一长四必项目",
                        "groupType": "1",
                        "caseNum": 1,
                        "createName": "超级管理员",
                        "staffNum": "5",
                        "createTime": "2017-07-05 18:00:16",
                        "fileStatus": 1,
                        "fileTime": "2017-09-07 11:59:09"
                    }
                ];
                var currentTr = $(this).parents("tr");
                if (isOpen) {
                    $(this).removeClass("clicked-open");
                    currentTr.next().remove();
                } else {
                    $(this).addClass("clicked-open");
                    var tableHtml = _.template(groupListTpl, {data: data1});
                    console.info(tableHtml);
                    console.info($(tableHtml));
                    //嵌套内容渲染
                    var appendTr = currentTr.after('<tr class="tr-inner-table"><td colspan="12"></td></tr>');
                    currentTr.next().find("td").empty().html(tableHtml);
                    $(".into-broadcast").on("click", function () {
                        $open('#archiveBlock', {width: 800, top: 180, title: '&nbsp专案组广播'});
                        $("#archiveBlock .panel-container").empty().html(_.template(broadcastPageTpl));
                        $("#archiveBlock").on("click","#cancelBtn",function () {

                            $("#archiveBlock").$close();
                        });
                        $("#archiveBlock").on("click","#saveBtn",function () {
                            $("#archiveBlock").$close();
                        });
                    });
                }
            });
        },
        showAdd: function () {
            _self = this;
            $("#mainDiv").empty().html(_.template(specialCaseGroupAddTpl));
            var flag = false;
            $('#addGroupTab a').click(function (e) {
                if ($(this).attr("id") == "navBaseInfo") {
                    $(this).tab('show');
                    //判断是否有专案组信息
                    //如果有：展示基本信息
                    //否则：报错
                    toast("是否保存过专案组基本信息？").warn();
                    _self.handleBaseInfo(flag);
                } else if ($(this).attr("id") == "navRelationCase") {
                    $('#baseInfo .field-valid').validatebox();
                    if ($('.validatebox-invalid').length > 0) {
                        toast("请先保存专案组基本信息！").warn();
                        return false;
                    } else {
                        $(this).tab('show');
                        //保存专案组基本信息
                        // $("#btnBaseInfo #saveBtn").trigger("click");
                        flag = true;
                        _self.handleRelationCase();
                    }
                } else if ($(this).attr("id") == "navGroupStaff") {
                    $('#baseInfo .field-valid').validatebox();
                    if ($('.validatebox-invalid').length > 0) {
                        toast("请先保存专案组基本信息！").warn();
                        return false;
                    } else {
                        $(this).tab('show');
                        //保存专案组基本信息
                        // $("#btnBaseInfo #saveBtn").trigger("click");
                        flag = true;
                        _self.handleGroupStaff();
                    }
                }
            });
            $('#addGroupTab a:first').click();
        },
        addGroupOfGroup: function () {
            _self = this;
            var radio = [];
            $('#specialGroupListTable').find('tbody input:checkbox[name=group]:checked').each(function (i, e) {
                radio.push($(e).val());
            });
            if (radio.length > 0) {
                //do something
                _self.showAdd();
            } else {
                toast("请选择一个专案组！", 600).warn()
            }
        },
        oneChoose:function(){
            $('#specialGroupListTable input:checkbox[name=group]').on("click",function(){
                if($(this).is(':checked')){
                    $(this).attr('checked', true).parent().parent().siblings().find("input:checkbox[name=group]").attr('checked', false);
                } else {
                    $(this).prop("checked",false);
                }
            });
        },
        showEdit: function () {
            _self = this;
            $("#mainDiv").empty().html(_.template(specialCaseGroupAddTpl));
            $('#addGroupTab a').click(function (e) {
                if ($(this).attr("id") == "navBaseInfo") {
                    $(this).tab('show');
                    _self.showBaseInfo();
                } else if ($(this).attr("id") == "navRelationCase") {
                    $(this).tab('show');
                    _self.handleRelationCase();
                } else if ($(this).attr("id") == "navGroupStaff") {
                    $(this).tab('show');
                    _self.handleGroupStaff();
                }
            });
            $('#addGroupTab a:first').click();
        },
        handleBaseInfo: function (flag) {
            _self = this;
            $(".form-content-block").empty().html(_.template(baseInfoTpl));
            $(".form-btn-block").removeClass("hide");
            if (flag) {
                //已经保存过 输入框设值 并且不可修改 不可提交
                $("#baseInfo").find("input,select,i").attr("disabled", "disabled").val("def ");
            } else {
                // $("#baseInfo")
                $("#chooseGroupType").on('click', function () {
                    dictOpener.openChooseDict($(this));
                });
                $("#btnBaseInfo #saveBtn").on("click", function () {
                    toast("保存专案组基本信息").ok();
                    $('#addGroupTab a#navRelationCase').trigger("click");
                    $('#addGroupTab a#navRelationCase').on("click", function () {
                        $('#baseInfo .field-valid').validatebox();
                        if ($('.validatebox-invalid').length > 0) {
                            toast("请先保存专案组基本信息！").warn();
                            return false;
                        } else {
                            //保存专案组基本信息

                            $(this).tab('show');
                            flag = true;
                            _self.handleRelationCase();
                        }
                    });
                });
                $("#btnBaseInfo #exitBtn").off("click").on("click", function () {
                    _self.showList();

                });
            }
        },
        showBaseInfo: function () {
            _self = this;
            $(".form-content-block").empty().html(_.template(baseInfoTpl));
            $(".form-btn-block").removeClass("hide");
            $(".form-btn-block #saveBtn").attr("id", "nextBtn").text("下一项");
            $(".form-btn-block #nextBtn").on("click", function () {
                $('#addGroupTab a#navRelationCase').trigger("click");
                $('#addGroupTab a#navRelationCase').on("click", function () {
                    $(this).tab('show');
                    _self.handleRelationCase();
                });
            });
            $("#baseInfo").find("input,select,i").attr("disabled", "disabled");
            $(".form-btn-block #revokeBtn").on("click", function () {
                //如果归档状态为已归档 显示按钮 并执行撤销操作
            });

        },
        handleRelationCase: function () {
            _self = this;
            $(".form-content-block").empty().html(_.template(relationCaseTpl));
            $(".form-btn-block").addClass("hide");

            $("#chooseCaseType").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            $("#occurrenceDate").datetimepicker({format:'YYYY-MM-DD',pickTime:false});
            $("#relationCase").on("click", "#resetBtn", function () {
                console.info("涉及案件重置按钮");

            });
            $("#relationCase").on("click", "#queryBtn", function () {
                console.info("涉及案件查询按钮");
                _self.queryRelationCaseList();
            });

            //加载已关联案件列表
            _self.queryRelationCaseList();
            //点击多选案件状态
            /***参数：（被点击的div包裹层，传入后台的参数）***/
            selectUtils.selectTextMultiOpt("#changeCaseSta", "caseSta");
            //关联新案件
            $("#linkNewCase").on("click", function () {
                console.info("涉及案件关联新案件按钮");
                $open('#caseListDiv', {width: 800, title: '&nbsp案件查询'});
                $("#caseListDiv .panel-container").empty().html(_.template(caseListTpl));
                $("#caseListDiv #occurrenceDate").datetimepicker({format:'YYYY-MM-DD',pickTime:false});
                $("#caseListDiv #acceptDate").datetimepicker({format:'YYYY-MM-DD',pickTime:false});
                $("#caseListDiv").on('click',"#chooseAcceptUint", function () {
                    dictOpener.openChooseDict($(this));
                });
                selectUtils.selectTextOption("#caseListDiv #changeCaseSta", "#caseSta");
                selectUtils.selectTextOption("#caseListDiv #changeCaseType", "#caseType");

                $("#caseListDiv").on("click", "#resetBtn", function () {
                    console.info("案件重置按钮");
                });
                $("#caseListDiv").on("click", "#queryBtn", function () {
                    console.info("案件查询按钮");
                    _self.queryCaseList();
                });

                //加载案件列表
                _self.queryCaseList();
            });
        },
        queryRelationCaseList: function () {
            _self = this;
            var data = [
                {
                    "rownum": 1,
                    "id": "BD54F18C24874DBE934472CD21EBC6BB",
                    "caseId": "A4401010002017031100012",
                    "caseName": "916特大杀人案",
                    "caseType": "刑事",
                    "caseStatus": "已立案",
                    "caseKindle": "持枪杀人案",
                    "caseContent": "916特大杀人案，犯罪嫌疑人在市政大厦...",
                    "casePlace": "越秀中环市政大厦",
                    "caseStaff": "李四"
                }
            ];
            $("#relationCaseTable tbody").empty().html(_.template(relationCaseTrTpl, {
                data: data,
                ops: top.opsMap
            }));

            $("#relationCaseTable").on("click",".link-text", function () {
                console.info("案件详情按钮");
                $open('#userListDiv', {width: 800, title: '&nbsp案件详情'});
                _self.showCaseInfo();
            });
            $(".into-delete").on("click", function () {
                console.info("移除案件按钮");
                _self.delCase($(this).attr('id'));

            });
        },
        queryCaseList: function () {
            _self = this;
            var data = [
                {
                    "rownum": 1,
                    "id": "BD54F18C24874DBE934472CD21EBC6BB",
                    "caseId": "A4401010002017031100012",
                    "caseName": "916特大杀人案",
                    "caseType": "刑事",
                    "caseStatus": "已立案",
                    "caseKindle": "持枪杀人案",
                    "caseContent": "916特大杀人案，犯罪嫌疑人在市政大厦...",
                    "casePlace": "越秀中环市政大厦",
                    "caseStaff": "李四"
                },
                {
                    "rownum": 2,
                    "id": "BD54F18C24874DBE934472CD21EBC633",
                    "caseId": "A4401010002017030800001",
                    "caseName": "持枪挟持绑架案",
                    "caseType": "刑事",
                    "caseStatus": "已立案",
                    "caseKindle": "绑架案",
                    "caseContent": "接群众报警，称其丈夫被人持枪挟持绑...",
                    "casePlace": "越秀中环市政大厦",
                    "caseStaff": "李四"
                }
            ];
            $("#caseTable tbody").empty().html(_.template(caseListTrTpl, {
                data: data,
                ops: top.opsMap
            }));
            $("#caseTable").on("click",".link-text", function () {
                console.info("案件详情按钮");
                $open('#userListDiv', {width: 800, title: '&nbsp案件详情'});
                _self.showCaseInfo();
            });
            $("#caseTable #selectAll").on('click', function () {
                $('#caseTable').find('tbody input:checkbox').prop('checked', this.checked);
            });
            //关联新案件
            $("#saveLinkBtn").on('click', function () {
                console.info("关联案件保存按钮");
                var checkbox = [];
                $('#caseTable').find('tbody input:checkbox:checked').each(function (i, e) {
                    checkbox.push($(e).val());
                });
                if (checkbox.length > 0) {
                    // var ids = checkbox.join(",");
                    // var orgName = $("#myProjectUnit u.active").attr("val");
                    //
                    // $("#applySum-form").html("");
                    // $("#applySum-form").attr("action", top.servicePath + '/sw/report/exesApplySum');
                    // $("#applySum-form").append("<input type='hidden' name='ids' value='" + ids + "'/>");
                    // $("#applySum-form").append("<input type='hidden' name='orgName' value='" + orgName + "'/>");
                    // $("#applySum-form").attr("target", "winExesApplySum");//打开新窗口
                    // $("#applySum-form").attr("onsubmit", function openwin(){window.open('about:blank', 'winExesApplySum', 'width=800,height=600');});
                    // $("#applySum-form").submit();

                    $('#caseListDiv').$close();
                } else {
                    toast("请至少选择一个案件！", 600).warn()
                }
            });
            $("#caseListDiv").on('click', "#cancelBtn", function () {
                $('#caseListDiv').$close();
            });
        },
        showCaseInfo:function () {
            _self = this;
            $("#userListDiv .panel-container").empty().html(_.template(caseInfoTpl));
        },
        delCase: function (id) {
            console.info("移除案件事件" + id);
        },
        handleGroupStaff: function () {
            _self = this;
            $(".form-content-block").empty().html(_.template(groupStaffTpl));
            $(".form-btn-block").addClass("hide");
            $("#groupStaff").on('click',"#chooseUint", function () {
                dictOpener.openChooseDict($(this));
            });
            $("#groupStaff").on("click", "#resetBtn", function () {
                console.info("组内成员重置按钮");
            });
            $("#groupStaff").on("click", "#queryBtn", function () {
                console.info("组内成员查询按钮");
                _self.queryAddedStaffList();
            });
            //加载已添加的成员
            _self.queryAddedStaffList();
            //成员添加
            $("#addStaff").on("click", function () {
                console.info("添加成员按钮");
                $open('#userListDiv', {width: 800, title: '&nbsp用户查询'});
                $("#userListDiv .panel-container").empty().html(_.template(userListTpl));
                $("#userListDiv").on('click',"#chooseUint", function () {
                    dictOpener.openChooseDict($(this));
                });
                $("#userListDiv").on("click", "#resetBtn", function () {
                    console.info("用户重置按钮");
                });
                $("#userListDiv").on("click", "#queryBtn", function () {
                    console.info("用户查询按钮");
                    _self.queryUserList();
                });

                //加载用户列表
                _self.queryUserList();
            });
        },
        queryAddedStaffList: function () {
            _self = this;
            var data = [
                {
                    "rownum": 1,
                    "id": "BD54F18C24874DBE934472CD21EBC6BB",
                    "userName": "李四",
                    "userId": "001234",
                    "userPhone": "15111224301",
                    "userUnit": "越秀分局刑事侦查科",
                    "userPost": "领导",
                    "userStatus": "正常"
                }
            ];
            $("#staffTable tbody").empty().html(_.template(groupStaffTrTpl, {
                data: data,
                ops: top.opsMap
            }));
            $(".into-delete").on("click", function () {
                console.info("移除组内成员按钮");
                _self.delGroupStaff($(this).attr('id'));
            });
        },
        queryUserList: function () {
            _self = this;
            var data = [
                {
                    "rownum": 1,
                    "id": "BD54F18C24874DBE934472CD21EBC6BB",
                    "userName": "李四",
                    "userId": "001234",
                    "userPhone": "15111224301",
                    "userUnit": "越秀分局刑事侦查科",
                    "userPost": "领导",
                    "userStatus": "正常"
                },
                {
                    "rownum": 2,
                    "id": "BD54F18C24874DBE934472CD21EBC6BB",
                    "userName": "张三",
                    "userId": "001999",
                    "userPhone": "13122291122",
                    "userUnit": "越秀分局刑事侦查科",
                    "userPost": "科员",
                    "userStatus": "正常"
                },
                {
                    "rownum": 3,
                    "id": "BD54F18C24874DBE934472CD21EBC6BB",
                    "userName": "王五",
                    "userId": "061399",
                    "userPhone": "13926541535",
                    "userUnit": "越秀分局刑事侦查科",
                    "userPost": "局长",
                    "userStatus": "正常"
                }
            ];
            $("#userTable tbody").empty().html(_.template(userListTrTpl, {
                data: data,
                ops: top.opsMap
            }));
            $("#userTable #selectAll").on('click', function () {
                $('#userTable').find('tbody input:checkbox').prop('checked', this.checked);
            });
            $("#saveStaffBtn").on('click', function () {
                console.info("添加成员保存按钮");
                var checkbox = [];
                $('#userTable').find('tbody input:checkbox:checked').each(function (i, e) {
                    checkbox.push($(e).val());
                });
                if (checkbox.length > 0) {
                    // var ids = checkbox.join(",");
                    // var orgName = $("#myProjectUnit u.active").attr("val");
                    //
                    // $("#applySum-form").html("");
                    // $("#applySum-form").attr("action", top.servicePath + '/sw/report/exesApplySum');
                    // $("#applySum-form").append("<input type='hidden' name='ids' value='" + ids + "'/>");
                    // $("#applySum-form").append("<input type='hidden' name='orgName' value='" + orgName + "'/>");
                    // $("#applySum-form").attr("target", "winExesApplySum");//打开新窗口
                    // $("#applySum-form").attr("onsubmit", function openwin(){window.open('about:blank', 'winExesApplySum', 'width=800,height=600');});
                    // $("#applySum-form").submit();

                    $('#userListDiv' +
                    '').$close();
                } else {
                    toast("请至少选择一个用户！", 600).warn()
                }
            });
            $("#userListDiv").on('click', "#cancelBtn", function () {
                $('#userListDiv').$close();
            });
        },
        delGroupStaff: function (id) {
            console.info("移除成员事件" + id);

        }
    }
});