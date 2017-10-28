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
    '../dat/specialCaseGroup.js',
    '../../dictManage/src/dictOpener.js',
    '../../userInfoManage/dat/userInfo.js'], function (_, specialCaseGroupListTpl, specialCaseGroupListTrTpl, specialCaseGroupAddTpl, archivePageTpl,broadcastPageTpl, groupListTpl, caseListTpl, caseListTrTpl,caseInfoTpl,
                                                     userListTpl, userListTrTpl, baseInfoTpl, relationCaseTpl, relationCaseTrTpl, groupStaffTpl, groupStaffTrTpl,
                                                     specialCaseGroupAjax,dictOpener,userInfoAjax) {
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
                dictOpener.openChoosePort($(this),$post,"/group/getGroupPage",{},"groupname","groupnum");
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
            var param = {
                ajbh: "",
                backupStatu: "",
                creator: "",
                deparmentcode: "",
                endTime: "",
                groupname: "",
                groupnum: "",
                memberId: "",
                startTime: "",
                userId: top.userId

            };//$("#queryCondition").serializeObject();
            $('#specialGroupListResult').pagingList({
                action:top.servicePath_xz+'/group/getGroupPage',
                jsonObj:param,
                callback:function(data){
                    $("#specialGroupListTable tbody").empty().html(_.template(specialCaseGroupListTrTpl, { data: data, ops: top.opsMap }));
                    $(".link-text").on("click", function () {
                        _self.showEdit($(this).attr("groupid"));
                    });
                    $(".into-archive").on("click", function () {
                        _self.groupBackupAdd($(this).attr("groupid"));
                    });
                    $(".into-broadcast").on("click", function () {
                        _self.groupBroadcast($(this).attr("groupid"),$(this).attr("jmgid"));
                    });
                    $(".into-communication").on("click", function () {
                        console.info("进入聊天界面！");
                        // // $("#mainDiv").empty().html(_.template(chatPageTpl));
                        // $open('#archiveBlock', {width: 840,height: 700, title: '&nbsp专案组群聊'});
                        // // $("#archiveBlock .form-content").empty().html(_.template(chatPageTpl));
                        // var iframe = '<iframe id="mapSvgFrame" class="tab-content-frame" src="/view/chatPage/chatPage.html" width="100%" height="640"></iframe>';
                        // $("#archiveBlock .panel-container").css("margin","0px").empty().html(_.template(iframe));
                        window.open("/view/chatPage/chatPage.html","nw","width=840,height=640");
                    });
                    $(".into-group").on('click', function () {
                        _self.showGroupOfGroup($(this),$(this).attr("groupid"),$(this).attr("jmgid"));
                    });

                }
            });
        },
        groupBackupAdd:function (groupid) {
            _self = this;
            $open('#archiveBlock', {width: 800, top: 180, title: '&nbsp专案组归档'});
            $("#archiveBlock .panel-container").empty().html(_.template(archivePageTpl));
            $(".dict").dict();
            $("#archiveBlock").on("click","#saveBtn",function () {
                var param = {
                    backupReason: $.trim($("#backupReason").val()),
                    backupTime: $("#backupTime").val(),
                    creator: top.userId,
                    deparmentcode: top.orgCode,
                    groupid: groupid,
                    policeId: top.policeId
                };
                specialCaseGroupAjax.groupBackupAdd(param,function(r){
                    if(r.flag==1){
                        toast('归档成功！',600,function(){
                            $("#archiveBlock").$close();
                            _self.queryList();
                        }).ok()
                    }else{
                        toast(r.msg, 600).err();
                    }
                });
            });
            $("#archiveBlock").on("click","#cancelBtn",function () {
                $("#archiveBlock").$close();
            });
        },
        groupBroadcast:function (groupid,jmgid) {
            _self = this;
            $open('#archiveBlock', {width: 800, top: 180, title: '&nbsp专案组广播'});
            $("#archiveBlock .panel-container").empty().html(_.template(broadcastPageTpl));
            $("#archiveBlock").on("click","#saveBtn",function () {
                //调用极光接口
                $("#archiveBlock").$close();
            });

            $("#archiveBlock").on("click","#cancelBtn",function () {
                $("#archiveBlock").$close();
            });
        },
        showGroupOfGroup:function (obj,groupid,jmgid) {
            _self = this;
            //嵌套表格的实现--------------------------------------------------------------------------------------------
            var isOpen = obj.hasClass("clicked-open");
            var currentTr = obj.parents("tr");
            if (isOpen) {
                obj.removeClass("clicked-open");
                currentTr.next().remove();
            } else {
                obj.addClass("clicked-open");
                $.ajax({
                    url: top.servicePath_xz+'/group/getChildGroupList',
                    type: "post",
                    contentType: "application/x-www-form-urlencoded",
                    data: {groupId:groupid},
                    success: function (r) {
                        if(r.flag == 1){
                            debugger
                            var tableHtml = _.template(groupListTpl, {data: r.data});
                            console.info(tableHtml);
                            console.info($(tableHtml));
                            //嵌套内容渲染
                            var appendTr = currentTr.after('<tr class="tr-inner-table"><td colspan="12"></td></tr>');
                            currentTr.next().find("td").empty().html(tableHtml);
                            $(".link-text").on("click", function () {
                                _self.showEdit($(this).attr("groupid"));
                            });
                            $(".into-archive").on("click", function () {
                                _self.groupBackupAdd($(this).attr("groupid"));
                            });
                            $(".into-broadcast").on("click", function () {
                                _self.groupBroadcast($(this).attr("groupid"),$(this).attr("jmgid"));
                            });
                            $(".into-communication").on("click", function () {
                                console.info("进入聊天界面！");
                                // // $("#mainDiv").empty().html(_.template(chatPageTpl));
                                // $open('#archiveBlock', {width: 840,height: 700, title: '&nbsp专案组群聊'});
                                // // $("#archiveBlock .form-content").empty().html(_.template(chatPageTpl));
                                // var iframe = '<iframe id="mapSvgFrame" class="tab-content-frame" src="/view/chatPage/chatPage.html" width="100%" height="640"></iframe>';
                                // $("#archiveBlock .panel-container").css("margin","0px").empty().html(_.template(iframe));
                                window.open("/view/chatPage/chatPage.html","nw","width=840,height=640");
                            });
                        }
                    }
                });
            }
        },
        showAdd: function (pgroupid) {
            _self = this;
            $("#mainDiv").empty().html(_.template(specialCaseGroupAddTpl,{data:null}));
            $('#addGroupTab a').click(function (e) {
                if ($(this).attr("id") == "navBaseInfo") {
                    $(this).tab('show');
                    //判断是否有专案组信息
                    //如果有：展示基本信息
                    //否则：报错
                    // toast("是否保存过专案组基本信息？").warn();
                    _self.handleBaseInfo(pgroupid);
                } else if ($(this).attr("id") == "navRelationCase") {
                    debugger
                    var groupinfo =  str2obj($(this).parents("#addGroupTab").attr("groupinfo"));
                    $('#baseInfo .field-valid').validatebox();
                    if ($('.validatebox-invalid').length > 0) {
                        toast("请先保存专案组基本信息！").warn();
                        return false;
                    } else {
                        $(this).tab('show');
                        if (groupinfo.id){
                            _self.handleRelationCase(groupinfo);
                        }else {
                            // _self.saveGroupInfo();
                            //保存专案组基本信息
                            $("#btnBaseInfo #saveBtn").trigger("click");
                        }
                    }
                } else if ($(this).attr("id") == "navGroupStaff") {
                    var groupinfo =  str2obj($(this).parents("#addGroupTab").attr("groupinfo"));
                    $('#baseInfo .field-valid').validatebox();
                    if ($('.validatebox-invalid').length > 0) {
                        toast("请先保存专案组基本信息！").warn();
                        return false;
                    } else {
                        $(this).tab('show');
                        if (groupinfo.id){
                            _self.handleGroupStaff(groupinfo);
                        }else {
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
            _self.oneChoose();//限制单选
            var checkbox = [];
            $('#specialGroupListTable').find('tbody input:checkbox[name=group]:checked').each(function (i, e) {
                var groupInfo = {
                    groupnum:$(e).attr('groupnum'),
                    groupid:$(e).attr('groupid')
                };
                checkbox.push(groupInfo);
            });
            if (checkbox.length > 0) {
                //do something
                _self.showAdd(checkbox[0].groupid);
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
        showEdit: function (id) {
            _self = this;
            $.ajax({
                url: top.servicePath_xz+'/group/groupDetail/'+id,
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                success: function (data) {
                    if (data.id) {
                        $("#mainDiv").empty().html(_.template(specialCaseGroupAddTpl,{data:data}));
                        $('#addGroupTab a').click(function (e) {
                            if ($(this).attr("id") == "navBaseInfo") {
                                $(this).tab('show');
                                _self.showBaseInfo(data);
                            } else if ($(this).attr("id") == "navRelationCase") {
                                $(this).tab('show');
                                _self.handleRelationCase(data);
                            } else if ($(this).attr("id") == "navGroupStaff") {
                                $(this).tab('show');
                                _self.handleGroupStaff(data);
                            }
                        });
                        $('#addGroupTab a:first').click();
                    }
                }
            });
        },
        handleBaseInfo: function (pgroupid) {
            _self = this;
            var groupId,jmgid;
            $(".form-content-block").empty().html(_.template(baseInfoTpl));
            $(".form-btn-block").removeClass("hide");
            // if (flag) {
            //     //已经保存过 输入框设值 并且不可修改 不可提交
            //     $("#baseInfo").find("input,select,i").attr("disabled", "disabled").val("def ");
            // } else {
            // }
            $("#chooseGroupType").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            $("#btnBaseInfo #saveBtn").on("click", function () {
                _self.saveGroupInfo(pgroupid,groupId,jmgid);
            });
            $("#btnBaseInfo #exitBtn").off("click").on("click", function () {
                _self.showList();
            });
        },
        saveGroupInfo:function (pgroupid,groupId,jmgid) {
            _self = this;
            $('.field-valid').validatebox();
            if ($('.validatebox-invalid').length > 0) {
                return false;
            }
            var param = {
                createname: top.trueName,
                createtime: $("#createtime").val(),
                creator: top.userId,
                deparmentcode: top.orgCode,
                deparmentname: top.orgName,
                groupname: $.trim($("#groupname").val()),
                grouptype: $("#grouptype").val(),
                pgroupid: pgroupid ? pgroupid : ""
            };
            specialCaseGroupAjax.addGroup(param, function (r) {
                if (r.flag == 1) {
                    debugger
                    if(r.data.id){
                        toast('保存成功！', 600).ok();
                        $('#addGroupTab').attr("groupinfo",obj2str(r.data));
                        // $('#addGroupTab').attr("groupid",groupId).attr("jmgid",jmgid);
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
            if(groupInfo.id){
                $(".form-content-block").empty().html(_.template(baseInfoTpl));
                $("#grouptype").siblings("i#chooseGroupType").remove();
                $("#baseInfo").find("input,select").attr("disabled", "disabled");
                $(".form-btn-block").removeClass("hide");
                $(".form-btn-block #saveBtn").attr("id", "nextBtn").text("下一项");
                //赋值
                $("#groupname").val(groupInfo.groupname);
                $("#grouptype").val(groupInfo.grouptype);
                $("#createname").val(groupInfo.createname);
                $("#deparmentcode").val(groupInfo.deparmentname);
                $("#createtime").val(rangeUtil.formatDate(groupInfo.createtime,'yyyy-MM-dd'));
                $(".form-btn-block #nextBtn").on("click", function () {
                    $('#addGroupTab').attr("groupinfo",obj2str(groupInfo));
                    $('#addGroupTab a#navRelationCase').trigger("click");
                    $('#addGroupTab a#navRelationCase').on("click", function () {
                        $(this).tab('show');
                        _self.handleRelationCase(groupInfo);
                    });
                });
                $(".form-btn-block #revokeBtn").on("click", function () {
                    //如果归档状态为已归档 显示按钮 并执行撤销操作
                    
                });

            }

        },
        handleRelationCase: function (groupInfo) {
            _self = this;
            $(".form-content-block").empty().html(_.template(relationCaseTpl));
            $(".form-btn-block").addClass("hide");

            $("#chooseCaseType").on('click', function () {
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
            selectUtils.selectTextMultiOpt("#changeCaseSta", "caseSta");

            $("#relationCase").on("click", "#resetBtn", function () {
                selectUtils.clearQueryValue();
                return false;
            });
            $("#relationCase").on("click", "#queryBtn", function () {
                _self.queryRelationCaseList(groupInfo);
                return false;
            });

            //加载已关联案件列表
            _self.queryRelationCaseList(groupInfo);
            //关联新案件
            $("#linkNewCase").on("click", function () {
                console.info("涉及案件关联新案件按钮");
                $open('#caseListDiv', {width: 800, title: '&nbsp案件查询'});
                $("#caseListDiv .panel-container").empty().html(_.template(caseListTpl,{groupid:groupInfo.id}));

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

                $("#caseListDiv").on('click',"#chooseAcceptUint", function () {
                    dictOpener.openChoosePort($(this),null,null,{userId:top.userId});
                });
                //点击多选案件状态
                $(".dictInLineSelect").dictInLineSelect();
                // selectUtils.selectTextMultiOpt("#caseListDiv #changeCaseSta", "caseSta");
                // selectUtils.selectTextOption("#caseListDiv #chooseCaseType", "#caseType");
                $("#caseListDiv").on('click',"#chooseCaseType", function () {
                    dictOpener.openChooseDict($(this));
                });
                $("#caseListDiv").on("click", "#resetBtn", function () {
                    selectUtils.clearQueryValue();
                    return false;
                });
                $("#caseListDiv").on("click", "#queryBtn", function () {
                    console.info("案件查询按钮");
                    _self.queryCaseList(groupInfo);
                    return false;
                });

                //加载案件列表
                _self.queryCaseList(groupInfo);
                return false;
            });
        },
        queryRelationCaseList: function (groupInfo) {
            _self = this;
            var param = {
                groupId:groupInfo.id,
                ab: $.trim($("#ab").val()),
                ajbh: $("#ajbh").val(),
                ajmc: $.trim($("#ajmc").val()),
                ajstate: $("#ajstate").val(),

                // fadd:"",
                // slEndTime:"",
                // slStartTime:"",
                // sljsdw:"",

                endTime: $("#endTime").val(),
                startTime: $("#startTime").val()
            };
            $('#relationCaseResult').pagingList({
                action: top.servicePath_xz + '/asjAj/getAjGroupPage',
                jsonObj: param,
                callback: function (data) {
                    $("#relationCaseTable tbody").empty().html(_.template(relationCaseTrTpl, {
                        data: data,
                        ops: top.opsMap,
                        groupid:groupInfo.id,
                        groupcreator:groupInfo.creator
                    }));
                    $('.span').span();

                    $("#relationCaseTable").on("click",".link-text", function () {
                        console.info("案件详情按钮");
                        $open('#userListDiv', {width: 800, title: '&nbsp案件详情'});
                        _self.showCaseInfo();
                    });
                    $(".into-delete").on("click", function () {
                        _self.delCase(groupInfo,$(this).attr('id'),$(this).attr('ajbh'));
                    });

                }
            });
        },
        queryCaseList: function (groupInfo) {
            _self = this;
            var param = {
                groupId: groupInfo.id,
                ab: $("#ab").val(),
                ajbh: $.trim($("#ajbh").val()),
                ajmc: $.trim($("#ajmc").val()),
                ajstate: $("#ajstate").val(),
                fadd:$.trim($("#fadd").val()),
                endTime: $("#endTime").val(),
                startTime: $("#startTime").val(),
                slEndTime:$("#slEndTime").val(),
                slStartTime:$("#slStartTime").val(),
                sljsdw:$("#sljsdw").val()
            };
            $('#caseListDiv #caseListResult').pagingList({
                action: top.servicePath_xz + '/asjAj/getAjPage',
                jsonObj: param,
                callback: function (data) {
                    $("#caseTable tbody").empty().html(_.template(caseListTrTpl, {data: data}));
                    $(".span").span();
                    $("#caseTable").on("click",".link-text", function () {
                        console.info("案件详情按钮");
                        $open('#userListDiv', {width: 900, title: '&nbsp案件详情'});
                        _self.showCaseInfo();
                    });
                    $("#caseTable #selectAll").on('click', function () {
                        $('#caseTable').find('tbody input:checkbox').prop('checked', this.checked);
                    });
                    //关联新案件
                    $("#saveLinkBtn").on('click', function () {
                        var checkbox = [];
                        $('#caseTable').find('tbody input:checkbox:checked').each(function (i, e) {
                            var caseInfo = {
                                ajbh:$(e).attr("ajbh"),
                                ajid:$(e).attr("ajid"),
                                // createtime:"",
                                creator:top.userId,
                                deparmentcode:top.orgCode,
                                groupid:groupInfo.id,
                                pgroupid:""
                            };
                            checkbox.push(caseInfo);
                        });
                        if (checkbox.length > 0) {
                            specialCaseGroupAjax.addAjGroupList(checkbox,function(r){
                                if(r.flag==1){
                                    toast('关联成功！',600,function(){
                                        $('#caseListDiv').$close();
                                        _self.queryRelationCaseList(groupInfo);
                                    }).ok()
                                }else{
                                    toast(r.msg, 600).err();
                                }
                            });
                        } else {
                            toast("请至少选择一个案件！", 600).warn()
                        }
                    });

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
        delCase: function (groupInfo,id,ajbh) {
            _self = this;
            $confirm('确定移除案件【'+ajbh+'】吗？',function(bol){
                if(bol){
                    var param = [
                        {
                            // ajbh: ajbh,
                            // ajid: id,
                            id:groupInfo.id,
                            // creator: top.userId,
                            // deparmentcode: top.orgCode,
                            // groupid: groupid,
                            // pgroupid: ""
                        }
                    ];
                    specialCaseGroupAjax.removeAjGroupList(param,function(r){
                        if(r.flag==1){
                            toast('移除成功！',600,function(){
                                _self.queryRelationCaseList(groupInfo);
                            }).ok()
                        }else{
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

            $("#groupStaff").on('click',"#chooseUint", function () {
                dictOpener.openUnitChoosePort($(this));
            });
            $("#groupStaff").on("click", "#resetBtn", function () {
                selectUtils.clearQueryValue();
                return false;
            });
            $("#groupStaff").on("click", "#queryBtn", function () {
                _self.queryAddedStaffList(groupInfo);
                return false;
            });
            //加载已添加的成员
            _self.queryAddedStaffList(groupInfo);
            //成员添加
            $("#addStaff").on("click", function () {
                $open('#userListDiv', {width: 800, title: '&nbsp用户列表'});
                $("#userListDiv .panel-container").empty().html(_.template(userListTpl,{checkboxMulti:true,groupInfo:groupInfo}));
                $("#userListDiv").on('click',"#chooseUint", function () {
                    dictOpener.openUnitChoosePort($(this));
                });
                $("#userListDiv").on("click", "#resetBtn", function () {
                    selectUtils.clearQueryValue();
                    return false;
                });
                $("#userListDiv").on("click", "#queryBtn", function () {
                    _self.queryUserList(true,groupInfo);
                    return false;
                });

                //加载用户列表
                _self.queryUserList(true,groupInfo);
            });
        },
        queryAddedStaffList: function (groupInfo) {
            _self = this;
            var param = {
                groupId:groupInfo.id,
                orgId: $.trim($("#orgId").val()),
                policeId: $.trim($("#policeId").val()),
                userName:$.trim($("#userName").val())
            };
            $('#groupStaffResult').pagingList({
                action: top.servicePath_xz + '/usergroup/getUsergroupPage',
                jsonObj: param,
                callback: function (data) {
                    $("#staffTable tbody").empty().html(_.template(groupStaffTrTpl, {data: data,groupcreator:groupInfo.creator,ops: top.opsMap}));
                    $('.span').span();

                    $(".into-delete").on("click", function () {
                        _self.delGroupStaff(groupInfo,$(this).attr('id'),$(this).attr('username'));
                    });

                }
            });
        },
        queryUserList: function (isCheckboxMulti,groupInfo) {
            _self = this;
            var param = {
                orgId: $("#orgId").val(),
                userName:$.trim($("#userName").val()),
                policeId:$.trim($("#policeId").val())
            };
            $('#userListDiv #userTableResult').pagingList({
                action: top.servicePath + '/sys/user/getUserInfoListByOrgId',
                jsonObj: param,
                callback: function (data) {
                    $("#userTable tbody").empty().html(_.template(userListTrTpl, {data: data,checkboxMulti: isCheckboxMulti}));
                    $("#userTable #selectAll").on('click', function () {
                        $('#userTable').find('tbody input:checkbox').prop('checked', this.checked);
                    });
                    $("#saveStaffBtn").on('click', function () {
                        //专案组添加成员
                        _self.saveStaff(groupInfo);
                    });
                    $("#userListDiv").on('click', "#cancelBtn", function () {
                        $('#userListDiv').$close();
                    });
                }
            });
        },
        saveStaff:function (groupInfo) {
            _self = this;
            var checkbox = [];
            $('#userTable').find('tbody input:checkbox:checked').each(function (i, e) {
                var userInfo = {
                    jh:$(e).attr("jh"),
                    userid:$(e).attr("userid"),
                    username:$(e).attr("username"),
                    creator:top.userId,
                    deparmentcode:top.orgCode,
                    groupid:groupInfo.id
                    // pgroupid:""
                    // id (string, optional): 人员关联ID ,
                };
                checkbox.push(userInfo);
            });
            if (checkbox.length > 0) {
                specialCaseGroupAjax.addUserGroupList(checkbox,function(r){
                    if(r.flag==1){
                        toast('添加成功！',600,function(){
                            $('#userListDiv').$close();
                            _self.queryAddedStaffList(groupInfo);
                        }).ok()
                    }else{
                        toast(r.msg, 600).err();
                    }
                });
            } else {
                toast("请至少选择一个用户！", 600).warn()
            }
        },
        delGroupStaff: function (groupInfo,id,userName) {
            debugger
            _self = this;
            $confirm('确定移除成员【'+userName+'】吗？',function(bol){
                if(bol){
                    var param = [{
                        id:groupInfo.id
                    }];
                    specialCaseGroupAjax.deleteUsergroupList(param,function(r){
                        if(r.flag==1){
                            toast('移除成功！',600,function(){
                                _self.queryAddedStaffList(groupInfo);
                            }).ok()
                        }else{
                            toast(r.msg, 600).err()
                        }
                    })
                }
            });

        }
    }
});