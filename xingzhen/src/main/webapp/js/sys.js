function trimAll(selector) {
    $(selector+' input,'+selector+' textarea').each(function (i,el) {
        var value = $(el).val();
        $(el).val(value.trim());
    });
}

//登录用户管理
function sysUserMngFn(){
    importing('dict',function() {
        var editingUser;
        $(".dict").dict();
        $('#find-organId').dict();
        $('#organId-edit').dict();
        //设置密码填写规则
        $.extend($.fn.validatebox.defaults.rules, {
            password: {
                validator: function (val) {
                    return /^[a-zA-Z]\w{2,20}$/.test(val);
                },
                message: '请，长度在3~20以字母开头之间，只能包含字母、数字和下划线'
            },
            username: {
                validator: function(val){
                    return /^\S{6,50}$/.test(val);
//                    return /^[a-zA-Z]\w{0,50}$/.test(val);
                },
                message: '请输入长度大于等于6，小于50的字符'
//                message: '请以字母开头，只能包含字母、数字和下划线，长度小于50'
            }
        });
        
        //角色字典查询
        function initRoleDict(){
            $get(top.servicePath + '/sys/role/roleDict',null,function(res){
                $('#dict-query-role').dict(res.data);
            });
        }
        //查询用户
        function queryForUser(iflog,currentPage){
            $('#user-query-result').pagingList({
                action:top.servicePath+'/sys/user/list',
                currentPage:currentPage,
                jsonObj:{
                    userName:$('#userName').val().trim(),
                    trueName:$('#trueName').val().trim(),
                    roleName:$('#query-role').val(),
                    userUnit:$('#user-unit-select option:selected').val()
                },
                callback:function(data){
                    $template('#user-table tbody',data,function(item,i){
                        var t_openFlag = item.openFlag;
                        item.openFlagTxt = item.openFlag=='1'?'启用':'禁用';
                    });
                }
            });
        }
        //重置
        function resetForQuery(){
            $('#trueName').val('');
            $('#userName').val('');
            $('#query-role').val('');
            $('#user-unit-select').val('');
        }
        //进入新增页面
        function intoUserAdd(){
            $('#choose-query-btn').off('click').on('click',function () {
                queryPerson('techAdd');
            });
            $("#user-add-form")[0].reset();
            $open('#user-add-div',{width:800,height:360,title:'用户新增'});
            $('#add-openFlag').dictSelect('1');
            // $('#add-userUnit').dictSelect('000000000000');
        }
        //进入查看页面
        function intoUserView(id) {
            $get(top.servicePath+'/sys/user/view',{id:id},function(msg){
                window.newwin = $open('#user-view-div', {width: 800, title: '用户查看'});
                $template('#user-view-value', msg.data,function(item,i){
                    var t_openFlag = item.openFlag;
                    item.openFlag = t_openFlag=='1'?'启用':'禁用';
                });
            });
        }
        //进入修改页面
        function intoUserEdit(id){
            $('#choose-query-btn').off('click').on('click',function () {
                queryPerson('techEdit');
            });
            $get(top.servicePath+'/sys/user/_edit',{id:id},function(msg) {
            	
                editingUser=msg.data;
                window.newwin=$open('#user-edit-div',{width:800, title:'用户修改'});
                if(editingUser.sysUser.userName != 'sys' && editingUser.sysUser.userName != 'admin')
                	$('#techEdit').prop('readonly', 'true').attr({'data-options':'required:true','placeholder':'请选择技术人员'});
                $('#edit-openflag').dictSelect(editingUser.sysUser.openFlag);
                $('#userNameEdit').val(editingUser.sysUser.userName);
                $('#userId').val(editingUser.sysUser.id);
                $('#techEdit').val(editingUser.sysUser.trueName);
                $('#techEdit-input').val(editingUser.sysUser.userId);
                $('#remark').val(editingUser.sysUser.remark);
                if(editingUser.sysUser.userLevel==9){
                	$('#techEdit-button').addClass('hide')
                }else{
                	$('#techEdit-button').removeClass('hide')
                }
                top.registry.sys.checkRoles=[];
                top.registry.sys.checkRoleIds=[];
                $template('#role-table tbody',editingUser.roleList,function(item,i){
                    if(editingUser.sysUserRoleIds.indexOf(item.id)>-1){
                        //如果用户已有该项权限则勾上，但前提是没有手动操作过
                        if(typeof top.registry.sys.checkRoles[item.rownum]=='undefined'){
                            item._checked=top.registry.sys.checkRoles[item.rownum]='checked';
                            top.registry.sys.checkRoleIds[item.rownum]=item.id;
                        }
                    }
                    item._checked=top.registry.sys.checkRoles[item.rownum];
                });
            });           
        }
       
        //删除用户
        function deleteForUser(id,userName){
            $confirm('确定删除【'+userName+'】用户吗？',function(bol){
                if(bol){
                    $delete(top.servicePath+'/sys/user/'+id+'/delete',null,function(res){
                        toast('删除成功！').ok();
                        queryForUser(false, $('.paging').data('currentPage'));
                    },false);
                }
            });
        }
        //新增保存用户
        function saveUser(){
            trimAll();
            $('.user-add-valid').validatebox();
            if($('.validatebox-invalid').length > 0){
                return false;
            }
            param = $("#user-add-form").serializeObject();
            param = $.extend(param,{createUser:top.trueName,modifyUser:top.trueName});
            $post(top.servicePath+'/sys/user/add',param, function(res){
                userCloseWin('user-add-div');
                toast('新增成功！',600,function(){
                    intoUserEdit(res.id);
                }).ok();
                queryForUser(false);
            },true);
        }
        //修改保存用户
        function updateUser(){
            trimAll();
            $('.user-edit-valid').validatebox();
            if($('.validatebox-invalid').length > 0){
                return false;
            }
            $('#sysUserRoleIds').val(top.registry.sys.checkRoleIds.where('item=>item!=null').join());
            param = $("#user-edit-form").serializeObject();
            param = $.extend(param,{createUser:top.trueName,modifyUser:top.trueName});
            $post(top.servicePath+'/sys/user/edit',param,function(res){
                userCloseWin('user-edit-div');
                toast('修改成功！').ok();
                queryForUser(false,$('.paging').data('currentPage'));
            },true);
        }
        //关闭窗口
        function userCloseWin(id){
            $('#'+id).$close();
            $('.user-add-valid').removeClass("validatebox-invalid");
            $('.user-edit-valid').removeClass("validatebox-invalid");
        }

      //选择人员
        function choosePerson(type){
            $('#choose-user').val('');
            var userName = document.getElementById('choose-user').value;
            $('#person-list-block').pagingList({
                action:top.servicePath+'/sys/user/choosePerson',
                jsonObj:{userName:userName},
                callback:function(data){
                    $('#communicate-choose .user-rows').template( data);//数据填充
                    $open('#add-person-block',{width:750,title:'&nbsp;人员选择'});
                    $('.tr-chose').on('click',function () {
                        inputPerson(this.getAttribute('param'),this.getAttribute('paramId'),type);
                    })
                }
            });
        }
        

        //查询人员
        function queryPerson(type){
            var userName = document.getElementById('choose-user').value;
            $('#person-list-block').pagingList({
                action:top.servicePath+'/sys/user/choosePerson',
                jsonObj:{userName:userName},
                callback:function(data){
                    $('#communicate-choose .user-rows').template( data);//数据填充
                    $('.tr-chose').on('click',function () {
                        inputPerson(this.getAttribute('param'),this.getAttribute('paramId'),type);
                    })
                }
            });
        }


        //置入人员信息
        function inputPerson(userName,id,personType){
            $('#'+personType).val(userName);
            $('#'+personType+'-input').val(id);
            $('#add-person-block').$close();
        }


        //点击事件绑定页面列表排序函数
        function regOrder(){
            var flag=0;//desc
            var sortName;
            var order;
        }

        regOrder();

        //初始化角色字典
        initRoleDict();
        //单位
        $post(top.servicePath+'/sys/org/getOrgTreeList',{orgLevel:1,status:0},function(response) {
            $('#user-unit-select').template(response.data);//数据填充
            $('#user-unit-select').prepend('<option value="" selected>广东省公安厅刑侦局</option>')
        },true);
        queryForUser(false);

        $('#user-add').click(function(){
            intoUserAdd();
        });
        $('#user-query-btn').on('click',function(){
            if($('.sort-arrow')) $('.sort-arrow').remove();
            queryForUser(true);
        });
        $('#user-reset-btn').on('click',function(){
            resetForQuery();
        });
        $('#save-user').on('click',function(){
            saveUser();
        });
        $('#user-add-cancel').on('click',function(){
            userCloseWin('user-add-div');
        });
        $('#update-user').on('click',function(){
            updateUser();
        });
        $('#user-edit-cancel').on('click',function(){
            userCloseWin('user-edit-div');
        });
        $('#user-view-cancel').on('click',function(){
            userCloseWin('user-view-div');
        });
        $('#user-table').on('click','.into-user-view',function(){
            intoUserView(this.getAttribute('param'));
        }).on('click','.into-user-edit',function(){
            intoUserEdit(this.getAttribute('param'));
        }).on('click','.delete-for-user',function(){
            deleteForUser(this.getAttribute('param'),this.getAttribute('paramName'));
        });
        $('#user-edit-div,#user-add-div').on('click','.tech-button',function () {
            choosePerson(this.getAttribute('param'));
        });
        $('#role-table').on('click','.check-role',function(i,ele){
            var rownum=+(this.getAttribute('rownum'));
            var roleId=this.getAttribute('id');
            if(this.checked){
                top.registry.sys.checkRoles[rownum]='checked';
                top.registry.sys.checkRoleIds[rownum]=roleId;
            }else{
                top.registry.sys.checkRoles[rownum]=null;
                top.registry.sys.checkRoleIds[rownum]=null;
            }
        });
    });
}
//系统角色管理
function sysRoleMngFn() {
    importing('dict','ztree',function() {
        var permisTree = $("#permis-tree");
        var v_roleId;//角色id
        var v_role;//选择权限页面需要保存角色信息
        var zTreeObj;

        var nodes = [];
        var setting = {
            check: {
                enable:true
            },
            data: {
                simpleData: {
                    enable:'pid',		//扁平数据，pid表示父节点的ID
                    idKey:'id',
                    pIdKey:'pid'		//默认的pId改为pid，注意默认I为大写
                }
            },
            view: {
                showIcon:false,
                showTitle:false
            }
        };

        $('.dict').dict();

        //查询角色列表
        function queryForRole(iflog, currentPage){
            $('#role-query-result').pagingList({
                action:top.servicePath+'/sys/role/list',
                currentPage:currentPage,
                jsonObj:{
                    roleName:$('#roleName').val().trim(),
                    description:$('#roleDesc').val().trim()
                },
                callback:function(data){
                    $template('#role-table tbody',data,function(item,i){
                        item.openFlagTxt = item.openFlag=='1'?'启用':'禁用';
                        item.fixedRole = item.roleNameEn == null ? '1' : null;//roleNameEn为空，可以删除；不为空，表示固定角色，不可以删除
                    });
                }
            });
        }
        //重置
        function resetForRole(){
            $('#roleName').val('');
            $('#roleDesc').val('');
        }
        //进入新增角色页面
        function intoRoleAdd() {
            $("#add-role-form")[0].reset();
            $('#add-role-openFlag').dictSelect('1');
            $open('#add-role-div', {width: 800, height: 300, title: '角色新增'});
        }
        //进入修改角色页面
        function intoRoleEdit(id){
            $get(top.servicePath+'/sys/role/_edit',{id:id},function(res){
                var t_role = res.data;
                $open('#edit-role-div', {width: 800, height: 300, title: '角色修改'});
                $template('#edit-role-form', t_role);
                $('#edit-role-openFlag').dictSelect(t_role.openFlag);
                $('input[name="roleId"]').val(t_role.id);
            });
        }
        //进入选择权限页面
        function intoChoosePermis(id,moduleId){
            $get(top.servicePath+'/sys/role/_permission',{id:id,moduleId:moduleId},function(res){
                v_role = res.data;
                $open('#choose-permis-div',{width:600,height:450,title:'权限选择（'+v_role.sysRole.roleName+'）'});
                v_roleId = v_role.sysRole.id;
                $template('#all-module',v_role.sysModuleList);
                $template('#m-p-checkbox',v_role.permission);
                $('#all-module li a').removeClass('current-module');
                $('#all-module li:first-child a').addClass('current-module');
                intoPermisZtree(v_role.sysRole.id,v_role.sysModuleList[0].id);
            });
        }
        //进入选择用户页面
        function intoChooseUser(id){
            $get(top.servicePath+'/sys/role/_user',{id:id},function(res){
                var t_role = res.data;
                $open('#choose-user-div',{width:640, height:450, title:'用户选择（'+t_role.sysRole.roleName+'）'});
                v_roleId = t_role.sysRole.id;
                $template('#select-user',t_role.associatedUserList);
                $template('#all-user',t_role.allUserList);
            });
        }
        //进入模块权限ztree
        function intoPermisZtree(roleId,moduleId){
            $get(top.servicePath+'/sys/role/_permission',{id:roleId,moduleId:moduleId},function(res){
                var t_sysRole = res.data;
                var l_permis = t_sysRole.sysRolePermisList;//当前角色下所有权限的数组
                nodes = [];

                $('#m-p-checkbox').template(t_sysRole.permission);

                showPermisZtree(nodes, t_sysRole.moduleList, l_permis);
              
                $('.m-p-value').each(function(e){
                    for(var n=0;n<l_permis.length;n++){
                        if($(this).val() == l_permis[n].permissionId){
                            $(this).prop('checked',true);
                            break;
                        }
                    }
                });
                zTreeObj = $('#permis-tree').ztree(setting, nodes);
            });
        }
        //模块权限ztree的设置
        function showPermisZtree(nodes, moduleList, sysRolePermisList){
            var l_module = moduleList; //模块
            var l_permis = sysRolePermisList; //所有权限
            var l_m_permis;
            var m_if_check = false, if_check = false;  //m_if_check 模块是否勾选复选框  if_check某个树节点是否勾选复选框

            if(l_module != null) {
                l_module.forEach(function (m, i) {  //对模块进行遍历
                    m_if_check = false;
                    l_m_permis = m.sysModulepermissionList; //获取该模块下的操作数组

                    l_m_permis.forEach(function (m_p, j) { //对模块下的操作进行判断是否勾选上复选框
                        l_permis.forEach(function (p, k) {
                            if (m_p.id == p.permissionId) { //判断是否拥有权限
                                m_if_check = true; //判断该模块是否勾上复选框
                                if_check = true; //判断该操作是否勾上复选框
                                return false;
                            }
                        });

                        //对模块没有权限、该模块又存在子模块，判断子模块有没有权限，子模块有权限，则把该模块的复选框勾上
                        if(!m_if_check && m.sonMouleList!=null && m.sonMouleList.length > 0){
                            m.sonMouleList.forEach(function(s_m){
                                s_m.sysModulepermissionList.forEach(function(s_m_p){ //对模块的子模块进行权限的判断
                                    l_permis.forEach(function(s_p){
                                        if(s_m_p.id == s_p.permissionId){
                                            m_if_check = true;
                                            return false;
                                        }
                                    });
                                    if(m_if_check){
                                        return false;
                                    }
                                });
                                if(m_if_check){
                                    return false;
                                }
                            });
                        }

                        nodes.push({id: m_p.id, pid: m.id, name: m_p.description, checked: if_check, sort: i});
                        if_check = false;
                    });

                    nodes.push({id: m.id, pid: m.parentId, name: m.title, checked: m_if_check, sort: i});
                    m_if_check = false;

                    //模块下子模块
                    showPermisZtree(nodes, m.sonMouleList, sysRolePermisList);
                });
            }
        }
        //新增保存角色
        function saveRole(){
            trimAll();
            $('.role-add-valid').validatebox();
            if($('.validatebox-invalid').length > 0){
                return false;
            }
            param = $("#add-role-form").serializeObject();
            param = $.extend(param,{createPid:top.trueName,modifyPid:top.trueName});
            $post(top.servicePath+'/sys/role/add',param,function(res){
                roleCloseWin('add-role-div');
                toast('新增成功！').ok();
                queryForRole(false);
            },true);
        }
        //修改保存角色
        function updateRole(){
            trimAll();
            $('.role-edit-valid').validatebox();
            if($('.validatebox-invalid').length > 0){
                return false;
            }
            param = $('#edit-role-form').serializeObject()
            param = $.extend(param,{modifyPid:top.trueName});
            $post(top.servicePath+'/sys/role/edit',param,function(res){
                roleCloseWin('edit-role-div');
                toast('修改成功！').ok();
                queryForRole(false, $('.paging').data('currentPage'));
            },true);
        }
        //删除角色
        function deleteRole(id,trueName){
            $confirm('确定删除【'+trueName+'】角色吗？',function(bol){
                if(bol){
                    $delete(top.servicePath+'/sys/role/'+id+'/delete',null,function(res){
                        toast('删除成功！').ok();
                        queryForRole(false, $('.paging').data('currentPage'));
                    },false);
                }
            });
        }
        //角色授权
        function authRole(){
        	
            var t_treeObj = $.fn.zTree.getZTreeObj('permis-tree');
            var t_all_nodes = t_treeObj.transformToArray(t_treeObj.getNodes());//获取原来的所有树节点
            var t_nodes = t_treeObj.getCheckedNodes(true);//选中的节点
            var allNodes = [];//所有节点的id
            var selectNodes = [];//选中节点的id
            
            $('.m-p-value').each(function(){
                allNodes.push($(this).val());
                if($(this).prop('checked')){
                    selectNodes.push($(this).val());
                }
            });
            for(var i=0;i<t_all_nodes.length;i++){
                if(!t_all_nodes[i].isParent){
                    allNodes.push(t_all_nodes[i].id);
                }
            }
            for(var i=0;i<t_nodes.length;i++){
                if(!t_nodes[i].isParent){
                    selectNodes.push(t_nodes[i].id);
                }
            }
            param = {
            		roleId:v_roleId,
            		currentRolePermisIds:allNodes.join(),
            		sysRolePermisIds:selectNodes.join(),
            		userName:top.userName
            }
            $post(top.servicePath+'/sys/role/permission',param,function(res){
                toast('授权成功！').ok();
            },true);
        }
        //关闭窗口
        function roleCloseWin(id){
            $('#'+id).$close();
            $('.role-add-valid').removeClass('validatebox-invalid');
            $('.role-edit-valid').removeClass('validatebox-invalid');
        }

        queryForRole(false);

        $('#role-query').on('click',function(){
            queryForRole(true);
        });
        $('#role-reset').on('click',function(){
            resetForRole();
        });
        $('#into-role-add').on('click',function(){
            intoRoleAdd();
        });
        $('#save-role').on('click',function(){
            saveRole();
        });
        $('#add-role-cancel').on('click',function(){
            roleCloseWin('add-role-div');
        });

        $('#role-table').on('click','.into-role-edit',function(){
            intoRoleEdit(this.getAttribute('param'));
        }).on('click','.into-choose-user',function(){
            intoChooseUser(this.getAttribute('param'));
        }).on('click','.into-choose-permis',function(){
            intoChoosePermis(this.getAttribute('param'),'');
        }).on('click','.delete-role',function(){
            deleteRole(this.getAttribute('param'),this.getAttribute('paramName'));
        });
        $('#update-role').on('click',function(){
            updateRole();
        });
        $('#edit-role-cancel').on('click',function(){
            roleCloseWin('edit-role-div');
        });
        $('#all-module').on('click','.into-module-permis',function(){
            $('#all-module li a').removeClass('current-module');
            $(this).addClass('current-module');
            var t_role_id = v_roleId;
            var module_id = this.getAttribute('moduleId');
            intoPermisZtree(t_role_id,module_id);
        });
        $('#user-to-right').on('click',function(){
            var t_id = $('#select-user').val();//若没有选择需要移除的用户，t_id为null
            if(!t_id){toast('请先选择需要移除的用户').css('left','43%').warn();return false;}
            $post(top.servicePath+'/sys/role/remove_user',{id:v_roleId,associatedUserId:t_id.join()},function(res){
                $("#select-user option:selected").remove();
                toast('移除用户成功！').ok();
                //重新加载未选用户列表
                $get(top.servicePath+'/sys/role/_user',{id:v_roleId},function(res){
                    $('#all-user').template(res.data.allUserList);
                });
            },true);
        });
        $('#user-to-left').on('click',function(){
            var t_id = $('#all-user').val();//若没有选择需要添加的用户，t_id为null
            if(!t_id){toast('请先选择需要添加的用户').css('left','43%').warn();return false;}
            $post(top.servicePath+'/sys/role/add_user',{id:v_roleId,selectUserId:t_id.join()},function(res){
                $("#all-user option:selected").remove();
                toast('添加用户成功！').ok();
                //重新加载已选用户列表
                $get(top.servicePath+'/sys/role/_user',{id:v_roleId},function(res){
                    $('#select-user').template(res.data.associatedUserList);
                });
            },true);
        });
        $('#choose-user-cancel').on('click',function(){
            roleCloseWin('choose-user-div');
        });
        $('#auth-role-cancel').on('click',function(){
            roleCloseWin('choose-permis-div');
        });
        $('#auth-role').on('click',function(){
            authRole();
        });
    });
}
//系统登录日志
function sysLoginLogFn() {
    importing('datepicker',function(){
        $("#query-date").daterangepicker({
            separator: ' 至 ',
            showWeekNumbers : true,
            pickTime:true
        },function(start, end, label) {
            $('#loginDateBegin').val(start.format('YYYY-MM-DD'));
            $('#loginDateEnd').val(end.format('YYYY-MM-DD'));
        });
        queryForLoginlog();

        //查询登录日志列表
        function queryForLoginlog(){
            $('#loginlog-query-result').pagingList({
                action:top.servicePath+'/sys/login/log',
                jsonObj:{
                    oprUser:$('#loginName').val().trim(),
                    logDateBegin:$('#loginDateBegin').val(),
                    logDateEnd:$('#loginDateEnd').val()
                },
                callback:function(data){
                    $('#loginlog-table tbody').template(data);
                }
            });
        }

        $('#loginlog-query-btn').on('click',function(){
            var t_beginDate = $('#loginDateBegin').val();
            var t_endDate = $('#loginDateEnd').val();
            if(!t_beginDate.isEmpty() && !t_endDate.isEmpty() && t_beginDate > t_endDate){
                toast('登录开始时间不能大于结束时间！').css('width','300px').warn();
                return false;
            }
            queryForLoginlog();
        });
        $('#loginlog-reset-btn').on('click',function(){
            $('#loginName').val('');
            $('#loginDateBegin').val('');
            $('#loginDateEnd').val('');
        });
    });
}

