$(function(){

    var url=config.service+"/powerStation/getWeatherInfo/"+config.getPowerStationId()+".do";

	ynzAjax.get(
			url,
    		function(response){ 
            var data =response.data;
        	console.log(data);
        	setWeatherInfo(data);
	        },
	        function(e){ 
	            console.log("--------error------"+e);
	        }
	)
});
function setWeatherInfo(data){
	for(var da in data){
		if($("#"+da)){
			var value = toDecimal(data[da],2);
			$("#"+da).html(value);
		}
	}
}
