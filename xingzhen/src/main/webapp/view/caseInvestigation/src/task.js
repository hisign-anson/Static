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
    '../../dictManage/src/dictOpener.js'], function (_, taskListTpl,taskListTrTpl,taskAddTpl,taskEditTpl,taskFeedbackTpl,
                                                     dictOpener) {
    return {
        showList: function () {
            _self = this;
            //关闭没有关闭的弹框
            dictOpener.closeOpenerDiv();
            $("#mainDiv").empty().html(_.template(taskListTpl, {ops: top.opsMap}));
            selectUtils.selectTextOption("#changeTaskType", "#taskType");
            selectUtils.selectTextOption("#changeTaskStatus", "#taskStatus");
            $("#chooseBelongGroup").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            $("#chooseCreateName").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            $("#chooseRecipient").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            $("#chooseBelongUnit").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            $("#createDate").daterangepicker({
                separator: ' 至 ',
                showWeekNumbers: true,
                pickTime: true
            }, function (start, end, label) {
                $('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                $('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
            });
            $("#submitDate").datetimepicker({format:'YYYY-MM-DD',pickTime:false});
            //点击选择时间范围（当天当月当季当年）
            /***参数：（被点击的div包裹层，显示的时间输入框，传入后台的开始时间，传入后台的结束时间）***/
            selectUtils.selectTimeRangeOption("#changeCreateDate", "#createDate", "#startTime", "#endTime");

            $("#addTask").on("click",function () {
                _self.showAdd();
            });

            $("#resetBtn").on("click",function () {

            });
            $("#queryBtn").on("click",function () {
                _self.queryList();
            });
            _self.queryList();
        },
        //查询功能
        queryList:function(){
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
                    "taskStatus": "已反馈",
                    "recipientStatus": "未查看",
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
                    "taskStatus": "未反馈",
                    "recipientStatus": "已查看",
                    "submitDate": "2017-09-07 11:59:09",
                    "actualSubmitDate": "2017-09-06 19:59:09"
                }
            ];
            $("#taskListTable tbody").empty().html(_.template(taskListTrTpl, {data: taskData}));
            $(".link-text").on("click",function () {
                //判断是否任务是否反馈
                $("#mainDiv").empty().html(_.template(taskEditTpl));
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
            });
            $(".into-urge").on("click",function () {
                _self.handleUrge();
            });
            $(".into-delete").on("click",function () {

            });
            $(".into-feedback").on("click",function () {
                _self.handleFeedback();
            });
            $(".into-transfer").on("click", function () {
                _self.handleTransfer();
            });
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
        handleTransfer:function () {
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
                    //do something
                    $("#userListDiv").$close();
                } else {
                    toast("请选择一个用户！", 600).warn()
                }
            });
        },
        showAdd:function () {
            _self = this;
            $("#mainDiv").empty().html(_.template(taskAddTpl));
            $("#dateDue").datetimepicker({format:'YYYY-MM-DD',pickTime:false});
            $("#createDate").datetimepicker({format:'YYYY-MM-DD',pickTime:false});

            $("#chooseGroup").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            $("#chooseReceive").on('click', function () {
                dictOpener.openChooseDict($(this));
            });
            $("#cancelBtn").on("click",function () {
                _self.showList();

            });
            $("#saveBtn").on("click",function () {
                _self.showList();
            });
        }
    }
});