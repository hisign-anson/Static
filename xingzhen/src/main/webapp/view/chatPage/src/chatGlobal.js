
var across_appkey = 'a15c1e9bb38c1607b9571eea';
var across_random_str = '022cd9fd995849b58b3ef0e943421ed9';//20-36 长度的随机字符串
var across_timestamp = new Date().getTime();
var masterSecret = 'bd4d826e1e49340aac2d05e2';
// //签名，10 分钟后失效, 签名生成算法: signature = md5(appkey=appkey&timestamp=timestamp&random_str=random_str&key=secret)
var across_signature = md5("appkey=" + across_appkey + "&timestamp=" + across_timestamp + "&random_str=" + across_random_str + "&key=" + masterSecret);
window.JIM = new JMessage({
    // debug: true
    debug: false
});
//设置JIM 全局变量
localData.set('across_appkey', across_appkey);
localData.set('across_random_str', across_random_str);
localData.set('across_timestamp', across_timestamp);
localData.set('masterSecret', masterSecret);
localData.set('across_signature', across_signature);
// localData.set('JIM', window.JIM);

top.across_appkey = localData.get('across_appkey');
top.across_random_str = localData.get('across_random_str');
top.across_timestamp = localData.get('across_timestamp');
top.masterSecret = localData.get('masterSecret');
top.across_signature = localData.get('across_signature');

var gid = '10223256';
var user_name = top.userId;
// var user_password = '123456';


//异常断线监听
JIM.onDisconnect(function () {
    toast("【disconnect】");
});

