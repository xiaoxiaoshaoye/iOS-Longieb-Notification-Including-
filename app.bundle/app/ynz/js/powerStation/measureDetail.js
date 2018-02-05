$(function(){

    var url=config.service+"/longiPowerStation/getInverterInfo";

	ynzAjax.post(
			url,
			{
				'page':1,
				'pagesize':1000,
				'inverterId':config.getMeasureBoxId(),
				'powerStationId':config.getPowerStationId()
			},
    		function(response){ 
            var data =response.results[0];
        	console.log(data);
        	setMeasureBoxDetail(data);
	        },
	        function(e){ 
	            console.log("--------error------"+e);
	        }
	)
});
function setMeasureBoxDetail(data){
	$("#measureBoxDetail").empty();
	$("#measureBoxName").html(data.measurementBoxName);
	
	var html="";
	for(var i=0;i<data.ammeterList.length;i++){
		var dd = data.ammeterList[i];
		html+='<div class="clx_equipList"><div class="relaTive"><div class="clx_box" style="width:2.5rem">'+
				'<p class="clx_name"><span class="redBar borderRadius20"></span>'+
				'<b>'+dd.name+'</b></p></div><ul class="clx_Mess">'+
				'<li class="nowPower borderB"><i class="powerImg"></i><span>实时功率</span><i class="redColor">'+toDecimal(dd.power,2)+' kW</i></li>'+
				'<li><i class="electImg"></i><span>今日电量</span><i class="redColor">'+toDecimal(dd.generationDaliy,2)+' kWh</i></li>'+
				'</ul></div></div>';
	}
	$("#measureBoxDetail").append(html);
}
