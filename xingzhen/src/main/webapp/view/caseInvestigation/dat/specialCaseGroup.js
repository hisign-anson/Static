define(function(){
    return {
        //专案组查询分页
        getGroupPage:function(param,callback){
            $post(top.servicePath_xz+'/group/getGroupPage',param,function(response) {
                callback(response);
            },true)
        },
        //新增
        addGroup:function(param,callback){
            $post(top.servicePath_xz+'/group/addGroup',param,function(response) {
                callback(response);
            },true)
        },
        // //新增
        // getGroupPage:function(param,callback){
        //     $post(top.servicePath_xz+'/group/getGroupPage',param,function(response) {
        //         callback(response);
        //     },true)
        // },
        // //新增
        // getGroupPage:function(param,callback){
        //     $post(top.servicePath_xz+'/group/getGroupPage',param,function(response) {
        //         callback(response);
        //     },true)
        // },
    }
});