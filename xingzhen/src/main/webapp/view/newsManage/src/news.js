importing('currentDate');
define(['underscore',
		'text!/view/newsManage/tpl/noticeList.html',
		'text!/view/newsManage/tpl/noticeListTr.html',
        'text!/view/newsManage/tpl/noticeAdd.html',
		'text!/view/newsManage/tpl/noticeEdit.html',
	    'text!/view/newsManage/tpl/noticeView.html',
        'text!/view/newsManage/tpl/rulesList.html',
        'text!/view/newsManage/tpl/tableList.html',
        '../dat/news.js',
        '../../orgManage/dat/orgInfo.js'],function(_,noticeListTpl,noticeListTrTpl,noticeAddTpl,noticeEditTpl,noticeViewTpl,rulesListTpl,tableListTpl,newsAjax,orgInfoAjax){

	return {
		showNoticeList:function(){
			_self = this;
			$(".tab-content").empty().html(_.template(noticeListTpl,{ops:top.opsMap}));
			$(".dict").dict();
			$("#createDate").daterangepicker({
				separator : ' 至 ',
				showWeekNumbers : true,
				pickTime:true
				},function(start, end, label) {
				$('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
				$('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
			});
			var type=1;
			_self.queryNoticeList(type);
			$('#add-btn').on('click',function () {
				var type=1;//123分别是通知公告、规章制度、表格下载
			    _self.noticeAdd(type);
		 	});
			$("#query-btn").on('click',function(){
				var type=1;
				_self.queryNoticeList(type);
			});
			$("#reset-btn").on('click',function(){
				$('#query-condition :input').each(function () {
					$(this).val("");
				});
				$("#changeTimeScope").children("u").removeClass("active").eq(0).addClass("active");
				$("#changeGrade").children("u").removeClass("active").eq(0).addClass("active");
			});
			//点击修改时间范围（当天当月当季当年）
			_self.changeTimeScope();
			//点击修改等级
			_self.changeGrade();

		},
		//点击修改时间范围（当天当月当季当年）
		changeTimeScope:function(){
			$("#changeTimeScope").on("click","u",function(){
				$(this).addClass("active").siblings(".active").removeClass("active");
				var val=$(this).attr("val");
				if(val==""){
					$('#createDate').val("");
					$("#startTime").val("");
					$("#endTime").val("");
				}else if(val==1){
					$('#createDate').val(my_day);
					$("#startTime").val(dayStartDate);
					$("#endTime").val(dayEndDate);
				}else if(val==2){
					$('#createDate').val(my_month);
					$("#startTime").val(monthStartDate);
					$("#endTime").val(monthEndDate);
				}else if(val==3){
					$('#createDate').val(my_quarter);
					$("#startTime").val(quarterStartDate);
					$("#endTime").val(quarterEndDate);
				}else if(val==4){
					$('#createDate').val(my_year);
					$("#startTime").val(yearStartDate);
					$("#endTime").val(yearEndDate);
				}
			})
		},
		showRulesList:function(){
			_self = this;
			$(".tab-content").empty().html(_.template(rulesListTpl,{ops:top.opsMap}));
			$(".dict").dict();
			$("#createDate").daterangepicker({
				separator : ' 至 ',
				showWeekNumbers : true,
				//format:'YYYY-MM-DD',
				pickTime:true
			},function(start, end, label) {
				$('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
				$('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
			});
			var type=2;
			_self.queryNoticeList(type);
			$('#add-btn').on('click',function () {
				var type=2;
				_self.noticeAdd(type);
			});
			$("#query-btn").on('click',function(){
				var type=2;
				_self.queryNoticeList(type);
			});
			$("#reset-btn").on('click',function(){
				$('#query-condition :input').each(function () {
					$(this).val("");
				});
				$("#changeTimeScope").children("u").removeClass("active").eq(0).addClass("active");
			});
			//点击修改时间范围（当天当月当季当年）
			_self.changeTimeScope();

		},
		showTableList:function(){
			_self = this;
			$(".tab-content").empty().html(_.template(tableListTpl,{ops:top.opsMap}));
			$(".dict").dict();
			$("#createDate").daterangepicker({
				separator : ' 至 ',
				showWeekNumbers : true,
				//format:'YYYY-MM-DD',
				pickTime:true
			},function(start, end, label) {
				$('#startTime').val(start.format('YYYY-MM-DD HH:mm:ss'));
				$('#endTime').val(end.format('YYYY-MM-DD HH:mm:ss'));
			});
			var type=3;
			_self.queryNoticeList(type);
			$('#add-btn').on('click',function () {
				var type=3;
				_self.noticeAdd(type);
			});
			$("#query-btn").on('click',function(){
				var type=3;
				_self.queryNoticeList(type);
			});
			$("#reset-btn").on('click',function(){
				$('#query-condition :input').each(function () {
					$(this).val("");
				});
				$("#changeTimeScope").children("u").removeClass("active").eq(0).addClass("active");
			});
			//点击修改时间范围（当天当月当季当年）
			_self.changeTimeScope();
		},
		//点击查询通知公告
		queryNoticeList:function(type){
			var param = $("#query-condition").serializeObject();
			param = $.extend(param,{
				currentPage:$('.paging').data('currentPage'),
				startTime:$("#startTime").val(),
				type:type,
				endTime:$("#endTime").val()
			});
			$('#query-result').pagingList({
				action:top.servicePath+'/sys/message/findPage',
				currentPage:param.currentPage,
				jsonObj:param,
				callback:function(data){
					$("#noticeInfoList-table tbody").empty().html(_.template(noticeListTrTpl,{data:data,ops:top.opsMap,type:type}));
                    ////使用base-new.js进行表格固定时会用到
					// //准备配置项
                    // var settingsNoticeCols = [
                    //     {title: '序号', map: 'rownum', id: 'id', cls: 'em10 th-center td-center'},
                    //     {title: '标题', map: 'subject', cls: 'mem10'},
                    //     {title: '等级', map: 'msgLevel.asMsgLevel', cls: 'mem8'},
                    //     {title: '发布时间', map: 'rev3.asDate', cls: 'mem8'},
                    //     {title: '发布人', map: 'rev2', cls: 'mem10'},
                    //     {title: '发布状态', map: 'rev4.asRev4', cls: 'mem8'},
                    //     {title: '操作', map: 'id.asNoticeOperationsBtn', cls: 'mem6'}
                    // ];
                    // var settingsRuleCols = [
                    //     {title: '序号', map: 'rownum', id: 'id', cls: 'em10 th-center td-center'},
                    //     {title: '标题', map: 'subject', cls: 'mem10'},
                    //     {title: '发布时间', map: 'createDate.asDate', cls: 'mem8'},
                    //     {title: '操作', map: 'id.asNoticeOperationsBtn', cls: 'mem6'}
                    // ];
                    // var settingsTableCols = [
                    //     {title: '序号', map: 'rownum', id: 'id', cls: 'em10 th-center td-center'},
                    //     {title: '标题', map: 'subject', cls: 'mem10'},
                    //     {title: '附件名', map: 'content', cls: 'mem8'},
                    //     {title: '发布时间', map: 'createDate.asDate', cls: 'mem8'},
                    //     {title: '操作', map: 'id.asNoticeOperationsBtn', cls: 'mem6'}
                    // ];
                    // if(type == "01"){
                    //     $('#noticeInfoList-table').table({
                    //         data: data,
                    //         cols: settingsNoticeCols,
                    //         cls: 'tcenter',
                    //         check: false,
                    //         fixCols: {left: 2, right: 1}
                    //     });
                    // }else if(type == "02"){
                    //     $('#noticeInfoList-table').table({
                    //         data: data,
                    //         cols: settingsRuleCols,
                    //         cls: 'tcenter',
                    //         check: false,
                    //         fixCols: {left: 2, right: 1}
                    //     });
                    // }else if(type == "03"){
                    //     $('#noticeInfoList-table').table({
                    //         data: data,
                    //         cols: settingsTableCols,
                    //         cls: 'tcenter',
                    //         check: false,
                    //         fixCols: {left: 2, right: 1}
                    //     });
                    // }
					$(".into-send").on('click',function(){
                        _self.intoChooseUnit($(this).attr('id'));
					});
					$(".into-edit").on('click',function(){
						_self.showNoticeEdit($(this).attr('id'));
					});
					$(".delete-for").on('click',function(){
						_self.delNotice($(this).attr('id'),type,$(this).attr('data-subject'));
					});
					$(".into-view").on('click',function(){
						_self.noticeView($(this).attr('id'));
					});
					$('.span').span();
				}
			});
		},
		noticeAdd:function(type){
			$(".tab-content").empty().html(_.template(noticeAddTpl,{type:type}));
			$(".dict").dict();
			var editor = new wangEditor('my_editor');
			if(type!=3){
				editor.create();
				$("#my_editor").addClass("field-valid");
				$("#my_editor").attr("data-options","required:true")
			}
			//上传附件
			upclick(
				{
					dataname: "file",
					element: "upload-btn",
					action: top.servicePath+'/sys/file/upload?isResize=false',
					onstart: function (filename) {
						$(".progress-bar").css('width','50%');
					},
					oncomplete: function (r) {
						if(r.flag==1){
							$("#rev1").val(obj2str(r.data.source));
							$("#file").val(r.data.oldName);
							$(".progress-bar").css('width','100%');
						}else{
							console.info(r)
							toast(r.msg,600).err();
							$(".progress-bar").css('width','0%');
						}
					}
				});
			//点击清空附件value值
			$("#del_file").on("click",function(){
				$("#file").val("");
				$("#rev1").val("");
			})
			//绑定返回事件
			$('#cancel-btn').on('click',function () {
				if(type==1){
					_self.showNoticeList();
				}else if(type==2){
					_self.showRulesList();
				}else if(type==3){
					_self.showTableList();
				}

			});
			//点击修改等级
			_self.changeGrade();
			//点击选择通知公告接收人
			_self.changeReceiver();

			$('#save-btn,#save-push-btn').on('click',function () {
				var rev4 = $(this).attr("rev4");
				var type = $("#type").val();
				if(type!=3){
					if($.trim(editor.$txt.text())||$("#my_editor").find('img')){
						$("#my_editor").removeClass("field-valid").removeClass("validatebox-invalid");
						$("#my_editor").removeAttr("data-options")
					}else{
						$("#my_editor").addClass("field-valid");
						$("#my_editor").attr("data-options","required:true")
					}
				}
				$('.field-valid').validatebox();
				if($('.validatebox-invalid').length > 0){
					return false;
				}
				var param = $("#notice-add-form").serializeObject();
				var content;
				if(!editor.$txt){//不存在--是表格下载的情况
					content=$("#file").val();
				}else{
					content=editor.$txt.html();
				}
				
				var msgVest="";
				if(type==1){
					var chooseUnit=[];
					$.each($("#chooseUnit").find("input[type='checkbox']:checked"),function(i,item){
						var orgIds={
								orgId:item.value
						}
						chooseUnit.push(orgIds)
					});
					$.each($("#chooseEmployee").find("input[type='checkbox']:checked"),function(i,item){
						var userIds={
								userId:item.value
						}
						chooseUnit.push(userIds)
					});
					if($("#tslb").val() == 3 || $("#tslb").val() == 4){
						if(chooseUnit.length == 0){
							toast($("#tslb").val()==3?"请勾选接收单位":"请勾选接收人员",600).warn();
				            return false;
						}
						msgVest = obj2str(chooseUnit);
					}
				}
				
				param = $.extend(param,{
					createPid:top.userId,
					content:content,
					rev1:$("#rev1").val(),
					msgVest:msgVest,
					rev2:top.trueName,
					userId:top.userName,
					rev4:rev4,
					orgId:top.orgId
				});
				newsAjax.add(param,function(r){
					if(r.flag==1){
						toast('保存成功！',600,function(){
							if(type==1){
								_self.showNoticeList();
							}else if(type==2){
								_self.showRulesList();
							}else if(type==3){
								_self.showTableList();
							}

						}).ok();
					}else{
						toast(r.msg,600).err()
					}
				});
			});
		},
		//点击修改等级
		changeGrade:function(){
			$("#changeGrade").on("click","u",function(){
				$(this).addClass("active").siblings(".active").removeClass("active");
				$("#msgLevel").val($(this).attr("val"));
			});
		},
		//点击选择通知公告接收人
		changeReceiver:function(){
			$("#changeReceiver").on("click","u",function(){
				$(this).addClass("active").siblings(".active").removeClass("active");
				$("#tslb").val($(this).attr("val"));
				if($(this).attr("val")=="1"||$(this).attr("val")=="2"){
					$("#chooseEmployee").empty().hide();
					$("#chooseUnit").empty().hide();
				}else if($(this).attr("val")==="3"){
					var the = $(this);
					orgInfoAjax.getOrgTreeList({orgLevel:1,status:0},function(res){
						if (res.flag == 1 && res.data.length > 0) {
							$("#chooseEmployee").empty().hide();
							$("#chooseUnit").empty().show();
							if(the.attr("msgVest") && the.attr("msgVest")!=""){
								var msgVest = eval('(' + the.attr("msgVest") + ')');
								
								$.each(res.data, function (i, item) {
									var checked = false;
									$.each(msgVest,function(j,e){
										if(item.orgId == e.orgId){
											checked = true;
										}
									});
									var html = '';
									if(checked){
										html = '<label><input type="checkbox" checked="checked" name="chooseUnit" value="'+item.orgId +'"/>'+ item.orgName +'</label>';
									}else{
										html = '<label><input type="checkbox" name="chooseUnit" value="'+item.orgId +'"/>'+ item.orgName +'</label>';
									}
									
									$("#chooseUnit").append(html);
								
								});
								
							}else{
								$.each(res.data, function (i, item) {
									$("#chooseUnit").append('<label><input type="checkbox" name="chooseUnit" value="'+item.orgId +'"/>'+ item.orgName +'</label>');
								});
							}
						}
					})
				}else if($(this).attr("val")==="4"){
					var the = $(this);
					newsAjax.getUnitEmployee({orgId:top.orgId},function(res) {
						
						if (res.flag == 1 && res.data.length > 0) {
							$("#chooseUnit").empty().hide();
							$("#chooseEmployee").empty().show();
							if(the.attr("msgVest") && the.attr("msgVest")!=""){
                                var msgVest = eval('(' + the.attr("msgVest") + ')');
								
								$.each(res.data, function (i, item) {
									var checked = false;
									$.each(msgVest,function(j,e){
										if(item.userId == e.userId){
											checked = true;
										}
									});
									var html = '';
									if(checked){
										html = '<label><input type="checkbox" checked="checked" name="chooseEmployee" value="'+item.userId +'"/>'+ item.userName +'</label>';
									}else{
										html = '<label><input type="checkbox" name="chooseEmployee" value="'+item.userId +'"/>'+ item.userName +'</label>';
									}
									
									$("#chooseUnit").append(html);
								
								});
							}else{
								$.each(res.data, function (i, item) {
									$("#chooseEmployee").append('<label><input type="checkbox" name="chooseEmployee" value="'+item.userId +'"/>'+ item.userName +'</label>');
								});
							}
							
						}
					})
				}
				return;
			});
		},

		//进入选择用户页面
		intoChooseUnit:function(id){
            _self = this;
            if(id){
                window.newwin = $open('#choose-unit-div',{width:640, height:477, title:'请选择要发布的单位'});
                $("#select").addClass("hide");
                $("#select").empty();
                //显示已发布单位
                setTimeout(function(){
                    newsAjax.getSendedOrg({id:id},function(res){
                        if(res.flag == 1 && res.data.length > 0){
                            $("#selected").removeClass("hide");
                            var sel = $("#selected");
                            sel.attr("disabled","disabled");
                            var opts = [];
                            for(var i = 0;i < res.data.length;i++){
                                var orgDetail ={
                                    orgId:res.data[i].orgId,
                                    orgName:res.data[i].orgName
                                };
                                opts.push(orgDetail);
                            }
                            if(opts && opts.length != 0){
                                sel.empty();
                                $.each(opts, function (i, value) {
                                    sel.append('<option value="'+ opts[i].orgId +'">'+ opts[i].orgName +'</option>');
                                });
                            }else{
                                sel.html("");
                            }
                        }else{
                            $("#selected").addClass("hide");
                            $("#selected").empty();
                        }
                    });
                },100);
                //显示未发布单位
                setTimeout(function(){
                    newsAjax.getUnSendOrg({id:id},function(res){
                        if(res.flag==1){
                            $("#all-unit").empty();
                            $("#select").empty();
                            var sel = $("#all-unit");
                            var opts = [];
                            for(var i = 0;i < res.data.length;i++){
                                var orgDetail ={
                                    orgId:res.data[i].orgId,
                                    orgName:res.data[i].orgName
                                };
                                opts.push(orgDetail);
                            }
                            if(opts && opts.length != 0){
                                $.each(opts, function (i, value) {
                                    sel.append('<option value="'+ opts[i].orgId +'">'+ opts[i].orgName +'</option>');
                                });
                            }else{
                                sel.html("");
                            }
                        }
                    });
                },100);
                $('#user-to-right').off("click").on('click',function(){
                    var opts = [];
                    var sel = $("#all-unit");
                    if($('#select option').length > 0){
                        $('#select').find('option:selected').each(function(i,e){
                            var item = {
                                orgId:$(e).val(),
                                orgName:$(e).text()
                            };
                            opts.push(item);
                        });
                        if(opts && opts.length != 0){
                            $.each(opts, function (i, value) {
                                sel.append('<option value="'+ opts[i].orgId +'">'+ opts[i].orgName +'</option>');
                            });
                        }else{
                            sel.html("");
                        }
                        $("#select option:selected").remove();
                    }
                    if($("#select option").length == 0){
                        $("#select").addClass("hide");
                    }
                });
                $('#user-to-left').off("click").on('click',function(){
                    var opts = [];
                    var sel = $("#select");
                    $('#all-unit').find('option:selected').each(function(i,e){
                        var item = {
                            orgId:$(e).val(),
                            orgName:$(e).text()
                        };
                        opts.push(item);
                    });
                    if(opts && opts.length != 0){
                        $("#select").removeClass("hide");
                        $.each(opts, function (i, value) {
                            sel.append('<option value="'+ opts[i].orgId +'">'+ opts[i].orgName +'</option>');
                        });
                    }else{
                        $("#select").addClass("hide");
                        sel.html("");
                    }
                    $("#all-unit option:selected").remove();
                });
                $("#save-btn").off("click").on("click", function () {
                    var orgIds =[];
                    $('#select option').each(function(){
                        orgIds.push($(this).val());
                    });
                    if (orgIds.length == 0) {
                        toast('请先选择要发布单位').css('left', '43%').warn();
                        return false;
                    } else {
                        newsAjax.publish({id: id, publishName: top.trueName, publishId: top.userName, orgIds: orgIds}, function (r) {
                            if (r.flag == 1) {
                                if ($("#choose-unit-div")) {
                                    $("#choose-unit-div").$close();
                                }
                                toast('发布成功！', 600, function () {
                                    $("#select").addClass("hide");
                                    $("#select option:selected").remove();
                                    _self.showNoticeList();
                                }).ok();
                            } else {
                                toast('发布失败！', 600).err();
                            }
                        });
                    }
                });
                $("#cancel-btn").on("click", function () {
                    if ($("#choose-unit-div")) {
                        $("#choose-unit-div").$close();
                    }
                });
            }
		},
		//点击进行修改
		showNoticeEdit:function(id){
			_self = this;
			if(id){
				newsAjax.findById({id:id},function(r){
					if(r.flag == 1){
						$(".tab-content").empty().html(_.template(noticeEditTpl,r));
						$(".dict").dict();
						var editor = new wangEditor('my_editor');
						if(r.data.type!=3){
							editor.create();
							$("#my_editor").addClass("field-valid");
							$("#my_editor").attr("data-options","required:true")
						}
						//上传附件
						upclick(
							{
								dataname: "file",
								element: "upload-btn",
								action: top.servicePath+'/sys/file/upload?isResize=false',
								onstart: function (filename) {
									$(".progress-bar").css('width','50%');
								},
								oncomplete: function (r) {
									if(r.flag==1){
										$("#rev1").val(obj2str(r.data.source));
										$("#file").val(r.data.oldName);
										$(".progress-bar").css('width','100%');

									}else{
										console.info(r)
										toast(r.msg,600).err();
										$(".progress-bar").css('width','0%');
									}
								}
							});
						
						//点击清空附件value值
						$("#del_file").on("click",function(){
							$("#file").val("");
							$("#rev1").val("");
						})
						//绑定返回事件
						$('#cancel-btn').on('click',function () {
							if($("#type").val()==1){
								_self.showNoticeList();
							}else if($("#type").val()==2){
								_self.showRulesList();
							}else if($("#type").val()==3){
								_self.showTableList();
							}
			
						});
						//点击修改等级
						_self.changeGrade();
						//点击选择通知公告接收人
						_self.changeReceiver();
						
						if(r.data.type == 1){
							$("#changeReceiver .active").click();
						}
						$('#save-btn,#save-push-btn').on('click',function () {
							var rev4 = $(this).attr("rev4");
							var type = $("#type").val();
							if(type==1||type==2){
								if($.trim(editor.$txt.text())||$("#my_editor").find('img')){
									$("#my_editor").removeClass("field-valid").removeClass("validatebox-invalid");
									$("#my_editor").removeAttr("data-options")
								}else{
									$("#my_editor").addClass("field-valid");
									$("#my_editor").attr("data-options","required:true")
								}
							}
							$('.field-valid').validatebox();
							if($('.validatebox-invalid').length > 0){
								return false;
							}
							var param = $("#notice-editor-form").serializeObject();
							var content;
							if(!editor.$txt){//不存在--是表格下载的情况
								content=$("#file").val();
							}else{
								content=editor.$txt.html();
							}

							var msgVest="";
							if(type==1){
								var chooseUnit=[];
								$.each($("#chooseUnit").find("input[type='checkbox']:checked"),function(i,item){
									var orgIds={
											orgId:item.value
									}
									chooseUnit.push(orgIds)
								});
								$.each($("#chooseEmployee").find("input[type='checkbox']:checked"),function(i,item){
									var userIds={
											userId:item.value
									}
									chooseUnit.push(userIds)
								});
								if($("#tslb").val() == 3 || $("#tslb").val() == 4){
									if(chooseUnit.length == 0){
										toast($("#tslb").val()==3?"请勾选接收单位":"请勾选接收人员",600).warn();
							            return false;
									}
									msgVest = obj2str(chooseUnit);
								}
							}
							
							var rev1;
							if($("#file").val()){
								rev1=$("#file").val();
							}else{
								rev1=$("#rev1").val();
							}
							param = $.extend(param,{
								modifyPid:top.userId,
								content:content,
								rev1:rev1,
								msgVest:msgVest,
								rev2:top.trueName,
								userId:top.userName,
								rev4:rev4,
								orgId:top.orgId
							});
							newsAjax.update(param,function(r){
								if(r.flag==1){
									toast('保存成功！',600,function(){
										if(type==1){
											_self.showNoticeList();
										}else if(type==2){
											_self.showRulesList();
										}else if(type==3){
											_self.showTableList();
										}
									}).ok();
								}else{
									toast(r.msg,600).err()
								}
							});
						});

					}
				});
			}
		},
		//点击进行预览
		noticeView:function(id){
			_self = this;
			if(id){
				newsAjax.findById({id:id},function(r){
					if(r.flag == 1){
						$(".tab-content").empty().html(_.template(noticeViewTpl,r));
						$("#cancel-btn").on("click",function(){
							if(r.data.type==1){
								_self.showNoticeList();
							}else if(r.data.type==2){
								_self.showRulesList();
							}else if(r.data.type==3){
								_self.showTableList();
							}

						})
					}
				});
			}
		},
		//点击进行删除
		delNotice:function(id,type,subject){
			$confirm('确定删除【'+subject+'】申请吗？',function(bol){
				if(bol){
					var ids =[];
					ids.push(id);
					newsAjax.del({ids:ids,modifyPid:top.userId},function(r){
						if(r.flag==1){
							toast('删除成功！',600,function(){
								if(type==1){
									_self.showNoticeList();
								}else if(type==2){
									_self.showRulesList();
								}else if(type==3){
									_self.showTableList();
								}
							}).ok()
						}else{
							toast('删除失败！',600).err()
						}
					})
				}
			});
		}

	}
});
   