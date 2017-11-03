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
	//首页点击更多进来
	var noticeId = $('.tabs-selected', window.parent.document).find('span.tabs-title').attr('data-noticeid');
	if(noticeId && noticeId=="02"){
		news.showRulesList();
		$('#myTab li').eq(1).addClass("active").siblings(".active").removeClass("active");
		$('.tabs-selected', window.parent.document).find('span.tabs-title').attr('data-noticeid',"");
	}else if(noticeId && noticeId=="03"){
		news.showTableList();
		$('#myTab li').eq(2).addClass("active").siblings(".active").removeClass("active");
		$('.tabs-selected', window.parent.document).find('span.tabs-title').attr('data-noticeid',"");
	}
});


