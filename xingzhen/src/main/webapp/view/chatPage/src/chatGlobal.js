/**********************测试appkey**********************/
// AppKey:13c78e9ee2ac862f30ce0b17
// Master Secret:670180c73e6152cf44918e2e

/**********************开发appkey**********************/
// AppKey:a15c1e9bb38c1607b9571eea
// Master Secret:bd4d826e1e49340aac2d05e2

var across_appkey = '13c78e9ee2ac862f30ce0b17';
var across_random_str = '022cd9fd995849b58b3ef0e943421ed9';//20-36 长度的随机字符串
var across_timestamp = new Date().getTime();
var masterSecret = '670180c73e6152cf44918e2e';
// 签名，10 分钟后失效,
// 签名生成算法: signature = md5(appkey=appkey&timestamp=timestamp&random_str=random_str&key=secret)
var across_signature = md5("appkey=" + across_appkey + "&timestamp=" + across_timestamp + "&random_str=" + across_random_str + "&key=" + masterSecret);
window.JIM = new JMessage({
    debug: true
    // debug: false
});
//设置JIM 全局变量
localData.set('across_appkey', across_appkey);
localData.set('across_random_str', across_random_str);
localData.set('across_timestamp', across_timestamp);
localData.set('masterSecret', masterSecret);
localData.set('across_signature', across_signature);

top.across_appkey = localData.get('across_appkey');
top.across_random_str = localData.get('across_random_str');
top.across_timestamp = localData.get('across_timestamp');
top.masterSecret = localData.get('masterSecret');
top.across_signature = localData.get('across_signature');