//设定默认ajax开始和结束时的loading遮罩效果(#post自带,paginglist没有自带)
$.ajaxSetup({
    beforeSend:showLoading,
    complete:hideLoading
});

function sysXtdhFn() {
    importing('dict', function () {
        var   xtdhDeleteAction = top.servicePath + '/api/0/sys/xtdh/delete',
            xtdhAddAction = top.servicePath + '/api/0/sys/xtdh/add',
            xtdhEditAction = top.servicePath + '/api/0/sys/xtdh/edit',
            xtdhViewAction = top.servicePath + '/api/0/sys/xtdh/xtdh_info',
            xtdhListAction = top.servicePath + '/api/0/sys/xtdh/list',
            pictureAction = top.servicePath + '/api/0/sys/xtdh/photo_new';
        var xtdhDeleteLimit = top.ops['system-xtdh-delete'],
            xtdhEditLimit = top.ops['system-xtdh-edit'],
            xtdhAddLimit = top.ops['system-xtdh-add'];

        $('.dict').dict();

        $filter('isNotNull',function(){
            return this != '' && this != null && this != undefined;
        });
        
        //初始化方法
        function init() {
            //加载设备列表数据
            loadXtdhList();
        }

        //初始化窗口数据
        function initWinData(type) {
            var that = $(this),
                id = that.attr('dataId');
            $post(xtdhViewAction, {id: id}, function (res) {
                var data = res.data;
                $('#' + type + '-systemName').val(data.systemName);
                $('#' + type + '-systemCode').val(data.systemCode);
                $('#' + type + '-sort').val(data.sort);
                $('#' + type + '-systemAddr').val(data.systemAddr);
                $('#' + type + '-systemUnit').dictSelect(data.systemUnit);
                $('#' + type + '-jhPara').val(data.jhPara);
                $('#' + type + '-sfzhPara').val(data.sfzhPara);
                if(data.photo) {
                    $('#edit-img0').attr("src", "data:image/jpg;base64," + data.photo);
                }
                if (type == 'edit') {
                    $('#edit-id').val(id);
                    $('#edit-sort-last').html('');
                    $('#edit-login').val('1');
                    $('#edit-notLogin').val('0');
                    $('#edit-p-file').val('');
                    $('#edit-ifJh').val('1');
                    $('#edit-ifSfzh').val('1');
                    if(data.ifLogin == 1) {
                        $('#edit-login').prop('checked', true);
                    } else {
                        $('#edit-notLogin').prop('checked', true);
                    }
                    $('#edit-ifJh').prop('checked', data.ifJh == '1' ? true:false);
                    $('#edit-ifSfzh').prop('checked', data.ifSfzh == '1' ? true:false);
                    changeDL(data.ifLogin,'edit');
                    $("input[name='ifLogin']").off('click').click(function(){
                        changeDL(this.value,'edit');
                    });
                    $("#edit-ifJh").click(function(){
                        changeDlType('edit', 'jhPara', $(this).prop("checked"));
                    });
                    $("#edit-ifSfzh").click(function(){
                        changeDlType('edit', 'sfzhPara', $(this).prop("checked"));
                    });
                    $post(xtdhListAction, {sortName: 'sort', sortOrder:'asc'}, function (res) {
                        var thisObj = res.data.where('o=>o.id=="'+id+'"');
                        if(thisObj[0].rownum > 1) {
                            var systemCode = res.data[thisObj[0].rownum - 2].systemCode;
                            var sort = res.data[thisObj[0].rownum - 2].sort;
                            $('#edit-sort-last').html('上一个' + systemCode + ' ' + sort);
                            $('#edit-sort-last').off('click').click(function () {
                                $open('#xtdh-sort-div', {title: '显示顺序', width: 320});
                                $template('#xtdh-sort-table tbody', res.data);
                            });
                        }
                    });
                } else {

                }
            });

        }
        //改变登录状态
        function changeDlType(type, dlType, ifSelect) {
            if(ifSelect) {
                $('#'+type+'-'+dlType).addClass("validate");
            } else {
                $('#'+type+'-'+dlType).removeClass("validate validatebox-invalid").val("");
            }
        }
        //改变登录状态
        function changeDL(ifDL, type) {
            var dddl =   $('#'+type+'-dddl');
            if(ifDL == '1') {
                if(dddl.hasClass('hidePlus')){dddl.removeClass('hidePlus');}
            } else {
                if(!dddl.hasClass('hidePlus')){dddl.addClass('hidePlus');}
                changeDlType(type, 'jhPara', false);
                changeDlType(type, 'sfzhPara', false);
                $('#'+type+'-ifJh').prop('checked', false);
                $('#'+type+'-ifSfzh').prop('checked', false);
            }
        }
        //保存
        function saveXtdh(action, params, winId, formId, type) {
            //验证
            $(winId + ' .validate').validatebox();
            if ($('.validatebox-invalid').length > 0) {
                return false;
            }
            //保存
            $post(action, params, function (res) {
                dhId = res.data;
                var data = new FormData(document.querySelector('.'+type+'-p-file-form'));
                if($('#'+type+'-p-file').val()) {
                    $.ajax({
                        url: action2link(pictureAction) + '&dhId=' + dhId,
                        type: 'POST',
                        data: data,
                        dataType: 'json',
                        async: false,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (resPhoto) {
                            if (resPhoto.flag == 1) {
                                saveSuccess(winId, formId, res.msg);
                            } else {
                                console.info(resPhoto);
                            }
                        }
                    });
                } else {
                    saveSuccess(winId, formId, res.msg);
                }
            }, true);



        }


        function saveSuccess(winId, formId, msgInfo) {
            var msg = msgInfo ? msgInfo : '保存成功！';
            closeWin(winId, formId);
            toast(msg, 600).ok();
            //加载列表数据
            loadXtdhList($('.paging').data('currentPage'));
        }

        //关闭弹窗
        function closeWin(winId, formId) {
            if (winId) {
                $(winId).$close();
            }
            if (formId) {
                $(formId)[0].reset();
                $(formId).find('input').val('');
            }
            $('.validate').removeClass('validatebox-invalid');
        }

        //查询
        $('#query-btn').on('click', function () {
            if ($('.sort-arrow')) $('.sort-arrow').remove();
            loadXtdhList();
        });
        //重置
        $('#reset-btn').on('click', function () {
            var queryForm = $('#xtdh-form');
            queryForm[0].reset();
            queryForm.find('input').val('');
        });
        //新增
        $('.cm-add-btn').on('click', function () {
            $('#add-img0').attr('src',top.path + '/img/replace_photo.png');
            $post(xtdhListAction, {sortName: 'sort', sortOrder:'asc'}, function (res) {
                var systemCode = res.data[res.data.length - 1].systemCode;
                var sort = res.data[res.data.length - 1].sort;
                $('#add-sort-last').html('上一个' + systemCode + ' ' + sort);
                $('#add-sort-last').off('click').click(function () {
                    $open('#xtdh-sort-div', {title: '显示顺序', width: 320});
                    $template('#xtdh-sort-table tbody', res.data);
                });
            });

            $('#add-form')[0].reset();
            $('#add-form').find('input').val('');
            $('#add-p-file').val('');
            $('#add-login').val('1');
            $('#add-ifJh').val('1');
            $('#add-ifSfzh').val('1');
            $('#add-notLogin').val('0');
            $open('#xtdh-add-div', {title: '添加系统导航', width: 820});
            changeDL('0','add');
            $("input[name='ifLogin']").off('click').click(function(){
                changeDL(this.value,'add');
            });
            $("#add-ifJh").click(function(){
                changeDlType('add', 'jhPara', $(this).prop("checked"));
            });
            $("#add-ifSfzh").click(function(){
                changeDlType('add', 'sfzhPara', $(this).prop("checked"));
            });
        });
        //关闭新增弹窗
        $('#add-close-btn').on('click', function () {
            closeWin('#xtdh-add-div', '#add-form');
        });
        //保存新增内容
        $('#add-save-btn').on('click', function () {
            var checked = $('#add-login').prop("checked");
            if(checked) {
                if(!($('#add-ifSfzh').prop("checked") || $('#add-ifJh').prop("checked"))) {
                    toast('请选择单点登录类型', 600).warn();
                    return false;
                }
            }
            $('#add-systemCunit').val($('#add-systemUnit-dict_displayValue').val());
            saveXtdh(xtdhAddAction, $('#add-form').serializeObject(), '#xtdh-add-div', '#add-form', 'add');
        });
        //关闭修改弹窗
        $('#edit-close-btn').on('click', function () {
            closeWin('#xtdh-edit-div', '#edit-form');
        });
        //关闭修改弹窗
        $('#check-close-btn').on('click', function () {
            closeWin('#xtdh-check-div', '#check-form');
        });
        //保存修改内容
        $('#edit-save-btn').on('click', function () {
            var checked = $('#edit-login').prop("checked");
            if(checked) {
                if(!($('#edit-ifSfzh').prop("checked") || $('#edit-ifJh').prop("checked"))) {
                    toast('请选择单点登录类型', 600).warn();
                    return false;
                }
            }
            //document.getElementById(type+'-systemCunit').value = $('#'+type+'-systemUnit-dict_displayValue').val();
            $('#edit-systemCunit').val($('#edit-systemUnit-dict_displayValue').val());
            saveXtdh(xtdhEditAction, $('#edit-form').serializeObject(), '#xtdh-edit-div', '#edit-form', 'edit');
        });
        //初始化
        init();
        if (xtdhAddLimit) {
            $('.cm-add-btn').removeClass('hidePlus');
        }


        //回调函数
        function pageBackXtdh(data) {
            pageData = data;
            $template('#xtdh-info-table tbody', data, function (item, i) {
                item.deleteLimit = xtdhDeleteLimit;
                item.editLimit = xtdhEditLimit;
                log(data);
            }, true);
            $('.picshow').previewBox();
            //查看
            $('.into-xtdh-view').on('click', function () {
                $open('#xtdh-check-div', {title: '系统导航查看', width: 820});
                //初始化修改弹窗数据
                initWinData.call(this, 'check');
            });
            //修改
            $('.icon-edit-btn').on('click', function () {
                $('#edit-img0').attr('src',top.servicePath + '/img/replace_photo.png');
                $open('#xtdh-edit-div', {title: '系统导航修改', width: 820});
                //初始化修改弹窗数据
                initWinData.call(this, 'edit');
            });
            //删除
            $('.delete-for-xtdh').on('click', function () {
                var id = $(this).attr('dataId');
                var name = $(this).attr('name');
                $confirm('确定删除' + name + '吗？', function (del) {
                    if (del) {
                        $post(xtdhDeleteAction, {id: id}, function (res) {
                            var msg = res.msg ? res.msg : '删除成功！';
                            toast(msg, 600).ok();
                            //加载设备列表数据
                            loadXtdhList($('.paging').data('currentPage'));
                        });
                    }
                });
            });
        }

        //载入列表
        function loadXtdhList(currentPage) {
            $('#xtdh-query-result').pagingList({
                action: xtdhListAction,
                currentPage: currentPage,
                jsonObj: $('#xtdh-form').serializeObject(),
                callback: pageBackXtdh
            });
        }

        //立即预览本地图片(选中尚未上传的)
        function previewUpImgBase64(upInput,preImg){
            typeof upInput=='string' && (upInput=document.getElementById(upInput));
            typeof preImg=='string' && (preImg=document.getElementById(preImg));

            var file=upInput.files[0];
            var reader=new FileReader();

            reader.onload = function() {
                preImg.src=this.result;
            }
            reader.readAsDataURL(file);
        }

        document.getElementById('add-p-file').onchange=function(){
            previewUpImgBase64('add-p-file','add-img0');
        };
        document.getElementById('edit-p-file').onchange=function(){
            previewUpImgBase64('edit-p-file','edit-img0');
        };

    });
}

