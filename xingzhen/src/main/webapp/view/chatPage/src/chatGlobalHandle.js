
//异常断线监听
JIM.onDisconnect(function () {
    toast("【disconnect】");
    $post(top.servicePath + "/sys/logout", null, function (res) {
        if (res && res.flag == 1) {
            localData.set('token', '');
            localData.set('limits', '');
            localData.set('username', '');
            localData.set('password', '');
            localData.set('login-password', '');
            localData.get('currentUser', '');
            location.replace(window.path + '/index.html?version=' + config.version);
        }
    });
    JIM.loginOut();//极光退出登录
});
var onSyncConversation_res;
var onMsgReceive_res = [];
var selfSendMsg = [];

var msgAll = [];
var jchatGloabal = {
    init: function () {
        JIM.init({
            "appkey": top.across_appkey,
            "random_str": top.across_random_str,
            "signature": top.across_signature,
            "timestamp": top.across_timestamp,
            "flag": 1//是否启用消息记录漫游，默认 0 否，1 是
        }).onAck(function (data) {
            toast('ack【】:' + obj2str(data));
        }).onSuccess(function (data) {
            toast("极光初始化成功！");
            jchatGloabal.login();
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    login: function () {
        JIM.login({
            'username': top.userId,//登录用户名
            'password': top.userPassword
        }).onSuccess(function (data) {
            toast("极光登录成功！");

            //离线消息同步监听
            JIM.onSyncConversation(function (data) {
                debugger
                if (data && data.length > 0) {
                    $.each(data, function (dataIndex, dataValue) {
                        $.each(dataValue.msgs, function (msgsIndex, msgsValue) {
                            msgAll.push(msgsValue.content);
                        });
                    });
                }

                onSyncConversation_res = data;
            });
            //聊天消息实时监听
            JIM.onMsgReceive(function (data) {
                debugger
                if (data && data.length > 0) {
                    $.each(data, function (dataIndex, dataValue) {
                        $.each(dataValue.messages, function (msgsIndex, msgsValue) {
                            debugger
                            var content = msgsValue.content;
                            msgAll.push(content);
                        })
                    });
                }

                onMsgReceive_res.push(data);
            });

            //业务事件监听
            JIM.onEventNotification(function (data) {
                if (data.event_type == 1) {
                    toast("极光被挤下线！退出登录", 1000, function () {
                        // $post(top.servicePath+"/sys/logout",null, function(res){
                        //     if(res && res.flag==1){
                        //         localData.set('token','');
                        //         localData.set('limits','');
                        //         localData.set('username','');
                        //         localData.set('password','');
                        //         localData.set('login-password','');
                        //         localData.get('currentUser','');
                        //         location.replace(window.path+ '/index.html?version='+config.version);
                        //     }
                        // });
                        // JIM.loginOut();//极光退出登录
                    }).warn();
                }
                //do something
                localData.set('onEventNotification_res', data);
            });
            //同步业务事件监听
            JIM.onSyncEvent(function (data) {
                debugger
                //do something
                switch (data.event_type) {
                    case "1":
                        //同时登录，被迫下线示例：event_type = 1
                        //被踢者收到该事件
                        toast("同业务事件监听:同时登录，被迫下线", 600).warn();
                        break;
                    case "2":
                        //密码被修改，被迫下线示例：event_type = 2
                        //当前在线者收到该事件
                        toast("同业务事件监听:密码被修改，被迫下线", 600).warn();
                        break;
                }
            });
            //会话未读数变更监听（多端在线）
            JIM.onMutiUnreadMsgUpdate(function (data) {
                debugger
                // data.type 会话类型
                // data.gid 群 id
                // data.appkey 所属 appkey
                // data.username 会话 username
            });
            JIM.onUserInfUpdate(function (data) {
                //do something
            });


        }).onFail(function (data) {
            console.info(obj2str(data));
            toast("极光登录失败！", 600).err();
        }).onTimeout(function (data) {
            toast('timeout:' + obj2str(data));
        });
    },
    onEventNotification: function () {
        debugger
        var onEventNotification_res = str2obj(localData.get('onEventNotification_res'));
        switch (onEventNotification_res.type) {
            case "1":
                debugger
                //同时登录，被迫下线示例：event_type = 1
                //被踢者收到该事件
                toast("业务事件监听:同时登录，被迫下线", 600).warn();
                $post(top.servicePath + "/sys/logout", null, function (res) {
                    if (res && res.flag == 1) {
                        localData.set('token', '');
                        localData.set('limits', '');
                        localData.set('username', '');
                        localData.set('password', '');
                        localData.set('login-password', '');
                        localData.get('currentUser', '');
                        location.replace(window.path + '/index.html?version=' + config.version);
                    }
                });
                JIM.loginOut();//极光退出登录
                break;
            case "2":
                debugger
                //密码被修改，被迫下线示例：event_type = 2
                //当前在线者收到该事件
                toast("业务事件监听:密码被修改，被迫下线", 600).warn();
                $post(top.servicePath + "/sys/logout", null, function (res) {
                    if (res && res.flag == 1) {
                        localData.set('token', '');
                        localData.set('limits', '');
                        localData.set('username', '');
                        localData.set('password', '');
                        localData.set('login-password', '');
                        localData.get('currentUser', '');
                        location.replace(window.path + '/index.html?version=' + config.version);
                    }
                });
                JIM.loginOut();//极光退出登录
                break;
        }
    },
    getUserInfo: function () {
        JIM.getUserInfo({
            'username': top.userId
        }).onSuccess(function (data) {
            var nickname = str2obj(data).user_info.nickname;
            $("#main-frame").contents().find(".group-name").empty().append('用户' + nickname + '进入：');
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });

    },
    getGroupInfo: function (gid) {
        JIM.getGroupInfo({
            'gid': gid
        }).onSuccess(function (data) {
            var groupname = str2obj(data).group_info.name;
            var desc = str2obj(data).group_info.desc;//返回系统群id
            var gid = str2obj(data).group_info.gid;//返回极光群id
            $("#main-frame").contents().find(".group-name").append(groupname);
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    getGroupMembers: function (gid) {debugger
        JIM.getGroupMembers({'gid': gid}).onSuccess(function (data) {
            var li = '';
            $.each(data.member_list, function (index, value) {
                var avatar = '../../img/pc-avatar.png';
                // JIM.getResource({'media_id': value.avatar}).onSuccess(function (data) {
                //     avatar = data.url;
                // });
                li += '<li class="">' +
                    '<img class="member-avatar" src="' + avatar + '"/>' +
                    '<span class="member">' + value.nickName + '</span>' +
                    '</li>'
            });
            $("#main-frame").contents().find('.member-list').html(li);
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    onSyncConversation: function (jmgid) {
        var data = onSyncConversation_res;
        if (data && data.length > 0) {
            var list = '';
            $.each(data, function (dataIndex, dataValue) {
                if (dataValue.msg_type == 4 && dataValue.from_gid == jmgid) {
                    $.each(dataValue.msgs, function (msgsIndex, msgsValue) {
                        var message_list_content = msgsValue.content;
                        var time;
                        var from_name = message_list_content.from_name;
                        var from_id = message_list_content.from_id;
                        var login_user_name = top.trueName;
                        var login_userId = top.userId;

                        var content_text;
                        if (message_list_content.from_platform == "api") {
                            var objText = str2obj(message_list_content.msg_body.text);
                            var type = objText.msgType;
                            switch (type) {
                                case "send_connect_case_info":
                                    content_text = objText.createName + "" + objText.title;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                                case "send_remove_case_info":
                                    content_text = objText.createName + "" + objText.title;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                                case "send_group_backup_info":
                                    content_text = objText.createName + "将" + objText.title;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                            }
                        } else if (message_list_content.from_platform == "web") {
                            content_text = message_list_content.msg_body.text;
                            time = clickHandle.getLocalTime(message_list_content.create_time);
                        }
                        var msg_type = message_list_content.msg_type;
                        var msg_id = msgsValue.msg_id;
                        var media_id = message_list_content.msg_body.media_id;
                        var file_size = message_list_content.msg_body.fsize >= 1024 ? (message_list_content.msg_body.fsize / 1024).toFixed(1) + 'KB' : message_list_content.msg_body.fsize + '字节';
                        var file_name = message_list_content.msg_body.fname;

                        var selfHtml = from_id == login_userId ? "self" : "";
                        var msgContetHtml;
                        var nameHtml = from_id == login_userId ? login_user_name : from_name;
                        if (msg_type == "file") {
                            var fileDiv = '<a class="not-images-file" src="" media_id="' + media_id + '" target="_blank" title="' + file_name + '">' +
                                '<span class="icon-file-noType"></span>' +
                                '<span class="file-info"><span class="file-name">' + file_name + '</span>' +
                                '<span class="file-size">' + file_size + '</span>' +
                                '</span></a>';

                            msgContetHtml = '<div class="main ' + selfHtml + '">' +
                                '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                                '<div class="text-wrap">' +
                                '<div class="from-name">' + nameHtml + '</div>' +
                                '<div class="text">' + fileDiv + '</div>' +
                                '</div>' +
                                '</div>';
                        } else if (msg_type == "image") {
                            var fileDiv = '<a class="message-image preview-JIM-img" media_id="' + media_id + '" id="file_' + msg_id + '" href="javascript:;">' +
                                '<img class="message-image" alt="" src="" />' +
                                '</a>' +
                                '<div class="imgHover"><img class="img-responsive center-block" src="" alt=""/></div>';

                            msgContetHtml = '<div class="main ' + selfHtml + '">' +
                                '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                                '<div class="text-wrap">' +
                                '<div class="from-name">' + nameHtml + '</div>' +
                                '<div class="text">' + fileDiv + '</div>' +
                                '</div>' +
                                '</div>';
                        } else if (msg_type == "custom") {
                            msgContetHtml = '<div class="all">' +
                                '<div class="text-wrap"><div class="all-text">' + content_text + '</div>' +
                                '</div></div>';
                        } else {
                            msgContetHtml = '<div class="main ' + selfHtml + '">' +
                                '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                                '<div class="text-wrap">' +
                                '<div class="from-name">' + nameHtml + '</div>' +
                                '<div class="text">' + content_text + '</div>' +
                                '</div>' +
                                '</div>';
                        }
                        list += '<li>' +
                            '<div class="time"><span>' + time + '</span></div>' +
                            msgContetHtml +
                            '</li>';
                    });
                }
            });
            $("#main-frame").contents().find(".message-list").append(list);
            jchatGloabal.getResourceMessageHtml();
            clickHandle.scrollBottom();
        }
    },
    getResourceMessage: function (element, message_content, isSelf, fileType, index) {
        var file_or_images = message_content.msg_body.media_id;
        var ulHtml = $("#main-frame").contents().find(element);
        var messageList = "";
        var time = clickHandle.getLocalTime(message_content.create_time);
        var from_name = isSelf ? top.trueName : message_content.from_name;
        var from_id = isSelf ? top.userId : message_content.from_id;
        var file_name = message_content.msg_body.fname;
        var file_size = message_content.msg_body.fsize >= 1024 ? (message_content.msg_body.fsize / 1024).toFixed(1) + 'KB' : message_content.msg_body.fsize + '字节';
        var fileDiv = '';
        var isSelfDiv = isSelf ? "self" : "";

        JIM.getResource({'media_id': file_or_images}).onSuccess(function (data) {
            var path_file_or_images = data.url;
            if (fileType == "file") {
                //文件消息
                fileDiv = '<a class="not-images-file" src="' + path_file_or_images + '" target="_blank" title="' + file_name + '">' +
                    '<span class="icon-file-noType"></span>' +
                    '<span class="file-info"><span class="file-name">' + file_name + '</span>' +
                    '<span class="file-size">' + file_size + '</span>' +
                    '</span></a>';
            } else if (fileType == "image") {
                //图片消息
                fileDiv = '<a class="message-image preview-JIM-img" id="file_' + index + '" href="javascript:;"><img class="message-image" alt="" src="' + path_file_or_images + '" /></a><div class="imgHover"><img class="img-responsive center-block" src="' + path_file_or_images + '" alt=""/></div>';
            }
            messageList = '<li>' +
                '<div class="time"><span>' + time + '</span></div>' +
                '<div class="main ' + isSelfDiv + '">' +
                '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                '<div class="text-wrap"><div class="from-name">' + from_name + '</div>' +
                '<div class="text">' + fileDiv + '</div>' +
                '</div></div>' +
                '</li>';
            '</li>';
            ulHtml.append(messageList);
            //文件查看
            $("#main-frame").contents().find(".not-images-file").off("click").on("click", function () {
                // window.open($(this).attr("src"),"","width=800,height=600");//新窗口打开
                window.open($(this).attr("src"));
            });
            clickHandle.scrollBottom();
        }).onFail(function (data) {
            toast('success:' + JSON.stringify(data));
        });
    },
    getResourceMessageHtml: function () {
        $("#main-frame").contents().find(".preview-JIM-img").each(function (index, element) {
            var media_id = $(element).attr("media_id");
            JIM.getResource({'media_id': media_id}).onSuccess(function (data) {
                var path_file_or_images = data.url;
                console.info("haha:" + path_file_or_images);
                console.info($(element).attr("media_id"));
                $(element).find(".message-image").attr("src", path_file_or_images);
                $(element).siblings(".imgHover").find(".center-block").attr("src", path_file_or_images);
            }).onFail(function (data) {
                toast('onFail:' + JSON.stringify(data));
            });
        });

        $("#main-frame").contents().find(".not-images-file").each(function (index, element) {
            var media_id = $(element).attr("media_id");
            JIM.getResource({'media_id': media_id}).onSuccess(function (data) {
                var path_file_or_images = data.url;
                console.info("haha:" + path_file_or_images);
                console.info($(element).attr("media_id"));
                $(element).attr("src", path_file_or_images);
            }).onFail(function (data) {
                toast('onFail:' + JSON.stringify(data));
            });
        });
        //文件查看
        $("#main-frame").contents().find(".not-images-file").off("click").on("click", function () {
            // window.open($(this).attr("src"),"","width=800,height=600");//新窗口打开
            window.open($(this).attr("src"));
        });
    },
    getFile: function (element) {
        var fd = new FormData();
        var file = $("#main-frame").contents().find(element)[0];
        if (!file.files[0]) {
            alert('error:' + '获取文件失败');
            throw new Error('获取文件失败');
        }
        fd.append(file.files[0].name, file.files[0]);
        return fd;
    },
    onMsgReceive: function (jmgid) {
        var data = onMsgReceive_res;
        console.info(obj2str(data))
        if (data && data.length > 0) {
            var list = '';
            $.each(data, function (dataIndex, dataValue) {
                $.each(dataValue.messages, function (msgsIndex, msgsValue) {
                    if (msgsValue.msg_type == 4 && msgsValue.from_gid == jmgid) {
                        var message_list_content = msgsValue.content;
                        var time;
                        var from_name = message_list_content.from_name;
                        var from_id = message_list_content.from_id;
                        var login_user_name = top.trueName;
                        var login_userId = top.userId;

                        var content_text;
                        if (message_list_content.from_platform == "api") {
                            var objText = str2obj(message_list_content.msg_body.text);
                            var type = objText.msgType;
                            switch (type) {
                                case "send_connect_case_info":
                                    content_text = objText.createName + "" + objText.title;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                                case "send_remove_case_info":
                                    content_text = objText.createName + "" + objText.title;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                                case "send_group_backup_info":
                                    content_text = objText.createName + "将" + objText.title;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                            }
                        } else if (message_list_content.from_platform == "web") {
                            content_text = message_list_content.msg_body.text;
                            time = clickHandle.getLocalTime(message_list_content.create_time);
                        }
                        var msg_type = message_list_content.msg_type;
                        var msg_id = msgsValue.msg_id;
                        var media_id = message_list_content.msg_body.media_id;
                        var file_size = message_list_content.msg_body.fsize >= 1024 ? (message_list_content.msg_body.fsize / 1024).toFixed(1) + 'KB' : message_list_content.msg_body.fsize + '字节';
                        var file_name = message_list_content.msg_body.fname;

                        var selfHtml = from_id == login_userId ? "self" : "";
                        var msgContetHtml;
                        var nameHtml = from_id == login_userId ? login_user_name : from_name;
                        if (msg_type == "file") {
                            var fileDiv = '<a class="not-images-file" src="" media_id="' + media_id + '" target="_blank" title="' + file_name + '">' +
                                '<span class="icon-file-noType"></span>' +
                                '<span class="file-info"><span class="file-name">' + file_name + '</span>' +
                                '<span class="file-size">' + file_size + '</span>' +
                                '</span></a>';

                            msgContetHtml = '<div class="main ' + selfHtml + '">' +
                                '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                                '<div class="text-wrap">' +
                                '<div class="from-name">' + nameHtml + '</div>' +
                                '<div class="text">' + fileDiv + '</div>' +
                                '</div>' +
                                '</div>';

                        } else if (msg_type == "image") {
                            var fileDiv = '<a class="message-image preview-JIM-img" media_id="' + media_id + '" id="file_' + msg_id + '" href="javascript:;">' +
                                '<img class="message-image" alt="" src="" />' +
                                '</a>' +
                                '<div class="imgHover"><img class="img-responsive center-block" src="" alt=""/></div>';

                            msgContetHtml = '<div class="main ' + selfHtml + '">' +
                                '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                                '<div class="text-wrap">' +
                                '<div class="from-name">' + nameHtml + '</div>' +
                                '<div class="text">' + fileDiv + '</div>' +
                                '</div>' +
                                '</div>';
                        } else if (msg_type == "custom") {
                            msgContetHtml = '<div class="all">' +
                                '<div class="text-wrap"><div class="all-text">' + content_text + '</div>' +
                                '</div></div>';
                        } else {
                            msgContetHtml = '<div class="main ' + selfHtml + '">' +
                                '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                                '<div class="text-wrap">' +
                                '<div class="from-name">' + nameHtml + '</div>' +
                                '<div class="text">' + content_text + '</div>' +
                                '</div>' +
                                '</div>';
                        }
                        list += '<li>' +
                            '<div class="time"><span>' + time + '</span></div>' +
                            msgContetHtml +
                            '</li>';
                    }
                });
            });
            $("#main-frame").contents().find(".message-list").append(list);
            jchatGloabal.getResourceMessageHtml();
            clickHandle.scrollBottom();
        }
    },
    onMsgReceiptChange: function () {
        //消息已读数变更事件实时监听
        JIM.onMsgReceiptChange(function (data) {
            // data.type
            // data.gid
            // data.appkey
            // data.username
            // data.receipt_msgs[].msg_id
            // data.receipt_msgs[].unread_count
        });
    },
    onSyncMsgReceipt: function () {
        //消息已读数变更事件同步监听
        JIM.onSyncMsgReceipt(function (data) {
            // data 为已读数变更事件数组 [receiptChange1,...]
        });
    },
    onMutiUnreadMsgUpdate: function () {
        //会话未读数变更监听（多端在线）
        JIM.onMutiUnreadMsgUpdate(function (data) {
            // data.type 会话类型
            // data.gid 群 id
            // data.appkey 所属 appkey
            // data.username 会话 username
        });
    },
    sendGroupMsg: function (textContent, gid, at) {
        JIM.sendGroupMsg({
            'at_list': at == "atAll" ? [] : "",
            'target_name': "群名称",
            'target_gid': gid,
            'content': textContent
        }).onSuccess(function (data, msg) {
            clickHandle.showMessageList(eval('(' + JSON.stringify(msg) + ')'));
            selfSendMsg.push(msg);
            msgAll.push(msg.content);
            // clickHandle.showMessageList(selfSendMsg);
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    getConversation: function () {
        debugger
        JIM.getConversation().onSuccess(function (data) {
            debugger
            var conversations = data.conversations;
            var li = '';
            $.each(conversations, function (index, value) {
                debugger
                //只展示群会话
                if (value.type == 4) {//单聊3群聊4
                    li += '<li class="conversations-li" jmgid="'+
                    value.gid+'"><img class="jim-avatar" src="../../img/pc-avatar.png" />' +
                        '<div class="text-wrap conversations-body"><span class="unread-msg">' + value.unread_msg_count + '</span><div class="name" title="' + value.name + '">' + value.name + '</div>' +
                        // '<div class="text-describe">' + obj2str(value.extras) + '</div>' +
                        '</div></li>'
                }
            });
            $(".conversation").find('ul').html(li);
            $(".conversations-li").on("click", function () {
                //进入具体会话

            })
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    sendGroupPic: function (gid, picContent) {
        JIM.sendGroupPic({
            'target_gid': gid,
            // 'target_gname': target_gname,
            'image': jchatGloabal.getFile("#fileImagesBox")
        }).onSuccess(function (data, msg) {

            clickHandle.showMessageList(eval('(' + JSON.stringify(msg) + ')'));
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    sendGroupFile: function (gid) {
        JIM.sendGroupFile({
            'target_gid': gid,
            // 'target_gname': target_gname,
            'file': jchatGloabal.getFile("#fileBox")
        }).onSuccess(function (data, msg) {
            clickHandle.showMessageList(eval('(' + JSON.stringify(msg) + ')'));
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    showSelf: function (gid) {
        var data = selfSendMsg;
        debugger
        var ulHtml = $("#main-frame").contents().find(".message-list");
        var list = '';
        if (data && data.length > 0) {
            debugger;
            $.each(data, function (dataIndex, dataValue) {
                if (dataValue.target_gid == gid) {
                    debugger;
                    var message_list_content = dataValue.content;
                    var time;
                    var from_name = message_list_content.from_name;
                    var from_id = message_list_content.from_id;
                    var login_user_name = top.trueName;
                    var login_userId = top.userId;

                    var content_text;
                    if (message_list_content.from_platform == "api") {
                        var objText = str2obj(message_list_content.msg_body.text);
                        var type = objText.msgType;
                        switch (type) {
                            case "send_connect_case_info":
                                content_text = objText.createName + "" + objText.title;
                                time = clickHandle.getLocalTime(objText.createTime);
                                break;
                            case "send_remove_case_info":
                                content_text = objText.createName + "" + objText.title;
                                time = clickHandle.getLocalTime(objText.createTime);
                                break;
                            case "send_group_backup_info":
                                content_text = objText.createName + "将" + objText.title;
                                time = clickHandle.getLocalTime(objText.createTime);
                                break;
                        }
                    } else if (message_list_content.from_platform == "web") {
                        content_text = message_list_content.msg_body.text;
                        time = clickHandle.getLocalTime(message_list_content.create_time);
                    }
                    var msg_type = message_list_content.msg_type;
                    var msg_id = dataValue.msg_id;
                    var media_id = message_list_content.msg_body.media_id;
                    var file_size = message_list_content.msg_body.fsize >= 1024 ? (message_list_content.msg_body.fsize / 1024).toFixed(1) + 'KB' : message_list_content.msg_body.fsize + '字节';
                    var file_name = message_list_content.msg_body.fname;

                    var selfHtml = "self";
                    var msgContetHtml;
                    var nameHtml = login_user_name;
                    if (msg_type == "file") {
                        var fileDiv = '<a class="not-images-file" src="" media_id="' + media_id + '" target="_blank" title="' + file_name + '">' +
                            '<span class="icon-file-noType"></span>' +
                            '<span class="file-info"><span class="file-name">' + file_name + '</span>' +
                            '<span class="file-size">' + file_size + '</span>' +
                            '</span></a>';

                        msgContetHtml = '<div class="main ' + selfHtml + '">' +
                            '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                            '<div class="text-wrap">' +
                            '<div class="from-name">' + nameHtml + '</div>' +
                            '<div class="text">' + fileDiv + '</div>' +
                            '</div>' +
                            '</div>';

                    } else if (msg_type == "image") {
                        var fileDiv = '<a class="message-image preview-JIM-img" media_id="' + media_id + '" id="file_' + msg_id + '" href="javascript:;">' +
                            '<img class="message-image" alt="" src="" />' +
                            '</a>' +
                            '<div class="imgHover"><img class="img-responsive center-block" src="" alt=""/></div>';

                        msgContetHtml = '<div class="main ' + selfHtml + '">' +
                            '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                            '<div class="text-wrap">' +
                            '<div class="from-name">' + nameHtml + '</div>' +
                            '<div class="text">' + fileDiv + '</div>' +
                            '</div>' +
                            '</div>';
                    } else if (msg_type == "custom") {
                        msgContetHtml = '<div class="all">' +
                            '<div class="text-wrap"><div class="all-text">' + content_text + '</div>' +
                            '</div></div>';
                    } else {
                        msgContetHtml = '<div class="main ' + selfHtml + '">' +
                            '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                            '<div class="text-wrap">' +
                            '<div class="from-name">' + nameHtml + '</div>' +
                            '<div class="text">' + content_text + '</div>' +
                            '</div>' +
                            '</div>';
                    }
                    list += '<li>' +
                        '<div class="time"><span>' + time + '</span></div>' +
                        msgContetHtml +
                        '</li>';
                }

            });
            ulHtml.append(list);
            jchatGloabal.getResourceMessageHtml();
            clickHandle.scrollBottom();
        }
    },

    showAllMsg: function (jmgid) {
        // setInterval(function () {
            console.info("msgAll:");
            var data = msgAll;
            if (data && data.length > 0) {
                for(var i=0;i<data.length;i++){
                    var year=clickHandle.getLocalYear(data[i].create_time);
                    if(year<2000){
                        data[i].create_time=new Date(data[i].create_time*1000);
                    }else{
                        data[i].create_time=new Date(data[i].create_time);
                    }
                }
                var list = '';
                data.sort(function (a, b) {
                    return a.create_time-b.create_time;//时间正序
                });
                $.each(data, function (dataIndex, dataValue) {
                    if (dataValue.target_type == "group" && dataValue.target_id == jmgid) {
                        var message_list_content = dataValue;
                        var time;
                        var from_name = message_list_content.from_name//?message_list_content.from_name:message_list_content.from_type;
                        var from_id = message_list_content.from_id;
                        var login_user_name = top.trueName;
                        var login_userId = top.userId;

                        var content_text;
                        if (message_list_content.from_platform == "api") {
                            var objText = str2obj(message_list_content.msg_body.text);
                            var type = objText.msgType;
                            switch (type) {
                                case "send_connect_case_info"://
                                    content_text = objText.createName + objText.title;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                                case "send_remove_case_info":
                                    content_text = objText.createName + objText.title;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                                case "send_group_backup_info":
                                    content_text = objText.createName + "将" + objText.title;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;

                                case "send_task_info":
                                    content_text = objText.createName + objText.title + "【"+objText.taskContent + "】给" + objText.jsrName;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                                case "send_task_move_info":
                                    content_text = objText.createName + objText.title + "【"+objText.taskContent + "】给" + objText.jsrName;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                                case "send_task_urge_info":
                                    content_text = objText.createName + objText.title + "【"+objText.taskContent + "】给" + objText.jsrName;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                                case "send_task_feedback_info":
                                    content_text = objText.createName + objText.title + "【"+objText.fkxs + "】给" + objText.jsrName;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                            }
                        } else if (message_list_content.from_platform == "web" || message_list_content.from_platform == "a") {
                            // content_text = message_list_content.msg_body.text;
                            // time = clickHandle.getLocalTime(message_list_content.create_time);
                            var msgBody = str2obj(message_list_content.msg_body);
                            var objText = msgBody.text;
                            content_text = objText;
                            time = clickHandle.getLocalTime(message_list_content.create_time);
                        }
                        var msg_type = message_list_content.msg_type;
                        var msg_id = dataValue.msg_id;
                        var media_id = message_list_content.msg_body.media_id;
                        var file_size = message_list_content.msg_body.fsize >= 1024 ? (message_list_content.msg_body.fsize / 1024).toFixed(1) + 'KB' : message_list_content.msg_body.fsize + '字节';
                        var file_name = message_list_content.msg_body.fname;

                        var selfHtml = from_id == login_userId ? "self" : "";
                        var msgContetHtml;
                        var nameHtml = from_id == login_userId ? login_user_name : from_name;
                        if (msg_type == "file" ) {
                            var fileDiv = '<a class="not-images-file" src="" media_id="' + media_id + '" target="_blank" title="' + file_name + '">' +
                                '<span class="icon-file-noType"></span>' +
                                '<span class="file-info"><span class="file-name">' + file_name + '</span>' +
                                '<span class="file-size">' + file_size + '</span>' +
                                '</span></a>';

                            msgContetHtml = '<div class="main ' + selfHtml + '">' +
                                '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                                '<div class="text-wrap">' +
                                '<div class="from-name">' + nameHtml + '</div>' +
                                '<div class="text">' + fileDiv + '</div>' +
                                '</div>' +
                                '</div>';
                        } else if(msg_type == "voice"){
                            var fileDiv = '<a class="not-images-file" src="" media_id="' + media_id + '" target="_blank" title="' + file_name + '">' +
                                '<span class="fa fa-volume-up"></span>' +
                                '<span class="file-info"><span class="file-name">语音消息</span>' +
                                '<span class="file-size">' + file_size + '</span>' +
                                '</span></a>';

                            msgContetHtml = '<div class="main ' + selfHtml + '">' +
                                '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                                '<div class="text-wrap">' +
                                '<div class="from-name">' + nameHtml + '</div>' +
                                '<div class="text">' + fileDiv + '</div>' +
                                '</div>' +
                                '</div>';
                        }else if (msg_type == "image") {
                            // var fileDiv = '<a class="message-image preview-JIM-img" media_id="' + media_id + '" href="javascript:;">' +
                            //     '<img class="message-image" alt="" src="" />' +
                            //     '</a>' +
                            //     '<div class="imgHover"><img class="img-responsive center-block" src="" alt=""/></div>';

                            var fileDiv = '<a class="not-images-file message-image preview-JIM-img" media_id="' + media_id + '" target="_blank">' +
                                '<img class="message-image" alt="" src="" />' +
                                '</a>';
                            msgContetHtml = '<div class="main ' + selfHtml + '">' +
                                '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                                '<div class="text-wrap">' +
                                '<div class="from-name">' + nameHtml + '</div>' +
                                '<div class="text">' + fileDiv + '</div>' +
                                '</div>' +
                                '</div>';
                        } else if (msg_type == "custom") {
                            msgContetHtml = '<div class="all">' +
                                '<div class="text-wrap"><div class="all-text">' + content_text + '</div>' +
                                '</div></div>';
                        } else {
                            if (message_list_content.at_list && message_list_content.at_list.length == 0) {
                                msgContetHtml = '<div class="main ' + selfHtml + '">' +
                                    '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                                    '<div class="text-wrap">' +
                                    '<div class="from-name">' + nameHtml + '</div>' +
                                    '<div class="text"> @所有人' + content_text + '</div>' +
                                    '</div>' +
                                    '</div>';

                            } else {
                                msgContetHtml = '<div class="main ' + selfHtml + '">' +
                                    '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                                    '<div class="text-wrap">' +
                                    '<div class="from-name">' + nameHtml + '</div>' +
                                    '<div class="text">' + content_text + '</div>' +
                                    '</div>' +
                                    '</div>';
                            }
                        }
                        list += '<li>' +
                            '<div class="time"><span>' + time + '</span></div>' +
                            msgContetHtml +
                            '</li>';
                    }
                });
                $("#main-frame").contents().find(".message-list").append(list);
                jchatGloabal.getResourceMessageHtml();
                clickHandle.scrollBottom();
            }
        // },50)
    }
};
var clickHandle = {
    sendFile: function (gid) {
        console.info("发送文件！");
        $("#main-frame").contents().find("#fileBox").val("");
        $("#main-frame").contents().find("#fileBox").off("change").on("change", function () {
            jchatGloabal.sendGroupFile(gid);
        });
    },
    sendFileImages: function (gid) {
        console.info("发送图片！");
        $("#main-frame").contents().find("#fileImagesBox").val("");
        $("#main-frame").contents().find("#fileImagesBox").off("change").on("change", function () {
            jchatGloabal.sendGroupPic(gid);
        });
    },
    choseEmoji: function (contrlDiv) {
        console.info("选择emoji！");
        clickHandle.showDiv(contrlDiv);
    },
    setTextSize: function (contrlDiv) {
        console.info("设置文字大小！");
        clickHandle.showDiv(contrlDiv);
    },
    sendText: function (gid) {
        $("#main-frame").contents().find("#messageContent").find("br").remove();//去掉回车换行
        var textContent = $("#main-frame").contents().find("#messageContent").html();
        if (textContent == "") {
            toast("不能发送空白消息！");
        } else {
            console.info("发送消息！");
            $("#main-frame").contents().find("#messageContent").html("");
            //发送群聊消息
            jchatGloabal.sendGroupMsg(textContent, gid, "");
        }
    },
    sendBroadcastText: function (gid, broadcastContent, at) {
        if (broadcastContent == "") {
            toast("不能发送空白消息！");
        } else {
            console.info("发送消息！");
            //发送群聊消息
            jchatGloabal.sendGroupMsg(broadcastContent, gid, at);
        }
    },
    showMessageList: function (message) {
        var ulHtml = $("#main-frame").contents().find(".message-list");
        var messageList = '';
        var msg_type = message.content.msg_type;
        var msg_id = message.msg_id;
        var time = clickHandle.getLocalTime(message.content.create_time);

        var from_id = message.content.from_id;
        var from_name = top.trueName;
        var content_text = message.content.msg_body.text;
        if (msg_type == "file" || msg_type == "image") {
            jchatGloabal.getResourceMessage(".message-list", message.content, true, msg_type, msg_id);
        } else {
            //单聊文字消息 群聊文字消息
            messageList = '<li>' +
                '<div class="time"><span>' + time + '</span></div>' +
                '<div class="main self">' +
                '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                '<div class="text-wrap"><div class="from-name">' + from_name + '</div><div class="text">' + content_text + '</div>' +
                '</div></div>' +
                '</li>';
            '</li>';
            ulHtml.append(messageList);
            clickHandle.scrollBottom();
        }
    },
    showConversationList: function (obj) {
        var $conversation = obj.find(".conversation");
        if (obj.find(".conversation").is(":visible")) {
            $conversation.addClass("hide");
        } else {
            debugger
            $conversation.removeClass("hide");
            jchatGloabal.getConversation();
        }
    },
    showDiv: function (contrlDiv) {
        var div = $("#main-frame").contents().find(contrlDiv).siblings(".div-panel");
        div.addClass("emoji-active");
        if ($("#main-frame").contents().find(contrlDiv).is("#sendEmojiBtn")) {
            clickHandle.loadEmoji(div);
            $("#main-frame").contents().find(".emoji-container").on("click", ".emoji", function () {
                var $this = $(this);
                $("#main-frame").contents().find("#messageContent").html($this);
            });
        } else if ($("#main-frame").contents().find(contrlDiv).is("#setTextSizeBtn")) {
            // var sizeHtml = '<select id="setTextSize"><option>12</option><option>14</option><option>16</option></select>';
            // $("#setTextSize").change(function () {
            //     var optionSise = $(this).find("option:selected").val();
            //     $("#messageContent").css({
            //         "font-size": optionSise + "px"
            //     });
            // });
            var sizeHtml = '<div id="setTextSize"><span class="font-size">12</span>  <span class="font-size">14</span>  <span class="font-size">16</span></div>';
            div.empty().html(sizeHtml);
            $("#main-frame").contents().find("#setTextSize").on("click", "span", function () {
                var optionSise = $(this).text();
                $("#main-frame").contents().find("#messageContent").css({
                    "font-size": optionSise + "px"
                });
            });
        }
        /*点击空白处隐藏*/
        $(document).on("click", function (e) {
            if (!$(e.target).is("#sendEmojiBtn") && !$(e.target).is("#setTextSizeBtn")) {
                div.removeClass("emoji-active");
                div.empty();
            }
        });
        $("#main-frame").contents().find(".message-container").on("click", function (e) {
            if (!$(e.target).is("#sendEmojiBtn") && !$(e.target).is("#setTextSizeBtn")) {
                div.removeClass("emoji-active");
                div.empty();
            }
        })
    },
    loadEmoji: function (divContainer) {
        var emojiHtml = '';
        emojiHtml += '<div class="emoji-container">😄 😃 😀 😊 ☺️ 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨 👂 👀 👃 👅 👄 👍 👎 👌 👊 ✊ ✌️ 👋 ✋ 👐 👆 👇 👉 👈 🙌 🙏 ☝️ 👏 💪 🚶 🏃 💃 👫 👪 👬 👭 💏 💑 👯 🙆 🙅 💁 🙋 💆 💇 💅 👰 🙎 🙍 🙇 🎩 👑 👒 👟 👞 👡 👠 👢 👕 👔 👚 👗 🎽 👖 👘 👙 💼 👜 👝 👛 👓 🎀 🌂 💄 💛 💙 💜 💚 ❤️ 💔 💗 💓 💕 💖 💞 💘 💌 💋 💍 💎 👤 👥 💬 👣 💭 🐶 🐺 🐱 🐭 🐹 🐰 🐸 🐯 🐨 🐻 🐷 🐽 🐮 🐗 🐵 🐒 🐴 🐑 🐘 🐼 🐧 🐦 🐤 🐥 🐣 🐔 🐍 🐢 🐛 🐝 🐜 🐞 🐌 🐙 🐚 🐠 🐟 🐬 🐳 🐋 🐄 🐏 🐀 🐃 🐅 🐇 🐉 🐎 🐐 🐓 🐕 🐖 🐁 🐂 🐲 🐡 🐊 🐫 🐪 🐆 🐈 🐩 🐾 💐 🌸 🌷 🍀 🌹 🌻 🌺 🍁 🍃 🍂 🌿 🌾 🍄 🌵 🌴 🌲 🌳 🌰 🌱 🌼 🌐 🌞 🌝 🌚 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 🌜 🌛 🌙 🌍 🌎 🌏 🌋 🌌 🌠 ⭐️ ☀️ ⛅️ ☁️ ⚡️ ☔️ ❄️ ⛄️ 🌀 🌁 🌈 🌊 🎍 💝 🎎 🎒 🎓 🎏 🎆 🎇 🎐 🎑 🎃 👻 🎅 🎄 🎁 🎋 🎉 🎊 🎈 🎌 🔮 🎥 📷 📹 📼 💿 📀 💽 💾 💻 📱 ☎️ 📞 📟 📠 📡 📺 📻 🔊 🔉 🔈 🔇 🔔 🔕 📢 📣 ⏳ ⌛️ ⏰ ⌚️ 🔓 🔒 🔏 🔐 🔑 🔎 💡 🔦 🔆 🔅 🔌 🔋 🔍 🛁 🛀 🚿 🚽 🔧 🔩 🔨 🚪 🚬 💣 🔫 🔪 💊 💉 💰 💴 💵 💷 💶 💳 💸 📲 📧 📥 📤 ✉️ 📩 📨 📯 📫 📪 📬 📭 📮 📦 📝 📄 📃 📑 📊 📈 📉 📜 📋 📅 📆 📇 📁 📂 ✂️ 📌 📎 ✒️ ✏️ 📏 📐 📕 📗 📘 📙 📓 📔 📒 📚 📖 🔖 📛 🔬 🔭 📰 🎨 🎬 🎤 🎧 🎼 🎵 🎶 🎹 🎻 🎺 🎷 🎸 👾 🎮 🃏 🎴 🀄️ 🎲 🎯 🏈 🏀 ⚽️ ⚾️ 🎾 🎱 🏉 🎳 ⛳️ 🚵 🚴 🏁 🏇 🏆 🎿 🏂 🏊 🏄 🎣 ☕️ 🍵 🍶 🍼 🍺 🍻 🍸 🍹 🍷 🍴 🍕 🍔 🍟 🍗 🍖 🍝 🍛 🍤 🍱 🍣 🍥 🍙 🍘 🍚 🍜 🍲 🍢 🍡 🍳 🍞 🍩 🍮 🍦 🍨 🍧 🎂 🍰 🍪 🍫 🍬 🍭 🍯 🍎 🍏 🍊 🍋 🍒 🍇 🍉 🍓 🍑 🍈 🍌 🍐 🍍 🍠 🍆 🍅 🌽 🏠 🏡 🏫 🏢 🏣 🏥 🏦 🏪 🏩 🏨 💒 ⛪️ 🏬 🏤 🌇 🌆 🏯 🏰 ⛺️ 🏭 🗼 🗾 🗻 🌄 🌅 🌃 🗽 🌉 🎠 🎡 ⛲️ 🎢 🚢 ⛵️ 🚤 🚣 ⚓️ 🚀 ✈️ 💺 🚁 🚂 🚊 🚉 🚞 🚆 🚄 🚅 🚈 🚇 🚝 🚋 🚃 🚎 🚌 🚍 🚙 🚘 🚗 🚕 🚖 🚛 🚚 🚨 🚓 🚔 🚒 🚑 🚐 🚲 🚡 🚟 🚠 🚜 💈 🚏 🎫 🚦 🚥 ⚠️ 🚧 🔰 ⛽️ 🏮 🎰 ♨️ 🗿 🎪 🎭 📍 🚩 🇯🇵 🇰🇷 🇩🇪 🇨🇳 🇺🇸 🇫🇷 🇪🇸 🇮🇹 🇷🇺 🇬🇧 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 0️⃣ 🔟 🔢 #️⃣ 🔣 ⬆️ ⬇️ ⬅️ ➡️ 🔠 🔡 🔤 ↗️ ↖️ ↘️ ↙️ ↔️ ↕️ 🔄 ◀️ ▶️ 🔼 🔽 ↩️ ↪️ ℹ️ ⏪ ⏩ ⏫ ⏬ ⤵️ ⤴️ 🆗 🔀 🔁 🔂 🆕 🆙 🆒 🆓 🆖 📶 🎦 🈁 🈯️ 🈳 🈵 🈴 🈲 🉐 🈹 🈺 🈶 🈚️ 🚻 🚹 🚺 🚼 🚾 🚰 🚮 🅿️ ♿️ 🚭 🈷 🈸 🈂 Ⓜ️ 🛂 🛄 🛅 🛃 🉑 ㊙️ ㊗️ 🆑 🆘 🆔 🚫 🔞 📵 🚯 🚱 🚳 🚷 🚸 ⛔️ ✳️ ❇️ ❎ ✅ ✴️ 💟 🆚 📳 📴 🅰 🅱 🆎 🅾 💠 ➿ ♻️ ♈️ ♉️ ♊️ ♋️ ♌️ ♍️ ♎️ ♏️ ♐️ ♑️ ♒️ ♓️ ⛎ 🔯 🏧 💹 💲 💱 © ® ™ ❌ ‼️ ⁉️ ❗️ ❓ ❕ ❔ ⭕️ 🔝 🔚 🔙 🔛 🔜 🔃 🕛 🕧 🕐 🕜 🕑 🕝 🕒 🕞 🕓 🕟 🕔 🕠 🕕 🕖 🕗 🕘 🕙 🕚 🕡 🕢 🕣 🕤 🕥 🕦 ✖️ ➕ ➖ ➗ ♠️ ♥️ ♣️ ♦️ 💮 💯 ✔️ ☑️ 🔘 🔗 ➰ 〰 〽️ 🔱 ◼️ ◻️ ◾️ ◽️ ▪️ ▫️ 🔺 🔲 🔳 ⚫️ ⚪️ 🔴 🔵 🔻 ⬜️ ⬛️ 🔶 🔷 🔸 🔹 </div>'
        divContainer.empty().html(emojiHtml);
        $("#main-frame").contents().find(".emoji-container").css("opacity", "0");
        $("#main-frame").contents().find(".emoji-container").emoji();
        setTimeout(function () {
            $("#main-frame").contents().find(".emoji-container").css("opacity", "1")
        }, 300);
        $("#main-frame").contents().find(".emoji-container").on("click", ".emoji", function () {
            var $this = $(this);
            $("#main-frame").contents().find("#messageContent").append($this);
        });
    },
    //将时间戳转化为时间格式
    getLocalTime: function (nS) {
        return new Date(nS).format('YYYY/M/D hh:mm');
    },
    getLocalYear: function (nS) {
        return new Date(nS).format('YYYY');
    },
    scrollBottom: function () {
        var height = $("#main-frame").contents().find(".message-list").height();
        $("#main-frame").contents().find(".m-message").scrollTop(height);
    }

};

$(function () {

    //$(".fixed-chat").on("click", function () {
    //    clickHandle.showConversationList($(this));
    //});
    $(".conversations-li").on("click", function (e) {

    });

    // $(document).on("click", function (e) {
    //     if (!$(e.target).is(".fixed-chat")) {
    //         $(".fixed-chat").find(".conversation").removeClass("hide");
    //         $(".fixed-chat").find(".conversation").empty();
    //     }
    // });
});