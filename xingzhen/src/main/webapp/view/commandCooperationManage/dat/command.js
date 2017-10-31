define(function() {
    return {
        //用户所在专案组
        getAllGroupByUserId:function (param, callback) {
            $post(top.servicePath_xz + '/asjAj/getAllGroupByUserId', param, function (response) {
                callback(response);
            }, true)
        },
        //常用专案组查询
        getCommonGroupList: function (param, callback) {
            $post(top.servicePath_xz + '/xzlog/getCommonGroupList', param, function (response) {
                callback(response);
            }, true)
        }
    }
});