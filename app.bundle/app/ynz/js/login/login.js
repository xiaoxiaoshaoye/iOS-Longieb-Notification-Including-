var flag = true;
var hrefURL="plantList.html";
var version = "";
var driverType = "0";
var loginflag="false";
var timer;

$(function() {
	console.log(config.service);
	loginflag = window.localStorage.getItem('pvmts_login_flag');
	if(window.webviewapi){
		var pushMSG = window.webviewapi.getWebView();
		if(pushMSG!=""){
			var pushobj = JSON.parse(pushMSG);
			if(pushobj.webid&&pushobj.webid!=""){
				if(pushobj.webid==1&&pushobj.param){
					var psid = pushobj.param["powerstationid"];
					if(psid&&psid!=""){
						hrefURL=config.pushMSG;
						config.setPowerStationId(psid);
					}
				}
			}
		}
	}
	var uname = window.localStorage.getItem('pvmts_username');
	var upass = window.localStorage.getItem('pvmts_password');
	if(uname&& uname != "" ) {
		$("#username").val(uname);
		$("#password").val(upass);
		$("#check1").attr("checked", true);
	}
	checkVersion();
});

function getVersionInfo(){
//	return  '{"version":"1.0.4","driverType":"1"}';
	if(window.webviewapi) {
		return window.webviewapi.getVersionInfo();
	}else{
		return "";
	}
}

function checkVersion() { 
	var data = getVersionInfo();
	if(data==""){
		return;
	}
	var versionInfo = JSON.parse(data);
	if(versionInfo.version) {
		version = versionInfo.version;
	}
	if(versionInfo.driverType) {
		driverType = versionInfo.driverType;
	}
	var url = config.service + "versionInfo/checkVersion/" + driverType + "/" + version + ".do";
	ynzAjax.get(
		url,
		function(response) {
			if(response.code == 0) {
				if(loginflag == "true") {
			    	if(window.webviewapi) {
			        	var token = config.getToken();
		                window.webviewapi.setToken(token);
		            }
					window.location.href = hrefURL;
				}
			} else {
				var newVersion = response.data.versionNumber;
				newVersion="";
				newURL =response.data.dowloadUrl;
				sendMessageToo("提示", "发现新版本,是否更新?", "更新",newVersion);
			}
		},
		function(e) {
			if(loginflag == "true") {
		    	if(window.webviewapi) {
		        	var token = config.getToken();
	                window.webviewapi.setToken(token);
	            }
				window.location.href = hrefURL;
			}
			console.log("--------error------" + JSON.stringify(e));
		}
	)
}
function onSubmit() {
	console.log($("#username").val());
	console.log($("#password").val());
	var userName = $("#username").val();
	var password = $("#password").val();
	var obj = {};
	obj.username = userName;
	obj.password = password;
	var url = config.service + "user/api/login.do";
	ynzAjax.post(
		url,
		obj,
		function(data) {
			if(data.code == "1") {
				if(window.webviewapi) {
					window.webviewapi.setToken(data.data.token);
				}
				$("#tip").hide();
				var storage = window.localStorage;
				storage.setItem('pvmts_login_flag', true);
				flag = $("#check1")[0].checked
				if(flag) {
					//记住密码
					storage.setItem('pvmts_username', userName);
					storage.setItem('pvmts_password', password);
					config.setToken(data.data.token);
					config.setUserInfo(JSON.stringify(data.data));
				} else {
					storage.setItem('pvmts_username', "");
					storage.setItem('pvmts_password', "");
					config.setToken(data.data.token);
					config.setUserInfo(JSON.stringify(data.data));
				}
				window.location.href = hrefURL;
			} else {
				$("#tip").show();
			}
		},
		function(msg) {
			console.log(msg);
		}
	);
}
function forgetMSG(){
	sendMessage("提示","请联系管理员！")	
}

function sendMessageToo(title,content,affirm,version){
	
    var dia=$.dialog({
        title:title,
        content:content,
        button:[affirm,"取消"]
    });
    var fflog = 0;
    dia.on("dialog:action",function(e){
    	if(fflog==0){
			fflog++;
			return;
		}
    	console.log(newURL);
    	setTimeout(function(){//解决苹果手机触屏敏感bug
    		if(e.index==0){
	    		console.log(newURL);
	    		if(window.webviewapi) {//安卓为自动下载，ios苹果商店下载
					window.webviewapi.openBrownUrl(newURL);
				}
				if(driverType=="1"){//安卓下载进度 ，1表示当前设备为安卓
					$("#processpanel").show();
					getprocess();
				}else{
					sendMessageToo(title,content,affirm,version);
				}
	    	}
	    	if(e.index==1){
	    		if(loginflag == "true") {
			    	if(window.webviewapi) {
			        	var token = config.getToken();
		                window.webviewapi.setToken(token);
		            }
					window.location.href = hrefURL;
				}
	    	}
    	},1000,e);
    	console.log(e.index);
    	
    });
}
function getprocess(){
	timer = window.setInterval(function(){
		var num = "0";
		if(window.webviewapi) {
			num = window.webviewapi.getProcess();
        	$("#processnum").html(num);
        }else{
        	window.clearInterval(timer);
        }
		if(num=="100"){
			window.clearInterval(timer);
		}
	},500);
}

function hideSure(){
	$("#processpanel").hide();
	if(loginflag == "true") {
    	if(window.webviewapi) {
        	var token = config.getToken();
            window.webviewapi.setToken(token);
        }
		window.location.href = hrefURL;
	}
}
