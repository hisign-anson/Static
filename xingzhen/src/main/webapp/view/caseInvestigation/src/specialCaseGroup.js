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
    'text!/view/caseInvestigation/tpl/specialCaseGroup/baseInfo.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCase.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCaseTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupStaff.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupStaffTr.html',
    'text!/view/chatPage/tpl/chatPage.html',
    'text!/view/tpl_EmptyOrError/emptyDataPage.html',
    '../dat/specialCaseGroup.js',
    '../../dictManage/src/dictOpener.js',
    '../../userInfoManage/dat/userInfo.js'], function (_, specialCaseGroupListTpl, specialCaseGroupListTrTpl, specialCaseGroupAddTpl, archivePageTpl, broadcastPageTpl, groupListTpl, caseListTpl, caseListTrTpl, caseInfoTpl,
                                                       userListTpl, userListTrTpl, baseInfoTpl, relationCaseTpl, relationCaseTrTpl, groupStaffTpl, groupStaffTrTpl, chatPageTpl, emptyDataPage,
                                                       specialCaseGroupAjax, dictOpener, userInfoAjax) {
    return {
        showList: function () {
            _self = this;
            // //关闭没有关闭的弹框
            // dictOpener.closeOpenerDiv();
            $("#mainDiv").empty().html(_.template(specialCaseGroupListTpl, {ops: top.opsMap}));

            $("#chooseCreateName").on('click', function () {
                dictOpener.openUserChoosePort($(this));
            });
            //点击选择时间范围（当天当月当季当年）
            selectUtils.selectTimeRangeOption("#changeTimeScope", "#createtime", "#startTime", "#endTime");
            $("#createtime").daterangepicker({
                separator: ' 至 ',
                showWeekNumbers: true,
                pickTime: true
            }, function (start, end, label) {
                $('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                $('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
            });
            $("#chooseStaff").on('click', function () {
                // dictOpener.openChoosePort($(this),$post,"/group/getGroupPage",{},"groupname","groupnum");
                dictOpener.openUserChoosePort($(this));
            });
            $("#chooseBelongUnit").on('click', function () {
                dictOpener.openUnitChoosePort($(this));
            });
            selectUtils.selectTextOption("#changeBackupStatu", "#backupStatu");


            $("#resetBtn").on("click", function () {
                console.info("专案组管理重置按钮");
                selectUtils.clearQueryValue();
                return false;
            });
            $("#queryBtn").on("click", function () {
                console.info("专案组管理查询按钮");
                _self.queryList();
                return false;
            });
            $("#addSpecialCaseGroup").on("click", function () {
                _self.showAdd();
            });
            $("#addCaseGroupOfGroup").on("click", function () {
                _self.addGroupOfGroup();
            });
            _self.queryList();
        },
        //查询功能
        queryList: function () {
            _self = this;
            var userParam = str2obj($("#membername").attr("paramattr"));
            var param = {
                ajbh: $.trim($("#ajbh").val()),
                backupStatu: $("#backupStatu").val(),
                creator: $.trim($("#creator").val()),
                deparmentcode: $.trim($("#deparmentcode").val()),
                groupname: $.trim($("#groupname").val()),
                groupnum: $.trim($("#groupnum").val()),
                memberId: userParam ? userParam.userId : "",
                endTime: $("#endTime").val(),
                startTime: $("#startTime").val(),
                userId: top.userId
            };
            $('#specialGroupListResult').pagingList({
                action: top.servicePath_xz + '/group/getGroupPage',
                jsonObj: param,
                callback: function (data) {
                    $("#specialGroupListTable tbody").empty().html(_.template(specialCaseGroupListTrTpl, {
                        data: data,
                        ops: top.opsMap
                    }));
                    _self.oneChoose();//限制单选

                    $(".span").span();
                    $(".link-text").on("click", function () {
                        _self.showEdit($(this).attr("groupid"));
                    });
                    $(".into-archive").on("click", function () {
                        _self.groupBackupAdd($(this).attr("groupid"));
                    });
                    $(".into-broadcast").on("click", function () {
                        _self.groupBroadcast($(this).attr("groupid"), $(this).attr("jmgid"));
                    });
                    $(".into-communication").on("click", function () {
                        var groupid = $(this).attr("groupid");
                        var jmgid = $(this).attr("jmgid");

                        $open('#archiveBlock', {width: 840, height: 700, title: '&nbsp专案组群聊'});
                        $("#archiveBlock .panel-container").css("margin-top", "0").empty().html(_.template(chatPageTpl));
                        window.parent.jchatGloabal.getUserInfo();
                        window.parent.jchatGloabal.getGroupInfo(jmgid);
                        window.parent.jchatGloabal.getGroupMembers(jmgid);
                        //离线消息同步监听
                        window.parent.jchatGloabal.onSyncConversation(jmgid);
                        //聊天消息实时监听
                        window.parent.jchatGloabal.onMsgReceive(jmgid);

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
                        $("#archiveBlock").parents(".window").find(".panel-tool-close").click(function () {
                            var chatParam = {
                                reserveField1: groupid,
                                createTime: rangeUtil.formatDate(rangeUtil.getCurrentDate(), 'yyyy-MM-dd'),
                                creator: top.userId,
                                content: "hah"
                            };
                            specialCaseGroupAjax.addChatLog(chatParam, function () {

                            })
                        });
                        // console.info(window.parent.JIM)
                        // console.info(window.parent.JIM.isLogin())
                        // console.info("进入聊天界面！");
                        // var iframe = '<iframe id="chartiFrame" class="tab-content-frame" src="/view/chatPage/chatPage.html" width="100%" height="640"></iframe>';
                        // $("#archiveBlock .panel-container").css("margin","0px").empty().html(_.template(iframe));
                    });
                    $(".into-group").on('click', function () {
                        _self.showGroupOfGroup($(this), $(this).attr("groupid"), $(this).attr("jmgid"), $(this).attr("groupinfo"));
                    });

                }
            });
        },
        groupBackupAdd: function (groupid) {
            _self = this;
            $open('#archiveBlock', {width: 800, top: 180, title: '&nbsp专案组归档'});
            $("#archiveBlock .panel-container").empty().html(_.template(archivePageTpl));
            $(".dict").dict();
            $("#archiveBlock #saveBtn").on("click",function (e) {
                var param = {
                    backupStatus: 1,
                    backupReason: $.trim($("#backupReason").val()),
                    backupTime: $("#backupTime").val(),
                    creator: top.userId,
                    deparmentcode: top.orgCode,
                    groupid: groupid,
                    policeId: top.policeId
                };
                specialCaseGroupAjax.groupBackup(param, function (r) {
                    if (r.flag == 1) {
                        toast('归档成功！', 600, function () {
                            $("#archiveBlock").$close();
                            _self.queryList();
                        }).ok()
                    } else {
                        toast(r.msg, 600).err();
                    }
                });
                e.stopPropagation();
            });
            $("#archiveBlock").on("click", "#cancelBtn", function () {
                $("#archiveBlock").$close();
            });
        },
        groupBroadcast: function (groupid, jmgid) {
            _self = this;
            $open('#archiveBlock', {width: 800, top: 180, title: '&nbsp专案组广播'});
            $("#archiveBlock .panel-container").empty().html(_.template(broadcastPageTpl));
            $("#archiveBlock #saveBtn").on("click", function (e) {
                var broadcastContent = $("#broadcastContent").val();
                //调用极光接口
                window.parent.clickHandle.sendBroadcastText(jmgid, broadcastContent);
                $("#archiveBlock").$close();
                e.stopPropagation();
            });

            $("#archiveBlock").on("click", "#cancelBtn", function () {
                $("#archiveBlock").$close();
            });
        },
        showGroupOfGroup: function (obj, groupid, jmgid, groupinfo) {
            _self = this;

            debugger;
            //嵌套表格的实现--------------------------------------------------------------------------------------------
            var groupinfo = str2obj(groupinfo);
            var isOpen = obj.hasClass("clicked-open");
            var currentTr = obj.parents("tr");
            var userParam = str2obj($("#membername").attr("paramattr"));
            if (isOpen) {
                obj.removeClass("clicked-open");
                currentTr.next().remove();
            } else {
                var param = {
                    userId: top.userId,
                    groupId: groupid,
                    memberName: userParam ? userParam.userName : ""
                };
                $.ajax({
                    url: top.servicePath_xz + '/group/getChildGroupList',
                    type: "post",
                    contentType: "application/x-www-form-urlencoded",
                    data: param,
                    success: function (r) {
                        if (r.flag == 1) {
                            if (r.data && r.data.length > 0) {
                                obj.addClass("clicked-open");
                                var tableHtml = _.template(groupListTpl, {data: r.data, parentData: groupinfo});
                                console.info(tableHtml);
                                console.info($(tableHtml));
                                //嵌套内容渲染
                                var appendTr = currentTr.after('<tr class="tr-inner-table"><td colspan="12"></td></tr>');
                                currentTr.next().find("td").empty().html(tableHtml);
                                $(".link-text").on("click", function () {
                                    _self.showEdit($(this).attr("groupid"));
                                });
                                $(".into-broadcast").on("click", function () {
                                    _self.groupBroadcast($(this).attr("groupid"), $(this).attr("jmgid"));
                                });
                                $(".into-communication").on("click", function () {
                                    var groupid = $(this).attr("groupid");
                                    var jmgid = $(this).attr("jmgid");

                                    $open('#archiveBlock', {width: 840, height: 700, title: '&nbsp专案组群聊'});
                                    $("#archiveBlock .panel-container").css("margin-top", "0").empty().html(_.template(chatPageTpl));
                                    window.parent.jchatGloabal.getUserInfo();
                                    window.parent.jchatGloabal.getGroupInfo(jmgid);
                                    window.parent.jchatGloabal.getGroupMembers(jmgid);
                                    //离线消息同步监听
                                    window.parent.jchatGloabal.onSyncConversation(jmgid);
                                    //聊天消息实时监听
                                    window.parent.jchatGloabal.onMsgReceive(jmgid);
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
                                    $("#archiveBlock").parents(".window").find(".panel-tool-close").click(function () {
                                        var chatParam = {
                                            reserveField1: groupid,
                                            createTime: rangeUtil.formatDate(rangeUtil.getCurrentDate(), 'yyyy-MM-dd'),
                                            creator: top.userId,
                                            content: "hah"
                                        };
                                        specialCaseGroupAjax.addChatLog(chatParam, function () {

                                        })
                                    });
                                });
                            } else {
                                toast("该专案组没有小组！", 600).warn();
                            }
                        }
                    }
                });
            }
        },
        showAdd: function (pgroupid, pgroupname) {
            _self = this;
            $("#mainDiv").empty().html(_.template(specialCaseGroupAddTpl, {data: null}));
            $('#addGroupTab a').click(function (e) {
                if ($(this).attr("id") == "navBaseInfo") {
                    var groupinfo = str2obj($(this).parents("#addGroupTab").attr("groupinfo"));
                    $(this).tab('show');
                    if (groupinfo) {
                        _self.showBaseInfo(groupinfo);
                    } else {
                        debugger;
                        _self.handleBaseInfo(pgroupid, pgroupname);
                    }
                } else if ($(this).attr("id") == "navRelationCase") {
                    var groupinfo = str2obj($(this).parents("#addGroupTab").attr("groupinfo"));
                    $('#baseInfo .field-valid').validatebox();
                    if ($('.validatebox-invalid').length > 0) {
                        toast("请先填写专案组基本信息！").warn();
                        return false;
                    } else {
                        $(this).tab('show');
                        if (groupinfo) {
                            _self.handleRelationCase(groupinfo);
                        } else {
                            //保存专案组基本信息
                            $("#btnBaseInfo #saveBtn").trigger("click");
                        }
                    }
                } else if ($(this).attr("id") == "navGroupStaff") {
                    var groupinfo = str2obj($(this).parents("#addGroupTab").attr("groupinfo"));
                    $('#baseInfo .field-valid').validatebox();
                    if ($('.validatebox-invalid').length > 0) {
                        toast("请先填写专案组基本信息！").warn();
                        return false;
                    } else {
                        $(this).tab('show');
                        if (groupinfo) {
                            _self.handleGroupStaff(groupinfo);
                        } else {
                            //保存专案组基本信息
                            $("#btnBaseInfo #saveBtn").trigger("click");
                        }
                    }
                }
            });
            $('#addGroupTab a:first').click();
        },
        addGroupOfGroup: function () {
            _self = this;
            var checkbox = [];
            $('#specialGroupListTable').find('tbody input:checkbox[name=group]:checked').each(function (i, e) {
                var groupInfo = {
                    groupname: $(e).attr('groupname'),
                    groupid: $(e).attr('groupid')
                };
                checkbox.push(groupInfo);
            });
            if (checkbox.length > 0) {
                //do something
                debugger;
                _self.showAdd(checkbox[0].groupid, checkbox[0].groupname);
            } else {
                toast("请选择一个专案组！", 600).warn()
            }
        },
        oneChoose: function () {
            $('#specialGroupListTable input:checkbox[name="group"]').on("click", function () {
                if ($(this).is(':checked')) {
                    $(this).attr('checked', true).parent().parent().siblings().find("input:checkbox[name='group']").attr('checked', false);
                } else {
                    $(this).prop("checked", false);
                }
            });
        },
        showEdit: function (id) {
            _self = this;
            $.ajax({
                url: top.servicePath_xz + '/group/groupDetail/' + id,
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                success: function (r) {
                    if (r.data) {
                        $("#mainDiv").empty().html(_.template(specialCaseGroupAddTpl, {data: r.data}));
                        $('#addGroupTab a').click(function (e) {
                            if ($(this).attr("id") == "navBaseInfo") {
                                $(this).tab('show');
                                _self.showBaseInfo(r.data);
                            } else if ($(this).attr("id") == "navRelationCase") {
                                $(this).tab('show');
                                _self.handleRelationCase(r.data);
                            } else if ($(this).attr("id") == "navGroupStaff") {
                                $(this).tab('show');
                                _self.handleGroupStaff(r.data);
                            }
                        });
                        $('#addGroupTab a:first').click();
                    }
                }
            });
        },
        handleBaseInfo: function (pgroupid, pgroupname) {
            _self = this;
            $(".form-content-block").empty().html(_.template(baseInfoTpl));
            $(".form-btn-block").removeClass("hide");
            $("#chooseGroupType").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            if (pgroupname) {
                //显示父专案组名字
                var html = '<div class="dict-opener"><input class="common-input" type="text" value="' + pgroupname + '" id="pgroupname" disabled style="width: 50%; display: inline-block;"><input class="common-input field-valid" type="text" name="" id="groupname" data-options="required:true" placeholder="请输入专案组名称" style="width: 50%;display: inline-block;"></div>'
                $("#groupname-span").next().remove();
                $("#groupname-span").parents(".equal-col-4").append(html);
            }
            //显示父专案组名字
            //var html = '<div class="dict-opener"><input class="common-input" type="text" value="'+pgroupname+'" id="pgroupname" disabled style="width: 50%; display: inline-block;"><input class="common-input field-valid" type="text" name="" id="groupname" data-options="required:true" placeholder="请输入专案组名称" style="width: 50%;display: inline-block;"></div>'
            //$("#groupname-span").next().remove();
            //$("#groupname-span").parents(".equal-col-4").append(html);
            $("#btnBaseInfo #saveBtn").on("click", function () {
                _self.saveGroupInfo(pgroupid, pgroupname);
            });
            $("#btnBaseInfo #exitBtn").off("click").on("click", function () {
                _self.showList();
            });
        },
        saveGroupInfo: function (pgroupid, pgroupname) {
            _self = this;
            $('.field-valid').validatebox();
            if ($('.validatebox-invalid').length > 0) {
                return false;
            }
            debugger
            var param = {
                createname: top.trueName,
                createtime: $("#createtime").val(),
                creator: top.userId,
                deparmentcode: top.orgCode,
                deparmentname: top.orgName,
                groupname: pgroupname ? pgroupname + "-" + $.trim($("#groupname").val()) : $.trim($("#groupname").val()),
                grouptype: $("#grouptype").val(),
                pgroupid: pgroupid ? pgroupid : ""
            };
            specialCaseGroupAjax.addGroup(param, function (r) {
                if (r.flag == 1) {
                    if (r.data.id) {
                        toast('保存成功！', 600).ok();
                        $('#addGroupTab').attr("groupinfo", obj2str(r.data));
                        $('#addGroupTab a#navRelationCase').trigger("click");
                    } else {
                        toast('保存失败！', 600).err();
                    }
                } else {
                    toast(r.msg, 600).err()
                }
            });
        },
        showBaseInfo: function (groupInfo) {
            _self = this;
            //专案组id存在
            if (groupInfo.id) {
                $(".form-content-block").empty().html(_.template(baseInfoTpl));
                $("#grouptype").siblings("i#chooseGroupType").remove();
                $("#baseInfo").find("input,select").attr("disabled", "disabled");
                $(".form-btn-block").removeClass("hide");
                $(".form-btn-block #saveBtn").attr("id", "nextBtn").text("下一项");
                //赋值
                $("#groupname").val(groupInfo.groupname);
                $("#grouptype").val(groupInfo.grouptype);
                $("#grouptypeName").val(groupInfo.grouptypeName);
                $("#createname").val(groupInfo.createname);
                $("#deparmentcode").val(groupInfo.deparmentname);
                $("#createtime").val(rangeUtil.formatDate(groupInfo.createtime, 'yyyy-MM-dd'));

                $(".form-btn-block #nextBtn").on("click", function () {
                    $('#addGroupTab').attr("groupinfo", obj2str(groupInfo));
                    $('#addGroupTab a#navRelationCase').trigger("click");
                    $('#addGroupTab a#navRelationCase').on("click", function () {
                        $(this).tab('show');
                        _self.handleRelationCase(groupInfo);
                    });
                });
                if (groupInfo.backupStatu && groupInfo.backupStatu == 1 && groupInfo.creator == top.userId) {
                    $(".form-btn-block #revokeBtn").removeClass("hide");
                } else {
                    $(".form-btn-block #revokeBtn").addClass("hide");
                }
                $(".form-btn-block #revokeBtn").on("click", function () {
                    //如果归档状态为已归档 显示按钮 并执行撤销操作
                    $confirm('确定对【' + groupInfo.groupname + '】进行撤销归档操作吗？', function (bol) {
                        if (bol) {
                            var param = {
                                backupStatus: 0,
                                backupReason: "",
                                backupTime: "",
                                creator: top.userId,
                                deparmentcode: top.orgCode,
                                groupid: groupInfo.id,
                                policeId: top.policeId
                            };
                            specialCaseGroupAjax.groupBackup(param, function (r) {
                                if (r.flag) {
                                    toast("撤销归档成功", 600, function () {
                                        _self.showList();
                                    }).ok();
                                }
                            });
                        }
                    });
                });
                $(".form-btn-block #exitBtn").on("click", function () {
                    _self.showList();
                });

            }

        },
        handleRelationCase: function (groupInfo) {
            _self = this;
            $(".form-content-block").empty().html(_.template(relationCaseTpl, {
                isOperation: true,
                groupcreator: groupInfo.creator,
                pgroupid: groupInfo.pgroupid
            }));
            $(".form-btn-block").addClass("hide");

            $("#relationCase #chooseCaseType").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            //点击选择时间范围（当天当月当季当年）
            selectUtils.selectTimeRangeOption("#changeTimeScope", "#createtime", "#startTime", "#endTime");
            $("#createtime").daterangepicker({
                separator: ' 至 ',
                showWeekNumbers: true,
                pickTime: true
            }, function (start, end, label) {
                $('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                $('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
            });
            //点击多选案件状态
            $(".dictInLineSelect").dictInLineSelect();
            // selectUtils.selectTextMultiOpt("#relationCase [dict-id='ajstate']", "ajstate");

            $("#relationCase #resetBtn").on("click", function () {
                selectUtils.clearQueryValue();
                return false;
            });
            $("#relationCase #queryBtn").on("click", function () {
                _self.queryRelationCaseList(groupInfo);
                return false;
            });
            //加载已关联案件列表
            _self.queryRelationCaseList(groupInfo);
            //关联新案件
            $("#relationCase #linkNewCase").on("click", function () {
                console.info("涉及案件关联新案件按钮");
                $open('#caseListDiv', {width: 960, title: '&nbsp案件查询'});
                $("#caseListDiv .panel-container").empty().html(_.template(caseListTpl, {groupid: groupInfo.id}));

                //点击选择时间范围（当天当月当季当年）
                selectUtils.selectTimeRangeOption("#caseListDiv #changeTimeScope", "#caseListDiv #occurrenceDate", "#caseListDiv #startTime", "#caseListDiv #endTime");
                $("#caseListDiv #occurrenceDate").daterangepicker({
                    separator: ' 至 ',
                    showWeekNumbers: true,
                    pickTime: true
                }, function (start, end, label) {
                    $('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                    $('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
                });

                //点击选择时间范围（当天当月当季当年）
                selectUtils.selectTimeRangeOption("#caseListDiv #changeTimeSL", "#caseListDiv #acceptDate", "#caseListDiv #slStartTime", "#caseListDiv #slEndTime");
                $("#caseListDiv #acceptDate").daterangepicker({
                    separator: ' 至 ',
                    showWeekNumbers: true,
                    pickTime: true
                }, function (start, end, label) {
                    $('#slStartTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                    $('#slEndTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
                });
                //点击多选案件状态
                $("#caseListDiv .dictInLineSelect").dictInLineSelect();
                // selectUtils.selectTextMultiOpt("#changeCaseSta", "caseSta");
                // selectUtils.selectTextMultiOpt("#caseListDiv [dict-id='ajstate']", "ajstate");

                $("#caseListDiv #chooseCaseType").on('click', function () {
                    dictOpener.openChooseDict($(this));
                });
                $("#caseListDiv #resetBtn").on("click", function () {
                    selectUtils.clearQueryValue();
                    return false;
                });
                $("#caseListDiv #queryBtn").on("click", function () {
                    console.info("案件查询按钮");
                    _self.queryCaseList(groupInfo);
                    return false;
                });

                //加载案件列表
                _self.queryCaseList(groupInfo);
                return false;
            });
        },
        queryRelationCaseList: function (groupInfo, isGraphOperation) {
            _self = this;
            var param = {
                isInGroup: true,
                groupId: groupInfo.pgroupid ? groupInfo.pgroupid : groupInfo.id,
                ab: $.trim($("#abCode").val()),
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
                        isOperation: isGraphOperation == false ? false : true,
                        groupid: groupInfo.id,
                        groupcreator: groupInfo.creator,
                        pgroupid: groupInfo.pgroupid
                    }));
                    $('.span').span();

                    $("#relationCaseTable").off("click").on("click", ".link-text", function () {
                        console.info("案件详情按钮");
                        _self.showCaseInfo($(this).attr("ajid"));
                    });
                    $(".into-delete").off("click").on("click", function () {
                        _self.delCase(groupInfo, $(this).attr('id'), $(this).attr('ajbh'), $(this).attr('ajmc'));
                    });

                }
            });
        },
        queryCaseList: function (groupInfo) {
            _self = this;
            var param = {
                isInGroup: false,
                groupId: groupInfo.id,
                ab: $("#caseListDiv #abCode").val(),
                ajbh: $.trim($("#caseListDiv #ajbh").val()),
                ajmc: $.trim($("#caseListDiv #ajmc").val()),
                ajstate: $("#caseListDiv #ajstateAll").val(),
                fadd: $.trim($("#caseListDiv #fadd").val()),
                endTime: $("#caseListDiv #endTime").val(),
                startTime: $("#caseListDiv #startTime").val(),
                slEndTime: $("#caseListDiv #slEndTime").val(),
                slStartTime: $("#caseListDiv #slStartTime").val()
            };
            debugger
            $('#caseListDiv #caseListResult').pagingList({
                action: top.servicePath_xz + '/asjAj/getAjGroupPage',
                jsonObj: param,
                callback: function (data) {
                    $("#caseTable tbody").empty().html(_.template(caseListTrTpl, {data: data}));
                    $(".span").span();
                    $("#caseTable").on("click", ".link-text", function () {
                        console.info("案件详情按钮");
                        // $open('#userListDiv', {width: 900, title: '&nbsp案件详情'});
                        _self.showCaseInfo($(this).attr("ajid"));
                    });
                    $(".ab").each(function (i, o) {
                        var title = $(this).find("span").text();
                        $(this).attr("title", title);
                    });
                }
            });
            $("#caseTable #selectAll").on('click', function () {
                $('#caseTable').find('tbody input:checkbox').prop('checked', this.checked);
            });
            //关联新案件
            $("#caseListDiv #saveLinkBtn").off("click").on('click', function () {
                debugger
                var checkbox = [];
                $('#caseTable').find('tbody input:checkbox:checked').each(function (i, e) {
                    var caseInfo = {
                        ajbh: $(e).attr("ajbh"),
                        ajid: $(e).attr("ajid"),
                        // createtime:"",
                        creator: top.userId,
                        deparmentcode: top.orgCode,
                        groupid: groupInfo.id,
                        pgroupid: ""
                    };
                    checkbox.push(caseInfo);
                });
                if (checkbox.length > 0) {
                    specialCaseGroupAjax.addAjGroupList(checkbox, function (r) {
                        if (r.flag == 1) {
                            toast('关联成功！', 600, function () {
                                $('#caseListDiv').$close();
                                _self.queryRelationCaseList(groupInfo);
                            }).ok()
                        } else {
                            toast(r.msg, 600).err();
                        }
                    });
                } else {
                    toast("请至少选择一个案件！", 600).warn()
                }
                return false;
            });
            $("#caseListDiv #cancelBtn").on('click', function () {
                $('#caseListDiv').$close();
            });
        },
        showCaseInfo: function (ajid) {
            _self = this;
            var param = {
                id: ajid
            };
            $.ajax({
                url: top.servicePath_xz + '/asjAj/getById',
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                data: param,
                success: function (r) {
                    if (r.flag == 1) {
                        $open('#userListDiv', {width: 900, title: '&nbsp案件详情'});
                        $("#userListDiv .panel-container").empty().html(_.template(caseInfoTpl, {data: r.data}));
                        $("#userListDiv").off("click").on('click', "#closeBtn", function () {
                            $('#userListDiv').$close();
                        });
                        $(".dict").dict();
                        $(".dict select").attr("disabled", "disabled");
                    }

                }
            });
        },
        delCase: function (groupInfo, id, ajbh, ajmc) {
            _self = this;
            $confirm('确定移除案件【' + ajbh + '】吗？', function (bol) {
                if (bol) {
                    var param = [{
                        id: id,
                        groupid: groupInfo.id,
                        creator: top.userId,
                        caseName: ajmc
                    }];
                    specialCaseGroupAjax.removeAjGroupList(param, function (r) {
                        if (r.flag == 1) {
                            toast('移除成功！', 600, function () {
                                _self.queryRelationCaseList(groupInfo);
                            }).ok()
                        } else {
                            // toast('移除失败！',600).err();
                            toast(r.msg, 600).err()
                        }
                    })
                }
            });
        },
        handleGroupStaff: function (groupInfo) {
            _self = this;
            $(".form-content-block").empty().html(_.template(groupStaffTpl));
            $(".form-btn-block").addClass("hide");

            $("#groupStaff #chooseUint").on('click', function () {
                dictOpener.openUnitChoosePort($(this));
            });
            $("#groupStaff #resetBtn").on("click", function () {
                selectUtils.clearQueryValue();
                return false;
            });
            $("#groupStaff #queryBtn").on("click", function () {
                _self.queryAddedStaffList(groupInfo);
                return false;
            });
            //加载已添加的成员
            _self.queryAddedStaffList(groupInfo);
            //成员添加
            $("#groupStaff #addStaff").on("click", function () {
                $open('#userListDiv', {width: 800, title: '&nbsp用户列表'});
                $("#userListDiv .panel-container").empty().html(_.template(userListTpl, {
                    checkboxMulti: true,
                    groupInfo: groupInfo
                }));
                $("#userListDiv #chooseUint").on('click', function () {
                    dictOpener.openUnitChoosePort($(this));
                });
                $("#userListDiv #resetBtn").on("click", function () {
                    selectUtils.clearQueryValue();
                    return false;
                });
                $("#userListDiv #queryBtn").on("click", function () {
                    _self.queryUserList(true, groupInfo);
                    return false;
                });

                //加载用户列表
                _self.queryUserList(true, groupInfo);
            });
        },
        queryAddedStaffList: function (groupInfo) {
            _self = this;
            var param = {
                isInGroup: true,
                groupId: groupInfo.id,
                orgId: $.trim($("#orgId").val()),
                policeId: $.trim($("#policeId").val()),
                userName: $.trim($("#userName").val())
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
                        _self.delGroupStaff(groupInfo, $(this).attr('id'), $(this).attr('username'));
                    });

                }
            });
        },
        queryUserList: function (isCheckboxMulti, groupInfo) {
            _self = this;
            debugger
            var orgParam = str2obj($("#userListDiv #orgName").attr("paramattr"));
            var param = {
                excludeGroupId: groupInfo.pgroupid ? groupInfo.id : "",
                groupId: groupInfo.pgroupid ? groupInfo.pgroupid : groupInfo.id,
                isInGroup: groupInfo.pgroupid ? true : false,
                orgId: orgParam ? orgParam.orgId : "",
                userName: $.trim($("#userListDiv #userName").val()),
                policeId: $.trim($("#userListDiv #policeId").val())
            };

            $('#userListDiv #userTableResult').pagingList({
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
            $("#userTable #selectAll").on('click', function () {
                $('#userTable').find('tbody input:checkbox').prop('checked', this.checked);
            });
            $("#userListDiv #saveStaffBtn").off("click").on('click', function () {
                //专案组添加成员
                _self.saveStaff(groupInfo);
                return false;
            });
            $("#userListDiv #cancelBtn").on('click', function () {
                $('#userListDiv').$close();
            });
        },
        saveStaff: function (groupInfo) {
            _self = this;
            var checkbox = [];
            $('#userTable').find('tbody input:checkbox:checked').each(function (i, e) {
                var userInfo = {
                    jh: $(e).attr("jh"),
                    userid: $(e).attr("userid"),
                    username: $(e).attr("username"),
                    creator: top.userId,
                    deparmentcode: top.orgCode,
                    groupid: groupInfo.id
                    // pgroupid:""
                    // id (string, optional): 人员关联ID ,
                };
                checkbox.push(userInfo);
            });
            if (checkbox.length > 0) {
                specialCaseGroupAjax.addUserGroupList(checkbox, function (r) {
                    if (r.flag == 1) {
                        toast('添加成功！', 600, function () {
                            $('#userListDiv').$close();
                            _self.queryAddedStaffList(groupInfo);
                        }).ok()
                    } else {
                        toast(r.msg, 600).err();
                    }
                });
            } else {
                toast("请至少选择一个用户！", 600).warn()
            }
        },
        delGroupStaff: function (groupInfo, id, userName) {
            _self = this;
            $confirm('确定移除成员【' + userName + '】吗？', function (bol) {
                if (bol) {
                    var param = [{
                        groupid: groupInfo.id,
                        creator: top.userId,
                        userid: id
                        // id:id
                    }];
                    specialCaseGroupAjax.deleteUsergroupList(param, function (r) {
                        if (r.flag == 1) {
                            toast('移除成功！', 600, function () {
                                _self.queryAddedStaffList(groupInfo);
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