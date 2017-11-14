importing('currentDate');
define(['underscore',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/baseInfo.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCase.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCaseTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupStaff.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupStaffTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/userList.html',
    'text!/view/caseInvestigation/tpl/task/taskAdd.html',
    'text!/view/caseInvestigation/tpl/task/taskEdit.html',
    'text!/view/caseInvestigation/tpl/task/taskInfo.html',
    'text!/view/caseInvestigation/tpl/task/feedBackInfo.html',
    '../../caseInvestigation/dat/specialCaseGroup.js',
    '../../caseInvestigation/src/specialCaseGroup.js',
    '../../caseInvestigation/dat/task.js',
    '../../caseInvestigation/src/task.js',
    '../../dictManage/src/dictOpener.js'], function (_, baseInfoTpl, relationCaseTpl, relationCaseTrTpl, groupStaffTpl, groupStaffTrTpl, userListTpl, taskAddTpl, taskEditTpl, taskInfoTpl, feedBackInfoTpl,
                                                     specialCaseGroupAjax, specialCaseGroup, taskAjax, task, dictOpener) {
        return {
            menuHanle: function (event, treeId, treeNode, clickFlag) {
                graphActionThis = this;
                var $target = $(event.currentTarget).find("#" + treeNode.tId).find("#" + treeNode.tId + "_span>span");
                var className = $target.attr("class");
                var id = $target.attr("id");
                var text = $target.text();
                var val = $target.attr("val");
                var infoattr = $target.attr("infoattr");
                var taskid = $target.attr("taskid");

                switch (className) {
                    case "groupHandle":
                        //专案组右键菜单处理
                        graphActionThis.groupHandle(id, val, infoattr);
                        break;
                    case "taskHandle":
                        //任务右键菜单处理
                        graphActionThis.taskHandle(id, val, infoattr, taskid);
                        break;
                    case "feedbackHandle":
                        //反馈右键菜单处理
                        graphActionThis.feedbackHandle(id, val, taskid);
                        break;
                    case "caseHandle":
                        //案件右键菜单处理
                        graphActionThis.caseHandle(id, val, infoattr);
                        break;
                }
            },
            groupHandle: function (id, val, infoattr) {
                graphActionThis = this;
                switch (val) {
                    case "1":
                        //查看专案组基本信息
                        graphActionThis.showGroupInfo(id, infoattr);
                        break;
                    case "2":
                        //查看专案组成员
                        graphActionThis.showGroupStaff(id, infoattr);
                        break;
                    case "3":
                        //在专案组上新增任务
                        graphActionThis.addTask(id, infoattr);
                        break;
                }
            },
            taskHandle: function (id, val, infoattr, taskid) {
                graphActionThis = this;
                switch (val) {
                    case "1":
                        //接收人在任务上反馈任务
                        graphActionThis.feedbackTask(id);
                        break;
                    case "2":
                        //接收人移交任务
                        graphActionThis.transferTask(id);
                        break;
                    case "3":
                        //接收人在任务上补充任务
                        graphActionThis.addTaskHandle(id, "补充任务");
                        break;
                    case "4":
                        //下发人催办任务
                        graphActionThis.urgeTask(id);
                        break;
                    case "5":
                        //查看任务基本信息
                        graphActionThis.showTaskInfo(id);
                        break;
                }
            },
            feedbackHandle: function (id, val, taskid) {
                graphActionThis = this;
                switch (val) {
                    case "1":
                        //下发人在反馈上追加任务
                        graphActionThis.addTaskHandle(id, "追加任务", taskid);
                        break;
                    case "2":
                        //查看反馈信息
                        graphActionThis.feedbackInfo(id, taskid);
                        break;
                }
            },
            caseHandle: function (id, val) {
                graphActionThis = this;
                switch (val) {
                    case "1":
                        //查看案件详情
                        specialCaseGroup.showCaseInfo(id);
                        break;
                }
            },
            showGroupInfo: function (id, infoattr) {
                graphActionThis = this;
                var groupInfo;
                $.ajax({
                    url: top.servicePath_xz + '/group/groupDetail/' + id,
                    type: "post",
                    contentType: "application/x-www-form-urlencoded",
                    success: function (r) {
                        if (r.data) {
                            groupInfo = r.data;
                            $("#top-mask", parent.document).height(0);
                            $open('#userListDiv', {width: 800, title: '&nbsp专案组基本信息'});
                            $("#top-mask", window.top).height(0);
                            var openerDiv = $("#userListDiv");
                            openerDiv.find(".panel-container").empty().html(_.template(baseInfoTpl));

                            $("#grouptype").siblings("i#chooseGroupType").remove();
                            $("#baseInfo").find("input,select").attr("disabled", "disabled");
                            //赋值
                            $("#groupname").val(groupInfo.groupname);
                            $("#grouptype").val(groupInfo.grouptype);
                            $("#grouptypeName").val(groupInfo.grouptypeName);
                            $("#createname").val(groupInfo.createname);
                            $("#deparmentcode").val(groupInfo.deparmentname);
                            $("#createtime").val(rangeUtil.formatDate(groupInfo.createtime, 'yyyy-MM-dd'));
                        }
                    }
                });
            },
            showGroupStaff: function (id, infoattr) {
                graphActionThis = this;
                $.ajax({
                    url: top.servicePath_xz + '/group/groupDetail/' + id,
                    type: "post",
                    contentType: "application/x-www-form-urlencoded",
                    success: function (r) {
                        if (r.data) {
                            var groupInfo = r.data;

                            $open('#userListDiv', {width: 800, title: '&nbsp查看专案组成员'});
                            var openerDiv = $("#userListDiv");
                            openerDiv.find(".panel-container").empty().html(_.template(groupStaffTpl));
                            $("#userListDiv").on('click', "#chooseUint", function () {
                                // dictOpener.openUnitChoosePort($(this));
                                var obj= $(this);
                                var title = obj.attr("title");
                                window.newwin=$open('#dict-block-unit',{width:400,height:300,top:100, title:'选择'+title});
                                $post(top.servicePath+'/sys/org/getOrgTreeList',{orgName:"",end:""},function(r) {
                                    if (r.flag == 1) {
                                        var target = $("#dict-wrap-unit");
                                        var tpl='';
                                        $.each(r.data, function (i, o) {
                                            tpl+="<div class='item-value'><u><span paramattr='"+ obj2str(o) +"' val='"+o.orgId+"'>"+o.orgName+"</span></div></u>";
                                        });
                                        target.html(tpl);
                                    }
                                },true);

                                var opener = $(".panel #dict-block-unit");
                                $(".panel #dict-block-unit .query-block-row input").val("");
                                opener.find("#dict-wrap-unit").off("click").on("click",".item-value",function(){
                                    // var input = obj.prev();//页面上需要填入的input
                                    var input = obj.siblings("input[type='text']");//页面上需要填入的input
                                    input.val($(this).find("span").text());
                                    var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                                    inputHidden.val($(this).find("span").attr("val"));

                                    var paramAttr = $(this).find("span").attr("paramattr");
                                    input.attr("paramattr",paramAttr);
                                    opener.$close();
                                });
                                opener.find("#queryBtnOrgName").off("click").on("click",function(){
                                    var orgName =$.trim(opener.find('#orgName').val());
                                    _selfDict.getUnitPortList(orgName);
                                });
                                opener.find("#resetBtnOrgName").off("click").on("click",function(){
                                    opener.find('#orgName').val("");
                                })

                            });
                            $("#userListDiv").on("click", "#resetBtn", function () {
                                selectUtils.clearQueryValue();
                                return false;
                            });
                            $("#userListDiv").on("click", "#queryBtn", function () {
                                specialCaseGroup.queryAddedStaffList(groupInfo);
                                return false;
                            });
                            //加载已添加的成员
                            specialCaseGroup.queryAddedStaffList(groupInfo);

                            //成员添加
                            $("#addStaff").on("click", function () {
                                $open('#userListDiv', {width: 800, title: '&nbsp用户列表'});
                                $("#userListDiv .panel-container").empty().html(_.template(userListTpl, {
                                    checkboxMulti: true,
                                    groupInfo: groupInfo
                                }));
                                $("#userListDiv").on('click', "#chooseUint", function () {
                                    dictOpener.openUnitChoosePort($(this));
                                });
                                $("#userListDiv").on("click", "#resetBtn", function () {
                                    selectUtils.clearQueryValue();
                                    return false;
                                });
                                $("#userListDiv").on("click", "#queryBtn", function () {
                                    specialCaseGroup.queryUserList(true, groupInfo);
                                    return false;
                                });

                                //加载用户列表
                                specialCaseGroup.queryUserList(true, groupInfo);
                            });
                        }
                    }
                });
            },
            showTaskInfo: function (id) {
                graphActionThis = this;
                taskAjax.taskDetail({id: id, userId: top.userId}, function (r) {
                    if (r.flag == 1) {
                        $open('#userListDiv', {width: 800, title: '&nbsp任务详情'});
                        $("#userListDiv .panel-container").empty().html(_.template(taskInfoTpl, {
                            data: r.data,
                            isOperation: true
                        }));

                        $("#cancelBtn").on("click", function () {
                            $("#userListDiv").$close();
                        });
                    }
                });
            },
            feedbackInfo: function (id, taskid) {
                graphActionThis = this;
                taskAjax.taskDetail({id: taskid, userId: top.userId}, function (r) {
                    if (r.flag == 1) {
                        $open('#userListDiv', {width: 800, title: '&nbsp反馈详情'});
                        $("#userListDiv .panel-container").empty().html(_.template(feedBackInfoTpl, {data: r.data}));

                        $("#cancelBtn").on("click", function () {
                            $("#userListDiv").$close();
                        });
                    }
                });
            },
            addTask: function (id) {
                graphActionThis = this;
                var text = "";
                var bcrwid, fkid;
                $open('#userListDiv', {width: 800, title: '&nbsp下发任务'});
                var openerDiv = $("#userListDiv");
                openerDiv.find(".panel-container").empty().html(_.template(taskAddTpl, {text: text}));
                $("#fkjzTime").datetimepicker({format: 'YYYY-MM-DD', pickTime: false,minDate:rangeUtil.formatDate(new Date(),'yyyy-MM-dd')});

                $("#groupid").siblings("i#chooseGroup").remove();
                var groupInfo = {};
                $.ajax({
                    url: top.servicePath_xz + '/group/groupDetail/' + id,
                    type: "post",
                    contentType: "application/x-www-form-urlencoded",
                    success: function (r) {
                        if (r.data) {
                            groupInfo = r.data;
                            $("#groupid").val(groupInfo.groupname);
                        }
                    }
                });
                $("#chooseReceive").on('click', function () {
                    if ($("#groupid").val()) {
                        // dictOpener.openChoosePort($(this), $post, top.servicePath_xz + '/usergroup/getUsergroupPage', {groupId: id}, "user");
                        // graphActionThis.getUserByGroupIdPortList($(this),{groupId: id,isInGroup: true})
                        var param = {groupId: id,isInGroup: true};
                        var obj =$(this);
                        var title = obj.attr("title");
                        $open('#dict-block',{width:400,height:300,top:100, title:'选择'+title});
                        $("#dict-block .dict-container").find(".query-block-row").empty();
                        $post(top.servicePath_xz + '/usergroup/getUsergroupPage',param,function(r) {
                            if (r.flag == 1) {
                                var target = $("#dict-wrap");
                                var tpl='';
                                $.each(r.data, function (i, o) {
                                    o.userId==top.currentUser.userInfo.userId?tpl+="":tpl+="<div class='item-value'><u><span paramattr='"+ obj2str(o) +"' val='"+o.userId+"' phone='"+o.phone+"'>"+o.userName+','+o.orgName+"</span></div></u>";
                                });
                                target.html(tpl);
                                var opener = $(".panel #dict-block");
                                $(".query-block-row input").val("");
                                opener.find("#dict-wrap").off("click").on("click","div:not(.disabled)",function(){
                                    toast("不能选择自己！",600).warn();
                                });
                                opener.find("#dict-wrap").off("click").on("click","div:not(.disabled)",function(){
                                    var input = obj.siblings("input[type='text']");//页面上需要填入的input
                                    input.val($(this).find("span").text());
                                    var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                                    inputHidden.val($(this).find("span").attr("val"));

                                    var paramAttr = $(this).find("span").attr("paramattr");
                                    input.attr("paramattr",paramAttr);
                                    if($("#jsrLxfs").length > 0){
                                        $("#jsrLxfs").val($(this).find("span").attr("phone"));
                                    }
                                    opener.$close();
                                });
                            }
                        },true);



                    } else {
                        toast("请先选择专案组！", 600).warn();
                    }
                });
                //绑定返回事件
                $("#cancelBtn").on("click", function () {
                    openerDiv.$close();
                });
                $("#saveBtn").on("click", function () {
                    $('.task-valid').validatebox();
                    if ($('.validatebox-invalid').length > 0) {
                        return false;
                    }
                    var param = $("#taskAddForm").serializeObject();
                    var jsrParam = str2obj($("#jsr").attr("paramattr"));
                    var groupParam = groupInfo;
                    $.extend(param, {
                        fqr: top.userId,
                        fqrname: top.trueName,
                        fqrDeptCode: top.orgCode,
                        fqrDeptName: top.orgName,
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
                        fqTime: $.trim($("#createtime").val())
                    });
                    taskAjax.addTask(param, function (r) {
                        if (r.flag == 1) {
                            toast('保存成功！', 600, function () {
                                openerDiv.$close();
                                graphActionThis.showList(id, "pgroupid");
                            }).ok();
                        } else {
                            toast(r.msg, 600).err()
                        }
                    });
                });

            },
            addTaskHandle: function (id, text, taskid) {
                graphActionThis = this;
                var bcrwid, fkid;
                var paramId;
                if (text == "补充任务") {
                    paramId = id;
                } else if (text == "追加任务") {
                    paramId = taskid;
                }
                taskAjax.taskDetail({id: paramId, userId: top.userId}, function (r) {
                    if (r.flag == 1) {
                        var taskinfo = r.data;
                        if (taskinfo) {
                            bcrwid = taskinfo.id;
                            fkid = taskinfo.id;
                        }
                        $.ajax({
                            url: top.servicePath_xz + '/group/groupDetail/' + taskinfo.groupid,
                            type: "post",
                            contentType: "application/x-www-form-urlencoded",
                            success: function (r) {
                                if (r.data) {
                                    var groupinfo = r.data;
                                    $open('#userListDiv', {width: 800, title: '&nbsp' + text});
                                    var openerDiv = $("#userListDiv");
                                    openerDiv.find(".panel-container").empty().html(_.template(taskAddTpl, {
                                        taskInfo: taskinfo,
                                        text: text
                                    }));
                                    $("#fkjzTime").datetimepicker({format: 'YYYY-MM-DD', pickTime: false});

                                    $("#chooseGroup").on('click', function () {
                                        dictOpener.openChoosePort($(this), null, null, {userId: top.userId});
                                    });
                                    $("#chooseReceive").on('click', function () {
                                        if ($("#groupid").val()) {
                                            var groupinfo = groupinfo;
                                            var taskinfo = taskinfo;
                                            debugger
                                            dictOpener.openChoosePort($(this), $post, top.servicePath_xz + '/usergroup/getUsergroupPage', {
                                                groupId: text ? taskinfo.groupid : groupinfo.id,
                                                isInGroup: true
                                            }, "user");
                                        } else {
                                            toast("请先选择专案组！", 600).warn();
                                        }
                                    });
                                    $("#cancelBtn").on("click", function () {
                                        $("#userListDiv").$close();
                                    });
                                }
                            }
                        });


                    }
                });
                //绑定返回事件
                $("#cancelBtn").on("click", function () {
                    openerDiv.$close();
                });
                $("#saveBtn").on("click", function () {
                    $('.task-valid').validatebox();
                    if ($('.validatebox-invalid').length > 0) {
                        return false;
                    }
                    var param = $("#taskAddForm").serializeObject();
                    var jsrParam = str2obj($("#jsr").attr("paramattr"));
                    var groupParam = groupinfo;
                    var taskParam;
                    //由追加任务 补充任务跳转过来
                    if (text) {
                        taskParam = taskinfo;
                        debugger;
                    }
                    debugger;
                    $.extend(param, {
                        fqr: top.userId,
                        fqrname: top.trueName,
                        fqrDeptCode: top.orgCode,
                        fqrDeptName: top.orgName,
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
                        fqTime: $.trim($("#createtime").val())
                    });
                    taskAjax.addTask(param, function (r) {
                        if (r.flag == 1) {
                            toast('保存成功！', 600, function () {
                                graphActionThis.showList(taskinfo.groupid, "pgroupid");
                            }).ok();
                        } else {
                            toast(r.msg, 600).err()
                        }
                    });
                });

            },
            //生成32位的id
            getGuid: function () {
                function S4() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                }

                return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
            },
            feedbackTask: function (id) {
                graphActionThis = this;
                taskAjax.taskDetail({id: id, userId: top.userId}, function (r) {
                    if (r.flag == 1) {
                        $open('#userListDiv', {width: 800, title: '&nbsp反馈任务'});
                        $("#userListDiv .panel-container").empty().html(_.template(taskEditTpl, {
                            data: r.data,
                            isOperation: true,
                            replenishTaskBtnOper:false
                        }));
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
                                tpObj.fileMd5 = graphActionThis.getGuid();//图片对应fileMd5
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
                                tpObj.fileMd5 = graphActionThis.getGuid();
                                tpObj.fileName = file.name;
                                tpObj.fileSuffix = fileType.substr(fileType.indexOf('/') + 1);
                                tpObj.type = fileType.substr(fileType.indexOf('/') + 1);
                                filesArr.push(tpObj);
                            }
                            var picWrap = $('#pics-wrap');
                            //h5表单文件上传
                            //将对象元素转换成字符串以作比较
                            function obj2key(obj, keys){
                                var n = keys.length,
                                    key = [];
                                while(n--){
                                    key.push(obj[keys[n]]);
                                }
                                return key.join('|');
                            }
                            //去重操作
                            function uniqeByKeys(array,keys){
                                var arr = [];
                                var hash = {};
                                for (var i = 0, j = array.length; i < j; i++) {
                                    var k = obj2key(array[i], keys);
                                    if (!(k in hash)) {
                                        hash[k] = true;
                                        arr .push(array[i]);
                                    }
                                }
                                return arr ;
                            }
                            filesArr=uniqeByKeys(filesArr,['fileName']);
                            if(filesArr){
                                var html="";
                                $.each(filesArr,function (index,value) {
                                    html+='<span>'+value.fileName+'</span>';
                                });
                                $('.upload-block .state').html(html);
                                $('[href="#uploadMat"]').text("查看")
                            }
                        });

                        $("#addImg").siblings("input[type='file']").val("");
                        $("#addImg").siblings("input[type='file']").off("change").on("change", function () {debugger
                            var $this = $(this)[0];
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
                                tpObj.fileMd5 = graphActionThis.getGuid();//图片对应fileMd5
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
                                tpObj.fileMd5 = graphActionThis.getGuid();
                                tpObj.fileName = file.name;
                                tpObj.fileSuffix = fileType.substr(fileType.indexOf('/') + 1);
                                tpObj.type = fileType.substr(fileType.indexOf('/') + 1);
                                filesArr.push(tpObj);

                            }
                            var picWrap = $('#pics-wrap');
                            //h5表单文件上传
                            //将对象元素转换成字符串以作比较
                            function obj2key(obj, keys){
                                var n = keys.length,
                                    key = [];
                                while(n--){
                                    key.push(obj[keys[n]]);
                                }
                                return key.join('|');
                            }
                            //去重操作
                            function uniqeByKeys(array,keys){
                                var arr = [];
                                var hash = {};
                                for (var i = 0, j = array.length; i < j; i++) {
                                    var k = obj2key(array[i], keys);
                                    if (!(k in hash)) {
                                        hash[k] = true;
                                        arr .push(array[i]);
                                    }
                                }
                                return arr ;
                            }
                            filesArr=uniqeByKeys(filesArr,['fileName']);
                            if(filesArr){
                                var html="";
                                $.each(filesArr,function (index,value) {
                                    html+='<span>'+value.fileName+'</span>';
                                });
                                $('.upload-block .state').html(html);
                                $('[href="#uploadMat"]').text("查看")
                            }
                        });

                        $('.slick-list').slick({
                            dots: true
                        });

                        $("#feedbackBtn").on("click", function () {
                            console.info(filesArr);
                            task.saveFeedback(id, filesArr);
                        });
                        $("#cancelBtn").on("click", function () {
                            $("#userListDiv").$close();
                        });
                    }

                });
            },
            transferTask: function (id) {
                graphActionThis = this;
                taskAjax.taskDetail({id: id, userId: top.userId}, function (r) {
                    if (r.flag == 1) {
                        $open('#userListDiv', {width: 800, title: '&nbsp用户列表'});
                        $("#userListDiv .panel-container").empty().html(_.template(userListTpl, {checkboxMulti: false}));
                        var taskInfo = r.data;
                        $("#userListDiv").on('click', "#chooseUint", function () {
                            dictOpener.openUnitChoosePort($(this));
                        });
                        $("#userListDiv").on("click", "#resetBtn", function () {
                            selectUtils.clearQueryValue();
                            return false;
                        });
                        $("#userListDiv").on("click", "#queryBtn", function () {
                            task.queryUserList(false, id, taskInfo);
                            return false;
                        });

                        //加载用户列表
                        task.queryUserList(false, id, taskInfo);
                        //任务移交给用户
                        task.saveTransfer(id);
                        $("#userListDiv").on('click', "#cancelBtn", function () {
                            $('#userListDiv').$close();
                            return false;
                        });
                    }
                });
            },
            urgeTask: function (id) {
                graphActionThis = this;
                $confirm('催办任务？', function (bol) {
                    if (bol) {
                        var param = {
                            taskid: id,
                            userId: top.userId,
                            deparmentcode: top.orgCode
                        };
                        taskAjax.addCb(param, function (r) {
                            if (r.flag == 1) {
                                toast('催办成功！', 600, function () {
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
