define(function(){
	return {
		getOrgTreeList:function(param,callback){
			$post(top.servicePath+'/sys/org/getOrgTreeList',param,function(response) {
				callback(response);
			},true)
		},
		getUserInfoListByOrgId:function(param,callback){
			$get(top.servicePath+'/sys/user/getUserInfoListByOrgId',param,function(response) {
				callback(response);
			})
		},
		addUserInfo:function(param,callback){
			$post(top.servicePath+'/sys/user/addUserInfo',param,function(response) {
				callback(response);
			},true)
		},
		editUserInfo:function(param,callback){
			$post(top.servicePath+'/sys/user/editUserInfo',param,function(response) {
				callback(response);
			},true)
		},
		getUserInfo:function(param,callback){
			$get(top.servicePath+'/sys/user/getUserInfo',param,function(response) {
				callback(response);
			})
		},
		delUserInfo:function(param,callback){
			$delete(top.servicePath+'/sys/user/'+param+'/delUserInfo',null,function(response) {
				callback(response);
			},false)
		}
		
	}
})