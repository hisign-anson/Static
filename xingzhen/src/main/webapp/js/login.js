$(document).ready(function () {

    window.path = '';
    // window.servicePath = '/xingji';
    window.servicePath = '';
    window.servicePath_xz = '/xz';
    window.version = '0.99';
    $("[data-toggle='tooltip']").tooltip();
    function getUploadPath(url, cb) {
        var xmlReq = new XMLHttpRequest();
        xmlReq.onreadystatechange = function () {
            if (xmlReq.readyState == 4 && xmlReq.status == 200) {
                cb(xmlReq.responseText, xmlReq.responseXML);
            }
        };
        xmlReq.open('get', url, true);
        xmlReq.send(null);
    }

    // function replaceLink(text) {
    //     var uploadPath = '';
    //     if(/uploadServer"?:"?([^",]+)/.test(text)){
    //         uploadPath = RegExp['$1'];
    //     }
    //     document.getElementById('download-link').href = 'ChromeStandaloneSetup44_20150831.exe';
    // }

    var slickColorAry = ['#045daf', '#1f837b'],
        docH = 600;

    function getBrowser() {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1]) || /msie/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {name: 'IE', version: (tem[1] || '')};
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR|Edge\/(\d+)/)
            if (tem != null) {
                return {name: 'Opera', version: tem[1]};
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }
        return {
            name: M[0],
            version: M[1]
        };
    }

    function checkBrowser() {
        var browser = getBrowser();

        if (browser.name === 'Chrome' && parseInt(browser.version) >= '44') {
            $('#login_container').css("display", "block");
        } else {
            $('#browser_download').css("display", "block");
        }
    }


    function makeMiddle() {
        var wH = $(window).height();
        if (wH > docH) {
            $('body').css('padding-top', (wH - docH) / 2.5 + 'px');
        }
    }

    function login() {
        localData.set('login-username', $('#username').val());
        $post(window.servicePath + '/sys/login', $('#login-form').serializeObject(), function (res) {
            var errorMsg = res.msg;
            if (errorMsg) {
                $('#error span').text(errorMsg);
                $('#error').fadeIn();
                setTimeout(function () {
                    $('#error').fadeOut();
                }, 5000);
            } else {
                localData.set('username', $('#username').val());
                localData.set('password', $('#password').val());
                localData.set('localDataDate', new Date().getTime());
                localData.set('path', window.path);
                // localData.set('servicePath', "");
                localData.set('servicePath', window.servicePath);
                localData.set('servicePath_xz', window.servicePath_xz);
                localData.set('token', res.data.token);
                localData.set('limits', res.data.limits);
                localData.set('currentUser', res.data.currentUser);
                localData.set('roles', res.data.roles);
                localData.set('ftpServer', res.data.ftpServer);
                var isGeneralRole = 0;
                if (res.data.roles.length == 1) {
                    if (res.data.roles[0].ROLE_NO == '099') { //是单位普通权限
                        isGeneralRole = 1
                    }
                }
                localData.set('isGeneralRole', isGeneralRole);
                location.replace(window.path + '/view/home.html?version=' + config.version);
            }
        }, true);
    }

    checkBrowser();
    makeMiddle();
    $('.btn-login').on('click', function () {
        login();
    });
    $('#error').on('click', function () {
        $('#error').fadeOut();
    });

    $(document).on('keyup', function (event) {
        var e = event || window.event;
        if (e.keyCode === 13) {
            login();
        }
    });

});


