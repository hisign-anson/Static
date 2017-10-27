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
        //任务详情
        taskDetail: function (param, callback) {
            $get(top.servicePath_xz + '/task/taskDetail', param, function (response) {
                callback(response);
            }, false)
        },
        //移交
        moveTask: function (param, callback) {
            $post(top.servicePath_xz + '/task/moveTask', param, function (response) {
                callback(response);
            }, true)
        },
        //反馈
        addTaskFk: function (param, callback) {
            $post(top.servicePath_xz + '/taskFK/addTaskFk', param, function (response) {
                callback(response);
            }, true)
        },
        //催办
        addCb: function (param, callback) {
            $get(top.servicePath_xz + '/cb/addCb', param, function (response) {
                callback(response);
            }, false)
        }
    }
});