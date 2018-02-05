var type;
$(function(){
	var storage = window.localStorage;
	type = storage.getItem('ynz_service_type');
	setListIp();
});
function selectType(type11){
	type = type11;
}

function setListIp(){
	$("#xianUrl").html(config.service_0);
	$("#taizhouUrl").html(config.service_1);
	$("#ceshiUrl").html(config.service_2);
	if(type==0){
		$("#radio1").attr("checked","checked")
	}
	if(type==1){
		$("#radio2").attr("checked","checked")
	}
	if(type==2){
		$("#radio3").attr("checked","checked")
	}
}
function besure(){
	config.setService(type);
	window.location.href="login.html";
}
function cancel(){
	window.location.href="login.html";
}
