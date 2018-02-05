$(function() {
	refreshUser();
});

function logOut() {
	var storage = window.localStorage;
	storage.setItem('pvmts_login_flag', false);
	window.location.href = "login.html";
}

function clickFile() {
	console.log("qqq");
	$("#addImg").click();
}

function uploadFile(e) {
	var name = e.target.files[0].name;
	var imageUrl = getObjectURL(e.target.files[0]);
	convertImgToBase64(imageUrl, function(base64Img) {
		// base64Img为转好的base64,放在img src直接前台展示(<img src="data:image/jpg;base64,/9j/4QMZRXh...." />)
		console.log(base64Img);
		// base64转图片不需要base64的前缀data:image/jpg;base64
		console.log(base64Img.split(",")[1]);
		var baseImg =base64Img.split(",")[1];
		var paramObj = {
				"base64file": baseImg,
				"base64name": name,
				"fileDir": "pvmtsSys/app/longieb"
			}

			ynzAjax.post(
				config.uploadUrl,
				paramObj,
				function(data) {
					console.log(data);
					$("#headshot").attr("src", data.url);
					var user1 = JSON.parse(config.getUserInfo());
					user1.headshot = data.url
					config.setUserInfo(JSON.stringify(user1));
					console.log(user1);
					updateImg(user1);
				},
				function(msg) {
					console.log(msg);
				}
			);
	});
	e.preventDefault();

}
function convertImgToBase64(url, callback, outputFormat) {
	var canvas = document.createElement('CANVAS');
	var ctx = canvas.getContext('2d');
	var img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		var width = img.width;
		var height = img.height;
		// 按比例压缩4倍
		var beishu = (width < height ?height :width) / 200;
		var rate = (width < height ? width / height : height / width) / beishu;
		canvas.width = width * rate;
		canvas.height = height * rate;
		ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
		var dataURL = canvas.toDataURL(outputFormat || 'image/png');
		callback.call(this, dataURL);
		canvas = null;
	};
	img.src = url;
}

function getObjectURL(file) {
	var url = null;
	if(window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if(window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if(window.webkitURL != undefined) { // web_kit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}
function updateImg(user) {
	var paramObj = {
		userId: user.userid,
		telephone: user.telephone,
		username: user.username,
		companyId: user.companyId,
		roleId: user.roleId,
		email: user.email,
		realname: user.realname,
		headshot: user.headshot,
	}

	ynzAjax.post(
		config.service + "user/editUser.do",
		paramObj,
		function(data) {
			console.log(data);

		},
		function(msg) {
			console.log(msg);
		}
	);
}

function refreshUser(){
	ynzAjax.get(
		config.service + "user/userInfo",
		function(data) {
			var user = data.data;
			console.log(user);
			$("#telephone").val(user.telephone);
			$("#username").val(user.username);
			$("#email").val(user.email);
			$("#realname").val(user.nickname);
			$("#company").val(user.inputCompany);
			$("#role").val(user.roleList[0].roleName);
			if(user.headshot != "" && user.headshot != null) {
				$("#headshot").attr("src", user.headshot);
			}
		},
		function(msg) {
			console.log(msg);
		}
	);
}

function uploadImage(base64Img){
	var date = new Date();
	var str = timeUtil.dateToString(date,"yyyymmddhhmiss");
	var mms = date.getMilliseconds();
	var name = "image_"+str+mms+".jpg";
	var baseImg =base64Img.split(",")[1];
		var paramObj = {
				"base64file": baseImg,
				"base64name": name,
				"fileDir": "pvmtsSys/app/longieb"
			}

			ynzAjax.post(
				config.uploadUrl,
				paramObj,
				function(data) {
					console.log(data);
					$("#headshot").attr("src", data.url);
					var user1 = JSON.parse(config.getUserInfo());
					user1.headshot = data.url
					config.setUserInfo(JSON.stringify(user1));
					console.log(user1);
					updateImg(user1);
				},
				function(msg) {
					console.log(msg);
				}
			);
}
