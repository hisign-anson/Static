 define(function(){
	return {
		//信息提醒
		findReceivePage:function(param,callback){
			$post(top.servicePath+'/sys/message/findReceivePage',param,function(response) {
				callback(response);
			},true)
		},
		//通知公告（接收）
		findRePage:function(param,callback){
			$post(top.servicePath+'/sys/message/findRePage',param,function(response) {
				callback(response);
			},true)
		},
		//通知公告、知识库、表格下载
		findPage:function(param,callback){
			$post(top.servicePath+'/sys/message/findPage',param,function(response) {
				callback(response);
			},true)
		},
		//点击知识库每列
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
			$get(top.servicePath_xz+'/index/getSolveCaseInfo',param,function(response) {
				callback(response);
			})
		},
		//各区域专案组创建情况
		getCreateInfo:function(param,callback){
			$get(top.servicePath_xz+'/index/getCreateInfo',param,function(response) {
				callback(response);
			})
		},
		//平台成果展示
		getAchievement:function(param,callback){
			$post(top.servicePath_xz+'/index/getAchievement',param,function(response) {
				callback(response);
			},true)
		},
		//待办任务
		getTaskCountInfo:function(param,callback){
			$get(top.servicePath_xz+'/index/getTaskCountInfo',param,function(response) {
				callback(response);
			})
		},
		//平台成果展示(点击更多--获取所有组内成员)
		getAjGroupPage:function(param,callback){
			$post(top.servicePath_xz+'/asjAj/getAjGroupPage',param,function(response) {
				callback(response);
			},true)
		},
		//平台成果展示(点击更多--涉及案件)
		getGroupMemberList:function(param,callback){
			$post(top.servicePath_xz+'/usergroup/getGroupMemberList',param,function(response) {
				callback(response);
			},true)
		},
		//任务详情
		taskDetail: function (param, callback) {
			$get(top.servicePath_xz + '/task/taskDetail', param, function (response) {
				callback(response);
			})
		},
	}
})