// alert($("#main-frame").contents().find(".into-communication").attr("class"));
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
            // //获取用户信息
            // jchatGloabal.getUserInfo();
            // //获取群组信息
            // jchatGloabal.getGroupInfo();
            // //获取群组成员
            // jchatGloabal.getGroupMembers();
            // // //获取会话列表
            // // chatHandle.getConversation();
            //
            // //离线消息同步监听
            // jchatGloabal.onSyncConversation(data);
            // //聊天消息实时监听
            // jchatGloabal.onMsgReceive(data);
            //业务事件监听
            JIM.onEventNotification(function (data) {
                //do something
            });
            JIM.onUserInfUpdate(function (data) {
                //do something
            });

            JIM.onSyncEvent(function (data) {
                //do something
            });


        }).onFail(function (data) {
            alert(obj2str(data), 600).err();
        }).onTimeout(function (data) {
            alert('timeout:' + obj2str(data));
        });
    },
    getUserInfo: function () {
        JIM.getUserInfo({
            'username': top.userId
        }).onSuccess(function (data) {
            debugger
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
            debugger
            var groupname = str2obj(data).group_info.name;
            var desc = str2obj(data).group_info.desc;//返回系统群id
            var gid = str2obj(data).group_info.gid;//返回极光群id
            $("#main-frame").contents().find(".group-name").append(groupname);
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    getGroupMembers: function () {
        JIM.getGroupMembers({'gid': gid}).onSuccess(function (data) {
            $("#main-frame").contents().find('.member-list').template(data.member_list, function (item, i) {

            });
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    onSyncConversation: function (data) {
        JIM.onSyncConversation(function (data) {
            //do something
            // $("#main-frame").contents().find('.message-list').template(data[0].msgs, function (item, i) {
            //     item.content.create_time = clickHandle.getLocalTime(item.content.create_time);
            //     item.content.msg_body.text = obj2str(item.content.msg_body.text);
            // });
            var message_list = str2obj(data)[0].msgs;
            var list = '';
            $.each(message_list, function (i, e) {
                var message_list_content = message_list[i].content;
                var time = clickHandle.getLocalTime(message_list_content.create_time);
                var from_name = message_list_content.from_id;
                var content_text = message_list_content.msg_body.text;
                var msg_type = message_list_content.msg_type;
                if (from_name == user_name) {
                    // list += '<li>' +
                    //     '<div class="time"><span>' + time + '</span></div>' +
                    //     '<div class="main self">' +
                    //     '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                    //     '<div class="text-wrap"><div class="from-name">' + from_name + '</div><div class="text">' + content_text + '</div>' +
                    //     '</div></div>' +
                    //     '</li>';

                    if (msg_type == "file" || msg_type == "image") {
                        //文件消息 图片消息
                        chatHandle.getResourceMessage(".message-list", message_list_content, true, msg_type);
                    } else {
                        //单聊文字消息 群聊文字消息
                        list += '<li>' +
                            '<div class="time"><span>' + time + '</span></div>' +
                            '<div class="main self">' +
                            '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                            '<div class="text-wrap"><div class="from-name">' + from_name + '</div><div class="text">' + content_text + '</div>' +
                            '</div></div>' +
                            '</li>';
                        $("#main-frame").contents().find(".message-list").append(list);
                        clickHandle.scrollBottom();
                    }

                } else {
                    if (msg_type == "file" || msg_type == "image") {
                        //文件消息 图片消息
                        chatHandle.getResourceMessage(".message-list", message_list_content, false, msg_type);
                    } else {
                        //单聊文字消息 群聊文字消息
                        list += '<li>' +
                            '<div class="time"><span>' + time + '</span></div>' +
                            '<div class="main">' +
                            '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                            '<div class="text-wrap"><div class="from-name">' + from_name + '</div><div class="text">' + content_text + '</div>' +
                            '</div></div>' +
                            '</li>';
                        '</li>';
                        $("#main-frame").contents().find(".message-list").append(list);
                        clickHandle.scrollBottom();
                    }

                }
            });
        });
    },
    getResourceMessage: function (element, message_content, isSelf, fileType) {
        var file_or_images = message_content.msg_body.media_id;
        // var ulHtml = $(element);
        var ulHtml = $("#main-frame").contents().find(element);
        var messageList = "";
        var time = clickHandle.getLocalTime(message_content.create_time);
        var from_name = message_content.from_id;
        var fname = message_content.msg_body.fname;
        var fsize = message_content.msg_body.fsize >= 1024 ? (message_content.msg_body.fsize / 1024).toFixed(1) + 'KB' : message_content.msg_body.fsize + '字节';
        var fileDiv = '';
        var isSelfDiv = isSelf ? "self" : "";
        JIM.getResource({'media_id': file_or_images}).onSuccess(function (data) {
            var path_file_or_images = data.url;
            if (fileType == "file") {
                //文件消息
                fileDiv = '<a class="not-images-file" src="' + path_file_or_images + '" target="_blank" title="' + fname + '">' +
                    '<span class="icon-file-noType"></span>' +
                    '<span class="file-info"><span class="file-name">' + fname + '</span>' +
                    '<span class="file-size">' + fsize + '</span>' +
                    '</span></a>';
            } else if (fileType == "image") {
                //图片消息
                fileDiv = '<img class="message-image" src="' + path_file_or_images + '">';
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
            $("#main-frame").contents().find(".not-images-file").off("click").on("click", function () {
                // window.open($(this).attr("src"),"","width=800,height=600");//新窗口打开
                window.open($(this).attr("src"));
            });
            clickHandle.scrollBottom();
        }).onFail(function (data) {
            toast('success:' + JSON.stringify(data));
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
    onMsgReceive: function (data) {
        JIM.onMsgReceive(function (data) {
            var msg_type = data.messages[0].content.msg_type;
            var message_content = data.messages[0].content;
            var time = clickHandle.getLocalTime(message_content.create_time);
            var from_name = message_content.from_id;
            var content_text = message_content.msg_body.text;
            var file_or_images = message_content.msg_body.media_id;
            var list = '';
            if (msg_type == "file" || msg_type == "image") {
                //文件消息 图片消息
                chatHandle.getResourceMessage(".message-list", message_content, false, msg_type);
            } else {
                //单聊文字消息 群聊文字消息
                list += '<li>' +
                    '<div class="time"><span>' + time + '</span></div>' +
                    '<div class="main">' +
                    '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
                    '<div class="text-wrap"><div class="from-name">' + from_name + '</div><div class="text">' + content_text + '</div>' +
                    '</div></div>' +
                    '</li>';
                '</li>';
                $("#main-frame").contents().find(".message-list").append(list);
                clickHandle.scrollBottom();

            }
        });
    },

    createGroup: function () {
        JIM.createGroup({
            'group_name' : '<groupName>',
            'group_description' : '<groupDescription>'
        }).onSuccess(function(data) {
            //data.code 返回码
            //data.message 描述
            //data.gid 群组id
            //data.group_name 群名
            //data.group_descriptin 群描述
        }).onFail(function(data) {
            //data.code 返回码
            //data.message 描述
        });
    },
    addGroupMembers:function () {
        JIM.addGroupMembers({
            'gid' : '<gid>',
            'member_usernames' : [{'username':'name1'},{'username':'name2','appkey':'appkey2'}]
        }).onSuccess(function(data) {
            //data.code 返回码
            //data.message 描述
        }).onFail(function(data) {
            //同上
        });
    },
    delGroupMembers:function () {
        JIM.delGroupMembers({
            'gid' : '<gid>',
            'member_usernames' : [{'username':'name1'},{'username':'name2','appkey':'appkey2'}]
        }).onSuccess(function(data) {
            //data.code 返回码
            //data.message 描述
        }).onFail(function(data) {
            // 同上
        });
    },
    getGroups:function () {
        JIM.getGroups().onSuccess(function(data) {
            //data.code 返回码
            //data.message 描述
            //data.group_list[] 群组列表，如下示例
            //data.group_list[0].gid 群id
            //data.group_list[0].name 群名
            //data.group_list[0].desc 群描述
            //data.group_list[0].appkey 群所属appkey
            //data.group_list[0].ctime 群创建时间
            //data.group_list[0].mtime 最近一次群信息修改时间
            //data.group_list[0].avatar 群头像
        }).onFail(function(data) {
            //data.code 返回码
            //data.message 描述
        });
    },
    groupShieldList:function () {
        JIM.groupShieldList().onSuccess(function(data) {
            //data.code 返回码
            //data.message 描述
            //data.group_list[] 群组列表，如下示例
            //data.group_list[0].gid 群id
            //data.group_list[0].name 群名
            //data.group_list[0].desc 群描述
            //data.group_list[0].appkey 群所属appkey
            //data.group_list[0].ctime 群创建时间
            //data.group_list[0].mtime 最近一次群信息修改时间
        }).onFail(function(data) {
            // 同上
        });
    },
    onMsgReceiptChange:function () {
        JIM.onMsgReceiptChange(function(data) {
            // data.type
            // data.gid
            // data.appkey
            // data.username
            // data.receipt_msgs[].msg_id
            // data.receipt_msgs[].unread_count
        });
    },
    onSyncMsgReceipt:function () {
        JIM.onSyncMsgReceipt(function(data) {
            // data 为已读数变更事件数组 [receiptChange1,...]
        });
    },
    onMutiUnreadMsgUpdate:function () {
        JIM.onMutiUnreadMsgUpdate(function(data) {
            // data.type 会话类型
            // data.gid 群 id
            // data.appkey 所属 appkey
            // data.username 会话 username
        });
    },
    sendGroupMsg: function (textContent) {
        JIM.sendGroupMsg({
            'target_gid': gid,
            'target_gname': target_gname,
            'content': textContent,
            'at_list': [{'username': across_user, 'appkey': across_appkey}],
            'custom_notification': {
                'enabled': true,
                'title': '放假咯2222222222',
                'alert': '今天放假一天，大家好好玩2222222221',
                'at_prefix': '[@你了]'
            }
        }).onSuccess(function (data, msg) {
            clickHandle.showMessageList(eval('(' + JSON.stringify(msg) + ')'));
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    getConversation: function () {
        JIM.getConversation().onSuccess(function (data) {
            console.info('success: ' + JSON.stringify(data));

        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    sendGroupPic: function (picContent) {
        JIM.sendGroupPic({
            'target_gid': gid,
            'target_gname': target_gname,
            'image': chatHandle.getFile("#fileImagesBox")
        }).onSuccess(function (data, msg) {

            clickHandle.showMessageList(eval('(' + JSON.stringify(msg) + ')'));
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    sendGroupFile: function () {
        JIM.sendGroupFile({
            'target_gid': gid,
            'target_gname': target_gname,
            'file': chatHandle.getFile("#fileBox")
        }).onSuccess(function (data, msg) {
            clickHandle.showMessageList(eval('(' + JSON.stringify(msg) + ')'));
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    }
};
var clickHandle = {
    sendFile: function () {
        console.info("发送文件！");
        $("#main-frame").contents().find("#fileBox").val("");
        $("#main-frame").contents().find("#fileBox").off("change").on("change", function () {
            chatHandle.sendGroupFile();
        });
    },
    sendFileImages: function () {
        console.info("发送图片！");
        $("#main-frame").contents().find("#fileImagesBox").val("");
        $("#main-frame").contents().find("#fileImagesBox").off("change").on("change", function () {
            chatHandle.sendGroupPic();
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
    sendText: function () {
        var textContent = $("#main-frame").contents().find("#messageContent").html();
        if (textContent == "") {
            toast("不能发送空白消息！");
        } else {
            console.info("发送消息！");
            $("#main-frame").contents().find("#messageContent").html("");
            //发送群聊消息
            chatHandle.sendGroupMsg(textContent);
        }
    },
    showMessageList: function (message) {
        var ulHtml = $("#main-frame").contents().find(".message-list");
        var messageList = "";
        var msg_type = message.content.msg_type;
        var time = clickHandle.getLocalTime(message.content.create_time);
        var from_name = message.content.from_id;
        var content_text = message.content.msg_body.text;
        if (msg_type == "file" || msg_type == "image") {
            chatHandle.getResourceMessage(".message-list", message.content, true, msg_type);
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
    showConversationList:function (obj) {
        var $conversation = obj.find(".conversation");
        if(obj.find(".conversation").is(":visible")){
            $conversation.addClass("hide");
        } else {
            $conversation.removeClass("hide");
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
        $("#main-frame").contents().find(document).on("click", function (e) {
            if (!$(e.target).is("#sendEmojiBtn") && !$(e.target).is("#setTextSizeBtn")) {
                div.removeClass("emoji-active");
                div.empty();
            }
        });
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
    scrollBottom: function () {
        var height = $("#main-frame").contents().find(".message-list").height();
        $("#main-frame").contents().find(".m-message").scrollTop(25011);
    }

};

$(".fixed-chat").on("click",function () {
    clickHandle.showConversationList($(this));
});
