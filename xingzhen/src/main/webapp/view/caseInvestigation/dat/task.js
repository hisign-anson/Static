define(function () {
    return {
        //新增
        addTask: function (param, callback) {
            $post(top.servicePath_xz + '/task/addTask', param, function (response) {
                callback(response);
            }, true)
        },
        //删除
        deleteTaskById: function (param, callback) {
            $get(top.servicePath_xz + '/task/deleteTaskById', param, function (response) {
                callback(response);
            }, false)
        },
        //移交
        moveTask: function (param, callback) {
            $post(top.servicePath_xz + '/task/moveTask', param, function (response) {
                callback(response);
            }, true)
        },
        //任务详情
        taskDetail: function (param, callback) {
            $get(top.servicePath_xz + '/task/taskDetail', param, function (response) {
                callback(response);
            }, false)
        }


    }
});