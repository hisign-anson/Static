
top.path=localData.get('path');
top.servicePath=localData.get('servicePath');
top.servicePath_xz=localData.get('servicePath_xz');
top.token = localData.get('token');
top.ftpServer = localData.get('ftpServer');
top.limits = localData.get('limits');
top.roles = localData.get('roles');
top.isGeneralRole = localData.get('isGeneralRole');
top.currentUser = localData.get('currentUser');
top.trueName = top.currentUser ? top.currentUser.userInfo.userName:'';
top.userName = top.currentUser ? top.currentUser.userName:'';
top.userUnit = top.currentUser ? top.currentUser.userInfo.orgId:'';
top.orgId = top.currentUser ? top.currentUser.orgInfo.orgId:'';
top.superId = top.currentUser ? top.currentUser.orgInfo.superId:'';
top.superName = top.currentUser ? top.currentUser.orgInfo.superName:'';
top.orgName = top.currentUser ? top.currentUser.orgInfo.orgName:'';
top.orgLevel = top.currentUser ? top.currentUser.orgInfo.orgLevel:'';
top.userId = top.currentUser ? top.currentUser.id:'';
top.serverIp = location.hostname;
top.serverPort = location.port;
top.clientKey = localData.get('clientKey');
top.opsMap = new HashMap();
initDictForGXS();

function HashMap() {     
    this.elements = new Array();     
       
    //获取MAP元素个数     
    this.size = function() {     
        return this.elements.length;     
    }     
       
    //判断MAP是否为空     
    this.isEmpty = function() {     
        return(this.elements.length < 1);     
    }     
       
    //删除MAP所有元素     
    this.clear = function() {     
        this.elements = new Array();     
    }     
       
    //向MAP中增加元素（key, value)      
    this.put = function(_key, _value) {     
        this.elements.push( {     
            key : _key,     
            value : _value     
        });     
    }     
       
    //删除指定KEY的元素，成功返回True，失败返回False     
    this.remove = function(_key) {     
        var bln = false;     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].key == _key) {     
                    this.elements.splice(i, 1);     
                    return true;     
                }     
            }     
        } catch(e) {     
            bln = false;     
        }     
        return bln;     
    }     
       
    //获取指定KEY的元素值VALUE，失败返回NULL     
    this.get = function(_key) {     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].key == _key) {     
                    return this.elements[i].value;     
                }     
            }     
        } catch(e) {     
            return null;     
        }     
    }     
       
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL     
    this.element = function(_index) {     
        if(_index < 0 || _index >= this.elements.length) {     
            return null;     
        }     
        return this.elements[_index];     
    }     
       
    //判断MAP中是否含有指定KEY的元素     
    this.containsKey = function(_key) {     
        varbln = false;     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].key == _key) {     
                    bln = true;     
                }     
            }     
        } catch(e) {     
            bln = false;     
        }     
        return bln;     
    }     
       
    //判断MAP中是否含有指定VALUE的元素     
    this.containsValue = function(_value) {     
        var bln = false;     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].value == _value) {     
                    bln = true;     
                }     
            }     
        } catch(e) {     
            bln = false;     
        }     
        return bln;     
    }     
       
    //获取MAP中所有VALUE的数组（ARRAY）     
    this.values = function() {     
        var arr = new Array();     
        for(i = 0; i < this.elements.length; i++) {     
            arr.push(this.elements[i].value);     
        }     
        return arr;     
    }     
       
    //获取MAP中所有KEY的数组（ARRAY）     
    this.keys = function() {     
        var arr = new Array();     
        for(i = 0; i < this.elements.length; i++) {     
            arr.push(this.elements[i].key);     
        }     
        return arr;     
    }     
}   

function initDictForGXS(){
    var initDictForGXS = top.servicePath + '/sys/dict/GXSDM?userUnit='+top.userUnit
    $get(initDictForGXS,null,function(res){
        top.GXSDM =res.data;
    });
}

function gotoLogin(){
	 $post(top.servicePath+"/sys/logout",null, function(res){
		 if(res && res.flag==1){
			 localData.set('token','');
		     localData.set('limits','');
		     localData.set('username','');
		     localData.set('password','');
		     localData.set('login-password','');
		     localData.get('currentUser','');
		     location.replace(window.path+ '/index.html?version='+config.version);
		 }
     });
}

