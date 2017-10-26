importing('currentDate');
define(['underscore',
    'text!/view/caseInvestigation/tpl/task/taskList.html',
    'text!/view/caseInvestigation/tpl/task/taskListTr.html',
    'text!/view/caseInvestigation/tpl/task/taskAdd.html',
    'text!/view/caseInvestigation/tpl/task/taskEdit.html',
    'text!/view/caseInvestigation/tpl/task/taskFeedback.html',
    // '../dat/task.js',
    '../../dictManage/src/dictOpener.js'], function (_, taskListTpl,taskListTrTpl,taskAddTpl,taskEditTpl,taskFeedbackTpl,
                                                      dictOpener) {
    return {
        showList: function () {
            _self = this;
            $.ajax({
                type: "GET",
                url: '/sys/org/getOrgTreeListBySuperId',
                dataType: "json",
                contentType:"application/json; charset=utf-8",
                headers: {
                    Accept: "*/*",
                    token: top.token
                },
                data: {superId: top.orgId},
                success: function (data) {
                    debugger
                    callback(data)
                },
                error: function (msg) {
                    debugger

                }
            });
        }
    }
});
