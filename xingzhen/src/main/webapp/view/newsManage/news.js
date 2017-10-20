$.ajaxSetup({
    beforeSend:showLoading,
    complete:hideLoading
});
// importing('dat/newsFilter.js');//使用base-new.js进行表格固定时会用到
require(['src/news.js'],function(news){
	$('#myTab a').click(function (e) {
		 $(this).tab('show');
		 if($(this).attr("id")=="01"){
			 news.showNoticeList();
		 }else if($(this).attr("id")=="02"){
			 news.showRulesList();
		 }else{
			 news.showTableList();
		 }
	});
	$('#myTab a:first').click();
});


