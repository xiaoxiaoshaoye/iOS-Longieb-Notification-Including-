$(function(){
	var id = config.getPowerStationId();
    var url=config.service+"powerStation/getEquipmentType/"+id+".do";

	ynzAjax.get(
			url,
    		function(response){ 
            var data =response.data;
        	console.log(data);
        	setEquipList(data);
	        },
	        function(e){ 
	            console.log("--------error------"+e);
	        }
	)
});

function setEquipList(data){
	for(var i=0;i<data.length;i++){
		if(data[i].id=="3"){
			$("#inverter").html(data[i].count+" 台");
			$("#grideBox").html(data[i].count+" 套");
		}
		if(data[i].id=="9"){
			$("#contrl").html(data[i].count+" 套");
		}
		if(data[i].id=="10"){
			$("#ivequip").html(data[i].count+" 套");
		}
		if(data[i].id=="8"){
			$("#weatherStation").html(data[i].count+" 套");
		}
	}
}
