var dataList=[];
var seachName="";
$(function(){
	var powerStationId = config.getPowerStationId();
	var inverterDt = cacheUtil.getCache("3",powerStationId);
	if(inverterDt){
		var inver = JSON.parse(inverterDt);
		dataList = inver;
		setInverterList(inver);	
	}
	getData()
	sethislist();
	document.onkeydown = function(e){
		var ev = document.all ? window.event:e;
		if(ev.keyCode==13){
			
		}
	}
});
function clearInp(){
	$("#inverterCondition").val("");
}
function seacherBtn(){
	var inverterCondition = $("#inverterCondition").val();
	seachName = inverterCondition;
	var arr = config.getInverterConditionArr();
	arr = arr.split(",");
	sethistory(arr,inverterCondition);
	$("#mainCon").show();
	$("#seachCon").hide();
	if(inverterCondition!=null&&inverterCondition!=""){
		$("#seachName").html(inverterCondition);
	}else{
		$("#seachName").html("搜索");
	}
	getData();
}
function getData(){
	var url=config.service+"/longiPowerStation/getInverterBaseInfo";
	ynzAjax.post(
		url,
		{
			'page':1,
			'pagesize':1000,
			"seachName":seachName,
			'inverterId':"",
			'powerStationId':config.getPowerStationId()
		},
		function(response){ 
	        var data =response.results;
	        dataList = data;
	    	console.log(data);
	    	var datastr = JSON.stringify(data);
	    	var powerStationId = config.getPowerStationId();
	    	cacheUtil.setCache("3",powerStationId,datastr);
	    	setInverterList(data);
        },
        function(e){ 
            console.log("--------error------"+e);
        }
	)
}
var listview = 0; //显示全部
function setInverterList(data){
	$("#inverterList").empty();
	var html="";
	for(var i=0;i<data.length;i++){
		var status = data[i].equipmentStatus;
		if(status=="0"){
			status='<p class="state standbyState">待机</p>';
			if(listview==0||listview==2){
				
			}else{
				continue;
			}
		}else if(status=="2"){
			if(listview==0||listview==3){
				
			}else{
				continue;
			}
			status='<p class="state troubleState">故障</p>';
		}else{
			if(listview==0||listview==1){
				
			}else{
				continue;
			}
			status='<p class="state normalState">正常</p>';
		}
		html+='<div class="clx_equipList"><div class="relaTive"><div class="clx_box">'+
		'<p class="clx_name"><span class="redBar borderRadius20"></span>'+
		'<b>'+data[i].name+'</b></p>'+status+'</div>'+
		'<ul class="clx_Mess equipMessbox"><li class="nowPower borderB">'+
		'<i class="powerImg"></i><span>实时功率</span><i class="redColor" style="font-size: 0.3rem;">'+toDecimal(data[i].threePhaseActivePower,2)+' kW</i></li>'+
		'<li><i class="electImg"></i><span>今日电量</span><i class="redColor" style="font-size: 0.3rem;">'+toDecimal(data[i].generationDaliy,2)+' kWh</i></li></ul>'+
		'<div class="temper"><span class="temperNum">'+toDecimal(data[i].temperature)+'</span><i class="tempUnit">℃</i></div></div></div>';
	}
	$("#inverterList").append(html);
}

function seachDiv(){
	$("#mainCon").hide();
	$("#seachCon").show();
}

function cancle(){
	$("#mainCon").show();
	$("#seachCon").hide();
}

function sethistory(arr,temp){
	var newArr =[];
	if(temp!=null&&temp!=""){
		newArr.push(temp);
	}
	if(arr.length<5){
		for(var i=0;i<arr.length;i++){
			if(arr[i]!=null&&arr[i]!=""&&arr[i]!=temp){
				newArr.push(arr[i]);
			}
		}
	}else{
		var num = 4;
		if(newArr.length==0){
			num = 5;
		}
		for(var k=0;k<num;k++){
			if(arr[k]!=null&&arr[k]!=""&&arr[k]!=temp){
				newArr.push(arr[k]);
			}
			if(arr[k]==temp){
				num++;
			}
		}
	}
	config.setInverterConditionArr(newArr.toString());
	console.log(config.getInverterConditionArr());
	sethislist();
}

function seachNameFun(param){
	var hisArr = config.getInverterConditionArr().split(",");
	$("#inverterCondition").val(hisArr[param]);
}

function loadList(index){
	if(index==0){
		$(".headNav").find("li").eq(index).addClass("activeLi").siblings().removeClass("activeLi");
		var iii = $(".headNav").find("i");
		for(var i=0;i<iii.length;i++){
			if(i==index){
				$(".headNav").find("i").eq(i).addClass("redBorder")
			}else{
				$(".headNav").find("i").eq(i).removeClass("redBorder")
			}
		}
	}
	if(index==1){
		$(".headNav").find("li").eq(index).addClass("activeLi").siblings().removeClass("activeLi");
		var iii = $(".headNav").find("i");
		for(var i=0;i<iii.length;i++){
			if(i==index){
				$(".headNav").find("i").eq(i).addClass("redBorder")
			}else{
				$(".headNav").find("i").eq(i).removeClass("redBorder")
			}
		}
	}
	if(index==2){
		$(".headNav").find("li").eq(index).addClass("activeLi").siblings().removeClass("activeLi");
		var iii = $(".headNav").find("i");
		for(var i=0;i<iii.length;i++){
			if(i==index){
				$(".headNav").find("i").eq(i).addClass("redBorder")
			}else{
				$(".headNav").find("i").eq(i).removeClass("redBorder")
			}
		}
	}
	if(index==3){
		$(".headNav").find("li").eq(index).addClass("activeLi").siblings().removeClass("activeLi");
		var iii = $(".headNav").find("i");
		for(var i=0;i<iii.length;i++){
			if(i==index){
				$(".headNav").find("i").eq(i).addClass("redBorder")
			}else{
				$(".headNav").find("i").eq(i).removeClass("redBorder")
			}
		}
	}
	listview = index;
	if(dataList!=null){
		setInverterList(dataList);
	}
}


function sethislist(){
	var hisArr = config.getInverterConditionArr().split(",");
	$("#historyBox").empty();
	for(var j=0;j<hisArr.length;j++){
		$("#historyBox").append("<li onclick='seachNameFun("+j+");'>"+hisArr[j]+"</li>")
	}
}


function reloadthispage(){
	window.location.href="inverterDetail.html";
}