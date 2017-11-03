/**
 * Created by dell on 2017/9/20.
 */
importing('currentDate');
define(['underscore',
    'text!/view/caseInvestigation/tpl/task/taskList.html',
    'text!/view/caseInvestigation/tpl/task/taskListTr.html',
    'text!/view/caseInvestigation/tpl/task/taskAdd.html',
    'text!/view/caseInvestigation/tpl/task/taskEdit.html',
    'text!/view/caseInvestigation/tpl/task/imgList.html',
    'text!/view/caseInvestigation/tpl/task/videoList.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/userList.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/userListTr.html',
    '../dat/task.js',
    '../../dictManage/src/dictOpener.js',
    '../../userInfoManage/dat/userInfo.js'], function (_, taskListTpl, taskListTrTpl, taskAddTpl, taskEditTpl, imgListTpl, videoListTpl, userListTpl, userListTrTpl,
                                                       taskAjax, dictOpener, userInfoAjax) {
    return {
        showList: function () {
            _self = this;
            // //关闭没有关闭的弹框
            // dictOpener.closeOpenerDiv();
            $("#mainDiv").empty().html(_.template(taskListTpl, {isOperation: true}));
            selectUtils.selectTextOption("#changeTaskType", "#taskType");
            selectUtils.selectTextOption("#changeConfirmStatus", "#fkqrzt");
            // selectUtils.selectTextOption("#changeTaskStatus", "#taskStatus");
            //选择任务状态
            _self.selectTaskStaOption("#changeTaskStatus");

            $("#chooseBelongGroup").on('click', function () {
                dictOpener.openChoosePort($(this), null, null, {userId: top.userId});
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
                $('#fkjzstartTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                $('#fkjzendTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
            });
            //点击选择时间范围（当天当月当季当年）
            selectUtils.selectTimeRangeOption("#changeSubmitDate", "#submitDate", "#fkjzstartTime", "#fkjzendTime");

            $("#addTask").on("click", function () {
                _self.showAdd();
            });
            $("#resetBtn").on("click", function () {
                selectUtils.clearQueryValue();
                return false;
            });
            $("#queryBtn").on("click", function () {
                _self.queryList();
                return false;
            });
            //判断如果点击首页待办进行查询
            $('#root-menu', window.parent.document).find('li').each(function (i, item) {
                if ($(item).attr("page-no") == 'A0102') {
                    var fkqrzt=$($(item).find("a")[0]).attr('fkqrzt');
                    var taskType=$($(item).find("a")[0]).attr('taskType');
                    var overdue=$($(item).find("a")[0]).attr('overdue');
                    if(fkqrzt){
                        $("#changeConfirmStatus u").eq(1).click();
                    }else if(taskType){
                        $("#changeTaskType u").eq(1).click();
                    }else if(overdue){
                        $("#changeTaskStatus u").eq(4).click();
                    }else{
                        _self.queryList();
                    }
                    $("#queryBtn").click();
                }
            });

        },
        selectTaskStaOption: function (obj) {
            _self = this;
            $(obj).on("click", "u", function () {
                $(this).addClass("active").siblings(".active").removeClass("active");
                var text = $(this).hasClass("active") ? $(this).text() : "";
                if (text == "被移交") {
                    $("#yjzt").val($(this).attr("val"));
                    $("#overdue").val("");
                    $("#fkzt").val("");
                } else if (text == "超期") {
                    $("#overdue").val($(this).attr("val"));
                    $("#yjzt").val("");
                    $("#fkzt").val("");
                } else if (text == "已反馈") {
                    $("#fkzt").val($(this).attr("val"));
                    $("#yjzt").val("");
                    $("#overdue").val("");
                } else if (text == "未反馈") {
                    $("#fkzt").val($(this).attr("val"));
                    $("#yjzt").val("");
                    $("#overdue").val("");
                } else {
                    $("#yjzt").val("");
                    $("#overdue").val("");
                    $("#fkzt").val("");
                }
            });
        },
        //查询功能
        queryList: function () {
            _self = this;
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
            var param = {
                userId: top.userId,
                taskType: $.trim($("#taskType").val()),
                taskName: $.trim($("#taskName").val()),
                taskNo: $.trim($("#taskNo").val()),
                groupid: $.trim($("#groupid").val()),
                creator: $.trim($("#creator").val()),
                jsr: $.trim($("#jsr").val()),
                startTime: $.trim($("#startTime").val()),
                endTime: $.trim($("#endTime").val()),
                fkqrzt: $.trim($("#fkqrzt").val()),
                fkzt: $.trim($("#fkzt").val()),
                yjzt: $.trim($("#yjzt").val()),
                overdue: $.trim($("#overdue").val()),
                deparmentcode: $.trim($("#deparmentcode").val()),
                fkjzstartTime: $.trim($("#fkjzstartTime").val()),
                fkjzendTime: $.trim($("#fkjzendTime").val()),
                orderBy:"task_name",
                isDesc:true
            };
            $('#taskListResult').pagingList({
                action: top.servicePath_xz + '/task/getTaskPage',
                jsonObj: param,
                callback: function (data) {
                    $("#taskListTable tbody").empty().html(_.template(taskListTrTpl, {data: data, isOperation: true}));
                    $(".link-text").on("click", function () {
                        _self.handleDetail($(this).attr('id'));
                    });
                    $(".into-urge").on("click", function () {
                        _self.handleUrge($(this).attr('id'));
                    });
                    $(".into-delete").on("click", function () {
                        _self.handleDelete($(this).attr('id'), $(this).attr('taskNo'));
                    });
                    $(".into-feedback").on("click", function () {
                        _self.handleFeedback($(this).attr('id'));
                    });
                    $(".into-transfer").on("click", function () {
                        var id = $(this).attr('id');
                        var taskInfo = $(this).attr('taskinfo');
                        _self.handleTransfer(id, taskInfo);
                        return false;
                    });
                }
            });
        },
        handleDetail: function (id) {
            _self = this;
            if (id) {
                taskAjax.taskDetail({
                    id: id, userId: top.userId
                }, function (r) {
                    if (r.flag == 1) {
                        //判断是否任务是否反馈
                        $("#mainDiv").empty().html(_.template(taskEditTpl, {data:r.data,isOperation:true}));
                        //在反馈上追加任务
                        $(".into-appendTaskBtn").on("click", function () {
                            _self.showAdd($(this).attr("taskinfo"), $(this).attr("title"));
                        });
                        $("#cancelBtn").on("click", function () {
                            _self.showList();
                        });

                        //在任务上补充任务
                        $("#replenishTaskBtn").on("click", function () {
                            _self.showAdd($(this).attr("taskinfo"), $(this).text());
                        });

                        //反馈任务
                        var fileInfoArr = []; //传入后台参数的文件数组...
                        var filesArr = []; //存放文件的数组...
                        $("#addVideo").siblings("input[type='file']").val("");
                        $("#addVideo").siblings("input[type='file']").off("change").on("change", function () {
                            var $this = $(this)[0];
                            //未上传前，在展示区域显示要上传内容的图片
                            var fileList = $this.files;
                            if (fileList.length == 0) {
                                return false;
                            }
                            for (var i = 0; i < fileList.length; i++) {
                                var tpObj = {};
                                var file = fileList[i];
                                //大小限制
                                if (file.size > 10 * 1024 * 1024) {
                                    $alert('单个视频大小超过10M， 上传速度将过慢，请重新上传');
                                    break;
                                }
                                tpObj.fileMd5 = _self.getGuid();//图片对应fileMd5
                                if (file.type.indexOf('image') > -1) {
                                    tpObj.src = '../../../img/tp-img.png';
                                } else {
                                    tpObj.src = '../../../img/tp-word.png';
                                }
                                tpObj.proofName = file.name.replace(/\.\w+$/, '');//图片的名字
                                tpObj.size = file.size;//(file.size / (1024 * 1024)).toFixed(2) + 'M';//图片的大小
                                tpObj.file = file;//存放input的file值
                                tpObj.flag = 1;
                                tpObj.createTime = new Date().format('yyyy-mm-dd hh:mm:ss');//时间

                                var fileType = file.type;
                                tpObj.fileMd5 = _self.getGuid();
                                tpObj.fileName = file.name;
                                tpObj.fileSuffix = fileType.substr(fileType.indexOf('/') + 1);
                                tpObj.type = fileType.substr(fileType.indexOf('/') + 1);

                                filesArr.push(tpObj);
                            }
                            var picWrap = $('#pics-wrap');
                            //h5表单文件上传
                            filesArr.forEach(function (item, i) {
                                if (item.file) {
                                    var data = new FormData();
                                    data.append('file', item.file);
                                    //调用远程服务器上传文件
                                    $.ajax({
                                        url: top.servicePath + '/sys/file/upload?isResize=true',
                                        type: 'POST',
                                        data: data,
                                        async: true,
                                        cache: false,
                                        processData: false,
                                        contentType: false,
                                        beforeSend: function () {
                                            debugger
                                            //设置进度条
                                            // var $progressActive = $slide.find('.progress>span');
                                            //
                                            // $slide.find('.state').html('上传中...');
                                            // $slide.find('.progress').show();
                                            //
                                            // //添加css3动画
                                            // $progressActive.addClass('progress-bar-animate');

                                        },
                                        success: function (res) {
                                            debugger
                                            if (res.flag == 1) {
                                                debugger
                                                //上传成功后的操作
                                                item.responseName = res.data.source.substring(12);
                                                item.responseOldName = res.data.oldName;
                                                item.responsePath = res.data.source;
                                                if(filesArr){
                                                    $.each(filesArr,function (index,value) {
                                                        var item = {
                                                            fileName: value.responseName,
                                                            fileOldName: value.responseOldName,
                                                            filePath: value.responsePath,
                                                            fileSize: value.size,
                                                            fileType: value.type
                                                        }
                                                        fileInfoArr.push(item);
                                                    });
                                                }

                                            } else {
                                                console.info(res);
                                            }
                                        },
                                        error: function () {
                                            //远程调用错误时，调用本地的上传文件接口
                                            //TODO
                                        }
                                    });
                                }
                            });
                        });

                        $("#addImg").siblings("input[type='file']").val("");
                        $("#addImg").siblings("input[type='file']").off("change").on("change", function () {
                            var $this = $(this)[0];
                            //未上传前，在展示区域显示要上传内容的图片
                            var fileList = $this.files;
                            if (fileList.length == 0) {
                                return false;
                            }
                            for (var i = 0; i < fileList.length; i++) {
                                var tpObj = {};
                                var file = fileList[i];
                                //大小限制
                                if (file.size > 10 * 1024 * 1024) {
                                    $alert('单张图片大小超过10M， 上传速度将过慢，请压缩后重新上传');
                                    break;
                                }
                                tpObj.fileMd5 = _self.getGuid();//图片对应fileMd5
                                if (file.type.indexOf('image') > -1) {
                                    tpObj.src = '../../../img/tp-img.png';
                                } else {
                                    tpObj.src = '../../../img/tp-word.png';
                                }
                                tpObj.proofName = file.name.replace(/\.\w+$/, '');//图片的名字
                                tpObj.size = file.size;//(file.size / (1024 * 1024)).toFixed(2) + 'M';//图片的大小
                                tpObj.file = file;//存放input的file值
                                tpObj.flag = 1;
                                tpObj.createTime = new Date().format('yyyy-mm-dd hh:mm:ss');//时间

                                var fileType = file.type;
                                tpObj.fileMd5 = _self.getGuid();
                                tpObj.fileName = file.name;
                                tpObj.fileSuffix = fileType.substr(fileType.indexOf('/') + 1);
                                tpObj.type = fileType.substr(fileType.indexOf('/') + 1);

                                filesArr.push(tpObj);
                            }
                            var picWrap = $('#pics-wrap');
                            //h5表单文件上传
                            filesArr.forEach(function (item, i) {
                                if (item.file) {
                                    var data = new FormData();
                                    data.append('file', item.file);
                                    //调用远程服务器上传文件
                                    $.ajax({
                                        url: top.servicePath + '/sys/file/upload?isResize=true',
                                        type: 'POST',
                                        data: data,
                                        async: true,
                                        cache: false,
                                        processData: false,
                                        contentType: false,
                                        beforeSend: function () {
                                            debugger
                                            //设置进度条
                                            // var $progressActive = $slide.find('.progress>span');
                                            //
                                            // $slide.find('.state').html('上传中...');
                                            // $slide.find('.progress').show();
                                            //
                                            // //添加css3动画
                                            // $progressActive.addClass('progress-bar-animate');

                                        },
                                        success: function (res) {
                                            debugger
                                            if (res.flag == 1) {
                                                debugger
                                                //上传成功后的操作
                                                item.responseName = res.data.source.substring(12);
                                                item.responseOldName = res.data.oldName;
                                                item.responsePath = res.data.source;
                                                if(filesArr){
                                                    $.each(filesArr,function (index,value) {
                                                        var item = {
                                                            fileName: value.responseName,
                                                            fileOldName: value.responseOldName,
                                                            filePath: value.responsePath,
                                                            fileSize: value.size,
                                                            fileType: value.type
                                                        }
                                                        fileInfoArr.push(item);
                                                    });
                                                }

                                            } else {
                                                console.info(res);
                                            }
                                        },
                                        error: function () {
                                            //远程调用错误时，调用本地的上传文件接口
                                            //TODO
                                        }
                                    });
                                }
                            });
                        });

                        $("#feedbackBtn").on("click", function () {
                            var taskinfo = $(this).attr("taskinfo");
                            _self.saveFeedback(str2obj(taskinfo).id,fileInfoArr);
                        });
                    }
                });
            }
        },
        handleUrge: function (id) {
            _self = this;
            $confirm('催办任务？', function (bol) {
                if (bol) {
                    var param = {
                        // taskid: id,
                        taskid: id,
                        userId: top.userId,
                        deparmentcode: top.orgCode
                    };
                    taskAjax.addCb(param, function (r) {
                        if (r.flag == 1) {
                            toast('催办成功！', 600, function () {
                                _self.showList();
                            }).ok()
                        } else {
                            // toast('催办失败！',600).err();
                            toast(r.msg, 600).err()
                        }
                    })
                }
            });
        },
        handleDelete: function (id, taskNo) {
            _self = this;
            $confirm('确定删除任务【' + taskNo + '】吗？', function (bol) {
                if (bol) {
                    taskAjax.deleteTaskById({id: id, userId: top.userId}, function (r) {
                        if (r.flag == 1) {
                            toast('删除成功！', 600, function () {
                                _self.showList();
                            }).ok()
                        } else {
                            // toast('删除失败！',600).err();
                            toast(r.msg, 600).err()
                        }
                    })
                }
            });
        },
        handleFeedback: function (taskId) {
            _self = this;
            if (taskId) {
                taskAjax.taskDetail({id: taskId, userId: top.userId}, function (r) {
                    if (r.flag == 1) {
                        $("#mainDiv").empty().html(_.template(taskEditTpl, {data:r.data,isOperation:true}));
                        var fileInfoArr = []; //传入后台参数的文件数组...
                        var filesArr = []; //存放文件的数组...
                        $("#addVideo").siblings("input[type='file']").val("");
                        $("#addVideo").siblings("input[type='file']").off("change").on("change", function () {
                            var $this = $(this)[0];
                            //未上传前，在展示区域显示要上传内容的图片
                            var fileList = $this.files;
                            if (fileList.length == 0) {
                                return false;
                            }
                            for (var i = 0; i < fileList.length; i++) {
                                var tpObj = {};
                                var file = fileList[i];
                                //大小限制
                                if (file.size > 10 * 1024 * 1024) {
                                    $alert('单个视频大小超过10M， 上传速度将过慢，请重新上传');
                                    break;
                                }
                                tpObj.fileMd5 = _self.getGuid();//图片对应fileMd5
                                if (file.type.indexOf('image') > -1) {
                                    tpObj.src = '../../../img/tp-img.png';
                                } else {
                                    tpObj.src = '../../../img/tp-word.png';
                                }
                                tpObj.proofName = file.name.replace(/\.\w+$/, '');//图片的名字
                                tpObj.size = file.size;//(file.size / (1024 * 1024)).toFixed(2) + 'M';//图片的大小
                                tpObj.file = file;//存放input的file值
                                tpObj.flag = 1;
                                tpObj.createTime = new Date().format('yyyy-mm-dd hh:mm:ss');//时间

                                var fileType = file.type;
                                tpObj.fileMd5 = _self.getGuid();
                                tpObj.fileName = file.name;
                                tpObj.fileSuffix = fileType.substr(fileType.indexOf('/') + 1);
                                tpObj.type = fileType.substr(fileType.indexOf('/') + 1);

                                filesArr.push(tpObj);
                            }
                            var picWrap = $('#pics-wrap');
                            //h5表单文件上传
                            filesArr.forEach(function (item, i) {
                                if (item.file) {
                                    var data = new FormData();
                                    data.append('file', item.file);
                                    //调用远程服务器上传文件
                                    $.ajax({
                                        url: top.servicePath + '/sys/file/upload?isResize=true',
                                        type: 'POST',
                                        data: data,
                                        async: true,
                                        cache: false,
                                        processData: false,
                                        contentType: false,
                                        beforeSend: function () {
                                            debugger
                                            //设置进度条
                                            // var $progressActive = $slide.find('.progress>span');
                                            //
                                            // $slide.find('.state').html('上传中...');
                                            // $slide.find('.progress').show();
                                            //
                                            // //添加css3动画
                                            // $progressActive.addClass('progress-bar-animate');

                                        },
                                        success: function (res) {
                                            debugger
                                            if (res.flag == 1) {
                                                debugger
                                                //上传成功后的操作
                                                item.responseName = res.data.source.substring(12);
                                                item.responseOldName = res.data.oldName;
                                                item.responsePath = res.data.source;
                                                if(filesArr){
                                                    $.each(filesArr,function (index,value) {
                                                        var item = {
                                                            fileName: value.responseName,
                                                            fileOldName: value.responseOldName,
                                                            filePath: value.responsePath,
                                                            fileSize: value.size,
                                                            fileType: value.type
                                                        }
                                                        fileInfoArr.push(item);
                                                    });
                                                }

                                            } else {
                                                console.info(res);
                                            }
                                        },
                                        error: function () {
                                            //远程调用错误时，调用本地的上传文件接口
                                            //TODO
                                        }
                                    });
                                }
                            });
                        });

                        $("#addImg").siblings("input[type='file']").val("");
                        $("#addImg").siblings("input[type='file']").off("change").on("change", function () {
                            var $this = $(this)[0];
                            //未上传前，在展示区域显示要上传内容的图片
                            var fileList = $this.files;
                            if (fileList.length == 0) {
                                return false;
                            }
                            for (var i = 0; i < fileList.length; i++) {
                                var tpObj = {};
                                var file = fileList[i];
                                //大小限制
                                if (file.size > 10 * 1024 * 1024) {
                                    $alert('单张图片大小超过10M， 上传速度将过慢，请压缩后重新上传');
                                    break;
                                }
                                tpObj.fileMd5 = _self.getGuid();//图片对应fileMd5
                                if (file.type.indexOf('image') > -1) {
                                    tpObj.src = '../../../img/tp-img.png';
                                } else {
                                    tpObj.src = '../../../img/tp-word.png';
                                }
                                tpObj.proofName = file.name.replace(/\.\w+$/, '');//图片的名字
                                tpObj.size = file.size;//(file.size / (1024 * 1024)).toFixed(2) + 'M';//图片的大小
                                tpObj.file = file;//存放input的file值
                                tpObj.flag = 1;
                                tpObj.createTime = new Date().format('yyyy-mm-dd hh:mm:ss');//时间

                                var fileType = file.type;
                                tpObj.fileMd5 = _self.getGuid();
                                tpObj.fileName = file.name;
                                tpObj.fileSuffix = fileType.substr(fileType.indexOf('/') + 1);
                                tpObj.type = fileType.substr(fileType.indexOf('/') + 1);

                                filesArr.push(tpObj);
                            }
                            var picWrap = $('#pics-wrap');
                            //h5表单文件上传
                            filesArr.forEach(function (item, i) {
                                if (item.file) {
                                    var data = new FormData();
                                    data.append('file', item.file);
                                    //调用远程服务器上传文件
                                    $.ajax({
                                        url: top.servicePath + '/sys/file/upload?isResize=true',
                                        type: 'POST',
                                        data: data,
                                        async: true,
                                        cache: false,
                                        processData: false,
                                        contentType: false,
                                        beforeSend: function () {
                                            debugger
                                            //设置进度条
                                            // var $progressActive = $slide.find('.progress>span');
                                            //
                                            // $slide.find('.state').html('上传中...');
                                            // $slide.find('.progress').show();
                                            //
                                            // //添加css3动画
                                            // $progressActive.addClass('progress-bar-animate');

                                        },
                                        success: function (res) {
                                            debugger
                                            if (res.flag == 1) {
                                                debugger
                                                //上传成功后的操作
                                                item.responseName = res.data.source.substring(12);
                                                item.responseOldName = res.data.oldName;
                                                item.responsePath = res.data.source;
                                                if(filesArr){
                                                    $.each(filesArr,function (index,value) {
                                                        var item = {
                                                            fileName: value.responseName,
                                                            fileOldName: value.responseOldName,
                                                            filePath: value.responsePath,
                                                            fileSize: value.size,
                                                            fileType: value.type
                                                        }
                                                        fileInfoArr.push(item);
                                                    });
                                                }

                                            } else {
                                                console.info(res);
                                            }
                                        },
                                        error: function () {
                                            //远程调用错误时，调用本地的上传文件接口
                                            //TODO
                                        }
                                    });
                                }
                            });
                        });

                        $('.slick-list').slick({
                            dots: true
                        });

                        //反馈任务
                        $("#feedbackBtn").on("click", function () {
                            console.info(fileInfoArr);
                            _self.saveFeedback(taskId,fileInfoArr);
                        });
                        $("#cancelBtn").on("click", function () {
                            _self.showList();
                        });
                    }
                });
            }


        },
        //生成32位的id
        getGuid: function () {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }

            return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
        },
        upload: function (filesArr, $this) {
        },
        //slide 图片轮播
        slickFn: function (selector, tpArr, flag, $index) {
            _self = this;
            $(selector).unslick();
            if (flag) {
                $(selector).template(tpArr).slick({
                    infinite: false,
                    dots: false,
                    arrows: true,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    vertical: flag ? true : false,
                    prevArrow: '<span class="ss-up .fa icon-chevron-up"></span>',
                    nextArrow: '<span class="ss-down .fa icon-chevron-down"></span>'
                });
                $(selector).addClass('hide').find('.slide').eq($index).addClass('active').siblings().removeClass('active');
            } else {
                $(selector).template(tpArr).slick({
                    infinite: false,
                    dots: false,
                    arrows: true,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    vertical: flag ? true : false,
                    prevArrow: '<span class="ss-prev .fa icon-chevron-left fs24"></span>',
                    nextArrow: '<span class="ss-next .fa icon-chevron-right fs24"></span>'
                });
                $(selector).find('.slick-track,.slide,.slide-content').css({'width': 'auto', 'height': 'auto'});
                $(selector).find('.slide-content').each(function (i, item) {
                    $(item).find('img').previewPro($(item).find('.name').text());
                });
            }
        },
        saveFeedback: function (taskId,fileInfoArr) {
            _self = this;
            $('.feedback-valid').validatebox();
            if ($('.validatebox-invalid').length > 0) {
                return false;
            }
            var taskFkFiles = [];
            if(fileInfoArr){
                taskFkFiles = fileInfoArr;
            }
            debugger
            console.info(taskFkFiles);
            var param = {
                bz: $.trim($("#bz").val()),
                createname: top.trueName,
                creator: top.userId,
                deparmentcode: top.orgCode,
                fkTime: $("#fkTime").val(),
                fkr: top.userId,
                fkrname: top.trueName,
                fkxs: $("#fkxs").val(),
                taskFkFiles: taskFkFiles,
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

        },
        handleTransfer: function (taskId, taskInfo) {
            _self = this;
            $open('#userListDiv', {width: 800, title: '&nbsp用户列表'});
            $("#userListDiv .panel-container").empty().html(_.template(userListTpl, {checkboxMulti: false}));
            $("#userListDiv").on('click', "#chooseUint", function () {
                dictOpener.openUnitChoosePort($(this));
            });
            $("#userListDiv").on("click", "#resetBtn", function () {
                selectUtils.clearQueryValue();
                return false;
            });
            $("#userListDiv").on("click", "#queryBtn", function () {
                _self.queryUserList(false, taskId, taskInfo);
                return false;
            });

            //加载用户列表
            _self.queryUserList(false, taskId, taskInfo);
        },
        showAdd: function (taskinfo, text) {
            _self = this;
            var bcrwid, fkid;
            var taskinfo = str2obj(taskinfo);
            if (taskinfo) {
                bcrwid = taskinfo.bcrwid;
                fkid = taskinfo.fkid;
            }
            $("#mainDiv").empty().html(_.template(taskAddTpl, {taskInfo: taskinfo, text: text}));
            $("#fkjzTime").datetimepicker({format: 'YYYY-MM-DD', pickTime: false});

            $("#chooseGroup").on('click', function () {
                dictOpener.openChoosePort($(this), null, null, {userId: top.userId});
            });
            $("#chooseReceive").on('click', function () {
                if ($("#groupid").val()) {
                    var groupinfo = str2obj($("#groupid").attr("paramattr"));
                    var taskinfo = str2obj($("#groupid").attr("taskparamattr"));
                    dictOpener.openChoosePort($(this), $post, top.servicePath_xz + '/usergroup/getUsergroupPage', {groupId: text ? taskinfo.groupid : groupinfo.id}, "user");
                } else {
                    toast("请先选择专案组！", 600).warn();
                }
            });
            //绑定返回事件
            $("#cancelBtn").on("click", function () {
                _self.showList();
            });
            $("#saveBtn").on("click", function () {
                $('.task-valid').validatebox();
                if ($('.validatebox-invalid').length > 0) {
                    return false;
                }
                var param = $("#taskAddForm").serializeObject();
                var jsrParam = str2obj($("#jsr").attr("paramattr"));
                var groupParam = str2obj($("#groupid").attr("paramattr"));
                var taskParam;
                //由追加任务 补充任务跳转过来
                if (text) {
                    taskParam = str2obj($("#groupid").attr("taskparamattr"));
                }
                $.extend(param, {
                    creator: top.userId,
                    createname: top.trueName,
                    deparmentcode: top.orgCode,
                    deparmentname: top.orgName,
                    bcrwid: bcrwid ? bcrwid : "",
                    fkid: fkid ? fkid : "",
                    taskName: $.trim($("#taskName").val()),
                    groupid: text ? taskParam.groupid : groupParam.id,
                    jsr: text ? taskParam.jsr : jsrParam.userId,
                    jsrname: text ? taskParam.jsrname : jsrParam.userName,
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
        queryUserList: function (isCheckboxMulti, taskId, taskInfo) {
            _self = this;
            //获取专案组组内成员
            var taskInfo = str2obj(taskInfo);
            var param = {
                groupId: taskInfo.groupid
            };
            $post(top.servicePath_xz + '/usergroup/getUsergroupPage', param, function (r) {
                if (r.flag == 1) {
                    $("#userTable tbody").empty().html(_.template(userListTrTpl, {
                        data: r.data,
                        ops: top.opsMap,
                        checkboxMulti: isCheckboxMulti
                    }));
                    $(".span").span();
                    //任务移交给用户
                    _self.saveTransfer(taskId);
                    $("#userListDiv").on('click', "#cancelBtn", function () {
                        $('#userListDiv').$close();
                    });
                }
            }, true);
            // //不分页
            // userInfoAjax.getUserInfoListByOrgId({orgId: top.orgId},function (r) {
            //     if (r.flag == 1) {
            //         $("#userTable tbody").empty().html(_.template(userListTrTpl, {
            //             data: r.data,
            //             ops: top.opsMap,
            //             checkboxMulti:isCheckboxMulti
            //         }));
            //         //任务移交给用户
            //         _self.saveTransfer(taskId);
            //         $("#userListDiv").on('click', "#cancelBtn", function () {
            //             $('#userListDiv').$close();
            //         });
            //     }
            // });
        },
        saveTransfer: function (taskId) {
            _self = this;
            $("#userListDiv").on("click", ".choseOneUser:checkbox", function () {
                if ($(this).is(':checked')) {
                    $(this).attr('checked', true).parent().parent().siblings().find("input:checkbox").attr('checked', false);
                } else {
                    $(this).prop("checked", false);
                }
            });
            $("#userListDiv").on("click", "#transferBtn", function () {
                var checkbox = [];
                $('#userTable').find('tbody input:checkbox:checked').each(function (i, e) {
                    var jsrInfo = {
                        jsr: $(e).attr('jsr'),
                        jsrLxfs: $(e).attr('jsrLxfs'),
                        jsrname: $(e).attr('jsrname')
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
                    taskAjax.moveTask(param, function (r) {
                        if (r.flag == 1) {
                            toast('移交成功！', 600, function () {
                                $("#userListDiv").$close();
                                _self.showList();
                            }).ok()
                        } else {
                            // toast('移交失败！',600).err()
                            toast(r.msg, 600).err();
                        }
                    });
                } else {
                    toast("请选择一个用户！", 600).warn()
                }
            });
        }
    }
});