//系统模块参数管理
function sysXtmkglHtml(){
    importing('ztree','dict',function () {
        var moduleInfo,
            moduleId,
            treeObj,
            setting = {
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
                        loadModuleInfo(treeNode);
                    }
                }
            };

        //初始化页面
        function initPageData(isFirst,delPid,editName) {
            $get(top.servicePath+'/sys/module',null,function (res) {
                var nodes = [];
                moduleInfo = res.data,
                    treeNode = {};
                for (var i = 0; i < moduleInfo.length; i++) {
                    if(moduleInfo[i].parentId==null){
                        nodes.push({id:moduleInfo[i].id,pid:0,name:moduleInfo[i].title,sort:i});
                    }else{
                        nodes.push({id:moduleInfo[i].id,pid:moduleInfo[i].parentId,name:moduleInfo[i].title,sort:i});
                    }
                }

                //新api, 发动和获得树对象一步完成,调用逻辑更清晰
                treeObj =$('#module-tree').ztree( setting, nodes);
                //treeObj.expandAll(true);//默认展开全部节点
                if(isFirst){
                    loadModuleInfo(treeObj.getNodes()[0]);
                }
                if(delPid){
                    treeNode = treeObj.getNodeByParam('id',delPid);
                    loadModuleInfo(treeNode);
                    treeObj.selectNode(treeNode);
                    treeObj.expandNode(treeNode);
                }
                if(editName){
                    treeNode = treeObj.getNodeByParam('name',editName);
                    loadModuleInfo(treeNode);
                    treeObj.selectNode(treeNode);
                }
            });
        }
        //点击树节点加载数据
        function loadModuleInfo(treeNode){
            $get(top.servicePath+'/sys/module/'+treeNode.id+'/view',null,function(res){
                var data = res.data,
                    subRights = [];

                if(data.length<=0){
                    $('#module-tip').show();
                    $('#module-content').hide();
                    return false;
                }
                $('#sub-rights-table').hide().find('tbody').html('');
                for (var i = 0; i < data.length; i++) {
                    if (data[i].permissionFlag == "0") { //主权限
                        $template('#main-rights', data[i]);
                        moduleId = data[i].moduleId;
                        $('#open-flag').dictSelect(data[i].openFlag);
                        document.getElementById('open-flag').disabled="disabled";
                    }else if(data[i].permissionFlag == "1"){ //子权限
                        subRights.push(str2obj('{"permissionDescription":"'+data[i].permissionDescription+'","operateNo":"'+data[i].operateNo+'"}'));
                    }
                }
                //加载子权限数据
                if(subRights.length>0){
                    $('#sub-rights-table').show();
                    $template('#sub-rights-table tbody',subRights);
                    clickToRemoveSubRights();
                    subRights = [];
                }
                $('#module-content table input,#module-content table select').addClass('no-edit').prop('readonly','readonly');

                //注册新增同级模块事件
                $('#add-same-btn').on('click',function () {
                    addModule(true);
                });
                //注册新增下级模块事件
                $('#add-lower-btn').on('click',function () {
                    addModule(false,treeNode.id);
                });
                //保存修改模块事件
                $('#save-add-btn').on('click',function () {
                    var paramsObj = {};
                    trimAll('#module-content');
                    $('.validate').validatebox();
                    if($('.validatebox-invalid').length>0){
                        return false;
                    }
                    paramsObj = $('#add-form').serializeObject();
                    paramsObj = $.extend(paramsObj,{updateUser:top.userId});
                    if(treeNode.id === 'EBCDEFGHABCDEFGHABCDEFGH22222201'){
                        paramsObj = $.extend(paramsObj,{openFlag:'1'});
                    }
                    $post(top.servicePath+'/sys/module/update',paramsObj,function (res) {
                        var msg = res.msg?res.msg:'保存成功！';
                        toast(msg,600).ok();
                        initPageData(false,false,$('#title').val());
                    },true);

                });

                //保存新增模块事件
                $('#save-save-btn').on('click',function () {
                    var resourceStrVal,moduleNoVal;

                    trimAll('#module-content');

                    resourceStrVal = $('#resourceStr').val();
                    moduleNoVal = $('#moduleNo').val();
                    //模块代号或页面代号为空时，将另一个有值的代号赋值给它
                    if(moduleNoVal === ''){
                        $('#moduleNo').val(resourceStrVal);
                    }
                    if(resourceStrVal === ''){
                        $('#resourceStr').val(moduleNoVal);
                    }

                    $('.validate').validatebox();
                    if($('.validatebox-invalid').length>0){
                        return false;
                    }
                    param = $('#add-form').serializeObject();
                    param = $.extend(param,{createUser:top.userId});
                    $post(top.servicePath+'/sys/module/add',param,function (res) {
                        var msg = res.msg?res.msg:'保存成功！';
                        toast(msg,600).ok();
                        initPageData(false,false,$('#title').val());
                    },true);
                });
                //绑定修改节点事件
                $('#edit-btn').on('click',function () {
                    var selector = '';
                    //首页的启用标志不可编辑
                    if(treeNode.id === 'EBCDEFGHABCDEFGHABCDEFGH22222201'){
                        selector = '[name!="openFlag"]';
                    }else{
                        $('#open-flag').removeAttr("disabled");
                    }
                    $('#module-content table input[name!="moduleNo"],#module-content table select'+selector).removeClass('no-edit').removeAttr('readonly');//input加上边框
                    $('.load-module,.add-module').hide();
                    $('#sub-rights-table').show();
                    $('.edit-module').show();
                    //根节点模块代号可编辑
                    if(!treeNode.getParentNode()){
                        $('#moduleNo').removeClass('no-edit').removeAttr('readonly');//input加上边框
                    }
                });
                //注册返回事件
                $('#save-return-btn').on('click',function () {
                    loadModuleInfo(treeNode);
                });

                $('#module-tip').hide();
                $('#module-content').show();
                $('.edit-module,.add-module').hide();
                $('.load-module').show();

                if(treeNode.isParent){
                    $('#delete-btn,.c-mod').hide();//有子节点的节点隐藏“删除节点”按钮
                    if(treeNode.children.length>1){//有一个以上子节点的显示默认进入
                        $('.default-into').show();
                        $('#url-col').removeAttr('colspan');
                    }else{
                        $('.default-into').hide();
                        $('#url-col').attr('colspan','3');
                    }
                    $('.p-mod').show();
                }else{
                    $('#delete-btn').show().on('click',function(){
                        deleteModuleInfo(moduleId,treeNode);
                    });
                    $('.c-mod').show();
                    $('.default-into,.p-mod').hide();
                    $('#url-col').attr('colspan','3');
                }
                $('#save-save-btn').hide();
            });
        }

        //删除节点
        function deleteModuleInfo(id,treeNode){
            $confirm('确认删除【'+treeNode.name+'】节点？',function(bol) {
                if (bol) {
                    $delete(top.servicePath+'/sys/module/'+id+'/delete',{},function (res) {
                        var msg = res.msg?res.msg:'删除成功！';
                        toast(msg,600).ok();
                        initPageData(false,treeNode.pid);
                        if(!treeNode.pid){
                            loadModuleInfo(treeObj.getNodes()[0]);
                        }
                    },true);
                }
            });
        }
        //点击删除一行子权限
        function clickToRemoveSubRights() {
            $('.sub-rights-remove').one('click',function () {
                $(this).parent().parent().remove();
            });
        }
        //新增同级或下级模块
        function addModule(sameLevel,pid) {
            $('#open-flag').removeAttr("disabled");
            $('.load-module,.edit-module').hide();
            $('.add-module').show();
            $('#module-content table input[name!="moduleNo"],#module-content table select').removeClass('no-edit').removeAttr('readonly').val('');//input加上边框，内容置空
            $('#sub-rights-table tbody').html('');//新增时移除子权限table里面的内容
            $('#sub-rights-table').show();

            if(!sameLevel){//新增下级模块时
                $('#parent-id').val(moduleId).attr("readonly","true").addClass('no-edit');
                $('#parent-id').parent().parent().show();
                $('.p-mod').hide();
                $('.c-mod').show();
            }else{//新增同级模块时
                $('#moduleNo').removeClass('no-edit').removeAttr('readonly').val('');
            }
            $('#save-add-btn').hide();
            $('#save-save-btn').show();
            $('#open-flag').dictSelect(1);
        }
        //扩展验证
        $.extend($.fn.validatebox.defaults.rules, {
            letter: {
                validator: function (val) {
                    return /^[\w|-]+$/.test(val);
                },
                message: '请输入字母、数字、中划线及下划线'
            },
            //验证汉字、英文、数字
            chEnName: {
                validator: function (value) {
                    return /^[\u0391-\uFFE5]+[a-z|A-Z|\d]*$/.test(value);
                },
                message: '请输入中文（后面可以包含英文或数字）'
            }
        });
        initPageData(true);
        $('#open-flag').dict();

        //注册点击添加子权限事件
        $('#sub-rights-plus').on('click',function () {
            $('#sub-rights-table tbody').append('<tr><td><span class="add-module edit-module orangered">★ </span>子权限描述：</td><td><input name="descriptionArray" type="text" class="common-input validate" data-options="required:true"></td><td><span class="add-module edit-module orangered">★ </span>子权限代号：</td><td><input name="resourceArray" type="text" class="common-input validate" data-options="required:true"><i class="icon-remove sub-rights-remove"></i></td></tr>');
            //绑定点击删除子权限事件
            clickToRemoveSubRights();
        });
    });
}

