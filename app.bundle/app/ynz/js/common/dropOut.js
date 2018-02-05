var index =2;
$(function(){
	$("#settingBtn").tap(function(){
		if(index==1){
			$("#exitBox").empty();
			$("#exitBox").hide();
			index=2;
		}else{
			$("#exitBox").show();
			$("#exitBox").append('<div class="wrapper"></div><div onclick="logOut();" class="exitdiv">退出登录</div>');
			index=1;
		}
	})
})
function logOut(){
	var storage = window.localStorage;
	storage.setItem('pvmts_login_flag',false);
	window.location.href ="login.html";
}