$.ajaxSetup({
    beforeSend:showLoading,
    complete:hideLoading
});
require(['src/graph.js'],function(graph){
    graph.showList();
});