//首页点击当月最新发布--更多
function newsMessageFn(vId,vType){
    importing('dict', 'datepicker', function(){
        var thisYear = Date.format('YYYY');
        var weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

        $('.dict').dict();

        $("#query-date").daterangepicker({
            separator: ' 至 ',
            showWeekNumbers : true,
            pickTime:true
        },function(start, end, label) {
            $('#queryDateBegin').val(start.format('YYYY-MM-DD'));
            $('#queryDateEnd').val(end.format('YYYY-MM-DD'));
        });
        // $('.query-date').datepicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});

        //设定默认ajax开始和结束时的loading遮罩效果(#post自带,paginglist没有自带)
        $.ajaxSetup({
            beforeSend:showLoading,
            complete:hideLoading
        });
        $(".arrow").click(function (e) {
            var parentDom = $(this).parents("#msg-main-box");
            if(parentDom.hasClass("turn-right")){
                parentDom.removeClass("turn-right").addClass("turn-left");
            } else {
                parentDom.removeClass("turn-left").addClass("turn-right");
            }
        });
        if($(".arrow").parents("#msg-main-box").hasClass("turn-right")){
            $(".arrow").attr("title","展开");
        } else {
            $(".arrow").attr("title","收起");
        }
        //查询列表
        function queryForMessage(){
            //listData
            top.registry.global.messageList = [];
            //checkbox
            top.registry.global.checkMsgs=[];
            top.registry.global.checkMsgIds=[];
            var param = {
                msgState:$.trim($('#msg-receive-xxzt').val()),
                startTime:$.trim($('#startTime').val()),
                endTime:$.trim($('#endTime').val()),
                msgContent:$.trim($("#subject").val()),
                receiverId:top.userName
            };
            $('#msg-left').pagingList({
                action:top.servicePath+'sys/message/findReceivePage',
                jsonObj:param,
                callback:function(data,t, n, u, o, a, r){
                    var obj=[];
                    for(var i=0;i<data.length;i++){
                        obj[i]= JSON.parse(data[i].msgContent);
                    }
                    var temp_date, queryData = [];
                    //查询消息数量
                    $('.total-count').text(r);
                    if(r < 16) {$('.paging').hide()}else{$('.paging').show();}
                    $('#msg-left-content').template(data, function(item, i){
                        //checkbox
                        item._checked=top.registry.global.checkMsgs[item.rownum];
                        //左边 列表 时间格式
                        temp_date = new Date(item.createDate);
                        item.msgDateTxt = thisYear == temp_date.format('YYYY') ? temp_date.format('M月D日 hh:mm') : temp_date.format('YYYY/MM/DD');
                        //消息已读or未读样式定义 1:未读
                        item.readLi = item.msgState == '0' ? 'unread' : 'read';
                        //右边 详细 时间格式
                        item.msgDetailDate = temp_date.format('YYYY年M月D日') + '('+weeks[temp_date.getDay()]+') ' + temp_date.format('hh:mm');
                        item=$.extend(item,{obj:obj[i]});
                        queryData.push(item);
                    });
                    $('.check-msg').on('click',function(i,ele){
                        var rownum =+(this.getAttribute('rownum'));
                        var messageId=this.getAttribute('id');
                        if(this.checked){
                            top.registry.global.checkMsgs[rownum]='checked';
                            top.registry.global.checkMsgIds[rownum]=messageId;
                        }else{
                            top.registry.global.checkMsgs[rownum]=null;
                            top.registry.global.checkMsgIds[rownum]=null;
                        }
                        judgeCheckAll();
                    });

                    judgeCheckAll();
                    top.registry.global.messageList = queryData;

                    //初始化
                    if(vId!="undefined" && vType!="undefined"){
                        $("#msg-left-content div.li .cc:not(.c-remove-hover)[data-id="+vId+"]").trigger("click");
                    }
                }
            });

            $('.selected-detail-div').hide();
            $('.un-selected-detail-div').show();
        }
        //判断该页面是否进行全选
        function judgeCheckAll(){
            var checkAll = true;
            var arryCheck = $('input[name="checkList"]');
            if(arryCheck.length == 0) {
                checkAll = false;
            }else {
                $(arryCheck).each(function () {
                    if (!this.checked) {
                        checkAll = false;
                    }
                });
            }
            $('input[name="checkAll"]').prop('checked',checkAll);
        }
        queryForMessage();
        //点击进行查询
        $('#msg-receive-query').on('click',function(){
            if($('.sort-arrow')) $('.sort-arrow').remove();
            //执行查询
            queryForMessage();
        });
        //重置按钮
        $('#msg-receive-reset').on('click',function(){
            $('.query-block input').val('');
            $('.query-block select').val('');
        });

        //点击每一条信息在右侧显示内容
        $('#msg-left').on('click', 'div.li .cc:not(.c-remove-hover)', function(){
            //右侧阅读窗口 样式修改
            $('.un-selected-detail-div').hide();
            $('.selected-detail-div').show();
            var ids = [];
            var msg_id = this.getAttribute('paramId');
            var t_rownum = this.getAttribute('rownum');
            var thisLi = $(this).parents('.li');
            var type=this.getAttribute("data-type");
            ids.push(msg_id);
            //样式修改变蓝色
            $('#msg-left-content div.li').removeClass('selected');
            thisLi.addClass('selected');//div .li 添加selected类

            //该div的checkbox值设为已勾选 其余设为不勾选
            top.registry.global.checkMsgs = [], top.registry.global.checkMsgIds = [];
            $('#msg-left input[type="checkbox"]').removeAttr('checked');
            top.registry.global.checkMsgs[t_rownum] = 'checked';
            top.registry.global.checkMsgIds[t_rownum] = msg_id;
            $(this).prevAll('.cx').children('input[name="checkList"]').prop('checked','true');

            //消息设置已读，并修改msg-left为已读样式
            var myId = [];
            myId.push(this.getAttribute('data-id'));
            if(thisLi.attr('class').indexOf('unread') > -1){
                $post(top.servicePath+'/sys/message/setRead', {ids:myId,userId:top.userId}, function(res){
                    if(res.flag==1){
                        thisLi.removeClass('unread').addClass('read');
                        thisLi.attr("data-read",1)
                    }
                }, true, false);
            }
            //加载车牌号码
            function initCarNoSelect(carType,carNo) {
                $get(top.servicePath+'/sw/carMaintain/getCarInfoListByCarType',{carType:carType},function(r) {
                    if(r.flag == 1){
                        option ="<option value=''></option>";
                        _.each(r.data,function(item){
                            option+="<option value='"+item.carNo+"' "+(carNo==item.carNo?'selected':'')+" >"+item.carNo+"</option>";
                        });
                        $('#carNo').empty().append(option).on('change',function(){
                            $("#carNo").val($(this).find("option:selected").text())
                        })
                    }
                },false);
            }
            //出差审批表
            function onBusiness() {
                //查看审批表
                $("#exesApplyDetailList-table .icon-show-btn[id*='onBusiness']").off("click").on('click', function () {
                    var the = $(this);
                    var detailId = "";
                    $open('#onBusiness-view-block',{width:800,height:280,top:100,title:'出差审批表'});
                    $get(top.servicePath + '/sw/exesApply/getExesApplyBis',{id:the.attr("travelid")}, function (r) {
                        if (r.flag == 1) {
                            detailId = $(this).attr("travelid");
                            //加载车牌号码
                            initCarNoSelect("",r.data.carNo);
                            $("#driver").val(r.data.driver);
                            $("#reason").val($("#remark").val());
                            if(r.data.isSendCar == "0"){
                                $("#unSendCar").attr("checked", "checked");
                            } else{
                                $("#sendCar").attr("checked", "checked");
                            }
                            if(r.data.isByAirCar == "0"){
                                $("#byOne").attr("checked", "checked");
                                $("#byTwo").removeAttr("checked");
                            }  else  if(r.data.isByAirCar == "1"){
                                $("#byTwo").attr("checked", "checked");
                                $("#byOne").removeAttr("checked");
                            }
                        } else {
                            toast(r.msg, 600).err();
                        }
                    });
                });
            }
            //点击对应列--修改列表显示msgState的值为已读
            top.registry.global.messageList.each(function(o ,i){
                var obj=[];
                obj= JSON.parse(o.msgContent);
                var detailObj = $('#msg-right .selected-detail-div');
                if(msg_id == obj.id){
                    o.msgState = '1';
                    detailObj.template(o);
                    if(type==1){
                    	require(['underscore','text!/view/projectManage/tpl/expenseApply/expenseApplyShow.html'],function(_,expenseApplyShowTpl){
                            importing('currentDate');
                    		 $get(top.servicePath+'/sw/exesApply/getExesApply',{id:msg_id},function(r) {
                                 if (r.flag == 1) {
                                     var exesApply = r.data.exesApply;
                                     var projectInfoList = r.data.projectInfoList;
                                     $(".read-content").empty().html(_.template(expenseApplyShowTpl, {exesApply: exesApply, projectInfoList: projectInfoList}));

                                     $("#projectId").val(exesApply.projectId);
                                     $("#remainFund").text(parseFloat($("#projectId option:selected").attr("surplusFund")) / 10000);
                                     $(".dict").dict();
                                     $("#type").dictSelect(exesApply.type);
                                     $("#type").attr("disabled", "disabled");
                                     $("#applyLevel").dictSelect(exesApply.applyLevel);
                                     $("#applyLevel").attr("disabled", "disabled");
                                     //开支类别选择差旅费时
                                     if (exesApply.type == "01") {
                                         $("#travelExpense").show();
                                         onBusiness();
                                         $("#mealsExpense,#receptionist").hide();
                                     } else if(exesApply.type == "03"){
                                         $("#mealsExpense").show();
                                         $("#travelExpense,#receptionist").hide();
                                     } else if(exesApply.type == "04"){
                                         $("#receptionist").show();
                                         $("#mealsExpense,#travelExpense").hide();
                                     }  else {
                                         $("#travelExpense,#mealsExpense,#receptionist").hide();
                                     }
                                     //报销时间
                                     $("#repayTime").val(rangeUtil.formatDate(exesApply.repayTimeStart, 'yyyy-MM-dd'));
                                     $(".read-content .tcenter.mt40").remove();
                                     // $(".read-content #exesApplyDetailList-table").css("min-width", "900px");
                                 }
                             });
                    	});
                    }else if(type==2){
                        importing('currentDate');
                        require(['underscore','text!/view/carManage/tpl/carApplyAudit.html'],function(_,carApplyAuditTpl){
                            $get(top.servicePath+'/sw/carApply/getCarApply',{id:msg_id},function(r) {
                                if (r.flag == 1) {
                                    $(".read-content").empty().html(_.template(carApplyAuditTpl, $.extend(r, {taskId: null, userId: top.userId, trueName: top.trueName, firstPage: true})));

                                    $(".dict").dict();
                                    $("#carType").dictSelect(r.data.carType);
                                    $("#brandType").dictSelect(r.data.brandType);
                                    $("#carType,#brandType").attr("disabled", "disabled");
                                    $("#applyLevel").dictSelect(r.data.applyLevel);
                                    $("#applyLevel").attr("disabled", "disabled");
                                    $("#isDriver").val(r.data.isDriver);
                                }
                            });
                        });
                    }else if(type==3){
                        importing('currentDate');
                        require(['underscore','text!/view/itemManage/tpl/itemApply/itemApplyAudit.html'],function(_,itemApplyAuditTpl){
                            $get(top.servicePath+'/sw/itemApply/getItemApply',{id:msg_id},function(r) {
                                if (r.flag == 1) {
                                    $(".read-content").empty().html(_.template(itemApplyAuditTpl, $.extend(r, {taskId: null, trueName: top.trueName})));

                                    $(".span").span();
                                    $(".dict").dict();
                                    $("#applyLevel").dictSelect(r.data.applyLevel);
                                    $("#applyLevel").attr("disabled", "disabled");
                                    $(".read-content .tcenter.mt40").remove();
                                }
                            });
                        });
                    }else if(type==4){
                        importing('currentDate');
                        require(['underscore','text!/view/itemManage/tpl/itemApply/itemApplyAudit.html'],function(_,itemApplyAuditTpl){
                            $get(top.servicePath+'/sw/itemApplySum/getItemApplySum',{id:msg_id},function(r) {
                                if (r.flag == 1) {
                                    $(".read-content").empty().html(_.template(itemApplyAuditTpl, $.extend(r, {taskId: null, trueName: top.trueName})));

                                    $(".span").span();
                                    $(".dict").dict();
                                    $("#applyLevel").dictSelect(r.data.applyLevel);
                                    $("#applyLevel").attr("disabled", "disabled");
                                    $(".read-content .tcenter.mt40").remove();
                                }
                            });
                        });
                    }
                    return false;
                }
            });
        }).on('mouseenter', 'div.li', function(){
            $(this).find('.c-remove').removeClass('hideplus');
        }).on('mouseleave', 'div.li', function(){
            $(this).find('.c-remove').addClass('hideplus');
        }).on('mouseenter', 'div.li .c-remove', function(){
            $(this).parents('.cc').addClass('c-remove-hover');
        }).on('mouseleave', 'div.li .c-remove', function(){
            $(this).parents('.cc').removeClass('c-remove-hover');
        }).on('click', 'div.li .c-remove', function(){
            var ids = [];
            ids.push(this.getAttribute('param'));
            $confirm('确定删除消息吗？', function(bol){
                if(bol){
                    $post(top.servicePath+'/sys/message/delRevMsgs', {ids:ids,modifyPid:top.userId}, function(res){
                        toast('删除成功！').ok();
                        queryForMessage();
                    }, true);
                }
            });
        });
        //全选操作
        $('#msg-check-all').on('click',function(){
            $('input[name="checkList"]').prop('checked',$(this).prop('checked'));
            var arryCheck = $('input[name="checkList"]');
            var t_rownum = '';
            var t_id = '';
            $(arryCheck).each(function(){
                t_rownum = this.getAttribute('rownum');
                t_id = this.getAttribute('id');
                top.registry.global.checkMsgs[t_rownum] = this.checked?'checked':null;
                top.registry.global.checkMsgIds[t_rownum] = this.checked?t_id:null;
            });
        });
        //删除
        $('#receive-remove-btn').on('click',function(){
            var t_ids=[];
            t_ids = top.registry.global.checkMsgIds.where('item=>item!=null');
            if(t_ids.length==0){
                toast('请选择需要删除的消息').addClass('warning');
                return false;
            }
            $confirm('确定删除消息吗？',function(bol){
                if(bol){
                    $post(top.servicePath+'/sys/message/delRevMsgs',{ids:t_ids,userId:top.userId},function(res){
                        toast('删除'+t_ids.length+'成功！').ok();
                        queryForMessage();
                    }, true);
                }
            });
        });
        //设为已读
        $('#receive-edit-btn').on('click',function(){
            var selectIdArray = top.registry.global.checkMsgIds.where('item=>item!=null'); //选中的消息id
            if(selectIdArray.length == 0){
                toast('请选择需要设为已读的消息').addClass('warning');
                return false;
            }else{
                $post(top.servicePath+'/sys/message/setRead',{ids:selectIdArray,userId:top.userId},function(res){
                    if(res.flag==1){
                        toast('已将'+selectIdArray.length+'条消息标记为已读').ok();
                        queryForMessage();
                    }
                }, true, false);
            }
        });
    });

}

