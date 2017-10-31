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
		//各区域专案组破案情况
		getSolveCaseInfo:function(param,callback){
			$get(top.servicePath+'/xz/index/getSolveCaseInfo',param,function(response) {
				callback(response);
			})
		},
		//各区域专案组创建情况
		getCreateInfo:function(param,callback){
			$get(top.servicePath+'/xz/index/getCreateInfo',param,function(response) {
				callback(response);
			})
		},
		//平台成果展示
		getAchievement:function(param,callback){
			$get(top.servicePath+'/xz/index/getAchievement',param,function(response) {
				callback(response);
			})
		},
		//待办任务
		getTaskCountInfo:function(param,callback){
			$get(top.servicePath+'/xz/index/getTaskCountInfo',param,function(response) {
				callback(response);
			})
		},
		//平台成果展示(点击更多--获取所有组内成员)
		getAjGroupPage:function(param,callback){
			$post(top.servicePath+'/xz/asjAj/getAjGroupPage',param,function(response) {
				callback(response);
			},true)
		},
		//平台成果展示(点击更多--涉及案件)
		getGroupMemberList:function(param,callback){
			$post(top.servicePath+'/xz/usergroup/getGroupMemberList',param,function(response) {
				callback(response);
			},true)
		},
	}
})