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
                $('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
                $('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
            });
            //点击选择时间范围（当天当月当季当年）
            selectUtils.selectTimeRangeOption("#changeSubmitDate", "#submitDate", "#fkstartTime", "#fkendTime");

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
                } else if (text == "超期") {
                    $("#overdue").val($(this).attr("val"));
                } else if (text == "已反馈") {
                    $("#fkzt").val($(this).attr("val"));
                } else if (text == "未反馈") {
                    $("#fkzt").val($(this).attr("val"));
                } else {
                    $("#yjzt").val("");
                    $("#overdue").val("");
                    $("#fkzt").val("");
                }
            });
        },
        //查询功能
        queryList: function () {
            debugger
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
                fkstartTime: $.trim($("#fkstartTime").val()),
                fkendTime: $.trim($("#fkendTime").val())
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
                        $("#mainDiv").empty().html(_.template(taskEditTpl, r));
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
                        var videoFileInfo = {}, picFileInfo = {};
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
                        _self.upclickImg();
                        // _self.upclickVideo();
                        $("#feedbackBtn").on("click", function () {
                            var taskinfo = $(this).attr("taskinfo");
                            _self.saveFeedback(str2obj(taskinfo).id);
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
        getFileInfoArr: function ($element) {
            _self = this;
            var fileDiv = $element[0];
            var fileDetail;
            var fileArr = [];
            if (!fileDiv.files) {
                alert('error:' + '获取文件失败');
                throw new Error('获取文件失败');
            }
            console.info(fileDiv.files)
            debugger;
            fileDetail = fileDiv.files;
            var file = fileDiv.files[0];
            // console.log(file);
            // alert(file['name']);
            $.each(fileDetail, function (index, value) {
                // var a = value;
                var fileDetailItem = fileDetail[index];
                debugger
                var arr = {
                    fileName: fileDetailItem['name'],
                    fileOldName: fileDetailItem['name'],
                    filePath: "",
                    fileSize: fileDetailItem['size'],
                    fileType: fileDetailItem['type']
                };
                fileArr.push(arr);
            })
            console.info(fileArr);
            return fileArr;
        },
        handleFeedback: function (taskId) {
            _self = this;
            if (taskId) {
                taskAjax.taskDetail({id: taskId, userId: top.userId}, function (r) {
                    if (r.flag == 1) {
                        $("#mainDiv").empty().html(_.template(taskEditTpl, r));
                        var videoFileInfo = {}, picFileInfo = {},fileInfo = [];
                        // $("#addVideo").siblings("input[type='file']").val("");
                        // $("#addVideo").siblings("input[type='file']").off("change").on("change", function () {
                        //     videoFileInfo = _self.getFileInfoArr($("#addVideo").siblings("input[type='file']"));
                        //     $.each(videoFileInfo,function (index,value) {
                        //         var fileArr = {
                        //             fileName: videoFileInfo[0].fileName,
                        //             fileOldName: videoFileInfo[0].fileName,
                        //             filePath: videoFileInfo[0].filePath,
                        //             fileSize: videoFileInfo[0].fileSize,
                        //             fileType: videoFileInfo[0].fileType
                        //         }
                        //         fileInfo.push(fileArr);
                        //     })
                        // });

//                         $("#addImg").siblings("input[type='file']").val("");
//                         $("#addImg").siblings("input[type='file']").off("change").on("change", function () {
//                             picFileInfo = _self.getFileInfoArr($("#addImg").siblings("input[type='file']"));
//                             $.each(picFileInfo,function (index,value) {
//                                 var fileArr = {
//                                     fileName: picFileInfo[0].fileName,
//                                     fileOldName: picFileInfo[0].fileName,
//                                     filePath: picFileInfo[0].filePath,
//                                     fileSize: picFileInfo[0].fileSize,
//                                     fileType: picFileInfo[0].fileType
//                                 }
//                                 fileInfo.push(fileArr);
//                             })
//                             debugger
//                             var filesArr = []; //存放文件的数组...
//                             // _self.upload(filesArr, $(this)[0]);
//                             var $this = $(this)[0];
//                             //未上传前，在展示区域显示要上传内容的图片
//                             var fileList = $this.files;
//                             if (fileList.length == 0) {
//                                 return false;
//                             }
//                             for (var i = 0; i < fileList.length; i++) {
//                                 var tpObj = {};
//                                 var file = fileList[i];
//                                 //大小限制
//                                 if (file.size > 10 * 1024 * 1024) {
//                                     $alert('单张图片大小超过10M， 上传速度将过慢，请压缩后重新上传');
//                                     break;
//                                 }
//                                 tpObj.fileMd5 = _self.getGuid();//图片对应fileMd5
//                                 // tpObj.id = tpObj.fileMd5;
//                                 if (file.type.indexOf('image') > -1) {
//                                     tpObj.src = '../../../img/tp-img.png';
//                                 } else {
//                                     tpObj.src = '../../../img/tp-word.png';
//                                 }
//                                 tpObj.proofName = file.name.replace(/\.\w+$/, '');//图片的名字
//                                 tpObj.tipClass = 'icon-remove';//上传状态icon
//                                 tpObj.state = '等待上传';//图片上传状态
//                                 tpObj.size = (file.size / (1024 * 1024)).toFixed(2) + 'M';//图片的大小
//                                 tpObj.file = file;//存放input的file值
//                                 tpObj.flag = 1;
//                                 tpObj.createTime = new Date().format('yyyy-mm-dd hh:mm:ss');//时间
//
//                                 var fileType = file.type;
//                                 tpObj.fileMd5 = _self.getGuid();
//                                 tpObj.fileName = file.name;
//                                 tpObj.fileSuffix = fileType.substr(fileType.indexOf('/') + 1);
//
//                                 filesArr.push(tpObj);
//                             }
//
//                             //附件按钮disabled
//                             // $this.parent().addClass('disabled');
//
//                             //slick
//                             filesArr.each(function (item, index) {
//                                 item.serialNo = index + 1;
//                             })
//                             // _self.slickFn('#pics-wrap',filesArr);
//
//                             var picWrap = $('#pics-wrap');
//                             //h5表单文件上传
//                             filesArr.forEach(function (item, i) {
//                                 var $slide = picWrap.find('[fileMd5="{0}"]'.format(item.fileMd5)); //找到对应的slide元素
//                                 var filedownload, fileNameRemote;
//                                 if (item.file) {
//                                     var time2;
//                                     var data = new FormData();
//                                     data.append('file', item.file);
//                                     //调用远程服务器上传文件
//                                     $.ajax({
//                                         url: top.servicePath + '/sys/file/upload?isResize=true',
//                                         type: 'POST',
//                                         data: data,
//                                         async: true,
//                                         cache: false,
//                                         processData: false,
//                                         contentType: false,
//                                         beforeSend: function () {
//                                             //设置进度条
//                                             var $progressActive = $slide.find('.progress>span');
//
//                                             $slide.find('.state').html('上传中...');
//                                             $slide.find('.progress').show();
//
//                                             //添加css3动画
//                                             $progressActive.addClass('progress-bar-animate');
//
//                                         },
//                                         success: function (res) {
//                                             debugger
//                                             if (res.flag == 1) {
//                                                 debugger
// //上传成功后的操作
//                                                 // clearInterval(time2); //清除进度条的定时器
//                                                 // $slide.find('.progress>span').css('width', '100%');
//                                                 // // $slide.find('.progress>span').css('width', '100%');//设置对应进度条为100%
//                                                 //
//                                                 // setTimeout(function () {
//                                                 //     $slide.find('.progress').hide();//隐藏进度条
//                                                 //     $slide.find('.tip').addClass('icon-ok').removeClass('icon-remove');//修改右下角小图标
//                                                 //     $slide.find('.state').html('上传完成');//修改上传状态
//                                                 //
//                                                 //     //如果上传的是image 则修改对应的图片地址
//                                                 //     if (item.file.type.indexOf('image') > -1) {
//                                                 //         $slide.find('img').prop('src', filedownload + res.data.fileNameRemote);
//                                                 //         item.src = filedownload + res.data.fileNameRemote;
//                                                 //
//                                                 //     } else {
//                                                 //         $slide.find('img').prop('src', '../../img/tp-word-ok.png');
//                                                 //         item.src = '../../img/tp-word-ok.png';
//                                                 //     }
//                                                 //
//                                                 //     //修改对应item的值
//                                                 //     item.state = '上传完成';
//                                                 //     item.tipClass = 'icon-ok';
//                                                 //
//                                                 //     //将附件信息存放在img上
//                                                 //     item.proofType = item.file.type.indexOf('image') > -1 ? '1' : '2'; //附件类型
//                                                 //     item.fileServerPath = res.data.fileNameRemote;//文件服务器返回的地址
//                                                 //     $slide.find('img').attr('fileServerPath', item.fileServerPath);
//                                                 //     delete item['file'];
//                                                 // }, 2000);
//                                             } else {
//                                                 console.info(res);
//                                             }
//                                         },
//                                         error: function () {
//                                             //远程调用错误时，调用本地的上传文件接口
//                                             //TODO
//                                         }
//                                     });
//                                 }
//                             });
//
//                             //附件按钮判断是否禁用
//                             var time = setInterval(function () {
//                                 //全部已经上传成功后，附件按钮可以点击
//                                 if (picWrap.find('.tip.icon-remove').length == 0) {
//                                     $('.upload-file').removeClass('disabled');
//                                     clearInterval(time);
//                                 }
//                             }, 20);
//                         });
//                         $('.slick-list').slick({
//                             dots: true
//                         });

                        // _self.upclickImg();
                        // _self.upclickVideo();
                        //反馈任务
                        $("#feedbackBtn").on("click", function () {
                            debugger
                            _self.saveFeedback(taskId, videoFileInfo, picFileInfo,fileInfo);
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
            _self = this;
            debugger
            var $this = $this;
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
                // tpObj.id = tpObj.fileMd5;
                if (file.type.indexOf('image') > -1) {
                    tpObj.src = '../../../img/tp-img.png';
                } else {
                    tpObj.src = '../../../img/tp-word.png';
                }
                tpObj.proofName = file.name.replace(/\.\w+$/, '');//图片的名字
                tpObj.tipClass = 'icon-remove';//上传状态icon
                tpObj.state = '等待上传';//图片上传状态
                tpObj.size = (file.size / (1024 * 1024)).toFixed(2) + 'M';//图片的大小
                tpObj.file = file;//存放input的file值
                tpObj.flag = 1;
                tpObj.createTime = new Date().format('yyyy-mm-dd hh:mm:ss');//时间

                var fileType = file.type;
                tpObj.fileMd5 = _self.getGuid();
                tpObj.fileName = file.name;
                tpObj.fileSuffix = fileType.substr(fileType.indexOf('/') + 1);

                filesArr.push(tpObj);
            }

            //附件按钮disabled
            // $this.parent().addClass('disabled');

            //slick
            filesArr.each(function (item, index) {
                item.serialNo = index + 1;
            })
            // _self.slickFn('#pics-wrap',filesArr);

            var picWrap = $('#pics-wrap');
            //h5表单文件上传
            filesArr.forEach(function (item, i) {
                var $slide = picWrap.find('[fileMd5="{0}"]'.format(item.fileMd5)); //找到对应的slide元素
                var filedownload, fileNameRemote;
                if (item.file) {
                    var time2;
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
                            //设置进度条
                            var $progressActive = $slide.find('.progress>span');

                            $slide.find('.state').html('上传中...');
                            $slide.find('.progress').show();

                            //添加css3动画
                            $progressActive.addClass('progress-bar-animate');

                        },
                        success: function (res) {
                            debugger
                            if (res.flag == 1) {
                                debugger
//上传成功后的操作
                                // clearInterval(time2); //清除进度条的定时器
                                // $slide.find('.progress>span').css('width', '100%');
                                // // $slide.find('.progress>span').css('width', '100%');//设置对应进度条为100%
                                //
                                // setTimeout(function () {
                                //     $slide.find('.progress').hide();//隐藏进度条
                                //     $slide.find('.tip').addClass('icon-ok').removeClass('icon-remove');//修改右下角小图标
                                //     $slide.find('.state').html('上传完成');//修改上传状态
                                //
                                //     //如果上传的是image 则修改对应的图片地址
                                //     if (item.file.type.indexOf('image') > -1) {
                                //         $slide.find('img').prop('src', filedownload + res.data.fileNameRemote);
                                //         item.src = filedownload + res.data.fileNameRemote;
                                //
                                //     } else {
                                //         $slide.find('img').prop('src', '../../img/tp-word-ok.png');
                                //         item.src = '../../img/tp-word-ok.png';
                                //     }
                                //
                                //     //修改对应item的值
                                //     item.state = '上传完成';
                                //     item.tipClass = 'icon-ok';
                                //
                                //     //将附件信息存放在img上
                                //     item.proofType = item.file.type.indexOf('image') > -1 ? '1' : '2'; //附件类型
                                //     item.fileServerPath = res.data.fileNameRemote;//文件服务器返回的地址
                                //     $slide.find('img').attr('fileServerPath', item.fileServerPath);
                                //     delete item['file'];
                                // }, 2000);
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

            //附件按钮判断是否禁用
            var time = setInterval(function () {
                //全部已经上传成功后，附件按钮可以点击
                if (picWrap.find('.tip.icon-remove').length == 0) {
                    $('.upload-file').removeClass('disabled');
                    clearInterval(time);
                }
            }, 20);
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
        saveFeedback: function (taskId, videoFileInfo, picFileInfo,fileInfo) {
            _self = this;
            $('.feedback-valid').validatebox();
            if ($('.validatebox-invalid').length > 0) {
                return false;
            }
            var taskFkFiles = [];
            if(fileInfo){
                debugger
                taskFkFiles = fileInfo;
            }
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
            debugger
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
        },
        saveStaff: function () {
            _self = this;

            //专案组添加成员
            $("#userTable #selectAll").on('click', function () {
                $('#userTable').find('tbody input:checkbox').prop('checked', this.checked);
            });
            $("#userListDiv").on("click", "#saveStaffBtn", function () {
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
        },
        upclickImg: function () {
            _self = this;
            // //上传图片
            // upclick({
            //     dataname: "file",
            //     element: "addImg",
            //     action: top.servicePath + '/sys/file/upload?isResize=true',
            //     onstart: function (filename) {
            //         debugger
            //         // $(".progress-bar").css('width','50%');
            //     },
            //     oncomplete: function (r) {
            //         debugger
            //         if (r.flag == 1) {
            //             // {
            //             //     oldName: "Tulips.jpg",
            //             //         source: "/2017/11/01/20171115095047027876755.jpg",
            //             //     resultMessage: "success",
            //             //     p160_160: "/2017/11/01/20171115095047027876755160_160.jpg"
            //             // }
            //
            //             $(".slick-list").append(_.template(imgListTpl,{data:r.data}));
            //             // $("#avatar").val(obj2str(r.data));
            //             // $("#avatar-img").attr('src', top.ftpServer + r.data.source);
            //         } else {
            //             toast(r.msg, 600).err();
            //             // $(".progress-bar").css('width','0%');
            //         }
            //         // $(".progress-bar").css('width','100%');
            //     }
            // });
        },
        upclickVideo: function () {
            debugger
            _self = this;
            //上传视频
            upclick({
                dataname: "file",
                element: "addVideo",
                action: top.servicePath + '/sys/file/upload?isResize=true',
                onstart: function (filename) {
                    debugger
                    // $(".progress-bar").css('width','50%');
                },
                oncomplete: function (r) {
                    debugger
                    if (r.flag == 1) {
                        $(".slick-list").append(_.template(videoListTpl, {data: r.data}));

                    } else {
                        toast(r.msg, 600).err();
                        // $(".progress-bar").css('width','0%');
                    }
                    // $(".progress-bar").css('width','100%');
                }
            });
        }
    }
});