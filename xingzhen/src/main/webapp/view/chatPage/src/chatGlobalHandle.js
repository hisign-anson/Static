
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
//存放所有消息的数组
var msgAll = [];
var jchatGloabal = {
    init: function (userId,userPassword) {
        JIM.init({
            "appkey": top.across_appkey,
            "random_str": top.across_random_str,
            "signature": top.across_signature,
            "timestamp": top.across_timestamp,
            "flag": 1//是否启用消息记录漫游，默认 0 否，1 是
        }).onAck(function (data) {
            console.info('ack【】:' + obj2str(data));
        }).onSuccess(function (data) {
            console.info("极光初始化成功！");
            jchatGloabal.login(userId,userPassword);
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    login: function (userId,userPassword) {
        JIM.login({
            'username': userId,//登录用户名
            'password': userPassword
        }).onSuccess(function (data) {
            console.info("极光登录成功！");
            // location.replace(window.path + '/view/home.html?version=' + config.version);
            //离线消息同步监听
            JIM.onSyncConversation(function (data) {
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
                if (data.messages && data.messages.length > 0) {
                    $.each(data.messages, function (msgsIndex, msgsValue) {
                        var content = msgsValue.content;
                        msgAll.push(content);
                        //追加实时聊天消息
                        var jmgid = $("#main-frame").contents().find("#chatBlock .panel-container").attr("jmgid");
                        var jmgidHome = window.parent.$("#fixed-chat-block .panel-container").attr("jmgidHome");
                        jchatGloabal.showAllMsg(jmgid);
                        jchatGloabalHome.showAllMsg(jmgidHome);
                        // $("#main-frame").contents().find(".message-list").append("聊天消息实时监听");
                    })
                }

                onMsgReceive_res.push(data);
            });

            //业务事件监听
            JIM.onEventNotification(function (data) {
                //do something
                if (data.event_type == 1) {
                    toast("极光被挤下线！退出登录", 1000, function () {
                        $post(top.servicePath+"/sys/logout",null, function(res){
                            if(res && res.flag==1){
                                localData.set('token','');
                                localData.set('limits','');
                                localData.set('username','');
                                localData.set('password','');
                                localData.set('login-password','');
                                localData.get('currentUser','');
                                location.replace(window.path+ '/index.html?version='+config.version);
                            }
                        });
                        JIM.loginOut();//极光退出登录
                    }).warn();
                }
            });
            //同步业务事件监听
            JIM.onSyncEvent(function (data) {
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

        }).onFail(function (data) {
            console.info(obj2str(data));
            toast("极光登录失败！", 600).err();
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
        }).onTimeout(function (data) {
            toast('timeout:' + obj2str(data));
        });
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
    //更新个人信息
    updateSelfInfo:function (avatar) {
        JIM.updateSelfInfo({
            'address' : avatar.source//头像字段
        }).onSuccess(function(data) {
            //data.code 返回码
            //data.message 描述
        }).onFail(function(data) {
            //同上
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
                $("#main-frame").contents().find('.member-list').html(li);
            }).onFail(function (data) {
                toast(obj2str(data), 600).err();
            });
        },300);
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
    sendGroupMsg: function (textContent, gid, at) {
        JIM.sendGroupMsg({
            'at_list': at == "atAll" ? [] : "",
            'target_name': "群名称",
            'target_gid': gid,
            'content': textContent
        }).onSuccess(function (data, msg) {
            clickHandle.showMessageList(eval('(' + JSON.stringify(msg) + ')'));
            msgAll.push(msg.content);
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
    showAllMsg: function (jmgid) {
        setTimeout(function () {
            $("#main-frame").contents().find(".message-list").empty();
            var data = msgAll;
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var year = clickHandle.getLocalYear(data[i].create_time);
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
                        var from_name = message_list_content.from_name;
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
                                    content_text = objText.createName + objText.title + "【" + objText.taskContent + "】给" + objText.jsrName;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                                case "send_task_move_info":
                                    content_text = objText.createName + objText.title + "【" + objText.taskContent + "】给" + objText.jsrName;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                                case "send_task_urge_info":
                                    content_text = objText.createName + objText.title + "【" + objText.taskContent + "】给" + objText.jsrName;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                                case "send_task_feedback_info":
                                    content_text = objText.createName + objText.title + "【" + objText.fkxs + "】给" + objText.jsrName;
                                    time = clickHandle.getLocalTime(objText.createTime);
                                    break;
                            }
                        } else if (message_list_content.from_platform == "web" || message_list_content.from_platform == "a") {
                            // content_text = message_list_content.msg_body.text;
                            // time = clickHandle.getLocalTime(message_list_content.create_time);
                            var msgBody = str2obj(message_list_content.msg_body);
                            content_text = msgBody.text;
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
                                '<div class="text"> @所有人 ' + content_text + '</div>' +
                                '</div>' +
                                '</div>';
                            } else if(message_list_content.at_list && message_list_content.at_list.length > 0){
                                //@成员的消息
                                msgContetHtml = '<div class="main ' + selfHtml + '">' +
                                    '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                                    '<div class="text-wrap">' +
                                    '<div class="from-name">' + nameHtml + '</div>' +
                                    '<div class="text at-list">' + content_text + '</div>' +
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
                $("#main-frame").contents().find(".message-list").append(list);
                //处理emoji
                $("#main-frame").contents().find(".message-list").find(".text-wrap").find(".word").emoji();
                jchatGloabal.getResourceMessageHtml();
                clickHandle.scrollBottom();
            }
        }, 300)
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
        var $messageContent = $("#main-frame").contents().find("#messageContent");
        $messageContent.find("div").remove();
        $messageContent.find("br").remove();//去掉回车换行

        var textContent;
        if($messageContent.find(".emoji").hasClass("emoji")){
            textContent = $messageContent.find(".emoji").attr("code");
        }else {
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
            jchatGloabal.sendGroupMsg(textContent, gid, "");
            $messageContent.html("");
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
            //群聊文字消息
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
        '<div class="time"><span>' + time + '</span></div>' +  msgContetHtml +
        '</li>';
        ulHtml.append(list);
        //处理emoji
        ulHtml.find(".text-wrap").find(".self-word").emoji();
        jchatGloabal.getResourceMessageHtml();
        clickHandle.scrollBottom();
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