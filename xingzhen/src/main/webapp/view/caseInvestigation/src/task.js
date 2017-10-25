/**
 * Created by dell on 2017/9/20.
 */
importing('currentDate');
define(['underscore',
    'text!/view/caseInvestigation/tpl/task/taskList.html',
    'text!/view/caseInvestigation/tpl/task/taskListTr.html',
    'text!/view/caseInvestigation/tpl/task/taskAdd.html',
    'text!/view/caseInvestigation/tpl/task/taskEdit.html',
    'text!/view/caseInvestigation/tpl/task/taskFeedback.html',
    '../dat/task.js',
    '../../dictManage/src/dictOpener.js'], function (_, taskListTpl,taskListTrTpl,taskAddTpl,taskEditTpl,taskFeedbackTpl,
                                                     taskAjax, dictOpener) {
    return {
        showList: function () {
            _self = this;
            // //关闭没有关闭的弹框
            // dictOpener.closeOpenerDiv();
            $("#mainDiv").empty().html(_.template(taskListTpl, {ops: top.opsMap, status: status}));
            selectUtils.selectTextOption("#changeTaskType", "#taskType");
            selectUtils.selectTextOption("#changeConfirmStatus", "#confirmStatus");
            // selectUtils.selectTextOption("#changeTaskStatus", "#taskStatus");
            //选择任务状态
            _self.selectTaskStaOption();

            $("#chooseBelongGroup").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            $("#chooseCreateName").on('click', function () {
                // dictOpener.openChooseDict($(this));
                dictOpener.openUserChoosePort($(this));
            });
            $("#chooseRecipient").on('click', function () {
                // dictOpener.openChooseDict($(this));
                dictOpener.openUserChoosePort($(this));
            });
            $("#chooseBelongUnit").on('click', function () {
                // dictOpener.openChooseDict($(this));
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
                        _self.handleUrge();
                    });
                    $(".into-delete").on("click",function () {
                        _self.handleDelete($(this).attr('id'),$(this).attr('taskNo'));
                    });
                    $(".into-feedback").on("click",function () {
                        _self.handleFeedback();
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
                            _self.showAdd();
                        });
                        $("#cancelBtn").on("click",function () {
                            _self.showList();
                        });
                        // $("#appendTaskBtn").on("click",function () {
                        //     _self.showList();
                        // });

                        //在任务上补充任务
                        $("#replenishTaskBtn").on("click",function () {
                            _self.showAdd();
                        });
                    }
                });
            }
        },
        handleUrge:function () {
            _self = this;
            $confirm('催办任务？', function (bol) {
                if (bol) {
                    toast('催办成功！', 600, function () {
                        _self.showList();
                    }).ok()
                    // expenseApplyAjax.goBackApply({id: id}, function (r) {
                    //     if (r.flag == 1) {
                    //         toast('撤回成功！', 600, function () {
                    //             _self.showList();
                    //         }).ok()
                    //     } else {
                    //         toast(r.msg, 600).err()
                    //     }
                    // })
                }
            });
        },
        handleDelete:function (id,taskNo) {
            _self = this;
            $confirm('确定删除任务【'+taskNo+'】吗？',function(bol){
                if(bol){
                    // $.ajax({
                    //     url: top.servicePath_xz + '/task/deleteTaskById',
                    //     type: "DELETE",
                    //     contentType: "application/x-www-form-urlencoded",
                    //     data: {id: id, userId: top.userId},
                    //     success: function (r) {
                    //         if(r.flag==1){
                    //             toast('删除成功！',600,function(){
                    //                 _self.showList();
                    //             }).ok()
                    //         }else{
                    //             toast('删除失败！',600).err()
                    //         }
                    //     }
                    // });
                    taskAjax.deleteTaskById({id:id,userId:top.userId},function(r){
                        if(r.flag==1){
                            toast('删除成功！',600,function(){
                                _self.showList();
                            }).ok()
                        }else{
                            toast('删除失败！',600).err()
                        }
                    })
                }
            });
        },
        handleFeedback:function () {
            _self = this;
            $("#mainDiv").empty().html(_.template(taskFeedbackTpl));
            $("#cancelBtn").on("click",function () {
                _self.showList();
            });
            $("#feedbackBtn").on("click",function () {
                _self.showList();
            });
        },
        handleTransfer:function (id,createname,creator,deparmentcode) {
            _self = this;
            $open('#userListDiv', {width: 800, title: '&nbsp用户列表'});
            $("#userListDiv").on("click","#cancelBtn",function () {
                $("#userListDiv").$close();
            });
            $("#userListDiv").on("click","#transferBtn",function () {
                $('.choseOneUser input:checkbox').on("click",function(){
                    if($(this).is(':checked')){
                        $(this).attr('checked', true).parent().parent().siblings().find("input:checkbox").attr('checked', false);
                    } else {
                        $(this).prop("checked",false);
                    }
                });
                var checkbox = [];
                $('#userInfoTable').find('tbody input:checkbox:checked').each(function (i, e) {
                    checkbox.push($(e).val());
                });
                if (checkbox.length > 0) {
                    var param = {
                        createname: createname,
                        creator: creator,
                        deparmentcode: deparmentcode,
                        id: id,
                        jsr: checkbox[0]
                    };
                    taskAjax.moveTask(param,function(r){
                        if(r.flag==1){
                            toast('移交成功！',600,function(){
                                $("#userListDiv").$close();
                            }).ok()
                        }else{
                            toast('移交失败！',600).err()
                        }
                    });
                } else {
                    toast("请选择一个用户！", 600).warn()
                }
            });
        },
        showAdd:function () {
            _self = this;
            $("#mainDiv").empty().html(_.template(taskAddTpl));
            $("#fkjzTime").datetimepicker({format:'YYYY-MM-DD',pickTime:false});
            $("#createtime").datetimepicker({format:'YYYY-MM-DD',pickTime:false});

            $("#chooseGroup").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            $("#chooseReceive").on('click', function () {
                // dictOpener.openChooseDict($(this));
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
                var jsr = $.trim($("#jsr").val()).split(",");
                $.extend(param, {
                    creator: top.userId,
                    createname:top.trueName,
                    deparmentcode:top.orgCode,
                    deparmentname:top.orgName,
                    bcrwid: $.trim($("#bcrwid").val()),
                    fkid: $.trim($("#fkid").val()),
                    taskName: $.trim($("#taskName").val()),
                    groupid: $.trim($("#groupid").val()),
                    jsr: $("#jsr").attr("id"),
                    jsrname: jsr[0],
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
        }
    }
});