//首页点击通知管理模块--更多
function noticeMessageFn(){
    importing('dict', 'datepicker', function(){
        var thisYear = Date.format('YYYY');
        var weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

        $('.dict').dict();

        $("#query-date").daterangepicker({
            separator: ' 至 ',
            showWeekNumbers : true,
            pickTime:true
        },function(start, end, label) {
            $('#queryDateBegin').val(start.format('YYYY-MM-DD'));
            $('#queryDateEnd').val(end.format('YYYY-MM-DD'));
        });
        // $('.query-date').datepicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});

        //设定默认ajax开始和结束时的loading遮罩效果(#post自带,paginglist没有自带)
        $.ajaxSetup({
            beforeSend:showLoading,
            complete:hideLoading
        });
        //查询列表
        function queryForMessage(){
            //listData
            top.registry.global.messageList = [];
            //checkbox
            top.registry.global.checkMsgs=[];
            top.registry.global.checkMsgIds=[];
            $('#msg-left').pagingList({
                action:top.servicePath+'/sys/message/findRePage',
                currentPage:$('.paging').data('currentPage'),
                jsonObj:{
                    msgState:$.trim($('#msg-receive-xxzt').val()),
                    startTime:$.trim($('#queryDateBegin').val()),
                    endTime:$.trim($('#queryDateEnd').val()),
                    msgContent:$.trim($("#subject").val()),
                    receiverId:top.userName
                },
                callback:function(data,t, n, u, o, a, r){
                    var temp_date, queryData = [];
                    //查询消息数量
                    $('.total-count').text(r);
                    if(r < 16) {$('.paging').hide()}else{$('.paging').show();}
                    $('#msg-left-content').template(data, function(item, i){
                        //checkbox
                        item._checked=top.registry.global.checkMsgs[item.rownum];
                        //左边 列表 时间格式
                        temp_date = new Date(item.createDate);
                        item.msgDateTxt = thisYear == temp_date.format('YYYY') ? temp_date.format('M月D日 hh:mm') : temp_date.format('YYYY/MM/DD')
                        //消息已读or未读样式定义 1:未读
                        item.readLi = item.msgState == '0' ? 'unread' : 'read';
                        //右边 详细 时间格式
                        item.msgDetailDate = temp_date.format('YYYY年M月D日') + '('+weeks[temp_date.getDay()]+') ' + temp_date.format('hh:mm');

                        queryData.push(item);
                    });
                    $('.check-msg').on('click',function(i,ele){
                        var rownum=+(this.getAttribute('rownum'));
                        var messageId=this.getAttribute('id');
                        if(this.checked){
                            top.registry.global.checkMsgs[rownum]='checked';
                            top.registry.global.checkMsgIds[rownum]=messageId;
                        }else{
                            top.registry.global.checkMsgs[rownum]=null;
                            top.registry.global.checkMsgIds[rownum]=null;
                        }
                        judgeCheckAll();
                    });

                    judgeCheckAll();
                    top.registry.global.messageList = queryData;
                }
            });

            $('.selected-detail-div').hide();
            $('.un-selected-detail-div').show();
        }
        //判断该页面是否进行全选
        function judgeCheckAll(){
            var checkAll = true;
            var arryCheck = $('input[name="checkList"]');
            if(arryCheck.length == 0) {
                checkAll = false;
            }else {
                $(arryCheck).each(function () {
                    if (!this.checked) {
                        checkAll = false;
                    }
                });
            }
            $('input[name="checkAll"]').prop('checked',checkAll);
        }
        queryForMessage();
        //点击进行查询
        $('#msg-receive-query').on('click',function(){
            if($('.sort-arrow')) $('.sort-arrow').remove();
            //时间判断
            var t_beginDate = $('#startTime').val();
            var t_endDate = $('#endTime').val();
            if(!t_beginDate.isEmpty() && !t_endDate.isEmpty() && t_beginDate > t_endDate){
                toast('消息开始时间不能大于结束时间！').css('width','300px').warn();
                return false;
            }
            //执行查询
            queryForMessage();
        });
        //重置按钮
        $('#msg-receive-reset').on('click',function(){
            $('.query-block input').val('');
            $('.query-block select').val('');
        });
        //点击每一条信息在右侧显示内容
        $('#msg-left').on('click', 'div.li .cc:not(.c-remove-hover)', function(){
            //右侧阅读窗口 样式修改
            $('.un-selected-detail-div').hide();
            $('.selected-detail-div').show();

            var ids = [];
            var msg_id = this.getAttribute('paramId');
            var t_rownum = this.getAttribute('rownum');
            var thisLi = $(this).parents('.li');
            ids.push(msg_id);
            //样式修改变蓝色
            $('#msg-left-content div.li').removeClass('selected');
            thisLi.addClass('selected');//div .li 添加selected类

            //该div的checkbox值设为已勾选 其余设为不勾选
            top.registry.global.checkMsgs = [], top.registry.global.checkMsgIds = [];
            $('#msg-left input[type="checkbox"]').removeAttr('checked');
            top.registry.global.checkMsgs[t_rownum] = 'checked';
            top.registry.global.checkMsgIds[t_rownum] = msg_id;
            $(this).prevAll('.cx').children('input[name="checkList"]').prop('checked','true');

            //消息设置已读，并修改msg-left为已读样式
            if(thisLi.attr('class').indexOf('unread') > -1){
                $post(top.servicePath+'/sys/message/setRead', {ids:ids,userId:top.userId}, function(res){
                    thisLi.removeClass('unread').addClass('read');
                    thisLi.attr("data-read",1)
                }, true, false);
            }
            //点击对应列--修改列表显示msgState的值为已读
            top.registry.global.messageList.each(function(o ,i){
                var detailObj = $('#msg-right .selected-detail-div');
                if(msg_id == o.id){
                    o.msgState = '1';
                    detailObj.template(o);
                    $get(top.servicePath+'/sys/message/view',{id:msg_id},function(res){
                        detailObj.find('.read-content').html(res.data.message.content);
                        $("#receiverName").text(res.data.receiverName);
                        $("#attachment").text(res.data.message.rev1);
                        $("#attachment").attr("download",res.data.message.rev1);
                        $("#attachment").attr("href",top.ftpServer+res.data.message.rev1)
                    });
                    return false;
                }
            });
        }).on('mouseenter', 'div.li', function(){
            $(this).find('.c-remove').removeClass('hideplus');
        }).on('mouseleave', 'div.li', function(){
            $(this).find('.c-remove').addClass('hideplus');
        }).on('mouseenter', 'div.li .c-remove', function(){
            $(this).parents('.cc').addClass('c-remove-hover');
        }).on('mouseleave', 'div.li .c-remove', function(){
            $(this).parents('.cc').removeClass('c-remove-hover');
        }).on('click', 'div.li .c-remove', function(){
            var ids = [];
            ids.push(this.getAttribute('param'));
            $confirm('确定删除消息吗？', function(bol){
                if(bol){
                    $post(top.servicePath+'/sys/message/del', {ids:ids,modifyPid:top.userId}, function(res){
                        toast('删除成功！').ok();
                        queryForMessage();
                    }, true);
                }
            });
        });
        //全选操作
        $('#msg-check-all').on('click',function(){
            $('input[name="checkList"]').prop('checked',$(this).prop('checked'));
            var arryCheck = $('input[name="checkList"]');
            var t_rownum = '';
            var t_id = '';
            $(arryCheck).each(function(){
                t_rownum = this.getAttribute('rownum');
                t_id = this.getAttribute('id');
                top.registry.global.checkMsgs[t_rownum] = this.checked?'checked':null;
                top.registry.global.checkMsgIds[t_rownum] = this.checked?t_id:null;
            });
        });
        //删除
        $('#receive-remove-btn').on('click',function(){
            var t_ids=[];
            t_ids = top.registry.global.checkMsgIds.where('item=>item!=null');
            if(t_ids.length==0){
                toast('请选择需要删除的消息').addClass('warning');
                return false;
            }
            $confirm('确定删除消息吗？',function(bol){
                if(bol){
                    $post(top.servicePath+'/sys/message/delRevMsgs',{ids:t_ids,userId:top.userId},function(res){
                        toast('删除'+t_ids.length+'成功！').ok();
                        queryForMessage();
                    }, true);
                }
            });
        });
        //设为已读
        $('#receive-edit-btn').on('click',function(){
            var selectIdArray = top.registry.global.checkMsgIds.where('item=>item!=null'); //选中的消息id
            if(selectIdArray.length == 0){
                toast('请选择需要设为已读的消息').addClass('warning');
                return false;
            }else{
                $post(top.servicePath+'/sys/message/setRead',{ids:selectIdArray,userId:top.userId},function(res){
                    if(res.flag==1){
                        toast('已将'+selectIdArray.length+'条消息标记为已读').ok();
                        queryForMessage();
                    }
                }, true, false);
            }
        });
    });

}

