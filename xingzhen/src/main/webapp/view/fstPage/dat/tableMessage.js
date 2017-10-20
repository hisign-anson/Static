 define(function(){
	return {
		//首页点击-- 更多--点击浏览
		findTableById:function(param,callback){
			$get(top.servicePath+'/sys/message/findById',param,function(response) {
				callback(response);
			})
		}
	}
})