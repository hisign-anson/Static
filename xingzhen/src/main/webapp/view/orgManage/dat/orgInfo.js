define(function(){
	return {
		getOrgInfo:function(param,callback){
			$get(top.servicePath+'/sys/org/getOrgInfo',param,function(response) {
				callback(response);
			})
		},
		getOrgTreeList:function(param,callback){
			$post(top.servicePath+'/sys/org/getOrgTreeList',param,function(response) {
				callback(response);
			},true)
		},
		getOrgTreeListBySuperId:function(param,callback){
			$.ajax({
		        type: "GET",
		        url: top.servicePath+'/sys/org/getOrgTreeListBySuperId',
		        dataType: "json",
                contentType:"application/json; charset=utf-8",
                headers: {
                    Accept: "*/*",
                    token: top.token
                },
		        data: param,
		        success: function (data) {
		        	callback(data)
		        }
		    });
		},
		add:function(param,callback){
			$post(top.servicePath+'/sys/org/add',param,function (response) {
				callback(response);
		    },true);
		},
		update:function(param,callback){
			$post(top.servicePath+'/sys/org/update',param,function(response) {
				callback(response);
			},true)
		},
		delOrgInfo:function(param,callback){
			$delete(top.servicePath+'/sys/org/'+param+'/delete',null,function(response) {
				callback(response);
			},false)
		}
		
	}
})