//首页点击规章制度--更多
function ruleMessageFn() {
    importing('dict', 'datepicker', function(){
        var thisYear = Date.format('YYYY');
        var weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        $('.dict').dict();

        $("#query-date").daterangepicker({
            separator: ' 至 ',
            showWeekNumbers : true,
            pickTime:true
        },function(start, end, label) {
            $('#queryDateBegin').val(start.format('YYYY-MM-DD'));
            $('#queryDateEnd').val(end.format('YYYY-MM-DD'));
        });
        // $('.query-date').datepicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});
        //设定默认ajax开始和结束时的loading遮罩效果(#post自带,paginglist没有自带)
        $.ajaxSetup({
            beforeSend:showLoading,
            complete:hideLoading
        });
        //查询列表
        function queryForMessage(){
            //listData
            top.registry.global.messageList = [];
            $('#msg-left').pagingList({
                action:top.servicePath+'/sys/message/findPage',
                currentPage:$('.paging').data('currentPage'),
                jsonObj:{
                    startTime:$('#startTime').val(),
                    endTime:$('#endTime').val(),
                    type:2
                },
                callback:function(data,t, n, u, o, a, r){
                    var temp_date, queryData = [];
                    //查询消息数量
                    $('.total-count').text(r);
                    if(r < 16) {$('.paging').hide()}else{$('.paging').show();}
                    $('#msg-left-content').template(data, function(item, i){
                        //左边 列表 时间格式
                        temp_date = new Date(item.createDate);
                        item.msgDateTxt = thisYear == temp_date.format('YYYY') ? temp_date.format('M月D日 hh:mm') : temp_date.format('YYYY/MM/DD')
                        //消息已读or未读样式定义 0:未读
                        item.readLi = item.msgState == '0' ? 'unread' : 'read';
                        //右边 详细 时间格式
                        item.msgDetailDate = temp_date.format('YYYY年M月D日') + '('+weeks[temp_date.getDay()]+') ' + temp_date.format('hh:mm');

                        queryData.push(item);
                    });

                    top.registry.global.messageList = queryData;
                }
            });
            $('.selected-detail-div').hide();
            $('.un-selected-detail-div').show();

        }
        queryForMessage();
        //点击进行查询
        $('#msg-receive-query').on('click',function(){
            if($('.sort-arrow')) $('.sort-arrow').remove();
            //时间判断
            var t_beginDate = $('#startTime').val();
            var t_endDate = $('#endTime').val();
            if(!t_beginDate.isEmpty() && !t_endDate.isEmpty() && t_beginDate > t_endDate){
                toast('消息开始时间不能大于结束时间！').css('width','300px').warn();
                return false;
            }
            //执行查询
            queryForMessage();
        });
        $('#msg-left').on('click', 'div.li .cc:not(.c-remove-hover)', function(){
            //右侧阅读窗口 样式修改
            $('.un-selected-detail-div').hide();
            $('.selected-detail-div').show();

            var msg_id = this.getAttribute('paramId');
            var thisLi = $(this).parents('.li');
            //样式修改
            $('#msg-left-content div.li').removeClass('selected');
            thisLi.addClass('selected');//div .li 添加selected类
            //点击对应列
            top.registry.global.messageList.each(function(o ,i){
                var detailObj = $('#msg-right .selected-detail-div');
                if(msg_id == o.id){
                    o.msgState = '1';
                    detailObj.template(o);
                    detailObj.find('.read-content').html(o.content);
                    $get(top.servicePath+'/sys/message/findById',{id:msg_id},function(res){
                        $("#attachment").text(res.data.rev1);
                        $("#attachment").attr("download",res.data.rev1);
                        $("#attachment").attr("href",top.ftpServer+res.data.rev1)
                    });
                }
            })
        })
    });
}
//系统参数管理
function sysXtcsglHtml(){
    importing('dict','datepicker',function () {
        var pageDataForParam,editId;
        $filter('showDate',function(){
            return this=='4'
        });
        $filter('showDict',function(){
            return this=='3'
        });
        $filter('showTa',function(){
            return this=='2'
        });
        $filter('showInputL',function(){
            return this=='1'
        });
        $filter('showInput',function(){
            return this=='0'
        });
        var closeWin = function(winId,resetForm) {
            if(winId){
                $(winId).$close();
            }
            if(resetForm) {
                $(resetForm)[0].reset();
            }
            $('.param-name').removeClass('validatebox-invalid');
        }
        function initPageData(){
            $get(top.servicePath+'/sys/param/list',null,function (res) {
                var initSel = '0',
                    enName = '';
                var configIdOption = '';
                if(res.flag == 1){
                    //tab 分组
                    $template('#param-config-ul',res.data);
                    pageDataForParam = res.data;
                    //分组数据绑定事件
                    $.each(res.data,function(n,value){
                        $('#'+value.id).on('click',function () {
                            $('#param-config-ul').find('li').removeClass('active');
                            $(this).addClass('active');
                            $template('#param-list-table tbody',value.sysParamList,function (item,index) {
                                item.rownum=index+1;
                            });
                            $('.paramDict:not(hide)').each(function(){$(this).dict().dictSelect($(this).attr('value'));});
                            $('.paramDates:not(hide)').datepicker();
                        });
                        //显示第一组数据
                        if((n == 0 && top.registry.sys.sysParamCurrentTab == null) || top.registry.sys.sysParamCurrentTab == value.id){
                            $('#'+value.id).click();
                            top.registry.sys.sysParamCurrentTab = null;
                        }
                        configIdOption += '<option value="'+value.id+'">'+value.chineseName+'</option>';
                    });
                    //所属模块的选项
                    $('#param-configId').html(configIdOption);
                }
            },false);
        }

        $.extend($.fn.validatebox.defaults.rules, {
            english: {
                validator: function (val) {
                    return /^[a-zA-Z]+$/.test(val);
                },
                message: '请输入纯英文'
            },
            num:{
                validator: function (val) {
                    return /^[0-9]*$/.test(val);
                },
                message: '请输入数字'
            }
        });

        initPageData();

        //打开新增弹窗
        $('#add-btn').on('click',function () {
            $('#add-param-form')[0].reset();
            $('#hideFlag').dict();
            $('#paramType').dict();
            //参数类型绑定字典类型input框事件
            $('#param-paramType').change(function(){
                //字典CSLXDM对应3为下拉框，需要填写字典代码
                if($('#param-paramType').val() == '3'){
                    $('#param-dict-type').show();
                    $('#param-dictType').validatebox();
                }else{
                    $('#param-dict-type').hide();
                    $('#param-dictType').removeClass('validatebox-invalid');
                }
            });
            $('#save-edit-param').hide();
            $('#save-add-param').show();
            $open('#add-param-block',{width:800,title:'&nbsp;系统参数新增',onClose:function () {
                closeWin('','#add-param-form');
            }});
        });

        //关闭新增弹窗
        $('#close-add-param').on('click',function () {
            closeWin('#add-param-block','#add-param-form');
        });

        //修改系统参数
        function editSystemParamConfig(id){
            $('#add-param-form')[0].reset();
            $('#hideFlag').dict();
            $('#paramType').dict();
            for(var i=0;i<pageDataForParam.length;i++){
                if(pageDataForParam[i].sysParamList!=null) {
                    for (var j = 0; j < pageDataForParam[i].sysParamList.length; j++) {
                        if (pageDataForParam[i].sysParamList[j].id == id) {
                            byid('param-editId').value = id;
                            byid('param-chineseName').value = pageDataForParam[i].sysParamList[j].chineseName;
                            byid('param-englishName').value = pageDataForParam[i].sysParamList[j].englishName;
                          //  byid('param-default').value = pageDataForParam[i].sysParamList[j].defaultValue;
                            byid('param-value').value = pageDataForParam[i].sysParamList[j].value;
                            byid('param-remark').value = (pageDataForParam[i].sysParamList[j].remark)?pageDataForParam[i].sysParamList[j].remark:"";
                           // byid('hideFlag').value = pageDataForParam[i].sysParamList[j].hideFlag;
                          //  byid('paramType').value = pageDataForParam[i].sysParamList[j].paramType;
                           // byid('param-paramSort').value = pageDataForParam[i].sysParamList[j].paramSort;
                           // byid('param-configId').value = pageDataForParam[i].sysParamList[j].configId;
                          //  byid('param-dictType').value = pageDataForParam[i].sysParamList[j].dictType;
                        }
                    }
                }
            }

            //参数类型绑定字典类型input框事件
            $('#param-paramType').change(function(){
                //字典CSLXDM对应3为下拉框，需要填写字典代码
                if($('#param-paramType').val() == '3'){
                    $('#param-dict-type').show();
                    $('#param-dictType').validatebox();
                }else{
                    $('#param-dict-type').hide();
                    $('#param-dictType').removeClass('validatebox-invalid');
                }
            });
            $('#save-edit-param').show();
            $('#save-add-param').hide();
            $open('#add-param-block',{width:800,title:'&nbsp;系统参数修改',onClose:function () {
                closeWin('','#add-param-form');
            }});
        }

        //系统参数修改保存
        function updateSystemParam(){
            trimAll('.add-content');
            $('.param-name').validatebox();
            if ($('.validatebox-invalid').length > 0) {
                return false;
            }
            param = $('#add-param-form').serializeObject();
            param = $.extend(param,{updateUser:top.userName})
            $post(top.servicePath+'/sys/param/update',param,function (res) {
                if(res.flag==1) {
                    toast('保存成功！', 600, function () {
                        closeWin('#add-param-block', '#add-param-form');
                    }).ok();
                    initPageData();
                }else{
                    toast('保存出错！', 600, function () {
                    }).error()
                }
            },true);
        }

        //保存参数列表
        $('#save-btn').on('click',function () {
            top.registry.sys.sysParamCurrentTab = $('.active').attr('id');
            $('.param-name-edit').validatebox();
            if ($('.validatebox-invalid').length > 0) {
                return false;
            }
            param = $('#param-form').serializeArray();
            $post(top.servicePath+'/sys/param/edit',param,function (res) {
                if(res.msg === 'success'){
                    toast('保存成功！').ok();
                    initPageData();
                }
            },true);
        });

        $('#save-add-param').on('click',function () {
            top.registry.sys.sysParamCurrentTab = $('.active').attr('id');
            trimAll('.add-content');
            $('.param-name').validatebox();
            if ($('.validatebox-invalid').length > 0) {
                return false;
            }
            param =  $('#add-param-form').serializeObject();
            param = $.extend(param,{createUser:top.userName})
            $post(top.servicePath+'/sys/param/add',param , function (res) {
                toast('保存成功！', 600, function () {
                    closeWin('#add-param-block','#add-param-form');
                }).ok();
                initPageData();
            },true);
        }),$('#param-list-table').on('click','.into-edit-param',function(){
            editSystemParamConfig(this.getAttribute("paramEditId"));
        });
        $('#save-edit-param').on('click',function(){
            updateSystemParam();
        });
    });
}