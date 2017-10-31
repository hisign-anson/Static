var across_appkey = 'a15c1e9bb38c1607b9571eea';
var across_random_str = '022cd9fd995849b58b3ef0e943421ed9';//20-36 长度的随机字符串
var across_timestamp = new Date().getTime();
var masterSecret = 'bd4d826e1e49340aac2d05e2';
// //签名，10 分钟后失效, 签名生成算法: signature = md5(appkey=appkey&timestamp=timestamp&random_str=random_str&key=secret)
var across_signature = md5("appkey=" + across_appkey + "&timestamp=" + across_timestamp + "&random_str=" + across_random_str + "&key=" + masterSecret);
//用户登录账号 密码
var user_name = top.userId;
var user_password = '123456';
window.JIM = new JMessage({
    debug: true
    // debug: false

});
//异常断线监听
JIM.onDisconnect(function () {
    toast("【disconnect】");
});
var jchatGloabal = {
    // _selfChat = this;
    init: function () {
        _globalChat = this;
        JIM.init({
            "appkey": across_appkey,
            "random_str": across_random_str,
            "signature": across_signature,
            "timestamp": across_timestamp,
            "flag": 1//是否启用消息记录漫游，默认 0 否，1 是
        }).onAck(function (data) {
            // debugger
            toast('ack【】:' + obj2str(data));
        }).onSuccess(function (data) {
            toast("初始化成功！");
            // //登录
            // _globalChat.login();
        }).onFail(function (data) {
            toast(obj2str(data), 600).err();
        });
    },
    login: function () {
        _globalChat = this;
        JIM.login({
            'username': user_name,//登录用户名
            'password': user_password
        }).onSuccess(function (data) {
            debugger
            toast("登录成功！");
            // //获取用户信息
            // _selfChat.getUserInfo();
            // //获取群组信息
            // _selfChat.getGroupInfo();
            // //获取群组成员
            // _selfChat.getGroupMembers();
            // // //获取会话列表
            // // _selfChat.getConversation();
            //
            // //离线消息同步监听
            // _selfChat.onSyncConversation(data);
            // //聊天消息实时监听
            // _selfChat.onMsgReceive(data);

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
};