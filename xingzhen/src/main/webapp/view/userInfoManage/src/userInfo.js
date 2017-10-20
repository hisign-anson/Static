importing('ztree','datepicker','currentDate')
define(['underscore',
        'text!/view/userInfoManage/tpl/orgTree.html',
        'text!/view/userInfoManage/tpl/userInfoList.html',
        'text!/view/userInfoManage/tpl/userInfoListTr.html',
        'text!/view/userInfoManage/tpl/userInfoAdd.html',
        'text!/view/userInfoManage/tpl/userInfoEdit.html',
        '../dat/userInfo.js',
        '../../../plugin/jquery.map.js'],function(_,orgTreeTpl,userInfoListTpl,userInfoListTrTpl,userInfoAddTpl,userInfoEditTpl,userInfoAjax,jQueryMap){
	var treeObj;
    var the = this;
	return {
		showOrgTree:function(){
			_self = this;
			$("#main-div").empty().html(_.template(orgTreeTpl));
            setTimeout(function(){
                _self.initOrgTreeData(true);
            },600);
		},
		addUserInfo:function(orgId,orgName){
			_self = this;
			$("#org-content").empty().html(_.template(userInfoAddTpl,{orgName:orgName}));
			$(".dict").dict();
			$("#orgId").val(orgId);
            _self.autoBirth();
            _self.uploadAvatar();
            $("#post option[value='17']").attr("selected",true);
			$("#save-save-btn").on("click",function(){
				$('.validate').validatebox();
                if($('.validatebox-invalid').length>0){
                    return false;
                }
                var param = $('#add-form').serializeObject();
                param = $.extend(param,{
               	     createPid:top.userId,
               	     modifyPid:top.userId,
               	     status:0
                });
                userInfoAjax.addUserInfo(param,function(r){
		 			if(r.flag==1){
		 				toast('保存成功！',600,function(){
		 					treeNode = treeObj.getNodeByParam('id',orgId);
		 	                 _self.loadUserInfoList(orgId,orgName);
		 	                 treeObj.selectNode(treeNode);
		 	                 treeObj.expandNode(treeNode);
				          }).ok();
		 			}else{
		 				toast(r.msg,600).err()
		 			}
		 		});
			});
            $("#save-return-btn").on("click",function(){
            	 treeNode = treeObj.getNodeByParam('id',orgId);
                 _self.loadUserInfoList(orgId,orgName);
                 treeObj.selectNode(treeNode);
			});
		},
		editUserInfo:function(userId,orgId,orgName){
			_self = this;
			userInfoAjax.getUserInfo({userId:userId},function(r){
				if(r.flag == 1){
					$("#org-content").empty().html(_.template(userInfoEditTpl,r));
					$("#sex").val(r.data.sex);
					$(".dict").dict();
					$(".dict").dictSelect(r.data.post);
                    $("input[name=birth]").datetimepicker({
                        format:'YYYY-MM-DD',
                        pickTime:false
                    });
                    $('#cid').bind('input propertychange', function() {
                        _self.autoBirth();
                    });
                    _self.uploadAvatar();
					$("#save-save-btn").on("click",function(){
						$('.validate').validatebox();
		                if($('.validatebox-invalid').length>0){
		                    return false;
		                }
		                var param = $('#add-form').serializeObject();
		                param = $.extend(param,{
		               	     modifyPid:top.userId
		                });
		                userInfoAjax.editUserInfo(param,function(r){
				 			if(r.flag==1){
				 				toast('保存成功！',600,function(){
				 					treeNode = treeObj.getNodeByParam('id',orgId);
				 	                 _self.loadUserInfoList(orgId,orgName);
				 	                 treeObj.selectNode(treeNode);
						          }).ok();
				 			}else{
				 				toast(r.msg,600).err()
				 			}
				 		});
					});
					$("#save-return-btn").on("click",function(){
		            	 treeNode = treeObj.getNodeByParam('id',orgId);
		                 _self.loadUserInfoList(orgId,orgName);
		                 treeObj.selectNode(treeNode);
					});
				}
			});
		},
		delUserInfo:function(userId,userName,orgId,orgName){
			_self = this;
			$confirm('确认删除【'+userName+'】人员？',function(bol) {
                if (bol) {
                	userInfoAjax.delUserInfo(userId,function(r){
    					if(r.flag==1){
    						 toast('删除成功！',600,function(){
    							 treeNode = treeObj.getNodeByParam('id',orgId);
    			                 _self.loadUserInfoList(orgId,orgName);
    			                 treeObj.selectNode(treeNode);
    				         }).ok()
    					}else{
    						toast(r.msg,600).err()
    					}
    				});
                }
	         });
		},
		initOrgTreeData:function(isFirst){
			_self = this;
			userInfoAjax.getOrgTreeList({status:0},function(res){
                var nodes = [];
                orgInfo = res.data;
                for (var i = 0; i < orgInfo.length; i++) {
                    if(orgInfo[i].superId ==null || orgInfo[i].superId == -1){
                        nodes.push({id:orgInfo[i].orgId,pid:-1,name:orgInfo[i].orgName,sort:i});
                    }else{
                        nodes.push({id:orgInfo[i].orgId,pid:orgInfo[i].superId,name:orgInfo[i].orgName,sort:i});
                    }
                }

                //新api, 发动和获得树对象一步完成,调用逻辑更清晰
                treeObj =$('#org-tree').ztree({
                    check: {
                        enable: false			//启用复选框
                    },
                    data: {
                        simpleData: {
                            enable:"pid",		//扁平数据，pid表示父节点的ID
                            idKey:"id",
                            pIdKey:"pid"		//默认的pId改为pid，注意默认I为大写
                        }
                    },
                    view:{
                        showTitle: false, 	    //不显示提示信息
                        nameIsHTML: true,		//名字支持html代码
                        selectedMulti:false     //只能选中一个节点
                    },
                    callback:{
                        onClick:function(nodes, treeId, treeNode){
                        	_self.loadUserInfoList(treeNode.id,treeNode.name);
                        }
                    }
                }, nodes);
                if(isFirst){
                	firstNode = treeObj.getNodes()[0];
                	_self.loadUserInfoList(firstNode.id,firstNode.name);
                }
			});
		},
		loadUserInfoList:function(orgId,orgName){
			_self = this;
			if(orgId){
				$("#org-content").empty().html(_.template(userInfoListTpl));
				upclick({
                    dataname: "file",
                    element: "importExcel",
                    action: top.servicePath+'/sys/user/importExcel',
                    onstart: function (filename) {
                        showLoading;
                    },
                    oncomplete: function (r) {
                    	if(r.flag==1){
    						 toast('导入成功！',600).ok()
    					}else{
    						toast(r.msg,600).err()
    					}
                    	hideLoading;
                    }
                });
                $(".dict").dict();
				$("#add-btn").attr("orgId",orgId);
				$("#add-btn").attr("orgName",orgName);
				$("#add-btn").on("click",function(){
					_self.addUserInfo($(this).attr("orgId"),$(this).attr("orgName"));
				});
                $("#query-btn").on('click',function(){
                    _self.queryList(orgId);
                });
                $("#reset-btn").on('click',function(){
                    $("#query-condition")[0].reset();
                    $('#query-condition :input').each(function () {
                        $(this).val("");
                    });
                });
                _self.queryList(orgId);
			}
		},
        queryList:function(orgId){
            var param = $("#query-condition").serializeObject();
            $.extend(param, {
                userName:$.trim($("#userName").val()),
                phone:$.trim($("#phone").val()),
				post:$("#post option:selected").val(),
                orgId: orgId
            });
            $('#query-result').pagingList({
                action: top.servicePath + '/sys/user/getUserInfoListByOrgId',
                currentPage: param.currentPage,
                jsonObj: param,
                callback: function (data) {
                    $("#userInfoList-table tbody").empty().html(_.template(userInfoListTrTpl, {data: data}));
                    $(".into-edit").on('click', function () {
                        _self.editUserInfo($(this).attr('id'), $(this).attr('orgId'), $(this).attr('orgName'));
                    });
                    $(".delete-for").on('click', function () {
                        _self.delUserInfo($(this).attr('id'), $(this).attr('userName'), $(this).attr('orgId'), $(this).attr('orgName'));
                    });
                }
            });

		},
        autoBirth: function() {
            var cId = $("#cid");
            if(cId.val().length > 0){
                $("input[name=birth]").val(cId.val().substr(6,4)+"-"+cId.val().substr(10,2) +"-" +cId.val().substr(12,2));
                cId.on('change',function(){
                    cId.blur(function(){
                        var cId_blur = cId.val();
                        if(cId_blur.length == 18){
                            $("input[name=birth]").val(cId_blur.substr(6,4)+"-"+cId_blur.substr(10,2) +"-" +cId_blur.substr(12,2));
                        } else if(cId_blur.length == 15){
                            $("input[name=birth]").val("19"+cId_blur.substr(6,2)+"-"+cId_blur.substr(10,2) +"-" +cId_blur.substr(12,2));
                        } else{
                            cId.validatebox();
                            if($('.validatebox-invalid').length>0){
                                return false;
                            }
                        }
                    });
                });
            } else{
                cId.on('change',function(){
                    cId.blur(function(){
                        var cId_blur = cId.val();
                        if(cId_blur.length == 18){
                            $("input[name=birth]").val(cId_blur.substr(6,4)+"-"+cId_blur.substr(10,2) +"-" +cId_blur.substr(12,2));
                        } else if(cId_blur.length == 15){
                            $("input[name=birth]").val("19"+cId_blur.substr(6,2)+"-"+cId_blur.substr(10,2) +"-" +cId_blur.substr(12,2));
                        } else{
                            cId.validatebox();
                            if($('.validatebox-invalid').length>0){
                                return false;
                            }
                        }
                    });
                });
            }
        },
        uploadAvatar: function(){
            //上传头像
            upclick({
                dataname: "file",
                element: "avatar-btn",
                action: top.servicePath + '/sys/file/upload',
                onstart: function (filename) {
                    $(".progress-bar").css('width','50%');
                },
                oncomplete: function (r) {
                    if (r.flag == 1) {
                        $("#avatar").val(obj2str(r.data));
                        $("#avatar-img").attr('src', top.ftpServer + r.data.source);
                    } else {
                        toast(r.msg,600).err()
                        $(".progress-bar").css('width','0%');
                    }
                    $(".progress-bar").css('width','100%');
                }
            });
        }
	}
});
   