//获取当前用户信息接口
function getUserInfo(param,callback){
    $get(top.servicePath+'/sys/user/getUserInfo',param,function(response) {
        callback(response);
    });
}

if(!top.token || !top.limits ||!top.trueName){
    gotoLogin();
}else{
    byid('user-name').innerHTML=top.currentUser.trueName;
    var param = {
        userId:top.currentUser.userInfo.userId
    };
    getUserInfo(param,function(r){
        if (r.flag == 1) {
            var data = r.data;
            if(data.avatar && data.avatar !=''){
                var obj = eval('(' + data.avatar + ')');
                byid('img-responsive').src=top.ftpServer + obj.p160_160;
                byid('confirm-logout-img').src=top.ftpServer + obj.p160_160;
            }else{
                byid('img-responsive').src="../img/touxiang.jpg";
            }
        }
    });
}

importing('utility.js','main.js','fullscreen','socket', 'dict', function(){
    var header=$('header').eq(0);
    var headHeight=header.height();
    var content=byid('content')||byid('content_wrapper');
    var mainFrame=byid('main-frame');

    //页面初始化
    function indexInit() {
        //检测浏览器
        /*if(!window.chrome&&!window.webkitURL){
            document.body.innerHTML='';
            toast('请使用chrome谷歌浏览器打开本系统!',9999)
        }*/
    
        $('.picshow').previewBox();
    }

    //窗口适配
    function fitSize(){
        var fitHeight=window.height-header.height();
        var fitWidth=window.width;
        rootTabs.css({width:fitWidth,height:fitHeight-3});
        rootTabs.find('.tabs-panels,.panel,.panel-body').has('iframe').css({width:fitWidth,height:fitHeight-35});//'auto'});//
        $('#main').css({width:fitWidth,height:fitHeight-35});
    }
    //主模块的molNo与pageNo保持一致
    var delegate='m=>{name:m.title, pageNo:m.pageNo, direct:m.url, items:m.items, defaultInto:m.defaultInto,molNo:m.moduleNo,moduleId:m.moduleId}';
    top.molDatas=limits.pages.select(delegate.replace('m.pageNo','m.moduleNo'));
    top.molDatas.each(function(m,i){
        m.items && (m.items= m.items.select(delegate)) && m.items.each(function(v,i){
            v.items && (v.items=v.items.select(delegate));
        });
    });
    top.molKeys=molDatas.select('m=>m.molNo');
    localParamsInit(top.molKeys);
    indexInit();

    //顶层属性与供内部frame调用的方法
    window.extending({
        //辅助遮罩
        showHelpMask:function (noNeedLeft){
            var contentLeft=getRect(content).left;
            var contentTop=122;
            noNeedLeft || (top.rootTreeMenu.data('collapsed') ||top.rootTreeMenu[0].style.display=='none'||top.rootTreeMenu.hasClass('hideplus')) || $('body').hasClass('sb-l-m')|| $('#left-mask').css({
                top:60+30
            }).show();
            $('#top-mask').css({
                height:60.5+35
            }).show();
            top.rootTreeMenu.find('.toggle-tag').hide();
            return true;
        },
        hideHelpMask:function(){
            $('#left-mask').hide();
            $('#top-mask').hide();
            top.rootTreeMenu.find('.toggle-tag').show();
            return true;
        },
        //主要元素
        rootTabs:$('#content_wrapper'),
        rootNav:$('#root-nav'),
        rootTreeMenu:$('#root-menu'),
        //注册中心
        registry:(function(){
            var obj={};
            for(var i=0;i<molDatas.length;i++){
                obj.extending(dash2camel(molDatas[i].molNo),{});
            }
            obj.extending('global',{});
            return obj;
        })()
    });

    //新的导航菜单启动方式
    $filter('iconClass',function(){
        var dic={
            '首页':'glyphicons glyphicons-home',
            //'我的应用':'glyphicons glyphicons-show_big_thumbnails',
            //'案件勘验':'glyphicons glyphicons-tags',
            //'物证保管':'glyphicons glyphicons-sampler',
            //'系统维护':'glyphicons glyphicons-cogwheels',
            //'工作监督':'glyphicons glyphicons-imac',
            //'质量检查':'glyphicons glyphicons-check',
            '系统管理':'glyphicons fa icon-wrench',
            //'研判分析':'glyphicons fa icon-legal',
            //'技术管理':'glyphicons fa icon-sitemap',
            //'统计考核':'glyphicons fa icon-bar-chart',
            '财务管理':'glyphicons glyphicons-usd',
            '物品管理':'glyphicons glyphicons-gift',
            '车辆管理':'glyphicons glyphicons-cars',
            '通知公告管理':'glyphicons  glyphicon-stats'
        };
        return dic[this]||'glyphicons glyphicons-hdd';
    });
    window.extending('ops',{});
    
    $('#root-menu').template(molDatas);
    $('a[direct$=html]').on('click',function(){
        $('#root-menu li a').removeClass('menu-open2');
        $(window['main-frame']).attr("en",$(this).attr('en'));
        $(window['main-frame']).attr("status",$(this).attr('status'));
        window['main-frame'].src=getViewPath(this.getAttribute('direct'));

      //操作权限集合
        top.opsMap.clear();
        var moduleid = this.getAttribute('moduleid')
        window.limits.operates.each(function(v,i){
        	if(v.moduleNo == moduleid){
        		top.opsMap.put(v.operateNo,v.openFlag);
        	}
        });
    });

    Core.init();

    var runFullscreen= function() {
        var screenCheck = $.fullscreen.isNativelySupported();
        $('.request-fullscreen').click(function() {
            if (screenCheck) {
                if ($.fullscreen.isFullScreen()) {
                    $.fullscreen.exit();
                } else {
                    $('html').fullscreen({
                        overflow: 'visible'
                    });
                }
            } else {
                toast('浏览器不支持全屏模式')
            }
        });
    };
    runFullscreen();


    function updateTabName(name){
        //更新当前模块名称
        rootTabs.tabs('update',{
            tab:rootTabs.tabs('getTab',0),
            options:{
                title:'::'+name//'当前模块:'+name
            }
        }).tabs('select',0);
    }

    $('a[direct$=".html"]').click(function(){
        var $this=$(this);
        var molName=$(this).closest('#root-menu>li').addClass('current').attr('title')||'';
        var grade2Name=$(this).closest('#root-menu .grade2').attr('title')||'';
        var grade3Name=$(this).closest('#root-menu .grade3').attr('title')||'';
        $('#root-menu>li').removeClass('current');
        updateTabName(molName + (grade2Name?' &gt; '+grade2Name:'')+ (grade3Name?' &gt; '+grade3Name:'') );
    });
    
    //完毕后头部正常显示
    $(".waiters").show();

    rootTabs.height(window.height-header.height()).tabs({'scrollIncrement':320});


    function getRoundedCanvas(sourceCanvas) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;

        canvas.width = width;
        canvas.height = height;

        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();

        return canvas;
    }
    function editavatar(){
        var $image = $('#avatar-img');
        var $inputImage = $('#inputImage');
        var result = $('#result');

        var URL = window.URL || window.webkitURL;
        var blobURL;
        var croppable = false;
        var cropper = $image.cropper({
            aspectRatio: 1,
            viewMode: 3,
            autoCropArea: 0.5,
            minContainerHeight :  240,
            minContainerWidth : 240,
            ready: function () {
                croppable = true;
            },
            crop: function (e) {
                var croppedCanvas;
                var roundedCanvas;
//                var roundedImage;
                if (!croppable) {
                    return;
                }
                // Crop
                croppedCanvas = $image.cropper('getCroppedCanvas');
                // Round
                roundedCanvas = getRoundedCanvas(croppedCanvas);
                // Show
//                roundedImage = document.createElement('img');
//                roundedImage.style.width = 100 + "px";
//                roundedImage.style.height = 100 + "px";
//                roundedImage.src = roundedCanvas.toDataURL();
//                result.html(roundedImage);
                result.html('<img src="' + roundedCanvas.toDataURL() + '">');

                var data = roundedCanvas.toDataURL();
                data=data.split(',')[1];
                data=window.atob(data);
                var ia = new Uint8Array(data.length);
                for (var i = 0; i < data.length; i++) {
                    ia[i] = data.charCodeAt(i);
                };
                var bd=new Blob([ia], {type:"image/png"});// canvas.toDataURL 返回的默认格式就是 image/png
                var formData = new FormData();

                formData.append('file', bd);

                $.ajax({
                    url: top.servicePath + '/sys/file/upload',
                    method: "POST",
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        $("#avatar").val(obj2str(data.data));
                        console.log('Upload success');
                    },
                    error: function () {
                        console.log('Upload error');
                    }
                });

            }
        });
        if (URL) {
            $inputImage.change(function () {
                var files = this.files;
                var file;

                if (!$image.data('cropper')) {
                    return;
                }

                if (files && files.length) {
                    file = files[0];

                    if (/^image\/\w+$/.test(file.type)) {
                        blobURL = URL.createObjectURL(file);
                        $image.one('built.cropper', function () {

                            // Revoke when load complete
                            URL.revokeObjectURL(blobURL);
                        }).cropper('reset').cropper('replace', blobURL);
                        $inputImage.val('');
                    } else {
                        window.alert('Please choose an image file.');
                    }
                }
            });
        } else {
            $inputImage.prop('disabled', true).parent().addClass('disabled');
        }
    }
    //点击进入个人中心
    $('#user-center').on('click', function () {
        var param = {
            userId:top.currentUser.userInfo.userId
        };
        getUserInfo(param,function(response){
            if (response.flag == 1) {
                var data = response.data;
                $("#userName").val(data.userName);
                $("#orgName").val(data.orgName);
                if(data.avatar && data.avatar !=''){
                    var obj = eval('(' + data.avatar + ')');
                    $("#avatar-img").attr("src",top.ftpServer+obj.source);
                }else{
                    $("#avatar-img").attr("src","../img/touxiang.jpg");
                }
                $("#cid").val(data.cid);
                $("#phone").val(data.phone);
                $("#sex").val(data.sex);
                var cId = data.cid;
                if(cId.length > 0){
                    $("#birth").val(cId.substr(6,4)+"-"+cId.substr(10,2) +"-" +cId.substr(12,2));
                    $("#cid").on('change',function(){
                        $("#cid").blur(function(){
                            var cId_blur = $("#cid").val();
                            if(cId_blur.length == 18){
                                $("#birth").val(cId_blur.substr(6,4)+"-"+cId_blur.substr(10,2) +"-" +cId_blur.substr(12,2));
                            } else if(cId_blur.length == 15){
                                $("#birth").val("19"+cId_blur.substr(6,2)+"-"+cId_blur.substr(10,2) +"-" +cId_blur.substr(12,2));
                            } else{
                                $("#cid").validatebox();
                                if($('.validatebox-invalid').length>0){
                                    return false;
                                }
                            }
                        });
                    });
                } else{
                    $("#cid").on('change',function(){
                        $("#cid").blur(function(){
                            var cId_blur = $("#cid").val();
                            if(cId_blur.length == 18){
                                $("#birth").val(cId_blur.substr(6,4)+"-"+cId_blur.substr(10,2) +"-" +cId_blur.substr(12,2));
                            } else if(cId_blur.length == 15){
                                $("#birth").val("19"+cId_blur.substr(6,2)+"-"+cId_blur.substr(10,2) +"-" +cId_blur.substr(12,2));
                            } else{
                                $("#cid").validatebox();
                                if($('.validatebox-invalid').length>0){
                                    return false;
                                }
                            }
                        });
                    });
                }
                // importing('datepicker',function(){
                //     $("#birth").datepicker({format: 'yyyy-mm-dd'});
                // });
                $(".dict").dict();
                $(".dict").dictSelect(data.post);
                $("[dict-id='post'] #post").addClass("w260px");
                $("#address").val(data.address);
                $open('#edit-user-block', {width: 800, top: 180, title: '&nbsp用户个人中心'});
                importing(  '../plugin/daterangepicker/moment.js','../plugin/daterangepicker/datetimepicker.js', function () {
                    $("#birth").datetimepicker({
                        format: 'YYYY-MM-DD',
                        pickTime: false
                    });
                });
//                editavatar();
//                //上传图片
                upclick({
                    dataname: "file",
                    element: "avatar-btn",
                    action: top.servicePath + '/sys/file/upload?isResize=true',
                    onstart: function (filename) {
                        $(".progress-bar").css('width','50%');
                    },
                    oncomplete: function (r) {
                        if (r.flag == 1) {
                            $("#avatar").val(obj2str(r.data));
                            $("#avatar-img").attr('src', top.ftpServer + r.data.source);
//                            $("#avatar-selectedImg").attr('href', top.ftpServer +  r.data.source)//r.data.p160_160
//                            editavatar(r.data.source);
                        } else {
                            toast(obj.msg, 600).err();
                            $(".progress-bar").css('width','0%');
                        }
                        $(".progress-bar").css('width','100%');
                    }
                });
            }
        });
    });
    $('#close-user-center').on('click',function () {
        $('#edit-user-block').window('close').find('input').val('');
        $('.user-validate').removeClass('validatebox-invalid');
    });
    $('#save-user-center').on('click',function () {
        $('.user-validate').validatebox();
        if($('.validatebox-invalid').length>0){
            return false;
        }
        var param = $('#user-center-form').serializeObject();
        param = $.extend(param,{
            userId:top.currentUser.userInfo.userId,
            modifyPid:top.userId,
            orgId:top.orgId,
            status:0
        });
        $post(top.servicePath+'/sys/user/editUserInfo',param,function (r) {
            if(r.flag==1){
                toast('保存成功！',600,function(){
                    $('#edit-user-block').$close();
                    $('.common-input').val('');
                    var param = {
                        userId:top.currentUser.userInfo.userId
                    };
                    getUserInfo(param,function(r){
                        if (r.flag == 1) {
                            var data = r.data;
                            if(data.avatar && data.avatar !=''){
                                var obj = eval('(' + data.avatar + ')');
                                byid('img-responsive').src=top.ftpServer + obj.p160_160;
                            }else{
                                byid('img-responsive').src="../img/touxiang.jpg";
                            }
                        }
                    });
                }).ok();
            }else{
                toast(r.msg,600).err()
            }
        },true);
    });
    //个人中心 end

    //点击用户名 修改密码
    $('#modified-pwd').on('click',function () {
        $open('#edit-pwd-block',{width:336,top:180,title:'&nbsp系统用户修改个人密码',closable:false});
    });
    $('#close-edit-pwd').on('click',function () {
        $('#edit-pwd-block').window('close').find('input').val('');
        $('.pwd-validate').removeClass('validatebox-invalid');
    });
    
    $('#save-edit-pwd').on('click',function () {
        var oldPwd = $('#old-pwd').val();
        var newPwd = $('#new-pwd').val();
        $('.pwd-validate').validatebox();
        if($('.validatebox-invalid').length>0){
            return false;
        }
        if($('#confirm-new-pwd').val() != newPwd){
            toast(' 请确认两次输入的新密码是否一致！').width(300).addClass('warn');
            return false;
        }
        $post(top.servicePath+'/sys/user/password',{id:top.userId,userPwd:oldPwd,newPassword:newPwd,userName:top.userName},function (res) {
            var msg = res.msg;
            msg = msg?msg:'新密码修改成功！';
            toast(msg,600,function () {
                $('#edit-pwd-block').$close();
                $('.common-input').val('');
            }).ok();
        },true);
    });

    //注销
    function logout() {
        gotoLogin();
    }
    $("#login-out").on("click",function () {
        var $clogout = $('#confirm-logout');

        /*显示是否退出确认框*/
        showMask().css('background', 'rgba(43, 43, 43, 0.44)');
        $clogout.removeClass('hide');

        $clogout.on('click', '#logout-cancel', function(){ /*取消退出*/
            hideMask();
            $clogout.addClass('hide');
        }).on('click', '#logout-ok', function(){ /*确认退出*/
            logout();
        })
    });
    //默认载入首页
    $('.accordion-toggle')[0].click();
    $('a[direct$=html]')[0].click();
    // //打开收件箱页面
    // $('#msg-count-wrap').on('click',function(){
    //     //如果已经打开过,并且没有被关闭清除, 那就直接选中现在这个
    //     if(typeof window.msgTab=='object' && window.msgTab.children().length>0){
    //         var html ='<em id="newsTitle">收件箱</em>';
    //         window.msgTab=$openOnce(getViewPath('fstPage/newsMessage.html'), html);
    //         $("#msg-left-content div.li:eq(0) .cc").trigger("click");
    //     }else{
    //         var html ='<em id="newsTitle">收件箱</em>';
    //         window.msgTab=$open(getViewPath('fstPage/newsMessage.html'),html);
    //     }
    //
    // });
    
    // $post(top.servicePath+'/sys/message/findReceivePageCount',{receiverId:top.userName,msgState:"0"},function (res) {
    //     if(res.flag == 1){
    //     	$("#msg-count").text(res.totalCount)
    //     }
    // },true);
    
});
