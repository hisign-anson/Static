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
    }
};