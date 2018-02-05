var powerId;
var gerantDayId;
$(function(){
	var powerStationId = config.getPowerStationId();
	var pwDetail = cacheUtil.getCache("2",powerStationId);
	if(pwDetail){
		var psdata = JSON.parse(pwDetail);
		powerId = psdata.powerId;
        gerantDayId = psdata.generationDailyId;
		setPowerStationInfo(psdata);	
	}
	getDate();
	$(".dataBtns a").tap(function(){ 
		var aIndex =$(this).index();
		$(this).addClass("activAbtn").siblings().removeClass("activAbtn");
		$(".echartBox").eq(aIndex).show().siblings().hide();
		if(aIndex==0){
			getGData();
	
	
		}else{
			powerData();
		}
	})
});
function getDate(){
	var url=config.service+"/powerStation/appPowerStationDetails/"+config.getPowerStationId();
	ynzAjax.get(
			url,
    		function(response){ 
            var data =response.data;
        	console.log(data);
        	powerId = data.powerId;
        	gerantDayId = data.generationDailyId;
        	var datastr = JSON.stringify(data);
        	var powerStationId = config.getPowerStationId();
        	cacheUtil.setCache("2",powerStationId,datastr);
        	setPowerStationInfo(data);
	        },
	        function(e){ 
	            console.log("--------error------"+e);
	        }
	)
}
function setPowerStationInfo(data){
	for(var ds in data){
		if($("#"+ds)){
			if(ds=="name"){
				$("#"+ds).html(data[ds]);
			}else if(ds=="generationDaily"){
				if(data[ds]>999){
					$("#str1daliy").html("MWh");
					$("#"+ds).html(toDecimal(data[ds]/1000,2));
				}else{
					$("#str1daliy").html("kWh");
					$("#"+ds).html(toDecimal(data[ds],2));
				}
			}else if(ds=="generationGross"){
				if(data[ds]>999){
					$("#str2daliy").html("MWh");
					$("#"+ds).html(toDecimal(data[ds]/1000,2));
				}else{
					$("#str2daliy").html("kWh");
					$("#"+ds).html(toDecimal(data[ds],2));
				}
			}else{
				$("#"+ds).html(toDecimal(data[ds],2));
			}
		}
	}
	getGData();
//	powerData();
}

function toOtherPage(id){
	config.setPowerStationId(id);
	window.location.href ="parameter.html";
}

function getGData(){
	var startTime = timeUtil.dateToString(new Date(),"yyyy-mm-dd")+" 04:00:00";
	var endTime1 = timeUtil.dateToString(new Date(),"yyyy-mm-dd");
	var endTime = timeUtil.dateToString(new Date(),"yyyy-mm-dd hh:mi:ss");
	var end2 = (new Date(endTime1+" 21:00:00")).getTime()>(new Date()).getTime()?endTime:endTime1+" 21:00:00";
	ynzAjax.post(//电表当天日发电量历史
			config.service+"pointInfo/getPointHoursGeneration.do",
			{   "analoginputId":gerantDayId,
				"startTime":startTime,
				"endTime":end2,
				"minutesSpan":5,
				"haveReal":1
			},
			function(response){
				var result = getPointData(response.data,0);
				setoption1(result);
				echarts.init(document.getElementById("generatDay")).setOption(option1);
				console.log(result);
			},
			function(e){ 
				console.log("--------error------"+e);
			});
}


function powerData(){
	var startTime = timeUtil.dateToString(new Date(),"yyyy-mm-dd")+" 04:00:00";
	var endTime1 = timeUtil.dateToString(new Date(),"yyyy-mm-dd");
	var endTime = timeUtil.dateToString(new Date(),"yyyy-mm-dd hh:mi:ss");
	var end2 = (new Date(endTime1+" 21:00:00")).getTime()>(new Date()).getTime()?endTime:endTime1+" 21:00:00";
	ynzAjax.post(//电表当天功率历史
			config.service+"stationmonitor/historyRedress.do",
			{   "analoginputId":powerId,
				"startTime":startTime,
				"endTime":end2,
				"minutesSpan":5,
				"haveReal":1
			},
			function(response){
				var result = getPointData(response.data,1)
				setoption2(result);
				echarts.init(document.getElementById("power")).setOption(option2);
				console.log(result);
			},
			function(e){ 
				console.log("--------error------"+e);
			}
	);
}

function getPointData(historyDatas,num){
	var res = new Object();
	res.time=[];
	res.value=[];
	if(historyDatas.length==0){
		if(num==0){
			res.time.push(timeUtil.timeToString(new Date(),"HH:00"));
		}else{
			res.time.push(timeUtil.timeToString(new Date(),"HH:mi"));
		}
		res.value.push(toDecimal(0,3));
	}else{
		if(historyDatas.length!=1){
			for(var i=0;i<historyDatas.length;i++){
				if(historyDatas[i]!=null){
					if(num==0){
						res.time.push(timeUtil.timeToString(historyDatas[i].time,"HH:00"));
					}else{
						res.time.push(timeUtil.timeToString(historyDatas[i].time,"HH:mi"));
					}
					res.value.push(toDecimal(historyDatas[i].value,3));
				}
			}
			if(res.time.length==0){
				if(num==0){
					res.time.push(timeUtil.timeToString(new Date(),"HH:00"));
				}else{
					res.time.push(timeUtil.timeToString(new Date(),"HH:mi"));
				}
				res.value.push(toDecimal(0,3));
			}
		}else{
			if(num==0){
				res.time.push(timeUtil.timeToString(new Date(),"HH:00"));
			}else{
				res.time.push(timeUtil.timeToString(new Date(),"HH:mi"));
			}
			res.value.push(toDecimal(0,3));
		}
	}
	return res;
}