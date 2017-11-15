importing('currentDate');
define(['underscore',
    'require',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/baseInfo.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCase.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/relationCaseTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupStaff.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/groupStaffTr.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/userList.html',
    'text!/view/caseInvestigation/tpl/specialCaseGroup/userListTr.html',
    'text!/view/caseInvestigation/tpl/task/taskAdd.html',
    'text!/view/caseInvestigation/tpl/task/taskEdit.html',
    'text!/view/caseInvestigation/tpl/task/taskInfo.html',
    'text!/view/caseInvestigation/tpl/task/feedBackInfo.html',
    '../../caseInvestigation/dat/specialCaseGroup.js',
    '../../caseInvestigation/src/specialCaseGroup.js',
    '../../caseInvestigation/dat/task.js',
    '../../caseInvestigation/src/task.js',
    '../../dictManage/src/dictOpener.js',
    '../src/graphLayout.js'], function (_,require, baseInfoTpl, relationCaseTpl, relationCaseTrTpl, groupStaffTpl, groupStaffTrTpl, userListTpl, userListTrTpl, taskAddTpl, taskEditTpl, taskInfoTpl, feedBackInfoTpl,
                                                     specialCaseGroupAjax, specialCaseGroup, taskAjax, task, dictOpener,graphLayout) {
    return {
        menuHanle: function (event, treeId, treeNode) {
            graphActionThis = this;
            var $target = $(event.currentTarget).find("#" + treeNode.tId).find("#" + treeNode.tId + "_span>span");
            var className = $target.attr("class");
            var id = $target.attr("id");
            var val = $target.attr("val");
            var infoattr = $target.attr("infoattr");
            var taskid = $target.attr("taskid");

            switch (className) {
                case "groupHandle":
                    //专案组右键菜单处理
                    graphActionThis.groupHandle(id, val);
                    break;
                case "taskHandle":
                    //任务右键菜单处理
                    graphActionThis.taskHandle(id, val);
                    break;
                case "feedbackHandle":
                    //反馈右键菜单处理
                    graphActionThis.feedbackHandle(id, val, taskid);
                    break;
                case "caseHandle":
                    //案件右键菜单处理
                    graphActionThis.caseHandle(id, val);
                    break;
            }
        },
        groupHandle: function (id, val) {
            graphActionThis = this;
            switch (val) {
                case "1":
                    //查看专案组基本信息
                    graphActionThis.showGroupInfo(id);
                    break;
                case "2":
                    //查看专案组成员
                    graphActionThis.showGroupStaff(id);
                    break;
                case "3":
                    //在专案组上新增任务
                    graphActionThis.addTask(id);
                    break;
            }
        },
        taskHandle: function (id, val) {
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
        showGroupInfo: function (id) {
            graphActionThis = this;
            $.ajax({
                url: top.servicePath_xz + '/group/groupDetail/' + id,
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                success: function (r) {
                    if (r.data) {
                        var groupInfo = r.data;
                        $open('#userListDiv', {width: 800, title: '&nbsp专案组基本信息'});
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
        showGroupStaff: function (id) {
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
                        openerDiv.find(".panel-container").css({"margin-top":"0","background": "#ffffff"}).empty().html(_.template(groupStaffTpl));
                        openerDiv.on('click', "#chooseUint", function () {
                            var obj = $(this);
                            var title = obj.attr("title");
                            window.newwin = $open('#dict-block-unit', {
                                width: 400,
                                height: 300,
                                top: 100,
                                title: '选择' + title
                            });
                            $post(top.servicePath + '/sys/org/getOrgTreeList', {orgName: "", end: ""}, function (r) {
                                if (r.flag == 1) {
                                    var target = $("#dict-wrap-unit");
                                    var tpl = '';
                                    $.each(r.data, function (i, o) {
                                        tpl += "<div class='item-value'><u><span paramattr='" + obj2str(o) + "' val='" + o.orgId + "'>" + o.orgName + "</span></div></u>";
                                    });
                                    target.html(tpl);
                                }
                            }, true);

                            var opener = $(".panel #dict-block-unit");
                            $(".panel #dict-block-unit .query-block-row input").val("");
                            opener.find("#dict-wrap-unit").off("click").on("click", ".item-value", function () {
                                // var input = obj.prev();//页面上需要填入的input
                                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                                input.val($(this).find("span").text());
                                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                                inputHidden.val($(this).find("span").attr("val"));

                                var paramAttr = $(this).find("span").attr("paramattr");
                                input.attr("paramattr", paramAttr);
                                opener.$close();
                            });
                            opener.find("#queryBtnOrgName").off("click").on("click", function () {
                                var orgName = $.trim(opener.find('#orgName').val());
                                _selfDict.getUnitPortList(orgName);
                            });
                            opener.find("#resetBtnOrgName").off("click").on("click", function () {
                                opener.find('#orgName').val("");
                            })

                        });
                        openerDiv.on("click", "#resetBtn", function () {
                            selectUtils.clearQueryValue();
                            return false;
                        });
                        openerDiv.on("click", "#queryBtn", function () {
                            graphActionThis.queryAddedStaffList(groupInfo, openerDiv);
                            return false;
                        });
                        //加载已添加的成员
                        graphActionThis.queryAddedStaffList(groupInfo, openerDiv);

                        //成员添加
                        $("#addStaff").on("click", function () {
                            $open('#userAllListDiv', {width: 800, title: '&nbsp用户列表'});
                            $("#userAllListDiv .panel-container").empty().html(_.template(userListTpl, {
                                checkboxMulti: true,
                                groupInfo: groupInfo
                            }));
                            $("#userAllListDiv").on('click', "#chooseUint", function () {
                                dictOpener.openUnitChoosePort($(this));
                            });
                            $("#userAllListDiv").on("click", "#resetBtn", function () {
                                selectUtils.clearQueryValue();
                                return false;
                            });
                            $("#userAllListDiv").on("click", "#queryBtn", function () {
                                graphActionThis.queryUserList(true, groupInfo);
                                return false;
                            });

                            //加载用户列表
                            graphActionThis.queryUserList(true, groupInfo);
                        });
                    }
                }
            });
        },
        //由于弹框打开 ，导致页面id不唯一，需要传入目标元素到新的方法
        queryAddedStaffList: function (groupInfo, ele) {
            graphActionThis = this;
            var param = {
                isInGroup: true,
                groupId: groupInfo.id,
                orgId: $.trim($("#orgId").val()),
                policeId: $.trim($("#policeId").val()),
                userName: $.trim(ele.find("#userName").val())
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
                        specialCaseGroup.delGroupStaff(groupInfo, $(this).attr('id'), $(this).attr('username'));
                    });

                }
            });
        },
        queryUserList: function (isCheckboxMulti, groupInfo) {
            graphActionThis = this;
            var orgParam = str2obj($("#userAllListDiv #orgName").attr("paramattr"));
            var param = {
                excludeGroupId: groupInfo.pgroupid ? groupInfo.id : "",
                groupId: groupInfo.pgroupid ? groupInfo.pgroupid : groupInfo.id,
                isInGroup: groupInfo.pgroupid ? true : false,
                orgId: orgParam ? orgParam.orgId : "",
                userName: $.trim($("#userAllListDiv #userName").val()),
                policeId: $.trim($("#userAllListDiv #policeId").val())
            };

            $('#userAllListDiv #userTableResult').pagingList({
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
            $("#userAllListDiv #selectAll").on('click', function () {
                $('#userTable').find('tbody input:checkbox').prop('checked', this.checked);
            });
            $("#userAllListDiv #saveStaffBtn").off("click").on('click', function () {
                //专案组添加成员
                graphActionThis.saveStaff(groupInfo);
                return false;
            });
            $("#userAllListDiv #cancelBtn").on('click', function () {
                $('#userAllListDiv').$close();
            });
        },
        saveStaff: function (groupInfo) {
            graphActionThis = this;
            var checkbox = [];
            $('#userTable').find('tbody input:checkbox:checked').each(function (i, e) {
                var userInfo = {
                    jh: $(e).attr("jh"),
                    userid: $(e).attr("userid"),
                    username: $(e).attr("username"),
                    creator: top.userId,
                    deparmentcode: top.orgCode,
                    groupid: groupInfo.id
                };
                checkbox.push(userInfo);
            });
            if (checkbox.length > 0) {
                specialCaseGroupAjax.addUserGroupList(checkbox, function (r) {
                    if (r.flag == 1) {
                        toast('添加成功！', 600, function () {
                            $('#userAllListDiv').$close();
                            graphActionThis.queryAddedStaffList(groupInfo,$("#userListDiv"));
                        }).ok()
                    } else {
                        toast(r.msg, 600).err();
                    }
                });
            } else {
                toast("请至少选择一个用户！", 600).warn()
            }
        },

        addTask: function (id) {
            graphActionThis = this;
            var text = "";
            var bcrwid, fkid;
            $open('#userListDiv', {width: 800, title: '&nbsp下发任务'});
            var openerDiv = $("#userListDiv");
            openerDiv.find(".panel-container").empty().html(_.template(taskAddTpl, {text: text}));
            $("#fkjzTime").datetimepicker({
                format: "yyyy-mm-dd hh:ii:ss",
                autoclose: true,
                startDate: rangeUtil.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                minuteStep: 10,
                language: 'zh-CN'
            });

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
            //选择接收人
            $("#chooseReceive").on('click', function () {
                if ($("#groupid").val()) {
                    var param = {groupId: id, isInGroup: true};
                    var obj = $(this);
                    var title = obj.attr("title");
                    $open('#dict-block', {width: 400, height: 300, top: 100, title: '选择' + title});
                    $("#dict-block .dict-container").find(".query-block-row").empty();
                    $post(top.servicePath_xz + '/usergroup/getUsergroupPage', param, function (r) {
                        if (r.flag == 1) {
                            var target = $("#dict-wrap");
                            var tpl = '';
                            $.each(r.data, function (i, o) {
                                o.userId == top.currentUser.userInfo.userId ? tpl += "" : tpl += "<div class='item-value'><u><span paramattr='" + obj2str(o) + "' val='" + o.userId + "' phone='" + o.phone + "'>" + o.userName + ',' + o.orgName + "</span></div></u>";
                            });
                            target.html(tpl);
                            var opener = $(".panel #dict-block");
                            $(".query-block-row input").val("");
                            opener.find("#dict-wrap").off("click").on("click", "div:not(.disabled)", function () {
                                toast("不能选择自己！", 600).warn();
                            });
                            opener.find("#dict-wrap").off("click").on("click", "div:not(.disabled)", function () {
                                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                                input.val($(this).find("span").text());
                                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                                inputHidden.val($(this).find("span").attr("val"));

                                var paramAttr = $(this).find("span").attr("paramattr");
                                input.attr("paramattr", paramAttr);
                                if ($("#jsrLxfs").length > 0) {
                                    $("#jsrLxfs").val($(this).find("span").attr("phone"));
                                }
                                opener.$close();
                            });
                        }
                    }, true);


                } else {
                    toast("请先选择专案组！", 600).warn();
                }
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
                        }).ok();
                    } else {
                        toast(r.msg, 600).err()
                    }
                });
            });
            //绑定返回事件
            $("#cancelBtn").on("click", function () {
                openerDiv.$close();
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
                        switch (text) {
                            case "补充任务":
                                bcrwid = taskinfo.id;
                                break;
                            case "追加任务":
                                fkid = id;
                                break;
                            default:
                        }
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
                                $("#fkjzTime").datetimepicker({
                                    format: "yyyy-mm-dd hh:ii:ss",
                                    autoclose: true,
                                    startDate: rangeUtil.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                                    minuteStep: 10,
                                    language: 'zh-CN'
                                });
                                $("#chooseReceive").attr("groupinfo", groupinfo.id).attr("taskinfo", taskinfo.groupid);
                                $("#chooseGroup").on('click', function () {
                                    dictOpener.openChoosePort($(this), null, null, {userId: top.userId});
                                });
                                $("#chooseReceive").on('click', function () {
                                    if ($("#groupid").val()) {
                                        var groupinfo = $(this).attr("groupinfo");
                                        var taskinfo = $(this).attr("taskinfo");
                                        dictOpener.getUserByGroupIdPortList($(this), {
                                            groupId: text ? taskinfo : groupinfo,
                                            isInGroup: true
                                        })
                                    } else {
                                        toast("请先选择专案组！", 600).warn();
                                    }
                                });
                                $("#cancelBtn").on("click", function () {
                                    $("#chooseReceive").attr("groupinfo", "").attr("taskinfo", "");
                                    $("#userListDiv").$close();
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
                                    var jsr, jsrname;
                                    if ($("#jsr").attr("paramattr")) {
                                        jsr = jsrParam.userId;
                                        jsrname = jsrParam.userName;
                                    } else {
                                        jsr = taskParam.jsr;
                                        jsrname = taskParam.jsrname;
                                    }
                                    $.extend(param, {
                                        fqr: top.userId,
                                        fqrname: top.trueName,
                                        fqrDeptCode: top.orgCode,
                                        fqrDeptName: top.orgName,
                                        bcrwid: bcrwid ? bcrwid : "",
                                        fkid: fkid ? fkid : "",
                                        taskName: $.trim($("#taskName").val()),
                                        groupid: text ? taskParam.groupid : groupParam.id,
                                        jsr: jsr,
                                        jsrname: jsrname,
                                        fqrLxfs: top.phone,
                                        jsrLxfs: $.trim($("#jsrLxfs").val()),
                                        taskContent: $.trim($("#taskContent").val()),
                                        fkjzTime: $.trim($("#fkjzTime").val()),
                                        fqTime: $.trim($("#createtime").val())
                                    });
                                    taskAjax.addTask(param, function (r) {
                                        if (r.flag == 1) {
                                            toast('保存成功！', 600, function () {
                                                //关闭弹框（在图上新增节点：需要刷新图的数据，重调接口）
                                                $("#userListDiv").$close();
                                            }).ok();
                                        } else {
                                            toast(r.msg, 600).err()
                                        }
                                    });
                                });
                            }
                        }
                    });
                }
            });
        },
        //生成32位的id
        getGuid: function () {
            graphActionThis = this;
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
                        replenishTaskBtnOper: false
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
                        function obj2key(obj, keys) {
                            var n = keys.length,
                                key = [];
                            while (n--) {
                                key.push(obj[keys[n]]);
                            }
                            return key.join('|');
                        }

                        //去重操作
                        function uniqeByKeys(array, keys) {
                            var arr = [];
                            var hash = {};
                            for (var i = 0, j = array.length; i < j; i++) {
                                var k = obj2key(array[i], keys);
                                if (!(k in hash)) {
                                    hash[k] = true;
                                    arr.push(array[i]);
                                }
                            }
                            return arr;
                        }

                        filesArr = uniqeByKeys(filesArr, ['fileName']);
                        if (filesArr) {
                            var html = "";
                            $.each(filesArr, function (index, value) {
                                html += '<span>' + value.fileName + '</span>';
                            });
                            $('.upload-block .state').html(html);
                            $('[href="#uploadMat"]').text("查看")
                        }
                    });

                    $("#addImg").siblings("input[type='file']").val("");
                    $("#addImg").siblings("input[type='file']").off("change").on("change", function () {
                        debugger
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
                        function obj2key(obj, keys) {
                            var n = keys.length,
                                key = [];
                            while (n--) {
                                key.push(obj[keys[n]]);
                            }
                            return key.join('|');
                        }

                        //去重操作
                        function uniqeByKeys(array, keys) {
                            var arr = [];
                            var hash = {};
                            for (var i = 0, j = array.length; i < j; i++) {
                                var k = obj2key(array[i], keys);
                                if (!(k in hash)) {
                                    hash[k] = true;
                                    arr.push(array[i]);
                                }
                            }
                            return arr;
                        }

                        filesArr = uniqeByKeys(filesArr, ['fileName']);
                        if (filesArr) {
                            var html = "";
                            $.each(filesArr, function (index, value) {
                                html += '<span>' + value.fileName + '</span>';
                            });
                            $('.upload-block .state').html(html);
                            $('[href="#uploadMat"]').text("查看")
                        }
                    });

                    $('.slick-list').slick({
                        dots: true
                    });

                    $("#feedbackBtn").on("click", function () {
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
