/**
 * Created by dell on 2017/9/26.
 */
//依赖timeScope.js
var selectUtils = {
    selectTextOption:function(clickDiv,setValueDiv){
        $(clickDiv).on("click","u",function(){
            $(this).addClass("active").siblings(".active").removeClass("active");
            $(setValueDiv).val($(this).attr("val"));
        });
    },
    selectTextMultiOpt:function(clickDiv,setValue){
        var arrValue = [];
        $(clickDiv).on("click","u",function(){
            var isActived = $(this).hasClass("active");
            if(isActived){
                $(this).removeClass("active");
                arrValue.pop($(this).attr("val"));
            } else {
                $(this).addClass("active").siblings(".default").removeClass("active");
                arrValue.push($(this).attr("val"));
            }
            setValue = arrValue;
        });
    },
    /***参数：（被点击的div包裹层，显示的时间输入框，传入后台的开始时间，传入后台的结束时间）***/
    selectTimeRangeOption:function(clickDiv,setValueDiv,startTimeDiv,endTimeDiv){
        $(clickDiv).on("click","u",function(){
            $(this).addClass("active").siblings(".active").removeClass("active");
            var val=$(this).attr("val");
            if(val==""){
                $(setValueDiv).val("");
                $(startTimeDiv).val("");
                $(endTimeDiv).val("");
            }else if(val==1){
                $(setValueDiv).val(my_day);
                $(startTimeDiv).val(dayStartDate);
                $(endTimeDiv).val(dayEndDate);
            }else if(val==2){
                $(setValueDiv).val(my_month);
                $(startTimeDiv).val(monthStartDate);
                $(endTimeDiv).val(monthEndDate);
            }else if(val==3){
                $(setValueDiv).val(my_quarter);
                $(startTimeDiv).val(quarterStartDate);
                $(endTimeDiv).val(quarterEndDate);
            }else if(val==4){
                $(setValueDiv).val(my_year);
                $(startTimeDiv).val(yearStartDate);
                $(endTimeDiv).val(yearEndDate);
            }
        });
    },
    clearQueryValue:function () {
        $("input").each(function () {
            $(this).val("");
        });
        $("span.option").each(function () {
            $(this).children("u").removeClass("active").eq(0).addClass("active");
        });
        $("span.date-select").each(function () {
            $(this).children("u").removeClass("active").eq(0).addClass("active");
        });
    },
    clearQueryValueByEle:function ($obj) {
        $obj.find("input").each(function () {
            $(this).val("");
        });
        $obj.find("span.option").each(function () {
            $(this).children("u").removeClass("active").eq(0).addClass("active");
        });
        $obj.find("span.date-select").each(function () {
            $(this).children("u").removeClass("active").eq(0).addClass("active");
        });
    }
};