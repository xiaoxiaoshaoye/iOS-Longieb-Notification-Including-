/**
 * Created by Administrator on 2017/4/14 0014.
 */
if(document.documentElement.clientWidth>750){
    document.documentElement.style.fontSize = "100px";
}else{
    document.documentElement.style.fontSize = document.documentElement.clientWidth/7.5 + "px";
}
window.onresize=function(){
    if(document.documentElement.clientWidth>750){
        document.documentElement.style.fontSize = "100px";
    }else{
        document.documentElement.style.fontSize = document.documentElement.clientWidth/7.5 + "px";
    }
};