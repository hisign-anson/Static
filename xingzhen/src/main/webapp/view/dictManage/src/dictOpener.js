/**
 * Created by Miya on 2017/8/22.
 */
define(['underscore',
    'text!/view/dictManage/tpl/dictOpenerAdd.html',
    '../dat/dictManage.js',
    '../../userInfoManage/dat/userInfo.js'],function(_,dictOpenerAddTpl,dictManageAjax,userInfoAjax){
    return {
        openChooseDict:function (obj,dictVal,title) {
            _selfDict = this;
            var dictVal = obj.attr("dict-value");
            var title = obj.attr("title");
            
            window.newwin=$open('#dict-block-type',{width:600,height:400,top:100, title:'选择'+title});
            _selfDict.getDictListByParentKey(dictVal);
            var opener = $(".panel #dict-block-type");
            opener.find("#dict-wrap-type").attr('dictVal',dictVal);
            opener.find("#dict-wrap-type").off("click").on("click","div",function(){
                var input = obj.prev();//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));
                opener.$close();
            });
            opener.find("#queryBtnGroupType").off("click").on("click",function(){
                var groupType=$.trim(opener.find('#groupType').val());
                _selfDict.getDictListByParentKey(dictVal,groupType);
            });
            opener.find("#resetBtnGroupType").off("click").on("click",function(){
                opener.find("#groupType").val("");
            });
            $("#add-dict-btn").off("click").on('click',function(){
                $open('#addReason-block',{width:400,height:330,top:100, title:'新增'+title});
                $(".addReason-container").empty().html(_.template(dictOpenerAddTpl));

                var addReasonForm = $('#add-reason-form');
                dictManageAjax.getDictListByParentKey({key:dictVal},function(r) {
                    if (r.flag == 1) {
                        addReasonForm.find("#value").val("");
                        addReasonForm.find("#remarkReason").val("");
                        addReasonForm.find("#key").val(r.data.length+1);
                        if(dictVal == "YCSY"){
                            addReasonForm.find("#sort").val(r.data.length);
                        }else {
                            addReasonForm.find("#sort").val(r.data.length+1);
                        }
                    }
                });
                $("#save-reason-btn").off("click").on('click',function(){
                    addReasonForm.find('.validate').validatebox();
                    if(addReasonForm.find('.validatebox-invalid').length>0){
                        return false;
                    }
                    var param = addReasonForm.serializeObject();
                    $.extend(param, {
                        root: dictVal,
                        parentKey: dictVal,
                        remark: $.trim($("#remarkReason").val()),
                        dicLevel:1
                    });
                    dictManageAjax.addDict(param, function (r) {
                        if (r.flag == 1) {
                            toast('保存成功！', 600, function () {
                                $('#addReason-block').$close();
                                _selfDict.getDictListByParentKey(dictVal);
                            }).ok();
                        } else {
                            toast(r.msg, 600).err()
                        }
                    });
                });

                $("#cancel-reason-btn").off("click").on('click',function(){
                    $('#addReason-block').$close();
                });
            });
        },
        getDictListByParentKey: function (key,value) {
            _selfDict = this;
            var param = {};
            $.extend(param, {
                key:key,
                queryString:value
            });
            $('#dict-block-type').pagingList({
                action: top.servicePath + '/sys/dict/getDictListByParentKey',
                jsonObj: param,
                callback: function (r) {
                    var target = $("#dict-wrap-type");
                    var tpl = '';
                    $.each(r, function (i, o) {
                        tpl += '<div><u><span val="' + o.key + '">' + o.value + '</span>' +
                            //'<a class="delete-for icon-remove-btn" style="float: right" id="'+o.id+'" dictValue="'+o.value+'"  title="删除"></a>' +
                        '</div></u>';
                    });
                    target.html(tpl);
                }
            })
            //dictManageAjax.getDictListByParentKey({key:key,value:value},function(r) {
            //    if (r.flag == 1) {
            //        var target = $("#dict-wrap-type");
            //        var tpl='';
            //        $.each(r.data, function (i, o) {
            //            tpl+='<div><u><span val="'+o.key+'">'+o.value+'</span>' +
            //            //'<a class="delete-for icon-remove-btn" style="float: right" id="'+o.id+'" dictValue="'+o.value+'"  title="删除"></a>' +
            //            '</div></u>';
            //        });
            //        target.html(tpl);
                    
                    //$("#dict-wrap-type .delete-for").off("click").on('click',function(){
                	//	var id=$(this).attr('id');
                	//	var val=$(this).attr('dictValue');
                	//	var parentkey = $("#dict-wrap-type").attr('dictVal');
                	//	$confirm('确认删除【'+val+'】字典？',function(bol) {
                	//		if(bol){
                	//			dictManageAjax.delDictById(id,parentkey,function(r){
                	//				 if (r.flag == 1) {
                	//					 _selfDict.getDictListByParentKey($("#dict-wrap-type").attr('dictVal'));
                	//				 }else{
                	//					 toast(r.msg, 600).err()
                	//				 }
                	//			});
                	//		}
                	//	});
                	//});
        //        }
        //    });
        },
        openUserChoosePort:function (obj) {//打开人员选择端口
            _selfDict = this;
            var title = obj.attr("title");
            window.newwin=$open('#dict-block',{width:400,height:300,top:100, title:'选择'+title});
            _selfDict.getUserPortList();
            var opener = $(".panel #dict-block");
            opener.find(".query-block-row input").val("");
            opener.find("#dict-wrap").off("click").on("click",".item-value",function(){
                // var input = obj.prev();//页面上需要填入的input
                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));

                var paramAttr = $(this).find("span").attr("paramattr");
                input.attr("paramattr",paramAttr);
                if($("#jsrLxfs").length > 0){
                    $("#jsrLxfs").val($(this).find("span").attr("phone"));
                }
                debugger
                opener.$close();
            });
            opener.find("#queryBtn").off("click").on("click",function(){
                var userName=$.trim(opener.find('#userName').val());
                _selfDict.getUserPortList(userName);
            });
            opener.find("#resetBtn").off("click").on("click",function(){
                opener.find("#userName").val("");
            })
        },
        getUserPortList:function (userName) {
            _selfDict = this;
            var tpl='';
            var target = $("#dict-wrap");
            userInfoAjax.getUserInfoListByOrgId({orgId: top.orgId,userName:userName,end:""},function (r) {
                if (r.flag == 1) {
                    $.each(r.data, function (i, o) {
                        tpl+="<div class='item-value'><u><span paramattr='"+ obj2str(o) +"' val='"+o.userId+"' phone='"+o.phone+"'>"+o.userName+","+o.orgName+"</span></div></u>";
                    });
                    target.html(tpl);
                }
            });
        },

        openUnitChoosePort:function (obj) {
            _selfDict = this;
            var title = obj.attr("title");
            window.newwin=$open('#dict-block-unit',{width:400,height:300,top:100, title:'选择'+title});
            _selfDict.getUnitPortList();
            var opener = $(".panel #dict-block-unit");
            opener.find(".query-block-row input").val("");
            opener.find("#dict-wrap-unit").off("click").on("click",".item-value",function(){
                // var input = obj.prev();//页面上需要填入的input
                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));

                var paramAttr = $(this).find("span").attr("paramattr");
                input.attr("paramattr",paramAttr);
                opener.$close();
            });
            opener.find("#queryBtnOrgName").off("click").on("click",function(){
                var orgName =$.trim(opener.find('#orgName').val());
                _selfDict.getUnitPortList(orgName);
            });
            opener.find("#resetBtnOrgName").off("click").on("click",function(){
                opener.find('#orgName').val("");
            })
        },
        getUnitPortList:function (orgName) {
            _selfDict = this;
            userInfoAjax.getOrgTreeList({orgName:orgName,end:""},function(r) {
                if (r.flag == 1) {
                    var target = $("#dict-wrap-unit");
                    var tpl='';
                    $.each(r.data, function (i, o) {
                        // tpl+='<div class="item-value"><u><span val="'+o.orgId+'">'+o.orgName+'</span></div></u>';
                        tpl+="<div class='item-value'><u><span paramattr='"+ obj2str(o) +"' val='"+o.orgCode+"'>"+o.orgName+"</span></div></u>";
                    });
                    target.html(tpl);
                }
            });
        },
        openChoosePort:function (obj,portType,portAddress,param,chooseType) {
            _selfDict = this;
            var title = obj.attr("title");
            window.newwin=$open('#dict-block-group',{width:400,height:300,top:100, title:'选择'+title});
            if(portAddress){
                _selfDict.getPortList(portType,portAddress,param,chooseType);
            }else {
                _selfDict.getGroupByIdPortList(param);
            }
            var opener = $(".panel #dict-block-group");
            $(".query-block-row input").val("");
            opener.find("#dict-wrap-group").off("click").on("click","div:not(.disabled)",function(){
                toast("不能选择自己！",600).warn();
            });
            opener.find("#dict-wrap-group").off("click").on("click","div:not(.disabled)",function(){
                var input = obj.siblings("input[type='text']");//页面上需要填入的input
                input.val($(this).find("span").text());
                var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                inputHidden.val($(this).find("span").attr("val"));

                var paramAttr = $(this).find("span").attr("paramattr");
                input.attr("paramattr",paramAttr);
                if($("#jsrLxfs").length > 0){
                    $("#jsrLxfs").val($(this).find("span").attr("phone"));
                }
                opener.$close();
            });
            opener.find("#queryBtnGroupName").off("click").on("click",function(){
                var groupName =$.trim($('#groupName').val());
                if(portAddress){
                    _selfDict.getPortList(portType,portAddress,param,chooseType,groupName);
                }else {
                    _selfDict.getGroupByIdPortList(param,groupName);
                }
            });
            opener.find("#resetBtnGroupName").off("click").on("click",function(){
                $('#groupName').val("");
            })
        },
        getGroupByIdPortList:function (param,groupName){
            _selfDict = this;
            $.extend(param,{
                groupName:groupName
            });
            $.ajax({
                url: top.servicePath_xz+'/group/getAllGroupByUserId',
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                data: param,
                success: function (r) {
                    if (r.flag == 1) {
                        var target = $("#dict-wrap-group");
                        var tpl='';
                        $.each(r.data, function (i, o) {
                            tpl+="<div class='item-value'><u><span paramattr='"+ obj2str(o) +"' val='"+o.id+"'>"+o.groupname+"</span></div></u>";
                        });
                        target.html(tpl);
                    }
                }
            });

        },
        getUserByGroupIdPortList:function (obj,param) {//单独新增的方法（vince）
            _selfDict = this;
            var title = obj.attr("title");
            window.newwin=$open('#dict-block-group',{width:400,height:300,top:100, title:'选择'+title});
            $(".dict-container").find(".query-block-row").empty();
            $post(top.servicePath_xz + '/usergroup/getUsergroupPage',param,function(r) {
                if (r.flag == 1) {
                    var target = $("#dict-wrap-group");
                    var tpl='';
                    $.each(r.data, function (i, o) {
                        tpl+="<div class='item-value'><u><span paramattr='"+ obj2str(o) +"' val='"+o.userId+"' phone='"+o.phone+"'>"+o.userName+','+o.orgName+"</span></div></u>";
                    });
                    target.html(tpl);
                    var opener = $(".panel #dict-block-group");
                    $(".query-block-row input").val("");
                    opener.find("#dict-wrap-group").off("click").on("click","div:not(.disabled)",function(){
                        toast("不能选择自己！",600).warn();
                    });
                    opener.find("#dict-wrap-group").off("click").on("click","div:not(.disabled)",function(){
                        var input = obj.siblings("input[type='text']");//页面上需要填入的input
                        input.val($(this).find("span").text());
                        var inputHidden = obj.siblings("input[type='hidden']");//页面上需要填入的input
                        inputHidden.val($(this).find("span").attr("val"));

                        var paramAttr = $(this).find("span").attr("paramattr");
                        input.attr("paramattr",paramAttr);
                        if($("#jsrLxfs").length > 0){
                            $("#jsrLxfs").val($(this).find("span").attr("phone"));
                        }
                        opener.$close();
                    });
                }
            },true);
        },
        getPortList:function (portType,portAddress,param,chooseType,groupName) {
            _selfDict = this;
            var flagThis;
            if(portType == $post){
                flagThis = true;
            } else if(portType == $get){
                flagThis = false;
            }
            $.extend(param,{groupName:groupName});
            portType(portAddress,param,function(r) {
                if (r.flag == 1) {
                    var target = $("#dict-wrap-group");
                    $(".dict-container").find(".query-block-row").empty();
                    $(".dict-container").find(".query-block-row").siblings("hr").empty();
                    var tpl='';
                    switch (chooseType){
                        case "user":
                            $.each(r.data, function (i, o) {
                                if(o.userId == top.userId){
                                    tpl+="<div class='item-value disabled'><u><span paramattr='"+ obj2str(o) +"' val='"+o.userId+"' phone='"+o.phone+"'>"+o.userName+','+o.orgName+"</span></div></u>";
                                }else {
                                    tpl+="<div class='item-value'><u><span paramattr='"+ obj2str(o) +"' val='"+o.userId+"' phone='"+o.phone+"'>"+o.userName+','+o.orgName+"</span></div></u>";

                                }
                            });
                            break;
                        case "unit":
                            $.each(r.data, function (i, o) {
                                tpl+="<div class='item-value'><u><span paramattr='"+ obj2str(o) +"' val='"+o.orgCode+"'>"+o.orgName+"</span></div></u>";
                            });
                            break;
                    }
                    target.html(tpl);
                }
            },flagThis);
        },
        closeOpenerDiv: function () {
            _selfDict = this;
            $(".panel.window").each(function (i,e) {
                if(!$(e).is(":visible")){
                    $(e).remove();
                }
            });
        }
    }
});