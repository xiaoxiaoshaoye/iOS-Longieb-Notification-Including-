$(function(){

    var url=config.service+"/trackInfoController/getTrackInfoListInfo";

	ynzAjax.get(
			url,
    		function(response){ 
            var data =response.data;
        	console.log(data);
        	setaxies(data);
	        },
	        function(e){ 
	            console.log("--------error------"+e);
	        }
	)
});
function setaxies(data){
	$("#axiseList").empty();
	var html="";
	for(var i=0;i<data.length;i++){
		var status = data[i].status;
		if(status=="0"){
			status='<p class="state normalState">正常</p>';
		}
		if(status=="1"){
			status='<p class="state normalState standbyState">卡机</p>';
		}
		if(status=="2"){
			status='<p class="state troubleState">停机</p>';
		}
		var html0 ='<li class="numCont floatL" style="margin-top: 0.4rem;">'+
				'<p><i class="direImg"></i><span>方位角</span><b class="blueColor">'+toDecimal(data[i].lxfangvalue,2)+'°</b><b class="redColor">'+toDecimal(data[i].fangvalue,2)+'°</b></p>'+
				'<div class="borderDiv" style="height:0.31rem;"></div></li></ul></div>';;
		if(data[i].model!="1"){
			html0='<li class="numCont floatL">'+
				'<p><i class="angleImg"></i><span>倾斜角</span><b class="blueColor">'+toDecimal(data[i].lxqinvalue,2)+'°</b><b class="redColor">'+toDecimal(data[i].qinvalue,2)+'°</b></p>'+
				'<p><i class="direImg"></i><span>方位角</span><b class="blueColor">'+toDecimal(data[i].lxfangvalue,2)+'°</b><b class="redColor">'+toDecimal(data[i].fangvalue,2)+'°</b></p>'+
				'<div class="borderDiv"></div></li></ul></div>';
		}
		html+='<div class="clx_equipList axie_equipList"><div class="clx_box">'+
				'<p class="clx_name"><span class="redBar borderRadius20"></span>'+
				'<b>'+data[i].name+'</b></p>'+status+
				'</div><ul class="axieBox"><li class="axieTitle">'+
				'<span>理论值</span><span>实际值</span></li>'+
				html0;
	}
	$("#axiseList").append(html);
}
