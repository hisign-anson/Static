var across_appkey = 'a15c1e9bb38c1607b9571eea';
var across_random_str = '022cd9fd995849b58b3ef0e943421ed9';//20-36 长度的随机字符串
var across_timestamp = new Date().getTime();
var masterSecret = 'bd4d826e1e49340aac2d05e2';
// //签名，10 分钟后失效, 签名生成算法: signature = md5(appkey=appkey&timestamp=timestamp&random_str=random_str&key=secret)
var across_signature = md5("appkey=" + across_appkey + "&timestamp=" + across_timestamp + "&random_str=" + across_random_str + "&key=" + masterSecret);
window.JIM = new JMessage({
    debug : true
    // debug: false

});

JIM.onDisconnect(function(){
    console.log("【disconnect】");
}); //异常断线监听

function getFile() {
    var fd = new FormData();
    var file = document.getElementById('file_box');
    if(!file.files[0]) {
        throw new Error('获取文件失败');
    }
    fd.append(file.files[0].name, file.files[0]);
    return fd;
}

function init() {
    JIM.init({
        "appkey": top.across_appkey,
        "random_str": top.across_random_str,
        "signature": top.across_signature,
        "timestamp": top.across_timestamp,
        "flag": 0//是否启用消息记录漫游，默认 0 否，1 是
    }).onSuccess(function(data) {
        toast("极光初始化成功！");
        debugger
        login();

    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data))
    });
}

init();

function loginOut(){
    JIM.loginOut();
}
function register(){
    JIM.register({
        'username' : 'test0011',
        'password': '123456',
        'nickname' : 'nickname'
    }).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data))
    });
}

function isConnect(){
    console.log('isConnect:'+JIM.isConnect());
}

function isInit(){
    console.log('isInit:'+JIM.isInit());
}

function isLogin(){
    console.log('isLogin:'+JIM.isLogin());
}



