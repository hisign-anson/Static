//所有群消息未读数
var groupUnreadCount = 0;
var jchatGloabalHome = {
    onEventNotification: function () {
        var onEventNotification_res = str2obj(localData.get('onEventNotification_res'));
        switch (onEventNotification_res.type) {
            case "1":
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
            $("#fixed-chat-block").contents().find(".group-name").empty().append('用户' + nickname + '进入：');
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
            $("#fixed-chat-block").contents().find(".group-name").append(groupname);
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    getGroupMembers: function (gid) {
        setTimeout(function () {
            JIM.getGroupMembers({'gid': gid}).onSuccess(function (data) {
                var li = '';
                $.each(data.member_list, function (index, value) {
                    var avatar = '../../img/pc-avatar.png';
                    li += '<li class="">' +
                        '<img class="member-avatar" src="' + avatar + '"/>' +
                        '<span class="member">' + value.nickName + '</span>' +
                        '</li>'
                });
                $("#fixed-chat-block").contents().find('.member-list').html(li);
            }).onFail(function (data) {
                toast(obj2str(data), 600).err();
            });
        }, 300);
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
                                    time = clickHandleHome.getLocalTime(objText.createTime);
                                    break;
                                case "send_remove_case_info":
                                    content_text = objText.createName + "" + objText.title;
                                    time = clickHandleHome.getLocalTime(objText.createTime);
                                    break;
                                case "send_group_backup_info":
                                    content_text = objText.createName + "将" + objText.title;
                                    time = clickHandleHome.getLocalTime(objText.createTime);
                                    break;
                            }
                        } else if (message_list_content.from_platform == "web") {
                            content_text = message_list_content.msg_body.text;
                            time = clickHandleHome.getLocalTime(message_list_content.create_time);
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
            $("#fixed-chat-block").contents().find(".message-list").append(list);
            jchatGloabalHome.getResourceMessageHtml();
            clickHandleHome.scrollBottom();
        }
    },
    getResourceMessage: function (element, message_content, isSelf, fileType, index) {
        var file_or_images = message_content.msg_body.media_id;
        var ulHtml = $("#fixed-chat-block").contents().find(element);
        var messageList = "";
        var time = clickHandleHome.getLocalTime(message_content.create_time);
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
            $("#fixed-chat-block").contents().find(".not-images-file").off("click").on("click", function () {
                // window.open($(this).attr("src"),"","width=800,height=600");//新窗口打开
                window.open($(this).attr("src"));
            });
            jchatGloabalHome.getResourceMessageHtml();
            clickHandleHome.scrollBottom();
        }).onFail(function (data) {
            toast('success:' + JSON.stringify(data));
        });
    },
    getResourceMessageHtml: function () {
        $("#fixed-chat-block").contents().find(".preview-JIM-img").each(function (index, element) {
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

        $("#fixed-chat-block").contents().find(".not-images-file").each(function (index, element) {
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
        $("#fixed-chat-block").contents().find(".not-images-file").off("click").on("click", function () {
            // window.open($(this).attr("src"),"","width=800,height=600");//新窗口打开
            window.open($(this).attr("src"));
        });
    },
    getFile: function (element) {
        var fd = new FormData();
        var file = $("#fixed-chat-block").contents().find(element)[0];
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
                                    time = clickHandleHome.getLocalTime(objText.createTime);
                                    break;
                                case "send_remove_case_info":
                                    content_text = objText.createName + "" + objText.title;
                                    time = clickHandleHome.getLocalTime(objText.createTime);
                                    break;
                                case "send_group_backup_info":
                                    content_text = objText.createName + "将" + objText.title;
                                    time = clickHandleHome.getLocalTime(objText.createTime);
                                    break;
                            }
                        } else if (message_list_content.from_platform == "web") {
                            content_text = message_list_content.msg_body.text;
                            time = clickHandleHome.getLocalTime(message_list_content.create_time);
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
            $("#fixed-chat-block").contents().find(".message-list").append(list);
            jchatGloabalHome.getResourceMessageHtml();
            clickHandleHome.scrollBottom();
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
            clickHandleHome.showMessageList(eval('(' + JSON.stringify(msg) + ')'));
            msgAll.push(msg.content);
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    getConversation: function () {
        JIM.getConversation().onSuccess(function (data) {
            var conversations = data.conversations;
            var li = '';
            conversations.sort(function (a, b) {
                return b.mtime - a.mtime;//时间倒序
            });
            $.each(conversations, function (index, value) {
                //只展示群会话
                if (value.type == 4) {//单聊3群聊4
                    groupUnreadCount = groupUnreadCount + value.unread_msg_count;
                    var unreadCount = value.unread_msg_count == 0 ? '' : value.unread_msg_count;
                    li += '<li class="conversations-li" jmgid="' + value.gid + '"><img class="jim-avatar" src="../../img/pc-avatar.png" />' +
                    '<div class="text-wrap conversations-body"><span class="unread-msg">' + unreadCount + '</span><div class="name" title="' + value.name + '">' + value.name + '</div>' +
                        // '<div class="text-describe">' + obj2str(value.extras) + '</div>' +
                        '</div></li>'
                }
            });
            $(".conversation").find('ul').html(li);
            $(".conversations-li").on("click", function () {
                //进入具体会话
                var jmgid = $(this).attr("jmgid");
                $open('#fixed-chat-block', {width: 840, height: 700, top: 100, title: '&nbsp专案组群聊'});
                $("#fixed-chat-block .panel-container").attr("jmgidHome", jmgid);
                //$("#fixed-chat-block .panel-container").css("margin-top", "0").empty().html(_.template(chatPageTpl));
                jchatGloabalHome.getUserInfo();
                jchatGloabalHome.getGroupInfo(jmgid);
                jchatGloabalHome.getGroupMembers(jmgid);
                //打开弹框显示所有聊天消息
                jchatGloabalHome.showAllMsg(jmgid);

                $("#sendFileBtn").on("click", function () {
                    clickHandleHome.sendFile(jmgid);
                });
                $("#sendFileImagesBtn").on("click", function () {
                    clickHandleHome.sendFileImages(jmgid);
                });
                $("#sendEmojiBtn").on("click", function (event) {
                    clickHandleHome.choseEmoji(this);
                });
                $("#setTextSizeBtn").on("click", function (event) {
                    clickHandleHome.setTextSize(this);
                });
                $("#sendBtn").on("click", function () {
                    clickHandleHome.sendText(jmgid);
                });

                $("#messageContent").on('keyup', function (event) {
                    var e = event || window.event;
                    if (e.keyCode === 13) {
                        clickHandleHome.sendText(jmgid);
                    }
                });
                $("#fixed-chat-block").parents(".window").find(".panel-tool-close").click(function () {
                    JIM.getGroupInfo({
                        'gid': jmgid
                    }).onSuccess(function (data) {
                        var chatParam = {
                            reserveField1: data.group_info.desc,//groupid
                            createTime: rangeUtil.formatDate(rangeUtil.getCurrentDate(), 'yyyy-MM-dd'),
                            creator: top.userId,
                            content: "hah"
                        };
                        $post(top.servicePath_xz + '/xzlog/addChatLog', chatParam, function (response) {
                            //callback(response);
                        }, true)
                        window.parent.$("#fixed-chat-block .panel-container").attr("jmgidHome", "");//清除弹框上的参数
                    }).onFail(function (data) {
                        //data.code 返回码
                        //data.message 描述
                    });

                });
            })
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    sendGroupPic: function (gid, picContent) {
        JIM.sendGroupPic({
            'target_gid': gid,
            'image': jchatGloabalHome.getFile("#fileImagesBox")
        }).onSuccess(function (data, msg) {

            clickHandleHome.showMessageList(eval('(' + JSON.stringify(msg) + ')'));
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    sendGroupFile: function (gid) {
        JIM.sendGroupFile({
            'target_gid': gid,
            'file': jchatGloabalHome.getFile("#fileBox")
        }).onSuccess(function (data, msg) {
            clickHandleHome.showMessageList(eval('(' + JSON.stringify(msg) + ')'));
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    showAllMsg: function (jmgid) {
        $("#fixed-chat-block").contents().find(".message-list").empty();
        var data = msgAll;
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var year = clickHandleHome.getLocalYear(data[i].create_time);
                if (year < 2000) {
                    data[i].create_time = new Date(data[i].create_time * 1000);
                } else {
                    data[i].create_time = new Date(data[i].create_time);
                }
            }
            var list = '';
            data.sort(function (a, b) {
                return a.create_time - b.create_time;//时间正序
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
                                time = clickHandleHome.getLocalTime(objText.createTime);
                                break;
                            case "send_remove_case_info":
                                content_text = objText.createName + objText.title;
                                time = clickHandleHome.getLocalTime(objText.createTime);
                                break;
                            case "send_group_backup_info":
                                content_text = objText.createName + "将" + objText.title;
                                time = clickHandleHome.getLocalTime(objText.createTime);
                                break;

                            case "send_task_info":
                                content_text = objText.createName + objText.title + "【" + objText.taskContent + "】给" + objText.jsrName;
                                time = clickHandleHome.getLocalTime(objText.createTime);
                                break;
                            case "send_task_move_info":
                                content_text = objText.createName + objText.title + "【" + objText.taskContent + "】给" + objText.jsrName;
                                time = clickHandleHome.getLocalTime(objText.createTime);
                                break;
                            case "send_task_urge_info":
                                content_text = objText.createName + objText.title + "【" + objText.taskContent + "】给" + objText.jsrName;
                                time = clickHandleHome.getLocalTime(objText.createTime);
                                break;
                            case "send_task_feedback_info":
                                content_text = objText.createName + objText.title + "【" + objText.fkxs + "】给" + objText.jsrName;
                                time = clickHandleHome.getLocalTime(objText.createTime);
                                break;
                        }
                    } else if (message_list_content.from_platform == "web" || message_list_content.from_platform == "a") {
                        // content_text = message_list_content.msg_body.text;
                        // time = clickHandleHome.getLocalTime(message_list_content.create_time);
                        var msgBody = str2obj(message_list_content.msg_body);
                        var objText = msgBody.text;
                        content_text = objText;
                        time = clickHandleHome.getLocalTime(message_list_content.create_time);
                    }
                    var msg_type = message_list_content.msg_type;
                    var msg_id = dataValue.msg_id;
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
                    } else if (msg_type == "voice") {
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
                    } else if (msg_type == "image") {
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
                                '<div class="text word">' + content_text + '</div>' +
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
            $("#fixed-chat-block").contents().find(".message-list").append(list);
            //处理emoji
            $("#fixed-chat-block").contents().find(".message-list").find(".text-wrap").find(".word").emoji();
            jchatGloabalHome.getResourceMessageHtml();
            clickHandleHome.scrollBottom();
        }
    }
};
var clickHandleHome = {
    sendFile: function (gid) {
        console.info("发送文件！");
        $("#fixed-chat-block").contents().find("#fileBox").val("");
        $("#fixed-chat-block").contents().find("#fileBox").off("change").on("change", function () {
            jchatGloabalHome.sendGroupFile(gid);
        });
    },
    sendFileImages: function (gid) {
        console.info("发送图片！");
        $("#fixed-chat-block").contents().find("#fileImagesBox").val("");
        $("#fixed-chat-block").contents().find("#fileImagesBox").off("change").on("change", function () {
            jchatGloabalHome.sendGroupPic(gid);
        });
    },
    choseEmoji: function (contrlDiv) {
        console.info("选择emoji！");
        clickHandleHome.showDiv(contrlDiv);
    },
    setTextSize: function (contrlDiv) {
        console.info("设置文字大小！");
        clickHandleHome.showDiv(contrlDiv);
    },
    sendText: function (gid) {
        var $messageContent = $("#fixed-chat-block").contents().find("#messageContent");
        $messageContent.find("br").remove();//去掉回车换行
        $messageContent.find("div").remove();//去掉空的div

        var textContent;
        if ($messageContent.find(".emoji").hasClass("emoji")) {
            textContent = $messageContent.find(".emoji").attr("code");
        } else {
            //去掉粘贴过来的文本样式
            var text = $messageContent.html().replace(/<[^>]+>/g, "");
            $messageContent.html(text);
            textContent = $messageContent.html();
        }
        if (textContent == "") {
            toast("不能发送空白消息！");
        } else {
            console.info("发送消息！");
            //发送群聊消息
            jchatGloabalHome.sendGroupMsg(textContent, gid, "");
            $messageContent.html("");
        }
    },
    sendBroadcastText: function (gid, broadcastContent, at) {
        if (broadcastContent == "") {
            toast("不能发送空白消息！");
        } else {
            console.info("发送消息！");
            //发送群聊消息
            jchatGloabalHome.sendGroupMsg(broadcastContent, gid, at);
        }
    },
    showMessageList: function (message) {
        var ulHtml = $("#fixed-chat-block").contents().find(".message-list");
        var list = '';
        var msg_type = message.content.msg_type;
        var time = clickHandle.getLocalTime(message.content.create_time);
        var from_name = top.trueName;
        var content_text = message.content.msg_body.text;
        var media_id = message.content.msg_body.media_id;
        var file_size = message.content.msg_body.fsize >= 1024 ? (message.content.msg_body.fsize / 1024).toFixed(1) + 'KB' : message.content.msg_body.fsize + '字节';
        var file_name = message.content.msg_body.fname;
        var selfHtml = "self";
        var nameHtml = from_name;
        var msgContetHtml = '';
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
        } else {
            if (message.content.at_list && message.content.at_list.length == 0) {
                msgContetHtml = '<div class="main ' + selfHtml + '">' +
                    '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                    '<div class="text-wrap">' +
                    '<div class="from-name">' + nameHtml + '</div>' +
                    '<div class="text"> @所有人 ' + content_text + '</div>' +
                    '</div>' +
                    '</div>';

            } else {
                msgContetHtml = '<div class="main ' + selfHtml + '">' +
                    '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                    '<div class="text-wrap">' +
                    '<div class="from-name">' + nameHtml + '</div>' +
                    '<div class="text self-word">' + content_text + '</div>' +
                    '</div>' +
                    '</div>';
            }
        }
        list += '<li>' +
            '<div class="time"><span>' + time + '</span></div>' + msgContetHtml +
            '</li>';
        ulHtml.append(list);
        //处理emoji
        ulHtml.find(".text-wrap").find(".self-word").emoji();
        jchatGloabalHome.getResourceMessageHtml();
        clickHandleHome.scrollBottom();
    },
    showConversationList: function (obj) {
        var $conversation = obj.find(".conversation");
        if (obj.find(".conversation").is(":visible")) {
            $conversation.addClass("hide");
        } else {
            $conversation.removeClass("hide");
            jchatGloabalHome.getConversation();
        }
    },
    showDiv: function (contrlDiv) {
        var div = $("#fixed-chat-block").contents().find(contrlDiv).siblings(".div-panel");
        div.addClass("emoji-active");
        if ($("#fixed-chat-block").contents().find(contrlDiv).is("#sendEmojiBtn")) {
            clickHandleHome.loadEmoji(div);
            $("#fixed-chat-block").contents().find(".emoji-container").on("click", ".emoji", function () {
                var $this = $(this);
                $("#fixed-chat-block").contents().find("#messageContent").html($this);
            });
        } else if ($("#fixed-chat-block").contents().find(contrlDiv).is("#setTextSizeBtn")) {
            var sizeHtml = '<div id="setTextSize"><span class="font-size">12</span>  <span class="font-size">14</span>  <span class="font-size">16</span></div>';
            div.empty().html(sizeHtml);
            $("#fixed-chat-block").contents().find("#setTextSize").on("click", "span", function () {
                var optionSise = $(this).text();
                $("#fixed-chat-block").contents().find("#messageContent").css({
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
        $("#fixed-chat-block").contents().find(".message-container").on("click", function (e) {
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
        $("#fixed-chat-block").contents().find(".emoji-container").css("opacity", "0");
        $("#fixed-chat-block").contents().find(".emoji-container").emoji();
        setTimeout(function () {
            $("#fixed-chat-block").contents().find(".emoji-container").css("opacity", "1")
        }, 300);
        $("#fixed-chat-block").contents().find(".emoji-container").on("click", ".emoji", function () {
            var $this = $(this);
            $("#fixed-chat-block").contents().find("#messageContent").append($this);
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
        var height = $("#fixed-chat-block").contents().find(".message-list").height();
        $("#fixed-chat-block").contents().find(".m-message").scrollTop(height);
    }

};

$(function () {
    //会话未读数为0时，不显示数字
    $(".unread-count").html(groupUnreadCount == 0 ? "" : groupUnreadCount);
    JIM.onMutiUnreadMsgUpdate(function (data) {
        debugger
        // data.type 会话类型
        // data.gid 群 id
        // data.appkey 所属 appkey
        // data.username 会话 username
    });
    $(".fixed-chat").on("click", function () {
        clickHandleHome.showConversationList($(this));
    });
});