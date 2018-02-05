var seachName ="";
var userbs={};
$(function(){
	var ustr = config.getUserInfo()
	userbs = JSON.parse(ustr);
	var id = userbs.userid
	var psliststr = cacheUtil.getCache("1",id);
	if(psliststr){
		var psdata = JSON.parse(psliststr);
		setPowerStationList(psdata);	
	}
    getData();
});
function clearInp(){
	$("#powerCondition").val("");
}
function seacherBtn(){
	var powerCondition = $("#powerCondition").val();
	seachName = powerCondition;
	var arr = config.getPowerConditionArr();
	arr = arr.split(",");
	sethistory(arr,powerCondition);
	$("#mainCon").show();
	$("#seachCon").hide();
	if(powerCondition&&powerCondition!=""){
		$("#seachName").html(powerCondition);
	}else{
		$("#seachName").html("搜索");
	}
	getData();
}
function getData(){
	var url=config.service+"powerStation/getPowerStationBaseInfo";
	ynzAjax.post(
			url,
			{
				"searchstr":seachName
			},
    		function(response){ 
            var data =response.data;
        	console.log(data);
        	cacheUtil.setCache("1",userbs.userid,JSON.stringify(data));
        	setPowerStationList(data);
	        },
	        function(e){ 
	            console.log("--------error------"+e);
	        }
	)
}

function setPowerStationList(data){
	$("#powerStationList").empty();
	var html ="";
	for(var i=0;i<data.length;i++){
		html+= '<a onclick="toOtherPage('+data[i].id+');"><div class="plantList"><div class="plantImg">'+
			'<img src="'+(data[i].imgUrl==""?"../img/plant.png":data[i].imgUrl)+'" alt="电站图片" /></div>'+
			'<div class="plantMess"><ul><li class="plantName">'+data[i].name+'</li>'+
			'<li><span>装机容量: </span><em class="capacityNum">'+data[i].installCapacity+'kW</em></li>'+
			'<li class="address"><span>地址: </span><i>'+data[i].address+'s</i></li></ul></div></div></a>';
	}
	
	$("#powerStationList").append(html);					
}

function toOtherPage(id){
	config.setPowerStationId(id);
	window.location.href ="parameter.html";
}

function seachDiv(){
	$("#mainCon").hide();
	$("#seachCon").show();
	sethislist();
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
	config.setPowerConditionArr(newArr.toString());
	console.log(config.getPowerConditionArr());
	sethislist();
}

function seachNameFun(param){
	var hisArr = config.getPowerConditionArr().split(",");
	$("#powerCondition").val(hisArr[param]);
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
	var hisArr = config.getPowerConditionArr().split(",");
	$("#historyBox").empty();
	for(var j=0;j<hisArr.length;j++){
		$("#historyBox").append("<li onclick='seachNameFun("+j+");'>"+hisArr[j]+"</li>")
	}
}

function reloadthispage(){
	window.location.href="plantList.html";
}