function login() {
    debugger
    JIM.login({
        'username': top.userId,//登录用户名
        'password': top.userPassword
    }).onSuccess(function(data) {
        toast("极光登录成功！");
        debugger
        JIM.onMsgReceive(function(data) {
            data = JSON.stringify(data);
            console.log('1msg_receive:' + data);

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
        });

        JIM.onEventNotification(function(data) {
            console.log('event_receive: ' + JSON.stringify(data));
        });

        JIM.onSyncConversation(function(data) { //离线消息同步监听
            console.log('event_receive: ' + data);
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

        JIM.onUserInfUpdate(function(data) {
            console.log('onUserInfUpdate : ' + JSON.stringify(data));
        });

        JIM.onSyncEvent(function(data) {
            console.log('onSyncEvent : ' + JSON.stringify(data));
        });

        JIM.onMsgReceiptChange(function(data){
            console.log('onMsgReceiptChange : ' + JSON.stringify(data));

        });

        JIM.onSyncMsgReceipt(function(data){
            console.log('onSyncMsgReceipt : ' + JSON.stringify(data));

        });

        JIM.onMutiUnreadMsgUpdate(function(data){
            console.log('onConversationUpdate : ' + JSON.stringify(data));

        });

        JIM.onTransMsgRec(function(data){
            console.log('onTransMsgRec : ' + JSON.stringify(data));
        });

    }).onFail(function(data) {

        console.log('error:' + JSON.stringify(data));
    }).onTimeout(function(data) {
        console.log('timeout:' + JSON.stringify(data));
    });
}


function resetUnreadCount(){
    JIM.resetUnreadCount({'username':across_user,'appkey':across_appkey});
}

function getSelfInfo(username) {
    debugger
    JIM.getUserInfo({
        'username' : username
    }).onSuccess(function(data) {
        debugger
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });

}

function getResource(i,id){
    var id ='qiniu/file/j/348F9C1DAD3A98849BEADE006B70CEF8.txt';
    JIM.getResource({'media_id' : id})
        .onSuccess(function(data){
            console.log('success:' + JSON.stringify(data));
        }).onFail(function(data){
        console.log('error:' + JSON.stringify(data));
    });

}


function sendSingleMsg() {
    JIM.sendSingleMsg({
        'target_username' : across_user,
        'appkey' :  across_appkey,
        'content' : '12221',
        'no_offline' : false,
        'no_notification' : false,
        //'custom_notification':{'enabled':true,'title':'title','alert':'alert','at_prefix':'atprefix'}
        need_receipt:true
    }).onSuccess(function(data,msg) {
        console.log('success data:' + JSON.stringify(data));
        console.log('succes msg:' + JSON.stringify(msg));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}


function createGroup(){
    JIM.createGroup({
        'avatar':getFile(),
        'group_name' : 's'
    }).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}

function getGroups(){
    JIM.getGroups().onSuccess(function(data) {
        // data.group_list.forEach(function(e){
        //  JIM.exitGroup({'gid':e.gid})
        //});
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}

function updateGroupInfo(){
    JIM.updateGroupInfo( {'group_name' : '22','gid':gid}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}


function addGroupShield(){
    JIM.addGroupShield({'gid':gid}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}

function delGroupShield(){
    JIM.delGroupShield({'gid':gid}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}

function listGroupShield(){
    JIM.groupShieldList().onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}

function getGroupInfo(gid){
    JIM.getGroupInfo({'gid':gid}).onSuccess(function(data) {
        debugger
        console.log('success:' + JSON.stringify(data));
        $(".group-name").append(str2obj(data).group_info.name);
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}

function exitGroup(){
    JIM.exitGroup({'gid':gid}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data))
    });
}

function getGroupMembers(gid){
    JIM.getGroupMembers({'gid':gid}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));

        $('.member-list').template(data.member_list, function (item, i) {

        });
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}

function addGroupMembers(){
    JIM.addGroupMembers({'gid':gid,'member_usernames':[{'username': across_user,'appkey': across_appkey}]}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data))
    });
}

function delGroupMembers(){
    JIM.delGroupMembers({'gid':gid,'member_usernames':[{'username': across_user,'appkey': across_appkey}]}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}

function sendGroupMsg() {

    //var gid = theGid

    JIM.sendGroupMsg({
        'target_gid' : gid,
        'content' : 'haha',
        'at_list' : [{'username':across_user,'appkey':across_appkey}],
        'need_receipt':true
    }).onSuccess(function(data) {
        // 可以访问 gid
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}

function sendGroupCustom(){
    JIM.sendGroupCustom({
        'target_gid' : gid,
        'target_gname' : target_gname,
        'custom' : {'k1':'v1','k2':'v2'},
        'nead_receipt':true
    }).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}


function sendSingleCustom(){
    JIM.sendSingleCustom({
        'target_username' : across_user,
        'target_nickname' : target_nickname,
        'custom' : {'k1':'v1','k2':'v2'},
        'appkey' : across_appkey,
        'nead_receipt':true
    }).onSuccess(function(data,msg) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}

function sendAcrossSingleMsg() {
    JIM.sendSingleMsg({
        'target_username' : across_user,
        'target_nickname' : target_nickname,
        'content' : 'Hi, JiGuang',
        'appkey' : across_appkey,
        'nead_receipt':true
    }).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}



function sendSinglePic() {
    JIM.sendSinglePic({
        'target_username' : across_user,
        'target_nickname' : target_nickname,
        'appkey' : across_appkey,
        'image' : getFile(),
        'nead_receipt':true
    }).onSuccess(function(data,msg) {
        console.log('success:' + JSON.stringify(data));
        console.log('successssssss:' + JSON.stringify(msg));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}

function sendGroupPic() {
    JIM.sendGroupPic({
        'target_gid' : gid,
        'target_gname' : target_gname,
        'image' : getFile(),
        'nead_receipt':true
    }).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}


function sendSingleFile() {
    JIM.sendSingleFile({
        'file' : getFile(),
        'target_username' : across_user,
        'target_nickname' : target_nickname,
        'appkey' : across_appkey,
        'extras': {'key':'val','key2':'val2'},
        'nead_receipt':true
    }).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}

function sendGroupFile() {
    JIM.sendGroupFile({
        'target_gid' : gid,
        'target_gname' : target_gname,
        'file' : getFile(),
        'nead_receipt':true
    }).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        console.log('error:' + JSON.stringify(data));
    });
}

function sendSingleLocation() {
    JIM.sendSingleLocation({
        'target_username' : across_user,
        'target_nickname' : target_nickname,
        'appkey' : across_appkey,
        'latitude' : 38.6577668476,
        'longitude' : 104.0829574963,
        'scale' : 1,
        'label' : '广东省深圳市南山区',
        'nead_receipt':true
    }).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function sendGroupLocation() {
    JIM.sendGroupLocation({
        'target_gid' : gid,
        'latitude' : 38.6577668476,
        'longitude' : 104.0829574963,
        'scale' : 1,
        'label' : '广东省深圳市南山区',
        'nead_receipt':true
    }).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        

    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}


function getConversation() {
    JIM.getConversation().onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function noDisturb() {
    JIM.getNoDisturb().onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}


function addSingleDisturb() {
    JIM.addSingleNoDisturb({'appkey': across_appkey,'target_name' : across_user}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function delSingleDisturb() {
    JIM.delSingleNoDisturb({'appkey': across_appkey,'target_name' : across_user}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function addGroupDisturb() {
    JIM.addGroupNoDisturb({'gid': gid}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function delGroupDisturb() {
    JIM.delGroupNoDisturb({'gid': gid}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}



function addGlobalDisturb() {
    JIM.addGlobalNoDisturb().onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function delGlobalDisturb() {
    JIM.delGlobalNoDisturb().onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}



function getBlackList() {
    JIM.getBlacks().onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function addBlack() {
    JIM.addSingleBlacks({'member_usernames':[{'username': across_user,'appkey':across_appkey}]}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function delBlack() {
    JIM.delSingleBlacks({'member_usernames':[{'username': across_user,'appkey':across_appkey}]}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}


function updateUserInfo() {
    JIM.updateSelfInfo({'nickname':'xuqijin_nick_name','address':'深圳','extras':{'k':'v'}}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function updateUserPic() {
    JIM.updateSelfAvatar({'avatar' : getFile()}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}



function updateUserPwd() {
    JIM.updateSelfPwd({'old_pwd' : '123456','new_pwd':'123456','is_md5' : false}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}
function getFriendList(){
    JIM.getFriendList().onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function addFriend(){
    JIM.addFriend({'target_name':across_user,'from_type':'1','why':'hi,friend 2'}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function updateFriendMemo(){
    JIM.updateFriendMemo({'target_name':across_user,'memo_name':'test_memo_update'}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function delFriend(){
    JIM.delFriend({'appkey':across_appkey,'target_name':across_user}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function msgRetract(msg_id){
    JIM.msgRetract({"msg_id": msg_id}).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function transSingleMsg(){
    JIM.transSingleMsg({
        'target_username' : across_user,
        'cmd' : 'haha'
    }).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function transGroupMsg(){
    JIM.transGroupMsg({
        'gid' : gid,
        'cmd' : 'haha'
    }).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function addSingleReceiptReport(){
    JIM.addSingleReceiptReport({'username':across_user,'msg_ids':msg_ids}).onSuccess(function(data,data2){
        console.log('success :' + JSON.stringify(data));
        console.log('success :' + JSON.stringify(data2));
    });
}
function addGroupReceiptReport(){
    JIM.addGroupReceiptReport({'gid':gid,'msg_ids':msg_ids}).onSuccess(function(data,data2){
        console.log('success ' + JSON.stringify(data));
        console.log('success :' + JSON.stringify(data2));
    });
}

function getUnreadMsgCnt(){
    var count = JIM.getUnreadMsgCnt({
        'username' : across_user
    });
    console.log('unread count:' + count);
}

function msgUnreadList(){
    JIM.msgUnreadList({
        'msg_id' : msg_id
    }).onSuccess(function(data) {
        console.log('success:' + JSON.stringify(data));
        
    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
        
    });
}

function updateConversation(){
    JIM.updateConversation({
        'gid' : gid,
        'extras' : {'key':'val','is_top':true}
    });
}

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
        $(".m-message").scrollTop(25011);
    }

};