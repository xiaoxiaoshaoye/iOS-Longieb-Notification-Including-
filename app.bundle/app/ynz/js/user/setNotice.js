var dataInfo;
$(function(){
	console.log(config.getUserInfo());
	var userId = JSON.parse(config.getUserInfo()).userid;
	var url =config.service+"newsSetting/getNewsSetting/"+userId+".do";
	
	ynzAjax.get(
			url,
			function(data) {
				console.log(data);
				dataInfo = data.data;
				setData();
				
			},
			function(msg) {
				console.log(msg);
			});
	
});

function setData(){
	var push = dataInfo.push;
	var vibrate = dataInfo.vibrate;
	var sound = dataInfo.sound;
	if(push==0){
		$("#push").attr("checked","checked");
	}
	if(vibrate==0){
		$("#vibrate").attr("checked","checked");
	}
	if(sound==0){
		$("#sound").attr("checked","checked");
	}
}

function clickButt(num){
	console.log(num);
	var ppush;
	var vvibrate;
	var ssound;
	if(num==1){
		ppush=(dataInfo.push==0?1:0);
	}
	if(num==2){
		vvibrate=(dataInfo.vibrate==0?1:0);
	}
	if(num==3){
		ssound=(dataInfo.sound==0?1:0);
	}
	var url =config.service+"newsSetting/updateNewsSetting";
	ynzAjax.post(
			url,
			{
				"id":dataInfo.id,
				"push":ppush,
				"vibrate":vvibrate,
				"sound":ssound,
			},
			function(data) {
				console.log(data);
				
			},
			function(msg) {
				console.log(msg);
			});
}
