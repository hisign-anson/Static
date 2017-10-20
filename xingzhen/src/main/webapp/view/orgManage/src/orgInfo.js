importing('ztree')
define(['underscore',
        'text!/view/orgManage/tpl/orgTree.html',
        'text!/view/orgManage/tpl/orgInfoView.html',
        'text!/view/orgManage/tpl/orgInfoAdd.html',
        'text!/view/orgManage/tpl/orgInfoEdit.html',
        '../dat/orgInfo.js',
        '../../../plugin/jquery.map.js'],function(_,orgTreeTpl,orgInfoViewTpl,orgInfoAddTpl,orgInfoEditTpl,orgInfoAjax,jQueryMap){
	var treeObj;
	return {
		showOrgTree:function(){
			_self = this;
			$("#main-div").empty().html(_.template(orgTreeTpl));
            setTimeout(function(){
                _self.initOrgTreeData(true);
            },600);
		},
		initOrgTreeData:function(isFirst,delPid,editName){

			orgInfoAjax.getOrgTreeList({},function(res){
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
                        	_self.loadOrgInfo(treeNode.id);
                        }
                    }
                }, nodes);
               // treeObj.expandAll(true);//默认展开全部节点
                if(isFirst){
                	_self.loadOrgInfo(treeObj.getNodes()[0].id);
                }
                if(delPid){
                    treeNode = treeObj.getNodeByParam('id',delPid);
                    _self.loadOrgInfo(treeNode.id);
                    treeObj.selectNode(treeNode);
                    treeObj.expandNode(treeNode);
                }
                if(editName){
                    treeNode = treeObj.getNodeByParam('name',editName);
                	_self.loadOrgInfo(treeNode.id);
                    treeObj.selectNode(treeNode);
                    treeObj.expandNode(treeNode);
                }
			});
		},
		addOrgInfo:function(superId,treeId){
			_self = this;
			 $("#org-content").empty().html(_.template(orgInfoAddTpl,{superId:superId,treeId:treeId}));
			 //注册返回事件
             $('#save-return-btn').on('click',function () {
            	 var treeNode = treeObj.getNodeByParam('id',treeId);
            	 _self.loadOrgInfo(treeNode.id);
                 treeObj.selectNode(treeNode);
             });
             //保存新增模块事件
             $('#save-save-btn').on('click',function () {
                 $('.validate').validatebox();
                 if($('.validatebox-invalid').length>0){
                     return false;
                 }
                 var param = $('#add-form').serializeObject();
                 param = $.extend(param,{
                	     createPid:top.userId,
                	     modifyPid:top.userId
                 });
                 orgInfoAjax.add(param,function(r){
 		 			if(r.flag==1){
 		 				toast('保存成功！',600,function(){
 				 			 _self.initOrgTreeData(false,false,param.orgName);
 				          }).ok();
 		 			}else{
 		 				toast(r.msg,600).err()
 		 			}
 		 		 });
             });
			 
		},
		editOrgInfo:function(orgId){
			_self = this;
			orgInfoAjax.getOrgInfo({orgId:orgId},function(r){
				if(r.flag == 1){
					$("#org-content").empty().html(_.template(orgInfoEditTpl,r));
					$("#status").val(r.data.status);
					 //注册返回事件
		            $('#save-return-btn').on('click',function () {
		           	    var treeNode = treeObj.getNodeByParam('id',orgId);
		           	     _self.loadOrgInfo(treeNode.id);
		                treeObj.selectNode(treeNode);
		            });
		          //保存新增模块事件
		             $('#save-save-btn').on('click',function () {
		                 $('.validate').validatebox();
		                 if($('.validatebox-invalid').length>0){
		                     return false;
		                 }
		                 var param = $('#add-form').serializeObject();
		                 param = $.extend(param,{
		                	     modifyPid:top.userId
		                 });
		                 orgInfoAjax.update(param,function(r){
		 		 			if(r.flag==1){
		 		 				toast('保存成功！',600,function(){
		 				 			 _self.loadOrgInfo(orgId);
		 				          }).ok();
		 		 			}else{
		 		 				toast(r.msg,600).err()
		 		 			}
		 		 		 });
		             });
				}
			});
		},
		delOrgInfo:function(orgId,orgName){
			_self = this;
			 $confirm('确认删除【'+orgName+'】节点？',function(bol) {
                if (bol) {
                	orgInfoAjax.delOrgInfo(orgId,function(r){
    					if(r.flag==1){
    						 toast('删除成功！',600,function(){
    							 treeNode = treeObj.getNodeByParam('id',orgId);
    							 _self.initOrgTreeData(false,treeNode.pid,false)
    				         }).ok()
    					}else{
    						toast(r.msg,600).err()
    					}
    				});
                }
	         });
		},
		loadOrgInfo:function(orgId){
			_self = this;
			orgInfoAjax.getOrgInfo({orgId:orgId},function(r){
				 if(r.flag == 1){
					 $("#org-content").empty().html(_.template(orgInfoViewTpl,r));
					//注册新增同级模块事件
	                 $('#add-same-btn').on('click',function () {
	                	 _self.addOrgInfo($("#superId").val(),$("#orgId").val());
	                 });
	                //注册新增下级模块事件
	                 $('#add-lower-btn').on('click',function () {
	                	 _self.addOrgInfo($("#orgId").val(),$("#orgId").val());
	                 });
	                 if(r.data.superId==-1){
	                	 $('#add-same-btn').addClass('hide')
	                 }
	                 //注册修改
	                 $("#edit-btn").on('click',function(){
	                	 _self.editOrgInfo($("#orgId").val());
	                 });
	                 //注册删除
	                 $("#delete-btn").on('click',function(){
	                	 _self.delOrgInfo($("#orgId").val(),$("#orgName").val());
	                 });
	                 treeNode = treeObj.getNodeByParam('id',orgId);
	                 if(treeNode.isParent){
	                	 $('#delete-btn').addClass('hide')
	                 }
				 }
	             
			});
			
		}
		
	}
});
   