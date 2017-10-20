/**
 * Created by Administrator on 2017/5/19.
 */
var now = new Date();                    //当前日期
var nowDayOfWeek = now.getDay();         //今天本周的第几天
var nowDay = now.getDate();              //当前日
var nowMonth = now.getMonth();           //当前月
var nowYear = now.getYear();             //当前年
nowYear += (nowYear < 2000) ? 1900 : 0;  //
//格式化日期：yyyy-MM-dd
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth()+1;
    var myweekday = date.getDate();
    if(mymonth < 10){
        mymonth = "0" + mymonth;
    }
    if(myweekday < 10){
        myweekday = "0" + myweekday;
    }
    return (myyear+"-"+mymonth + "-" + myweekday);
}
//格式化日期：yyyy-MM-dd HH:MM:SS
function formatDateTime(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth()+1;
    var myweekday = date.getDate();
    if(mymonth < 10){
        mymonth = "0" + mymonth;
    }
    if(myweekday < 10){
        myweekday = "0" + myweekday;
    }
    // return (myyear+"-"+mymonth + "-" + myweekday);

    //格式化日期：yyyy-MM-dd HH:MM:SS
    var myHour = date.getHours();
    var myMinute = date.getMinutes();
    var mySecond = date.getSeconds();
    if(myHour < 10){
        myHour = "0" + myHour;
    }
    if(myMinute < 10){
        myMinute = "0" + myMinute;
    }
    if(mySecond < 10){
        mySecond = "0" + mySecond;
    }
    return (myyear+"-"+mymonth + "-" + myweekday+" "+myHour+":"+myMinute+":"+mySecond);
    //return (myyear+"-"+mymonth + "-" + myweekday);
}

//获得某月的天数
function getMonthDays(myMonth){
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var   days   =   (monthEndDate   -   monthStartDate)/(1000   *   60   *   60   *   24);
    return   days;
}

//获得本季度的开始月份
function getQuarterStartMonth(){
    var quarterStartMonth = 0;
    if(nowMonth<3){
        quarterStartMonth = 0;
    }
    if(2<nowMonth && nowMonth<6){
        quarterStartMonth = 3;
    }
    if(5<nowMonth && nowMonth<9){
        quarterStartMonth = 6;
    }
    if(nowMonth>8){
        quarterStartMonth = 9;
    }
    return quarterStartMonth;
}

//获得本天(i=0)的开始时间
function getDayStartDate(i) {
    var nowStartDay = new Date(nowYear, nowMonth, nowDay+i);
    return formatDate(nowStartDay);
}

//获得本天(i=0)的结束时间
function getDayEndDate(i) {
    var nowStartDay = new Date(nowYear, nowMonth, nowDay+i,23,59,59);
    return formatDate(nowStartDay);
}

//获得本周(i=0)的开始日期
function getWeekStartDate(i) {
    //var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek+7*i);
    return formatDate(weekStartDate);
}

//获得本周的结束日期
function getWeekEndDate(i) {
    // var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)+7*i,23,59,59);
    return formatDate(weekEndDate);
}

//获得本月的开始日期
function getMonthStartDate(i){
    //var monthStartDate = new Date(nowYear, nowMonth, 1);
    var monthStartDate = new Date(nowYear, nowMonth+i, 1);
    return formatDate(monthStartDate);
}

//获得本月的结束日期
function getMonthEndDate(i){
    //var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
    var monthEndDate = new Date(nowYear, nowMonth+i, getMonthDays(nowMonth+i),23,59,59);
    return formatDate(monthEndDate);
}

//获得本季度的开始日期
function getQuarterStartDate(i){
    //var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
    var quarterStartDate = new Date(nowYear, getQuarterStartMonth()+3*i, 1);
    return formatDate(quarterStartDate);
}

//或的本季度的结束日期
function getQuarterEndDate(i){
    var quarterEndMonth = getQuarterStartMonth()+3*i + 2;
    //var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
    var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth),23,59,59);
    return formatDate(quarterStartDate);
}

//获得本年度的开始日期
function getYearStartDate(i){
    var quarterStartDate = new Date(nowYear+i, 0, 1);
    return formatDate(quarterStartDate);
}

//获得本年度的结束日期
function getYearEndDate(i){
    var quarterStartDate = new Date(nowYear+i, 11, getMonthDays(11),23,59,59);
    return formatDate(quarterStartDate);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
//获得本天(i=0)的开始时间
function getDayStartDateTime(i) {
    var nowStartDay = new Date(nowYear, nowMonth, nowDay+i);
    return formatDateTime(nowStartDay);
}

//获得本天(i=0)的结束时间
function getDayEndDateTime(i) {
    var nowStartDay = new Date(nowYear, nowMonth, nowDay+i,23,59,59);
    return formatDateTime(nowStartDay);
}

//获得本周(i=0)的开始日期
function getWeekStartDateTime(i) {
    //var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek+7*i);
    return formatDateTime(weekStartDate);
}

//获得本周的结束日期
function getWeekEndDateTime(i) {
    // var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)+7*i,23,59,59);
    return formatDateTime(weekEndDate);
}

//获得本月的开始日期
function getMonthStartDateTime(i){
    //var monthStartDate = new Date(nowYear, nowMonth, 1);
    var monthStartDate = new Date(nowYear, nowMonth+i, 1);
    return formatDateTime(monthStartDate);
}

//获得本月的结束日期
function getMonthEndDateTime(i){
    //var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
    var monthEndDate = new Date(nowYear, nowMonth+i, getMonthDays(nowMonth+i),23,59,59);
    return formatDateTime(monthEndDate);
}

//获得本季度的开始日期
function getQuarterStartDateTime(i){
    //var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
    var quarterStartDate = new Date(nowYear, getQuarterStartMonth()+3*i, 1);
    return formatDateTime(quarterStartDate);
}

//或的本季度的结束日期
function getQuarterEndDateTime(i){
    var quarterEndMonth = getQuarterStartMonth()+3*i + 2;
    //var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
    var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth),23,59,59);
    return formatDateTime(quarterStartDate);
}

//获得本年度的开始日期
function getYearStartDateTime(i){
    var quarterStartDate = new Date(nowYear+i, 0, 1);
    return formatDateTime(quarterStartDate);
}

//获得本年度的结束日期
function getYearEndDateTime(i){
    var quarterStartDate = new Date(nowYear+i, 11, getMonthDays(11),23,59,59);
    return formatDateTime(quarterStartDate);
}
//alert(getMonthEndDate(0));
//console.log(getMonthStartDate(0)+"至"+getMonthEndDate(0));
//console.log(getMonthEndDate(0))
var my_day=getDayStartDate(0)+" 至 "+getDayEndDate(0);
var my_month=getMonthStartDate(0)+" 至 "+getMonthEndDate(0);
var my_quarter=getQuarterStartDate(0)+" 至 "+getQuarterEndDate(0);
var my_year=getYearStartDate(0)+" 至 "+getYearEndDate(0);
var dayStartDate=getDayStartDateTime(0);
var dayEndDate=getDayEndDateTime(0);
var monthStartDate=getMonthStartDateTime(0);
var monthEndDate=getMonthEndDateTime(0);
var quarterStartDate=getQuarterStartDateTime(0);
var quarterEndDate=getQuarterEndDateTime(0);
var yearStartDate=getYearStartDateTime(0);
var yearEndDate=getYearEndDateTime(0);