define(function(){
    return {
        //专案组查询分页
        getGroupPage:function(param,callback){
            $post(top.servicePath_xz+'/group/getGroupPage',param,function(response) {
                callback(response);
            },true)
        },
        //查询子专案组列表
        getChildGroupList:function(param,callback){
            $post(top.servicePath_xz+'/group/getChildGroupList',param,function(response) {
                callback(response);
            },true)
        },
        //新增
        addGroup: function (param, callback) {
            $post(top.servicePath_xz + '/group/addGroup', param, function (response) {
                callback(response);
            }, true)
        },
        //获取所有专案组根据用户id
        getAllGroupByUserId: function (param, callback) {
            $post(top.servicePath_xz + '/group/getAllGroupByUserId', param, function (response) {
                callback(response);
            }, true)
        },
        //查看专案组详情
        groupDetail: function (param, callback) {
            $post(top.servicePath_xz + '/group/groupDetail/'+ param, {}, function (response) {
                callback(response);
            }, true)
        },
        //专案组关联案件
        addAjGroupList: function (param, callback) {
            $post(top.servicePath_xz + '/ajgroup/addAjGroupList', param, function (response) {
                callback(response);
            }, true)
        },
        //专案组移除案件
        removeAjGroupList: function (param, callback) {
            $post(top.servicePath_xz + '/ajgroup/removeAjGroupList', param, function (response) {
                callback(response);
            }, true)
        },
        //专案组添加成员
        addUserGroupList: function (param, callback) {
            $post(top.servicePath_xz + '/usergroup/addUserGroupList', param, function (response) {
                callback(response);
            }, true)
        },
        //专案组移除成员
        deleteUsergroupList: function (param, callback) {
            $post(top.servicePath_xz + '/usergroup/deleteUsergroupList', param, function (response) {
                callback(response);
            }, true)
        },
        //专案组归档
        groupBackupAdd: function (param, callback) {
            $post(top.servicePath_xz + '/groupBackup/add', param, function (response) {
                callback(response);
            }, true)
        },
        //专案组撤销归档
        groupBackupRemove: function (param, callback) {
            $post(top.servicePath_xz + '/groupBackup/remove', param, function (response) {
                callback(response);
            }, true)
        }
    }
});