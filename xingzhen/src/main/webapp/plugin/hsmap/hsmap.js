/**
 * Created by YAO on 2016/9/12.
 */
var mapPluginPath=getDistPath()+'plugin/hsmap/';
function initHsMap(cb){
    var makeUtilsAndCb=function (context,cb){
        //转换为地图坐标对象
        context.convert2bdPP=function (nativePP){
            var hxPP = GPS.gcj_encrypt(nativePP.lat, nativePP.lng);
            var bdPP = GPS.bd_encrypt(hxPP.lat, hxPP.lng);
            //console.info(nativePP),console.log(bdPP)
            return bdPP;
        }
        //转换为原始坐标对象
        context.convert2nativePP=function (bdPP){
            var hxPP = GPS.bd_decrypt(bdPP.lat, bdPP.lng);
            var nativePP = GPS.gcj_decrypt(hxPP.lat, hxPP.lng);
            //console.info(nativePP),console.log(bdPP)
            return nativePP;
        }
        //直接用原始坐标对象实例化一个点
        context.BMapPoint=function (bdPP){
            var bdPP=convert2bdPP(bdPP);
            return new BMap.Point(bdPP.lng, bdPP.lat);
        }
        //创建标注
        context.addMarker=function (point,map){
            var marker = new BMap.Marker(point);
            (map||context.map).addOverlay(marker);
            return marker;
        }
        //reg event function
        context.transRegEvents=function (){
            $('[drawingtype="rectangle"]').eq(0).attr('id','map-rectrange-btn');
            $('[drawingtype="hander"]').eq(0).attr('id','map-hander-btn');
            BMap['beginToRectangle']=function(){byid('map-rectrange-btn').click();};
            BMap['backToHander']=function(){byid('map-hander-btn').click();}
        }
        //canvas
        context.drawCanvasCircle=function (){
            var canvas = document.getElementById("map-canvas");
            if(canvas.getContext){
                //获取对应的CanvasRenderingContext2D对象(画笔)
                var ctx = canvas.getContext("2d");
                //开始一个新的绘制路径
                ctx.beginPath();
                //设置弧线的颜色为蓝色
                ctx.strokeStyle = "blue";
                var circle = {
                    x : 100,    //圆心的x轴坐标值
                    y : 100,    //圆心的y轴坐标值
                    r : 50      //圆的半径
                };
                //沿着坐标点(100,100)为圆心、半径为50px的圆的顺时针方向绘制弧线
                ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI / 2, false);
                //按照指定的路径绘制弧线
                ctx.stroke();
            }
        }

        if(typeof cb=='function'){
            return cb();
        }
    }

    if(config.mapVersion==1.3){
        importing(mapPluginPath+'/css/bmap.css',mapPluginPath+'/css/DrawingManager_min.css',mapPluginPath+'js/apiv1.3.min.js',mapPluginPath+'js/PointConvertion.js',mapPluginPath+'js/DrawingManager_min.js',function(){makeUtilsAndCb(window,cb);});
    }else{
        importing(mapPluginPath+'/css/bmap.css',mapPluginPath+'/css/DrawingManager_min.css',mapPluginPath+'js-v2/apiv2.0.min.js',mapPluginPath+'js-v2/map-local.js',mapPluginPath+'js-v2/PointConvertion.js',mapPluginPath+'js-v2/DrawingManager_min.js',function(){makeUtilsAndCb(window,cb);});
    }
}

//initHsMap();