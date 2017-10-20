define(function(){
	return {
		add:function(param,callback){
			$post(top.servicePath+'/sys/message/add',param,function(response) {
				callback(response);
			},true);
		},
		del:function(param,callback){
			$post(top.servicePath+'/sys/message/del',param,function(response) {
				callback(response);
			},true);
		},
		update:function(param,callback){
			$post(top.servicePath+'/sys/message/update',param,function(response) {
				callback(response);
			},true);
		},
		findById:function(param,callback){
			$get(top.servicePath+'/sys/message/findById',param,function(response) {
				callback(response);
			});
		},
		publish:function(param,callback){
			$post(top.servicePath+'/sys/message/publish',param,function(response) {
				callback(response);
			},true);
		},
        getUnSendOrg:function(param,callback){
            $get(top.servicePath+'/sys/message/getUnSendOrg',param,function(response) {
                callback(response);
            });
        },
        getSendedOrg:function(param,callback){
            $get(top.servicePath+'/sys/message/getSendedOrg',param,function(response) {
                callback(response);
            });
        },
		getUnitEmployee:function(param,callback){
			$post(top.servicePath+'/sys/user/getUserInfoListByOrgId',param,function(response) {
				callback(response);
			},true);
		},
		getOrgTreeList:function(param,callback){
			$post(top.servicePath+'/sys/org/getOrgTreeList',param,function(response) {
				callback(response);
			},true)
		}
	}
});