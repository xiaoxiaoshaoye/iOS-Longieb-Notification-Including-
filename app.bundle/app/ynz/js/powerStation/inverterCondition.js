$(function(){
	var seachName = config.getInverterCondition();
	if(seachName==null||seachName==""){
		$("#inverterCondition").val("");
	}else{
		$("#inverterCondition").val(seachName);
	}
	var hisArr = config.getInverterConditionArr().split(",");
	$("#historyBox").empty();
	for(var j=0;j<hisArr.length;j++){
		$("#historyBox").append("<li onclick='seachNameFun("+j+");'>"+hisArr[j]+"</li>")
	}
	document.onkeydown = function(e){
		var ev = document.all ? window.event:e;
		if(ev.keyCode==13){
			var inverterCondition = $("#inverterCondition").val();
			config.setInverterCondition(inverterCondition);
			console.log(config.getInverterCondition());
			var arr = config.getInverterConditionArr();
			arr = arr.split(",");
			sethistory(arr,inverterCondition);
			window.location.href="inverterDetail.html";
		}
	}
});

function sethistory(arr,temp){
	var newArr =[];
	newArr.push(temp);
	if(arr.length<5){
		for(var i=0;i<arr.length;i++){
			if(arr[i]!=null&&arr[i]!=""&&arr[i]!=temp){
				newArr.push(arr[i]);
			}
		}
	}else{
		for(var i=0;i<4;i++){
			if(arr[i]!=null&&arr[i]!=""&&arr[i]!=temp){
				newArr.push(arr[i]);
			}
		}
	}
	config.setInverterConditionArr(newArr.toString());
	console.log(config.getInverterConditionArr());
}

function seachNameFun(param){
	var hisArr = config.getInverterConditionArr().split(",");
	$("#inverterCondition").val(hisArr[param]);
}
