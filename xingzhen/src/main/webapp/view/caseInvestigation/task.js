/**
 * Created by dell on 2017/9/20.
 */
$.ajaxSetup({
    beforeSend:showLoading,
    complete:hideLoading
});
// importing('dat/carFilter.js');
require(['src/task.js'],function(task){
    var status = $("#main-frame", parent.document).attr("status");
    var fkqrzt = $("#main-frame", parent.document).attr("fkqrzt");
    var taskType = $("#main-frame", parent.document).attr("taskType");
    var overdue = $("#main-frame", parent.document).attr("overdue");
    // if(fkqrzt){
    //     task.showList(fkqrzt);
    //
    // }else if(taskType){
    //     task.showList(taskType);
    //
    // } else if(overdue){
    //     task.showList(overdue);
    //
    // }
    task.showList();
});