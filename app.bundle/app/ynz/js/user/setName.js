var user;
$(function(){
	console.log(JSON.parse(config.getUserInfo()));
	user = JSON.parse(config.getUserInfo());
	$("#realname").val(user.nickname);
});

function cleanName(){
	$("#realname").val("");
}

function updateUser(){
	var url =config.service+"user/editUser.do";
	var realname = $("#realname").val();
	var userId = user.userid;
	if(realname==""||realname==null){
		return;
	}
	ynzAjax.post(
			url,
			{
				"realname":realname,
				"companyId":user.companyId,
				"createUserId":user.createUserid,
				"userId":userId
			},
			function(data) {
				console.log(data);
				user.nickname=realname;
				config.setUserInfo(JSON.stringify(user));
				window.location.href="userMess.html"
			},
			function(msg) {
				console.log(msg);
			}
	);
}
