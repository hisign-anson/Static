importing(
		'echarts3',
		'currentDate',
		function() {
			$('.index-content .latest-information .title-list').on(
					'click',
					'li',
					function() {
						var $index = $(this).index();
						$(this).addClass('on').siblings().removeClass('on');
						$('.latest-information .content-l .commonality').eq(
								$index).show().siblings().hide();
						$('.latest-information .content-r .commonality').eq(
								$index).show().siblings().hide();
					});

			$filter('isNotNull', function() {
				return this != '' && this != null && this != undefined;
			});
			$filter('isNull', function() {
				return this == '' || this == null || this == undefined;
			});

			/*------------------------------------------------------------建档趋势分析----------------------------------------------------*/
			var queryEChartAction = top.servicePath + '/api/0/firstPage/echarts';
			var montnData = [];
			var thisYearData = [];
			var montnCnData = [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月",
					"九月", "十月", "十一月", "十二月" ];
			var montnNumData = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
			var thisYear;
			$get(
					queryEChartAction,
					{},
					function(res) {
						for ( var i = 0; i <= res.data.month - 1; i++) {
							montnData[i] = montnCnData[i];
						}
						thisYear = res.data.year;// 年份
						if (res.data.thisYear != null) {
							for ( var i = 0; i <= res.data.month - 1; i++) {
								if (typeof res.data.thisYear[i] != 'undefined') {// 拼接今年数据数组
									for ( var j = 0; j <= res.data.month - 1; j++) {
										if ((thisYear + "-" + montnNumData[j]) == res.data.thisYear[i].fstDate
												|| (thisYear + "-0" + montnNumData[j]) == res.data.thisYear[i].fstDate) {
											thisYearData[j] = res.data.thisYear[i].fstData;
											break;
										}
									}
								}
							}
						}
						for ( var i = 0; i <= res.data.month - 1; i++) {
							/*
							 * if(lastYearData[i]==null||lastYearData[i]==''){
							 * lastYearData[i] = 0 }
							 */
							if (thisYearData[i] == null
									|| thisYearData[i] == '') {
								thisYearData[i] = 0
							}
						}
						// 注入数据到echarts2图表
						var fzData = [ {
							name : "今年",
							type : "line",
							data : thisYearData
						} ];
						var option = {
							title : {
								text : " ",
								x : "center"
							},
							tooltip : {
								trigger : "item",
								formatter : "{a} <br/>{b} : {c}"
							},
							legend : {
								x : 'center',
								data : [ "今年" ]
							},
							color : [ '#d9534e' ],
							xAxis : {
								type : "category",
								name : "x",
								splitLine : {
									show : false
								},
								data : montnData
							},
							yAxis : {
								type : "value",
								name : "y"
							},
							calculable : true,
							toolbox : {
								show : true,
								feature : {
									mark : {
										show : true
									},
									dataView : {
										show : true,
										readOnly : true
									},
									restore : {
										show : true
									},
									saveAsImage : {
										show : false
									}
								}
							},
							series : fzData
						};
						var myChart = echarts.init(byid('chart-jdqs'));
						window.onresize = myChart.resize;
						myChart.setOption(option);
					})

			/*----------------------------------------------------------建档趋势分析end----------------------------------------------------*/

			/*----------------------------------------------------------录入情况（当月）----------------------------------------------------*/

			var kyzlEchartUrl = top.servicePath + '/api/0/firstPage/countByMode';
			$get(kyzlEchartUrl, {},
					function(res) {
						var kyzlData = [];
						var lengthStr = res.data.length;
						var sums = 0;
						for ( var i = 0; i < lengthStr; i++) {
							var str = "{value: " + res.data[i].sums
									+ ", name: '" + res.data[i].name + "("
									+ res.data[i].sums + ")'}";
							kyzlData.push(str);
							sums += res.data[i].sums;
						}
						if (sums == 0) {
							var str = "{value: 0, name: '其他'}";
							kyzlData.push(str);
						}
						var option = {
							title : {
								text : res.data.mainOrganName,
								x : '20%',
								y : '90%'
							},
							tooltip : {
								trigger : 'item',
								formatter : "{b}:{d}%"
							},
							legend : {
								orient : 'vertical',
								left : 'left',
								top : '3%',
								data : eval("[" + kyzlData + "]")
							},
							color : [ '#f0ad4e', '#428bca', '#d9534e',
									'#E87C25', '#27727B' ],
							series : [ {
								type : 'pie',
								radius : '80%',
								center : [ '52%', '50%' ],
								label : {
									normal : {
										show : false
									}
								},
								labelLine : {
									normal : {
										show : false
									}
								},
								data : eval("[" + kyzlData + "]")
							} ]
						};
						var myChart = echarts.init(byid('chart-ajkytb'));
						window.onresize = myChart.resize;
						myChart.setOption(option);
						var pieApp = {
							currentIndex : -1
						};
						/*pieApp.timeTicket = setInterval(function() {
							var dataLen = option.series[0].data.length;
							// 取消之前高亮的图形
							myChart.dispatchAction({
								type : 'downplay',
								seriesIndex : 0,
								dataIndex : pieApp.currentIndex
							});
							pieApp.currentIndex = (pieApp.currentIndex + 1)
									% dataLen;
							// 高亮当前图形
							myChart.dispatchAction({
								type : 'highlight',
								seriesIndex : 0,
								dataIndex : pieApp.currentIndex
							});
							// 显示 tooltip
							myChart.dispatchAction({
								type : 'showTip',
								seriesIndex : 0,
								dataIndex : pieApp.currentIndex
							});
						}, 1000);*/
					}, true)

			/*----------------------------------------------------------录入情况（当月）----------------------------------------------------*/

			/*------------------------------------------------------------用户访问量统计----------------------------------------------------*/
			var queryEChartAction = top.servicePath + '/api/0/firstPage/visitCount';
			$get(queryEChartAction, {}, function(res) {
				var xtfwData = [];
				var xtfwLData = [];
				var lengthStr = res.data.length;
				var sums = 0;
				for ( var i = 0; i < lengthStr; i++) {
					var str1 = "'" + res.data[i].name + "'";
					xtfwData.push(str1);
					var str2 = res.data[i].sums;
					xtfwLData.push(str2);
					sums += res.data[i].sums;
				}
				// 注入数据到echarts图表
				var option = {
					title : {
						text : "用户访问次数(当月/次数)"
					},
					tooltip : {
						trigger : 'axis'
					},
					toolbox : {
						show : true,
						feature : {
							dataView : {
								show : false,
								readOnly : false
							},
							restore : {
								show : false
							},
							saveAsImage : {
								show : false
							}
						}
					},
					calculable : true,
					grid : {
						borderWidth : 0,
						y : 50,
						y2 : 50
					},
					xAxis : [ {
						type : 'category',
						name : '用户',
						data : eval("[" + xtfwData + "]")
					} ],
					yAxis : [ {
						type : 'value',
					} ],
					series : [ {
						name : '登陆次数',
						type : 'bar',
						itemStyle : {
							normal : {
								color : function(params) {
									var colorList = [ '#FE8463', '#9BCA63',
											'#FAD860', '#F3A43B', '#60C0DD' ];
									return colorList[Math
											.floor(Math.random() * 5)]
								},
								label : {
									show : true,
									position : 'top',
									formatter : '{b}\n{c}'
								}
							}
						},
						data : eval("[" + xtfwLData + "]")
					} ]
				};
				var myChart = echarts.init(byid('chart-zxsj'));
				window.onresize = myChart.resize;
				myChart.setOption(option);
			})

			/*----------------------------------------------------------建档趋势分析end----------------------------------------------------*/
			/*------------------------------------------------------------查找后台最新建档信息----------------------------------------------------*/
			var queryAction = top.servicePath + '/api/0/firstPage/newComer';
			$get(queryAction, {}, function(res) {
				//var str = "scropUl";
				var lengthStr = res.data.length;
				var str = "";
				for ( var i = 0; i < lengthStr; i++) {
					var tempStr =res.data[i].name;
					tempStr = tempStr.replace(/ /g,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
					var idStr = tempStr.substring(3,tempStr.indexOf('型号'));
					tempStr = tempStr.substring(tempStr.indexOf('型号'));
					str +="<li><span class=\"notice\" param=\"" + idStr + "\" >"+tempStr+"</span></li>";
				}
				$("#scropUl").html(str);
			});
			
			$('#roll-wrap').on('click','.notice',function(){
				intoGunInfoView(this.getAttribute('param'))
			});
			
		      //进入查看页面
	        function intoGunInfoView(id) {
//	        	window.location.href=(getViewPath('qzgl/gun_info_view.html?id='+id));
//	        	$open(getViewPath('qzgl/gun_info_view.html?id='+id),{width: 824,height: 620, title: '枪支信息查看'});
	        	window.msgTab=$openOnce(getViewPath('qzgl/gun_info_view.html?id='+id),'枪支信息');
	        }

			/*----------------------------------------------------------查找后台最新建档信息end----------------------------------------------------*/
			/*----------------------------------------------------------滚动显示最新建档信息----------------------------------------------------*/
			function scrollTxt(){
			    var controls={}, 
			        values={},
			        t1=200, /*播放动画的时间*/
			        t2=2000, /*播放时间间隔*/
			        si;
			    controls.rollWrap=$("#roll-wrap");
			    controls.rollWrapUl=controls.rollWrap.children();
			    controls.rollWrapLIs=controls.rollWrapUl.children();
			    values.liNums=controls.rollWrapLIs.length;
			    values.liHeight=controls.rollWrapLIs.eq(0).height();
			    values.ulHeight=controls.rollWrap.height();
			    this.init=function(){
			        autoPlay();
			        pausePlay();
			    }
			    /*滚动*/
			    function play(){
			        controls.rollWrapUl.animate({"margin-top" : "-"+values.liHeight}, t1, function(){
			            $(this).css("margin-top" , "0").children().eq(0).appendTo($(this));
			        });
			    }
			    /*自动滚动*/
			    function autoPlay(){
			        /*如果所有li标签的高度和大于.roll-wrap的高度则滚动*/
			        if(values.liHeight*values.liNums > values.ulHeight){
			            si=setInterval(function(){
			                play();
			            },t2);
			        }
			    }
			    /*鼠标经过ul时暂停滚动*/
			    function pausePlay(){
			        controls.rollWrapUl.on({
			            "mouseenter":function(){
			                clearInterval(si);
			            },
			            "mouseleave":function(){
			                autoPlay();
			            }
			        });
			    }
			}
			new scrollTxt().init();
			/*----------------------------------------------------------滚动显示最新建档信息   end ----------------------------------------------------*/
			

		})
			//修改侧边栏iconfont样式
			function changeSidebarStyle(pageNo){
				top.rootTreeMenu.find('li>a').removeClass('menu-open menu-open2');
				top.rootTreeMenu.find('li').each(function() {
					if ($(this).attr('page-no') == pageNo) {
						var a=$(this).children('a');
						a.parents('.grade2,.grade3,#root-menu>li').each(function(){
							$(this).children('a').eq(0).addClass('menu-open');
						});
						a[0].click();
						a.addClass('menu-open menu-open2');
					}
				});
			}