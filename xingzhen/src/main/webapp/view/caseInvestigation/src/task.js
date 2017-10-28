/**
 * Created by dell on 2017/9/20.
 */
importing('currentDate');
define(['underscore',
    'text!/view/caseInvestigation/tpl/task/taskList.html',
    'text!/view/caseInvestigation/tpl/task/taskListTr.html',
    'text!/view/caseInvestigation/tpl/task/taskAdd.html',
    'text!/view/caseInvestigation/tpl/task/taskEdit.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/userList.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/userListTr.html',
    '../dat/task.js',
    '../../dictManage/src/dictOpener.js',
    '../../userInfoManage/dat/userInfo.js'], function (_, taskListTpl,taskListTrTpl,taskAddTpl,taskEditTpl,userListTpl,userListTrTpl,
                                                     taskAjax,dictOpener,userInfoAjax) {
    return {
        showList: function () {
            _self = this;
            // //关闭没有关闭的弹框
            // dictOpener.closeOpenerDiv();
            $("#mainDiv").empty().html(_.template(taskListTpl, {ops: top.opsMap, status: status}));
            selectUtils.selectTextOption("#changeTaskType", "#taskType");
            selectUtils.selectTextOption("#changeConfirmStatus", "#fkqrzt");
            // selectUtils.selectTextOption("#changeTaskStatus", "#taskStatus");
            //选择任务状态
            _self.selectTaskStaOption();

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

            $("#addTask").on("click",function () {
                _self.showAdd();
            });
            $("#resetBtn").on("click",function () {
                selectUtils.clearQueryValue();
                return false;
            });
            $("#queryBtn").on("click",function () {
                _self.queryList();
                return false;
            });
            _self.queryList();
        },
        selectTaskStaOption:function () {
            _self = this;
            $("#changeTaskStatus").on("click","u",function(){
                $(this).addClass("active").siblings(".active").removeClass("active");
                var text = $(this).hasClass("active") ? $(this).text() : "";
                if(text == "被移交"){
                    $("#yjzt").val($(this).attr("val"));
                }else if(text == "超期"){
                    $("#overdue").val($(this).attr("val"));
                } else if (text == "已反馈"){
                    $("#fkzt").val($(this).attr("val"));
                } else if (text == "未反馈"){
                    $("#fkzt").val($(this).attr("val"));
                }
            });
        },
        //查询功能
        queryList:function(){
            _self = this;
            var param = {};
            // var myStatus;
            // var myOverdue;
            // if (status) {
            //     myStatus = status;
            //     $("#main-frame", parent.document).removeAttr("status");
            //     $("#main-frame", parent.document).removeAttr("en");
            //     $('#root-menu', window.parent.document).find('li').each(function (i, item) {
            //         $($(item).find("a")[0]).removeAttr('en');
            //         $($(item).find("a")[0]).removeAttr('status');
            //     });
            // } else {
            //     myStatus = $("#fkqrzt").val();
            // }
            $.extend(param, {
                userId:top.userId,
                taskType:$.trim($("#taskType").val()),
                taskName:$.trim($("#taskName").val()),
                taskNo:$.trim($("#taskNo").val()),
                groupid:$.trim($("#groupid").val()),
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
            });
            $('#taskListResult').pagingList({
                action:top.servicePath_xz+'/task/getTaskPage',
                jsonObj:param,
                callback:function(data){
                    $("#taskListTable tbody").empty().html(_.template(taskListTrTpl, {data: data, ops: top.opsMap }));
                    $(".link-text").on("click",function () {
                        _self.handleDetail($(this).attr('id'));
                    });
                    $(".into-urge").on("click",function () {
                        _self.handleUrge($(this).attr('id'));
                    });
                    $(".into-delete").on("click",function () {
                        _self.handleDelete($(this).attr('id'),$(this).attr('taskNo'));
                    });
                    $(".into-feedback").on("click",function () {
                        _self.handleFeedback($(this).attr('id'));
                    });
                    $(".into-transfer").on("click", function () {
                        var id=$(this).attr('id');
                        var createname=$(this).attr('createname');
                        var creator=$(this).attr('creator');
                        var deparmentcode=$(this).attr('deparmentcode');
                        _self.handleTransfer(id,createname,creator,deparmentcode);
                    });
                }
            });
        },
        handleDetail:function (id) {
            _self = this;
            if (id) {
                taskAjax.taskDetail({id: id, userId: top.userId}, function (r) {
                    if (r.flag == 1) {
                        //判断是否任务是否反馈
                        $("#mainDiv").empty().html(_.template(taskEditTpl,r));
                        //在反馈上追加任务
                        $(".into-appendTaskBtn").on("click",function () {
                            _self.showAdd(null,$(this).attr("fkid"));
                        });
                        $("#cancelBtn").on("click",function () {
                            _self.showList();
                        });

                        //在任务上补充任务
                        $("#replenishTaskBtn").on("click",function () {
                            _self.showAdd($(this).attr("bcrwid"));
                        });
                    }
                });
            }
        },
        handleUrge:function (id) {
            _self = this;
            $confirm('催办任务？', function (bol) {
                if (bol) {
                    var param = {
                        // taskid: id,
                        id: id,
                        userId: top.userId,
                        deparmentcode: top.orgCode
                    };
                    taskAjax.addCb(param,function(r){
                        if(r.flag==1){
                            toast('催办成功！', 600, function () {
                                _self.showList();
                            }).ok()
                        }else{
                            // toast('催办失败！',600).err();
                            toast(r.msg, 600).err()
                        }
                    })
                }
            });
        },
        handleDelete:function (id,taskNo) {
            _self = this;
            $confirm('确定删除任务【'+taskNo+'】吗？',function(bol){
                if(bol){
                    taskAjax.deleteTaskById({id:id,userId:top.userId},function(r){
                        if(r.flag==1){
                            toast('删除成功！',600,function(){
                                _self.showList();
                            }).ok()
                        }else{
                            // toast('删除失败！',600).err();
                            toast(r.msg, 600).err()
                        }
                    })
                }
            });
        },
        getFile: function (element) {
            _self = this;
            var fd = new FormData();
            var file = $(element)[0];
            if (!file.files[0]) {
                alert('error:' + '获取文件失败');
                throw new Error('获取文件失败');
            }
            fd.append(file.files[0].name, file.files[0]);
            return fd;
        },
        getFileInfo: function (element) {
            _self = this;
            // var fileDiv = $(element)[0];
            // var fileDetail;
            // if (!fileDiv.files[0]) {
            //     alert('error:' + '获取文件失败');
            //     throw new Error('获取文件失败');
            // }
            // fileDetail = fileDiv.files[0];
            // return fileDetail;

            var fd;
            var file = $(element)[0];
            if (!file.files[0]) {
                alert('error:' + '获取文件失败');
                throw new Error('获取文件失败');
            }
            fd = new FormData(file.files[0]);
            return fd;
        },
        handleFeedback:function (taskId) {
            _self = this;
            if (taskId) {
                taskAjax.taskDetail({id: taskId, userId: top.userId}, function (r) {
                    if (r.flag == 1) {
                        $("#mainDiv").empty().html(_.template(taskEditTpl,r));
                        var videoFileInfo = {},picFileInfo = {};
                        $("#addVideo input[type='file']").val("");
                        $("#addVideo input[type='file']").off("change").on("change", function () {
                            // videoFile = _self.getFile("#addVideo input[type='file']");
                            videoFileInfo = _self.getFileInfo("#addVideo input[type='file']");
                        });

                        $("#addPic input[type='file']").val("");
                        $("#addPic input[type='file']").off("change").on("change", function () {
                            // picFile = _self.getFile("#addPic input[type='file']");
                            picFileInfo = _self.getFileInfo("#addPic input[type='file']");
                        });
                        //反馈任务
                        $("#feedbackBtn").on("click",function () {
                            // $('.feedback-valid').validatebox();
                            // if ($('.validatebox-invalid').length > 0) {
                            //     return false;
                            // }
                            var taskfkFileModels = [];
                            if(videoFileInfo){
                                taskfkFileModels.push(videoFileInfo);
                            }
                            if(picFileInfo) {
                                taskfkFileModels.push(picFileInfo);
                            }
                            console.info(taskfkFileModels);
                            var param = {
                                bz: $.trim($("#bz").val()),
                                createname: top.trueName,
                                // createtime: "2017-10-26T06:05:06.124Z",
                                creator: top.userId,
                                deparmentcode: top.orgCode,
                                fkTime: $("#fkTime").val(),
                                fkr: top.userId,
                                fkrname: top.trueName,
                                fkxs: $("#fkxs").val(),
                                // groupid: "string",
                                // pgroupid: "string",
                                // qrTime: "2017-10-26T06:05:06.124Z",
                                // qrzt: "string",
                                taskfkFileModels: taskfkFileModels,
                                taskid: taskId
                            };
                            taskAjax.addTaskFk(param, function (r) {
                                if (r.flag == 1) {
                                    toast('反馈成功！', 600, function () {
                                        _self.showList();
                                    }).ok();
                                } else {
                                    toast(r.msg, 600).err()
                                }
                            });
                        });
                        $("#cancelBtn").on("click",function () {
                            _self.showList();
                        });
                    }
                });
            }

        },
        handleTransfer:function (taskId,createname,creator,deparmentcode) {
            _self = this;
            $open('#userListDiv', {width: 800, title: '&nbsp用户列表'});
            $("#userListDiv .panel-container").empty().html(_.template(userListTpl,{checkboxMulti:false}));
            $("#userListDiv").on('click',"#chooseUint", function () {
                dictOpener.openUnitChoosePort($(this));
            });
            $("#userListDiv").on("click", "#resetBtn", function () {
                selectUtils.clearQueryValue();
                return false;
            });
            $("#userListDiv").on("click", "#queryBtn", function () {
                _self.queryUserList(false,taskId);
                return false;
            });

            //加载用户列表
            _self.queryUserList(false,taskId);
            },
        showAdd:function (bcrwid,fkid) {
            _self = this;
            $("#mainDiv").empty().html(_.template(taskAddTpl));
            $("#fkjzTime").datetimepicker({format:'YYYY-MM-DD',pickTime:false});
            $("#createtime").datetimepicker({format:'YYYY-MM-DD',pickTime:false});

            $("#chooseGroup").on('click', function () {
                // dictOpener.openChooseDict($(this));
                dictOpener.openChoosePort($(this),null,null,{userId:top.userId});
            });
            $("#chooseReceive").on('click', function () {
                dictOpener.openUserChoosePort($(this));
            });
            //绑定返回事件
            $("#cancelBtn").on("click",function () {
                _self.showList();
            });
            $("#saveBtn").on("click",function () {
                $('.task-valid').validatebox();
                if ($('.validatebox-invalid').length > 0) {
                    return false;
                }
                var param = $("#taskAddForm").serializeObject();
                var jsrParam = str2obj($("#jsr").attr("paramattr"));
                var groupParam = str2obj($("#groupid").attr("paramattr"));
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
                            _self.showList();
                        }).ok();
                    } else {
                        toast(r.msg, 600).err()
                    }
                });
            });
        },
        queryUserList: function (isCheckboxMulti,taskId) {
            _self = this;
            ////分页
            // $("#userTableResult").pagingList({
            //     action:top.servicePath+'/sys/user/getUserInfoListByOrgId',
            //     pageOnce:5,
            //     jsonObj:{orgId: top.orgId},
            //     callback:function(data,t, n, i, o, a, r){
            //         $("#userTable tbody").empty().html(_.template(userListTrTpl, {
            //             data: data,
            //             ops: top.opsMap,
            //             checkboxMulti:isCheckboxMulti
            //         }));
            //         if(isCheckboxMulti == false){
            //             //任务移交给用户
            //             _self.saveTransfer(taskId);
            //         }else{
            //             //专案组添加成员
            //             _self.saveStaff();
            //         }
            //
            //         $("#userListDiv").on('click', "#cancelBtn", function () {
            //             $('#userListDiv').$close();
            //         });
            //     }
            // });
            //不分页
            userInfoAjax.getUserInfoListByOrgId({orgId: top.orgId},function (r) {
                if (r.flag == 1) {
                    $("#userTable tbody").empty().html(_.template(userListTrTpl, {
                        data: r.data,
                        ops: top.opsMap,
                        checkboxMulti:isCheckboxMulti
                    }));
                    //任务移交给用户
                    _self.saveTransfer(taskId);
                    // if(isCheckboxMulti == false){
                    // }else{
                    //     //专案组添加成员
                    //     _self.saveStaff();
                    // }

                    $("#userListDiv").on('click', "#cancelBtn", function () {
                        $('#userListDiv').$close();
                    });
                }
            });
        },
        saveTransfer:function (taskId) {
            _self = this;
            $("#userListDiv").on("click",".choseOneUser:checkbox",function(){
                if($(this).is(':checked')){
                    $(this).attr('checked', true).parent().parent().siblings().find("input:checkbox").attr('checked', false);
                } else {
                    $(this).prop("checked",false);
                }
            });
            $("#userListDiv").on("click","#transferBtn",function () {
                var checkbox = [];
                $('#userTable').find('tbody input:checkbox:checked').each(function (i, e) {
                    var jsrInfo = {
                        jsr:$(e).attr('jsr'),
                        jsrLxfs:$(e).attr('jsrLxfs'),
                        jsrname:$(e).attr('jsrname')
                    };
                    checkbox.push(jsrInfo);
                });

                if (checkbox.length > 0) {
                    var param = {
                        jsr: checkbox[0].jsr,
                        jsrLxfs: checkbox[0].jsrLxfs,
                        jsrname: checkbox[0].jsrname
                    };
                    $.extend(param, {
                        createname: top.trueName,
                        creator: top.userId,
                        deparmentcode: top.orgCode,
                        id: taskId
                    });
                    taskAjax.moveTask(param,function(r){
                        if(r.flag==1){
                            toast('移交成功！',600,function(){
                                $("#userListDiv").$close();
                                _self.showList();
                            }).ok()
                        }else{
                            // toast('移交失败！',600).err()
                            toast(r.msg, 600).err();
                        }
                    });
                } else {
                    toast("请选择一个用户！", 600).warn()
                }
            });
        },
        saveStaff:function () {
            _self = this;

            //专案组添加成员
            $("#userTable #selectAll").on('click', function () {
                $('#userTable').find('tbody input:checkbox').prop('checked', this.checked);
            });
            $("#userListDiv").on("click","#saveStaffBtn",function () {
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

                    $('#userListDiv').$close();
                } else {
                    toast("请至少选择一个用户！", 600).warn()
                }
            });
        }
    }
});