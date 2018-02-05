var newURL="";
var version = "";
var driverType = "0";
$(function(){  
	
	//if(window.webviewapi) {
		var data = getVersionInfo();
		//var data = window.webviewapi.getVersionInfo();
		var versionInfo = JSON.parse(data);
		if(versionInfo.version) {
			version = versionInfo.version;
		}
		if(versionInfo.driverType) {
			driverType = versionInfo.driverType;
		}
//	} 
	$("#version").html(version+" ");
});

function getVersionInfo(){
//	return  '{"version":"1.0.3","driverType":"1"}';
	if(window.webviewapi) {
		return window.webviewapi.getVersionInfo();
	}else{
		return "";
	}
}


function checkVersion() { 
	 
	var url = config.service + "versionInfo/checkVersion/" + driverType + "/" + version + ".do";
	ynzAjax.get(
		url,
		function(response) {
			if(response.code == 0) {
				sendMessage("提示", "当前已经是最新版本！");
			} else {
				newURL =response.data.dowloadUrl;
				sendMessageToo("提示", "发现新版本,是否更新?", "更新");
			}
		},
		function(e) {
			console.log("--------error------" + JSON.stringify(e));
		}
	)
}

function sendMessageToo(title,content,affirm){
    var dia=$.dialog({
        title:title,
        content:content,
        button:[affirm,"取消"]
    });
    dia.on("dialog:action",function(e){
    	console.log(e.index);
    	if(e.index==0){
    		console.log(newURL);
			if(window.webviewapi) {//安卓为自动下载，ios苹果商店下载
				window.webviewapi.openBrownUrl(newURL);
			}
			if(driverType=="1"){//安卓下载进度 ，1表示当前设备为安卓
				$("#processpanel").show();
				getprocess();
			}
    	}
    });
    dia.on("dialog:hide",function(e){
        console.log("dialog hide")
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
}