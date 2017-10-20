
/**
 * 范围工具类
 */
var rangeUtil = (function () {
    /***
     * 获得当前时间
     */
    this.getCurrentDate = function () {
        return new Date();
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
    //控制输入金额，保留2位小数 ,例如 inputMoney2(""#oldSurplus,#oldQuota,#nowQuota,#totalFund"")
    this.inputMoney2 = function (obj){
    	$(obj).keyup(function () {
            var reg = $(this).val().match(/\d+\.?\d{0,2}/);
            var txt = '';
            if (reg != null) {
                txt = reg[0];
            }
            $(this).val(txt);
        }).change(function () {
            $(this).keypress();
            var v = $(this).val();
            if (/\.$/.test(v))
            {
                $(this).val(v.substr(0, v.length - 1));
            }
        }).bind("paste",function(){  
        	var reg = $(this).val().match(/\d+\.?\d{0,2}/);
            var txt = '';
            if (reg != null) {
                txt = reg[0];
            }
            $(this).val(txt);  
       }).css("ime-mode", "disabled");
//        $(obj).on("compositionstart", function () {
//            console.info("中文输入法输入：开始")
//        });
//        $(obj).off().on("compositionend", function () {
//            var reg = $(this).val().match(/\d+\.?\d{0,2}/);
//            var txt = '';
//            if (reg != null) {
//                txt = reg[0];
//            }
//            $(this).val(txt);
//            console.info("中文输入法输入：结束")
//        });
    };
    
    
    
    this.formatDate = function(date, format){

    	if(!date || date =="0"){
    		return "";
    	}
    	if (!format) {
    		format = "yyyy-MM-dd hh:mm:ss";
    	}
    	if(typeof date == "string"){
    		if(date.length == 8){
    			var arr = [date.substr(0,4),date.substr(4,2),date.substr(6,2)];
    		}else if(date.length == 14){
    			var arr = [date.substr(0,4),date.substr(4,2),date.substr(6,2),date.substr(8,2),date.substr(10,2),date.substr(12,2)];
    		}else{
    			var arr = date.split(/[^0-9]+/);
    		}
    		
    		format = format.replace(/([a-z])\1+/ig,function(all,$1){
    			var result = {
    				y : ~~arr[0],
    				M : ~~arr[1],
    				d : ~~arr[2],
    				h : ~~arr[3],
    				m : ~~arr[4],
    				s : ~~arr[5]  			
    			}[$1];
    			if(result!=undefined&&result<10){
    				result = "0"+result
    			}
    			return result || "";
    		});
    		return format;
    	}
    	format = format.replace(/([a-z])\1+/ig,function(all){
    		var first = all.charAt(0);
    		if("y M d h m s".indexOf(first)>=0){
    			if(first=="y"){
    				return all.length>2
    					? date.getFullYear()
    					: (date.getFullYear()+"").substr(2);
    			}
    			var result = {
    				M : date.getMonth() + 1,
    				d : date.getDate(),
    				h : date.getHours(),
    				m : date.getMinutes(),
    				s : date.getSeconds()    			
    			}[first];
    			result!=undefined&&result<10
    				&&(result = "0"+result);
    			return result;
    		}else{
    			return all;
    		}
    	});
    	return format;

    };
    return this;
})();
