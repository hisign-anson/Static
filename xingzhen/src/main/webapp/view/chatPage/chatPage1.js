var across_appkey = '59296d00f00fc319aa3261ab';
var across_random_str = '022cd9fd995849b58b3ef0e943421ed9';//20-36 长度的随机字符串
var across_timestamp = new Date().getTime();
var masterSecret = 'de191dde14b0d10db3259496';
// //签名，10 分钟后失效, 签名生成算法: signature = md5(appkey=appkey&timestamp=timestamp&random_str=random_str&key=secret)
var across_signature = md5("appkey=" + across_appkey + "&timestamp=" + across_timestamp + "&random_str=" + across_random_str + "&key=" + masterSecret);

var user_name = 'yangxi002';
var user_password = '123456';
var across_user = 'lijing001';
var target_nickname = '李静';//单聊：接收者的展示名
var gid = 10199054;
var target_gname = 'xu_test';//群聊：接收者的展示名

window.JIM = new JMessage({
    debug: true
});

JIM.onDisconnect(function () {
    alert("【disconnect】");
    toast("【disconnect】");
}); //异常断线监听

var chatHandle = {
    init: function () {
        JIM.init({
            "appkey": across_appkey,
            "random_str": across_random_str,
            "signature": across_signature,
            "timestamp": across_timestamp,
            "flag": 1//是否启用消息记录漫游，默认 0 否，1 是
        }).onAck(function (data) {
            toast('ack【】:' + obj2str(data));
        }).onSuccess(function (data) {
            //登录
            chatHandle.login();
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    login: function () {
        JIM.login({
            'username': user_name,//登录用户名
            'password': user_password
        }).onSuccess(function (data) {
            toast("登录成功！");
            //获取用户信息
            chatHandle.getUserInfo();
            //获取群组信息
            chatHandle.getGroupInfo();
            //获取群组成员
            chatHandle.getGroupMembers();
            // //获取会话列表
            // chatHandle.getConversation();

            //离线消息同步监听
            chatHandle.onSyncConversation(data);
            //聊天消息实时监听
            chatHandle.onMsgReceive(data);

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
            toast(obj2str(data), 600).err();
        }).onTimeout(function (data) {
            toast('timeout:' + obj2str(data));
        });
    },
    getUserInfo: function () {
        JIM.getUserInfo({
            'username': user_name
        }).onSuccess(function (data) {
            $(".group-name").append('用户' + str2obj(data).user_info.username + '进入：');

        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });

    },
    getGroupInfo: function () {
        JIM.getGroupInfo({'gid': gid}).onSuccess(function (data) {
            $(".group-name").append(str2obj(data).group_info.name);
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    getGroupMembers: function () {
        JIM.getGroupMembers({'gid': gid}).onSuccess(function (data) {
            console.info(data.member_list);
            $('.member-list').template(data.member_list, function (item, i) {

            });
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    onSyncConversation: function (data) {
        JIM.onSyncConversation(function (data) {
            //do something
            // $('.message-list').template(data[0].msgs, function (item, i) {
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
                        $(".message-list").append(list);
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
                        $(".message-list").append(list);
                        clickHandle.scrollBottom();
                    }

                }
            });
        });
    },
    getResourceMessage: function (element, message_content, isSelf, fileType) {
        var file_or_images = message_content.msg_body.media_id;
        var ulHtml = $(element);
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
                fileDiv = '<img class="message-image" src="' + path_file_or_images + '">'

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
            // if(isSelf){
            //     messageList = '<li>' +
            //         '<div class="time"><span>' + time + '</span></div>' +
            //         '<div class="main self">' +
            //         '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
            //         '<div class="text-wrap"><div class="from-name">' + from_name + '</div>' +
            //         '<div class="text">' + fileDiv + '</div>' +
            //         '</div></div>' +
            //         '</li>';
            //     '</li>';
            // } else {
            //     messageList = '<li>' +
            //         '<div class="time"><span>' + time + '</span></div>' +
            //         '<div class="main">' +
            //         '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
            //         '<div class="text-wrap"><div class="from-name">' + from_name + '</div>' +
            //         '<div class="text">' + fileDiv + '</div>' +
            //         '</div></div>' +
            //         '</li>';
            //     '</li>';
            // }
            ulHtml.append(messageList);
            $(".not-images-file").off("click").on("click", function () {
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
        var file = $(element)[0];
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
                $(".message-list").append(list);
                clickHandle.scrollBottom();

            }
            // if (msg_type == "3" || msg_type == "4") {
            // } else if (msg_type == "file" || msg_type == "image") {
            //     //文件消息 图片消息
            //     list += '<li>' +
            //         '<div class="time"><span>' + time + '</span></div>' +
            //         '<div class="main">' +
            //         '<img class="member-avatar" src="../../img/pc-avatar.png" />' +
            //         '<div class="text-wrap"><div class="from-name">' + from_name + '</div><div class="text">' + file_or_images + '</div>' +
            //         '</div></div>' +
            //         '</li>';
            //     '</li>';
            // }

            // if (data.messages[0].content.msg_type === 'image') {  //消息转发
            //     JIM.sendGroupPic({
            //         'target_gid': gid,
            //         'target_gname': target_gname,
            //         'msg_body': body
            //     }).onSuccess(function (data) {
            //         toast('消息转发成功');
            //     })
            // }
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
        $("#fileBox").val("");
        $("#fileBox").off("change").on("change", function () {
            chatHandle.sendGroupFile();
        });
    },
    sendFileImages: function () {
        console.info("发送图片！");
        $("#fileImagesBox").val("");
        $("#fileImagesBox").off("change").on("change", function () {
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
        var textContent = $("#messageContent").html();
        if (textContent == "") {
            toast("不能发送空白消息！");
        } else {
            console.info("发送消息！");
            $("#messageContent").html("");
            //发送群聊消息
            chatHandle.sendGroupMsg(textContent);
        }
    },
    showMessageList: function (message) {
        var ulHtml = $(".message-list");
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
    showDiv: function (contrlDiv) {
        var div = $(contrlDiv).siblings(".div-panel");
        div.addClass("emoji-active");
        if ($(contrlDiv).is("#sendEmojiBtn")) {
            clickHandle.loadEmoji(div);
            $(".emoji-container").on("click", ".emoji", function () {
                var $this = $(this);
                $("#messageContent").html($this);
            });
        } else if ($(contrlDiv).is("#setTextSizeBtn")) {
            // var sizeHtml = '<select id="setTextSize"><option>12</option><option>14</option><option>16</option></select>';
            // $("#setTextSize").change(function () {
            //     var optionSise = $(this).find("option:selected").val();
            //     $("#messageContent").css({
            //         "font-size": optionSise + "px"
            //     });
            // });
            var sizeHtml = '<div id="setTextSize"><span class="font-size">12</span>  <span class="font-size">14</span>  <span class="font-size">16</span></div>';
            div.empty().html(sizeHtml);
            $("#setTextSize").on("click", "span", function () {
                var optionSise = $(this).text();
                $("#messageContent").css({
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
    },
    loadEmoji: function (divContainer) {
        var emojiHtml = '';
        emojiHtml += '<div class="emoji-container">😄 😃 😀 😊 ☺️ 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨 👂 👀 👃 👅 👄 👍 👎 👌 👊 ✊ ✌️ 👋 ✋ 👐 👆 👇 👉 👈 🙌 🙏 ☝️ 👏 💪 🚶 🏃 💃 👫 👪 👬 👭 💏 💑 👯 🙆 🙅 💁 🙋 💆 💇 💅 👰 🙎 🙍 🙇 🎩 👑 👒 👟 👞 👡 👠 👢 👕 👔 👚 👗 🎽 👖 👘 👙 💼 👜 👝 👛 👓 🎀 🌂 💄 💛 💙 💜 💚 ❤️ 💔 💗 💓 💕 💖 💞 💘 💌 💋 💍 💎 👤 👥 💬 👣 💭 🐶 🐺 🐱 🐭 🐹 🐰 🐸 🐯 🐨 🐻 🐷 🐽 🐮 🐗 🐵 🐒 🐴 🐑 🐘 🐼 🐧 🐦 🐤 🐥 🐣 🐔 🐍 🐢 🐛 🐝 🐜 🐞 🐌 🐙 🐚 🐠 🐟 🐬 🐳 🐋 🐄 🐏 🐀 🐃 🐅 🐇 🐉 🐎 🐐 🐓 🐕 🐖 🐁 🐂 🐲 🐡 🐊 🐫 🐪 🐆 🐈 🐩 🐾 💐 🌸 🌷 🍀 🌹 🌻 🌺 🍁 🍃 🍂 🌿 🌾 🍄 🌵 🌴 🌲 🌳 🌰 🌱 🌼 🌐 🌞 🌝 🌚 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 🌜 🌛 🌙 🌍 🌎 🌏 🌋 🌌 🌠 ⭐️ ☀️ ⛅️ ☁️ ⚡️ ☔️ ❄️ ⛄️ 🌀 🌁 🌈 🌊 🎍 💝 🎎 🎒 🎓 🎏 🎆 🎇 🎐 🎑 🎃 👻 🎅 🎄 🎁 🎋 🎉 🎊 🎈 🎌 🔮 🎥 📷 📹 📼 💿 📀 💽 💾 💻 📱 ☎️ 📞 📟 📠 📡 📺 📻 🔊 🔉 🔈 🔇 🔔 🔕 📢 📣 ⏳ ⌛️ ⏰ ⌚️ 🔓 🔒 🔏 🔐 🔑 🔎 💡 🔦 🔆 🔅 🔌 🔋 🔍 🛁 🛀 🚿 🚽 🔧 🔩 🔨 🚪 🚬 💣 🔫 🔪 💊 💉 💰 💴 💵 💷 💶 💳 💸 📲 📧 📥 📤 ✉️ 📩 📨 📯 📫 📪 📬 📭 📮 📦 📝 📄 📃 📑 📊 📈 📉 📜 📋 📅 📆 📇 📁 📂 ✂️ 📌 📎 ✒️ ✏️ 📏 📐 📕 📗 📘 📙 📓 📔 📒 📚 📖 🔖 📛 🔬 🔭 📰 🎨 🎬 🎤 🎧 🎼 🎵 🎶 🎹 🎻 🎺 🎷 🎸 👾 🎮 🃏 🎴 🀄️ 🎲 🎯 🏈 🏀 ⚽️ ⚾️ 🎾 🎱 🏉 🎳 ⛳️ 🚵 🚴 🏁 🏇 🏆 🎿 🏂 🏊 🏄 🎣 ☕️ 🍵 🍶 🍼 🍺 🍻 🍸 🍹 🍷 🍴 🍕 🍔 🍟 🍗 🍖 🍝 🍛 🍤 🍱 🍣 🍥 🍙 🍘 🍚 🍜 🍲 🍢 🍡 🍳 🍞 🍩 🍮 🍦 🍨 🍧 🎂 🍰 🍪 🍫 🍬 🍭 🍯 🍎 🍏 🍊 🍋 🍒 🍇 🍉 🍓 🍑 🍈 🍌 🍐 🍍 🍠 🍆 🍅 🌽 🏠 🏡 🏫 🏢 🏣 🏥 🏦 🏪 🏩 🏨 💒 ⛪️ 🏬 🏤 🌇 🌆 🏯 🏰 ⛺️ 🏭 🗼 🗾 🗻 🌄 🌅 🌃 🗽 🌉 🎠 🎡 ⛲️ 🎢 🚢 ⛵️ 🚤 🚣 ⚓️ 🚀 ✈️ 💺 🚁 🚂 🚊 🚉 🚞 🚆 🚄 🚅 🚈 🚇 🚝 🚋 🚃 🚎 🚌 🚍 🚙 🚘 🚗 🚕 🚖 🚛 🚚 🚨 🚓 🚔 🚒 🚑 🚐 🚲 🚡 🚟 🚠 🚜 💈 🚏 🎫 🚦 🚥 ⚠️ 🚧 🔰 ⛽️ 🏮 🎰 ♨️ 🗿 🎪 🎭 📍 🚩 🇯🇵 🇰🇷 🇩🇪 🇨🇳 🇺🇸 🇫🇷 🇪🇸 🇮🇹 🇷🇺 🇬🇧 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 0️⃣ 🔟 🔢 #️⃣ 🔣 ⬆️ ⬇️ ⬅️ ➡️ 🔠 🔡 🔤 ↗️ ↖️ ↘️ ↙️ ↔️ ↕️ 🔄 ◀️ ▶️ 🔼 🔽 ↩️ ↪️ ℹ️ ⏪ ⏩ ⏫ ⏬ ⤵️ ⤴️ 🆗 🔀 🔁 🔂 🆕 🆙 🆒 🆓 🆖 📶 🎦 🈁 🈯️ 🈳 🈵 🈴 🈲 🉐 🈹 🈺 🈶 🈚️ 🚻 🚹 🚺 🚼 🚾 🚰 🚮 🅿️ ♿️ 🚭 🈷 🈸 🈂 Ⓜ️ 🛂 🛄 🛅 🛃 🉑 ㊙️ ㊗️ 🆑 🆘 🆔 🚫 🔞 📵 🚯 🚱 🚳 🚷 🚸 ⛔️ ✳️ ❇️ ❎ ✅ ✴️ 💟 🆚 📳 📴 🅰 🅱 🆎 🅾 💠 ➿ ♻️ ♈️ ♉️ ♊️ ♋️ ♌️ ♍️ ♎️ ♏️ ♐️ ♑️ ♒️ ♓️ ⛎ 🔯 🏧 💹 💲 💱 © ® ™ ❌ ‼️ ⁉️ ❗️ ❓ ❕ ❔ ⭕️ 🔝 🔚 🔙 🔛 🔜 🔃 🕛 🕧 🕐 🕜 🕑 🕝 🕒 🕞 🕓 🕟 🕔 🕠 🕕 🕖 🕗 🕘 🕙 🕚 🕡 🕢 🕣 🕤 🕥 🕦 ✖️ ➕ ➖ ➗ ♠️ ♥️ ♣️ ♦️ 💮 💯 ✔️ ☑️ 🔘 🔗 ➰ 〰 〽️ 🔱 ◼️ ◻️ ◾️ ◽️ ▪️ ▫️ 🔺 🔲 🔳 ⚫️ ⚪️ 🔴 🔵 🔻 ⬜️ ⬛️ 🔶 🔷 🔸 🔹 </div>'
        divContainer.empty().html(emojiHtml);
        $(".emoji-container").css("opacity", "0");
        $(".emoji-container").emoji();
        setTimeout(function () {
            $(".emoji-container").css("opacity", "1")
        }, 300);
        $(".emoji-container").on("click", ".emoji", function () {
            var $this = $(this);
            $("#messageContent").append($this);
        });
    },
    //将时间戳转化为时间格式
    getLocalTime: function (nS) {
        return new Date(nS).format('YYYY/M/D hh:mm');
    },
    scrollBottom: function () {
        var height = $(".message-list").height();
        $(".m-message").scrollTop(height);
    }

};
$(function () {
    chatHandle.init();
    $("#sendFileBtn").on("click", function () {
        clickHandle.sendFile();
    });
    $("#sendFileImagesBtn").on("click", function () {
        clickHandle.sendFileImages();
    });
    $("#sendEmojiBtn").on("click", function (event) {
        clickHandle.choseEmoji(this);
        // event.stopPropagation();
    });
    $("#setTextSizeBtn").on("click", function (event) {
        clickHandle.setTextSize(this);
        // event.stopPropagation();
    });
    $("#sendBtn").on("click", function () {
        clickHandle.sendText();
    });

    $(document).on('keyup', function (event) {
        var e = event || window.event;
        if (e.keyCode === 13) {
            clickHandle.sendText();
        }
    });
});