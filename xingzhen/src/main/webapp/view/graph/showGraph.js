$.ajaxSetup({
    beforeSend:showLoading,
    complete:hideLoading
});
require(['src/showGraph.js'],function(showGraph){
    var groupid = $("#mapSvgFrame",parent.document).attr("groupid");
    showGraph.showList(groupid,"pgroupid");

});