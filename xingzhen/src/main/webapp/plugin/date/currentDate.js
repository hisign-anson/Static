/**
 * Created by XiongYing on 2016/8/15.
 */
/**
 * 日期范围工具类
 */
var dateRangeUtil = window.DTU = (function () {
    /***
     * 获得当前时间
     */
    this.getCurrentDate = function () {
        return new Date();
    };
    /*
    * 获得近3天时间
    * */
    this.getNearlyThreeDays = function () {
        var now = new Date().getTime();
        var threeDaysBefore = now-2*24*60*60*1000;
        return new Date(threeDaysBefore);
    };
    /*
     * 获得近5天时间
     * */
    this.getNearlyFiveDays = function () {
        var now = new Date().getTime();
        var fiveDaysBefore = now-4*24*60*60*1000;
        return new Date(fiveDaysBefore);
    };
    /*
     * 获得近7天时间
     * */
    this.getNearlySevenDays = function () {
        var now = new Date().getTime();
        var sevenDaysBefore = now-6*24*60*60*1000;
        return new Date(sevenDaysBefore);
    };
    /***
     * 获得本周起止时间
     */
    this.getCurrentWeek = function () {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //返回date是一周中的某一天
        var week = currentDate.getDay();
        //返回date是一个月中的某一天
        var month = currentDate.getDate();

        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数
        var minusDay = week != 0 ? week - 1 : 6;
        //本周 周一
        var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
        //本周 周日
        var sunday = new Date(monday.getTime() + (6 * millisecond));
        //添加本周时间
        startStop.push(monday); //本周起始时间
        //添加本周最后一天时间
        startStop.push(sunday); //本周终止时间
        //返回
        return startStop;
    };

    /***
     * 获得本月的起止时间
     */
    this.getCurrentMonth = function () {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //求出本月第一天
        var firstDay = new Date(currentYear, currentMonth, 1);


        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (currentMonth == 11) {
            currentYear++;
            currentMonth = 0; //就为
        } else {
            //否则只是月份增加,以便求的下一月的第一天
            currentMonth++;
        }


        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
        //求出上月的最后一天
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

        //添加至数组中返回
        startStop.push(firstDay);
        startStop.push(lastDay);
        //返回
        return startStop;
    };

    /***
     * 获得上月的起止时间
     */
    this.prevMonth = function () {
        //起止日期数组
        var startStop = [];
        //获取时间
        var prevDate = new Date().addMonth(-1);
        //获得月份0-11
        var month = prevDate.getMonth();
        //获得当前年份4位年
        var year = prevDate.getFullYear();
        //求出月第一天
        var firstDay = new Date(year, month, 1);


        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (month == 11) {
            year++;
            month = 0; //就为
        } else {
            //否则只是月份增加,以便求的下一月的第一天
            month++;
        }


        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(year, month, 1);
        //求出上月的最后一天
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

        //添加至数组中返回
        startStop.push(firstDay);
        startStop.push(lastDay);
        //返回
        return startStop;
    };

    /**
     * 得到本季度开始的月份
     * @param month 需要计算的月份
     ***/
    this.getQuarterSeasonStartMonth = function (month) {
        var quarterMonthStart = 0;
        var spring = 0; //春
        var summer = 3; //夏
        var fall = 6;   //秋
        var winter = 9; //冬
        //月份从0-11
        if (month < 3) {
            return spring;
        }

        if (month < 6) {
            return summer;
        }

        if (month < 9) {
            return fall;
        }

        return winter;
    };

    /**
     * 获得该月的天数
     * @param year年份
     * @param month月份
     * */
    this.getMonthDays = function (year, month) {
        //本月第一天 1-31
        var relativeDate = new Date(year, month, 1);
        //获得当前月份0-11
        var relativeMonth = relativeDate.getMonth();
        //获得当前年份4位年
        var relativeYear = relativeDate.getFullYear();

        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (relativeMonth == 11) {
            relativeYear++;
            relativeMonth = 0;
        } else {
            //否则只是月份增加,以便求的下一月的第一天
            relativeMonth++;
        }
        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
        //返回得到上月的最后一天,也就是本月总天数
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
    };

    /**
     * 获得本季度的起止日期
     */
    this.getCurrentSeason = function () {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //获得本季度开始月份
        var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);
        //获得本季度结束月份
        var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;

        //获得本季度开始的日期
        var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
        //获得本季度结束的日期
        var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth));
        //加入数组返回
        startStop.push(quarterSeasonStartDate);
        startStop.push(quarterSeasonEndDate);
        //返回
        return startStop;
    };

    /***
     * 得到本年的起止日期
     *
     */
    this.getCurrentYear = function () {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();

        //本年第一天
        var currentYearFirstDate = new Date(currentYear, 0, 1);
        //本年最后一天
        var currentYearLastDate = new Date(currentYear, 11, 31);
        //添加至数组
        startStop.push(currentYearFirstDate);
        startStop.push(currentYearLastDate);
        //返回
        return startStop;
    };
    return this;
})();

//自动生成
window.DTU.today = Date.format('YYYY-MM-DD'),  //当天
window.DTU.threeDaysBefore = dateRangeUtil.getNearlyThreeDays().format('YYYY-MM-DD'),//3天前
window.DTU.fiveDaysBefore = dateRangeUtil.getNearlyFiveDays().format('YYYY-MM-DD'),//5天前
window.DTU.sevenDaysBefore = dateRangeUtil.getNearlySevenDays().format('YYYY-MM-DD'),//7天前
window.DTU.weekBegin = dateRangeUtil.getCurrentWeek()[0].format('YYYY-MM-DD'),
window.DTU.weekEnd = dateRangeUtil.getCurrentWeek()[1].format('YYYY-MM-DD'),
window.DTU.monthBegin = dateRangeUtil.getCurrentMonth()[0].format('YYYY-MM-DD'),
window.DTU.monthEnd = dateRangeUtil.getCurrentMonth()[1].format('YYYY-MM-DD'), //当月
window.DTU.seasonBegin = dateRangeUtil.getCurrentSeason()[0].format('YYYY-MM-DD'),
window.DTU.seasonEnd = dateRangeUtil.getCurrentSeason()[1].format('YYYY-MM-DD'), //当季
window.DTU.yearBegin = dateRangeUtil.getCurrentYear()[0].format('YYYY-MM-DD'),
window.DTU.yearEnd = dateRangeUtil.getCurrentYear()[1].format('YYYY-MM-DD'); //当年
window.DTU.prevMonthBegin=dateRangeUtil.prevMonth()[0].format('YYYY-MM-DD');
window.DTU.prevMonthEnd=dateRangeUtil.prevMonth()[1].format('YYYY-MM-DD');