/**
 * Created by dell on 2017/9/20.
 */
$.ajaxSetup({
    beforeSend:showLoading,
    complete:hideLoading
});
// importing('dat/carFilter.js');
require(['src/task.js'],function(task){
    task.showList();
});