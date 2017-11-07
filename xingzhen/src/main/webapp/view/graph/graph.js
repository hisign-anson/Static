$.ajaxSetup({
    beforeSend:showLoading,
    complete:hideLoading
});
require(['src/graph.js'],function(graph){
    var groupid = $("#mapSvgFrame",parent.document).attr("groupid");

    var $mapConditionWrap = $("#mapSvgFrame",parent.document);
    $mapConditionWrap.find("#okBtn").on("click",function () {
        var param = $mapConditionWrap.find("form").serialize();
        debugger

    });
    graph.showList(groupid);
});