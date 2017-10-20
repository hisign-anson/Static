importing('currentDate')
define(['underscore',
        'text!/view/dictManage/tpl/dictTree.html',
        'text!/view/dictManage/tpl/dictList.html',
        'text!/view/dictManage/tpl/dictListTr.html',
        'text!/view/dictManage/tpl/dictAdd.html',
        'text!/view/dictManage/tpl/dictEdit.html',
        '../dat/dictManage.js'],function(_,dictTreeTpl,dictListTpl,dictListTrTpl,dictAddTpl,dictEditTpl,dictManageAjax){
	var treeObj;
	
	return {
		showDictTree:function(){
			_self = this;
			$("#main-div").empty().html(_.template(dictTreeTpl));
			_self.initDicTreeData();
		},
		initDicTreeData:function(){
			_self = this;
			$.fn.zTree.init($('#org-tree'),{
            	async: {
            	   enable: true,
            	   url: top.servicePath+'/sys/dict/getDictTreeByParentKey',//异步加载时的请求地址
		           autoParam: ["id"],//提交参数
		           type: 'GET',
		           dataType: 'json',
		           headers: {
                       Accept: "*/*",
                       token: top.token
                   }
            	},
                view:{
                    selectedMulti:false     
                },
                callback:{
                    onClick:function(nodes, treeId, treeNode){
                    	_self.loadDictList(treeNode.id,treeNode.name,treeNode.isParent,treeNode.rootKey,treeNode.level);
                    }
                }
            },{id:"",name:"系统字典树",isParent:true,rootKey:"",pId:""});
			var zTree = $.fn.zTree.getZTreeObj("org-tree");
			var node = zTree.getNodeByParam('id', "");//获取id为1的点  
            zTree.selectNode(node);//选择点  
            zTree.setting.callback.onClick(null, zTree.setting.treeId, node);//调用事件
            zTree.expandNode(node, true, false, false);
		},
		loadDictList:function(key,value,isParent,rootKey,level){
			_self = this;
			$("#org-content").empty().html(_.template(dictListTpl));
			$("#add-btn").attr("dictKey",key);
			$("#add-btn").attr("dictValue",value);
			$("#add-btn").attr("rootKey",rootKey);
			$("#add-btn").attr("dictLevel",level);
			
			
			
			$("#delete-btn").attr("dictKey",key);
			$("#delete-btn").attr("dictValue",value);
			$("#delete-btn").attr("rootKey",rootKey);
			if(!key || !value || !isParent){
				$("#delete-btn").addClass('hide')
			}
			$("#add-btn").on("click",function(){
				var parentKey = $("#add-btn").attr("dictKey");
				var rootKey = $("#add-btn").attr("rootKey");
				var pName = $("#add-btn").attr("rootKey");
				var dictLevel = $("#add-btn").attr("dictLevel");
				pName = pName == '系统字典树'?"":pName;
				$("#org-content").empty().html(_.template(dictAddTpl,{parentKey:parentKey,rootKey:rootKey,pName:pName,dictLevel:dictLevel}));
				$("#save-save-btn").on('click',function(){
					$('.validate').validatebox();
	                 if($('.validatebox-invalid').length>0){
	                     return false;
	                 }
	                 var param = $('#add-form').serializeObject();
	                 dictManageAjax.addDict(param,function(r){
	  		 			if(r.flag==1){
	  		 				toast('保存成功！',600,function(){
	  		 					var zTree = $.fn.zTree.getZTreeObj("org-tree");
								var pNode = zTree.getNodeByParam('id', key);
								zTree.reAsyncChildNodes(pNode, "refresh");
								zTree.selectNode(pNode);//选择点  
					            zTree.setting.callback.onClick(null, zTree.setting.treeId, pNode);//调用事件
	  				          }).ok();
	  		 			}else{
	  		 				toast(r.msg,600).err()
	  		 			}
	  		 		 });
				});
				$("#save-return-btn").on('click',function(){
					var zTree = $.fn.zTree.getZTreeObj("org-tree");
					var pNode = zTree.getNodeByParam('id', key);
					zTree.selectNode(pNode);//选择点  
		            zTree.setting.callback.onClick(null, zTree.setting.treeId, pNode);//调用事件
				});
			});
			$("#delete-btn").on('click',function(){
				var dictKey = $(this).attr("dictKey");
                var dictValue = $(this).attr("dictValue") ;
                var rootKey = $(this).attr("rootKey");
				$confirm('确认删除【'+dictValue+'】字典？',function(bol) {
					if(bol){
						dictManageAjax.delDictByKey({dictKey:dictKey,rootKey:rootKey},function(r){
							if(r.flag == 1){
								var zTree = $.fn.zTree.getZTreeObj("org-tree");
								var pNode = zTree.getNodeByParam('id', key).getParentNode();
								zTree.reAsyncChildNodes(pNode, "refresh");
								zTree.selectNode(pNode);//选择点  
					            zTree.setting.callback.onClick(null, zTree.setting.treeId, pNode);//调用事件
							}
						});
					}
				});
				
			});
			var param ={
					currentPage:$('.paging').data('currentPage'),
					key:key
			};
			$('#query-result').pagingList({
                action:top.servicePath+'/sys/dict/getDictListByParentKey',
                currentPage:param.currentPage,
                jsonObj:param,
                callback:function(data){
                	data=$.extend(data,{pName:!value?"":value})
                	$("#dicList-table tbody").empty().html(_.template(dictListTrTpl,{data:data}));
                	
                	$(".into-edit").on('click',function(){
        				_self.editDict($(this).attr('id'),$(this).attr('parentkey'));
        			});
        			$(".delete-for").on('click',function(){
        				_self.delDictById($(this).attr('id'),$(this).attr('dictValue'),$(this).attr("parentkey"));
        			});
                }
            });
		},
		editDict:function(id,parentkey){
			_self = this;
			if(id){
				dictManageAjax.getDictById({id:id},function(r){
					if(r.flag == 1){
						$("#org-content").empty().html(_.template(dictEditTpl,r));
						$("#openFlag").val(r.data.openFlag);
						$("#save-save-btn").on('click',function(){
							$('.validate').validatebox();
			                 if($('.validatebox-invalid').length>0){
			                     return false;
			                 }
			                 var param = $('#add-form').serializeObject();
			                 dictManageAjax.updateDict(param,function(r){
				  		 			if(r.flag==1){
				  		 				toast('保存成功！',600,function(){
				  		 					var zTree = $.fn.zTree.getZTreeObj("org-tree");
											var pNode = zTree.getNodeByParam('id', parentkey);
											zTree.selectNode(pNode);//选择点  
								            zTree.setting.callback.onClick(null, zTree.setting.treeId, pNode);//调用事件
				  				          }).ok();
				  		 			}else{
				  		 				toast(r.msg,600).err()
				  		 			}
				  		 		 });
						});
						$("#save-return-btn").on('click',function(){
							var zTree = $.fn.zTree.getZTreeObj("org-tree");
							var pNode = zTree.getNodeByParam('id', parentkey);
							zTree.selectNode(pNode);//选择点  
				            zTree.setting.callback.onClick(null, zTree.setting.treeId, pNode);//调用事件
						});
					}
				});
			}
		},
		delDictById:function(id,dictValue,parentkey){
			_self = this;
			$confirm('确认删除【'+dictValue+'】字典？',function(bol) {
				if(bol){
					dictManageAjax.delDictById(id,parentkey,function(r){
						if(r.flag == 1){
							var zTree = $.fn.zTree.getZTreeObj("org-tree");
							var pNode = zTree.getNodeByParam('id', parentkey);
							zTree.selectNode(pNode);
							zTree.reAsyncChildNodes(pNode, "refresh");
				            zTree.setting.callback.onClick(null, zTree.setting.treeId, pNode);
						}
					});
				}
			})
		}
	}
})
	