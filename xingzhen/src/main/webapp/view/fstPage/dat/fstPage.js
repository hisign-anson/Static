 define(function(){
	return {
		//代办任务
		todoList:function(param,callback){
			$post(top.servicePath+'/sw/index/getBackLogList',param,function(response) {
				callback(response);
			},true)
		},
		//个人经费、用车、领物情况图
		personList:function(param,callback){
			$post(top.servicePath+'/stat/stat/getStatementList',param,function(response) {
				callback(response);
			},true)
		},
		//各处开支、用车、领物情况图
		officeList:function(param,callback){
			$post(top.servicePath+'/stat/stat/getECStatementList',param,function(response) {
				callback(response);
			},true)
		},
		//最新发布
		findReceivePage:function(param,callback){
			$post(top.servicePath+'/sys/message/findReceivePage',param,function(response) {
				callback(response);
			},true)
		},
		//通知公告
		findRePage:function(param,callback){
			$post(top.servicePath+'/sys/message/findRePage',param,function(response) {
				callback(response);
			},true)
		},
		//规章制度、表格下载
		findPage:function(param,callback){
			$post(top.servicePath+'/sys/message/findPage',param,function(response) {
				callback(response);
			},true)
		},
		//点击规章制度每列
		findById:function(param,callback){
			$get(top.servicePath+'/sys/message/findById',param,function(response) {
				callback(response);
			})
		},
		//点击通知公告每列
		//noticeView:function(param,callback){
		//	$get(top.servicePath+'/sys/message/view',param,function(response) {
		//		callback(response);
		//	})
		//}
	}
})