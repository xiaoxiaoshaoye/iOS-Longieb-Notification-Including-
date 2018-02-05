/**
 * Created by 13116 on 2017/6/12.
 */
function resizeRoot(){

    var Dpr = 1, uAgent = window.navigator.userAgent;

//判断IOS 系统
    var isIOS = uAgent.match(/iphone/i);

//计算APP宽度
    var wWidth = (screen.width > 0) ? (window.innerWidth >= screen.width || window.innerWidth == 0) ? screen.width : window.innerWidth : window.innerWidth, wDpr, wFsize;
    if (window.devicePixelRatio) {
        wDpr = window.devicePixelRatio;
    } else {

//识别IOS分辨率方法
        wDpr = isIOS ? wWidth > 818 ? 3 : wWidth > 480 ? 2 : 1 : 1;
    }

//计算IOS 系统宽度
    if(isIOS) wWidth = screen.width;
    wFsize = wWidth > 1080 ? 144 : wWidth / 7.5;
    window.screenWidth_ = wWidth;

//赋值给html fontsize值
    document.getElementsByTagName('html')[0].dataset.dpr = wDpr;
    document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
}
//判断安卓手机浏览器低版本的用ready方法执行
function appsion(){
    uAgent = window.navigator.userAgent;
    var isIOS = uAgent.match(/iphone/i);
    if(navigator.appVersion.substring(navigator.appVersion.length-6)<537 && !isIOS){
        document.ready=function(){
            resizeRoot();
        }
    }else{
        resizeRoot();
    }
}


