define(function(){
	return {
		getDictTreeByParentKey:function(param,callback){
			$get(top.servicePath+'/sys/dict/getDictTreeByParentKey',param,function(response) {
				callback(response);
			},false)
		},
		delDictByKey:function(param,callback){
			$delete(top.servicePath+'/sys/dict/'+param.dictKey+'/delDictByKey/'+param.rootKey,null,function(response) {
				callback(response);
			},false)
		},
		delDictById:function(id,parentkey,callback){
			$delete(top.servicePath+'/sys/dict/'+id+'/'+parentkey+'delDictById',null,function(response) {
				callback(response);
			},false)
		},
		getDictById:function(param,callback){
			$get(top.servicePath+'/sys/dict/getDictById',param,function(response) {
				callback(response);
			},false)
		},
		addDict:function(param,callback){
			$post(top.servicePath+'/sys/dict/addDict',param,function(response) {
				callback(response);
			},true)
		},
		updateDict:function(param,callback){
			$post(top.servicePath+'/sys/dict/updateDict',param,function(response) {
				callback(response);
			},true)
		},
        getDictListByParentKey:function(param,callback){
            $post(top.servicePath+'/sys/dict/getDictListByParentKey',param,function(response) {
                callback(response);
            },true)
        }
		
	}
})