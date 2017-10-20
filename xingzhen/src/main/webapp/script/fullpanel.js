//全屏显示工具 依赖jquery.fullscreen.js
var fullPanelUtils = {
    fullPanel: function (ctrlSelector,the) {
        var wrap = top.$(window.frameElement);
        var topBody = top.$('body');
        ctrlSelector.click(function () {
            if (the.hasClass('full-panel')) {
                the.siblings().add(the.siblings()).addClass('hidden');

                topBody.animate({opacity: 0}, 10, function () {
                    //避免引发重绘
                    window._cancelGlobalReFixTbTime = new Date().getTime();
                    $('body').removeClass('full-mode-ovh');
                    topBody.removeClass('full-mode-ovh');
                    wrap.removeClass('full-panel-wrap');
                    //引发重绘
                    window._cancelGlobalReFixTbTime = new Date().getTime() - 500;
                    the.removeClass('full-panel');
                    setTimeout(function () {
                        topBody.animate({opacity: 1}, 60);
                        the.siblings().add(the.siblings()).removeClass('hidden');
                    }, 200);
                });
                ctrlSelector[0] && (ctrlSelector[0].title = '最大化显示') && ctrlSelector.removeClass('active');

            } else {
                the.siblings().add(the.siblings()).addClass('hidden');
                topBody.animate({opacity: 0}, 10, function () {
                    //避免引发重绘
                    window._cancelGlobalReFixTbTime = new Date().getTime();
                    $('body').addClass('full-mode-ovh');
                    topBody.addClass('full-mode-ovh');
                    wrap.addClass('full-panel-wrap');
                    the.addClass('full-panel');
                    //引发重绘
                    window._cancelGlobalReFixTbTime = new Date().getTime() - 500;
                    setTimeout(function () {
                        topBody.animate({opacity: 1}, 60);
                    }, 260);
                });
                ctrlSelector[0] && (ctrlSelector[0].title = '还原') && ctrlSelector.addClass('active');
            }
        });
        return this;
    }
};