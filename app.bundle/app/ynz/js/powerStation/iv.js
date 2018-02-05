$(function(){

    var url=config.service+"ivEquipment/getIvEquipments?powerstationId="+config.getPowerStationId()+"&page=1&pagesize=16";

	ynzAjax.get(
			url,
    		function(response){ 
            var data =response.results;
        	console.log(data);
        	setIvList(data);
	        },
	        function(e){ 
	            console.log("--------error------"+e);
	        }
	)
});
function setIvList(data){
	$("#ivList").empty();
	var html="";
	for(var i=0;i<data.length;i++){
		
		html+='<ul class="navLi">'+
					'<li style="width:23%;">'+data[i].name+'</li>'+
					'<li>'+toDecimal(data[i].vVal,2)+'</li>'+
					'<li>'+toDecimal(data[i].aVal,2)+'</li>'+
					'<li>'+toDecimal(data[i].wVal,2)+'</li>'+
					'<li style="width:20%;">'+toDecimal(data[i].dayVal,2)+'</li>'+
				'</ul>';
	}
	$("#ivList").append(html);
}
