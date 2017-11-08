$.ajaxSetup({
    beforeSend:showLoading,
    complete:hideLoading
});
require(['src/graph.js'],function(graph){
    var groupid = $("#mapSvgFrame",parent.document).attr("groupid");
    graph.showList(groupid,"groupid");

});