var seachName="";
$(function(){
	getData();
	sethislist();
//	document.onkeydown = function(e){
//		var ev = document.all ? window.event:e;
//		if(ev.keyCode==13){
//			
//		}
//	}
});
function clearInp(){
	$("#messBoxCondition").val("");
}
function seacherBtn(){
	var messBoxCondition = $("#messBoxCondition").val();
	seachName = messBoxCondition;
	var arr = config.getMessBoxCondition();
	arr = arr.split(",");
	sethistory(arr,messBoxCondition);
	$("#mainCon").show();
	$("#seachCon").hide();
	if(messBoxCondition!=null&&messBoxCondition!=""){
		$("#seachName").html(messBoxCondition);
	}else{
		$("#seachName").html("搜索");
	}
	getData();
}
function getData(){
	var url=config.service+"/longiPowerStation/getMeasureBoxList";
	ynzAjax.post(
			url,
			{
				'page':1,
				'pagesize':1000,
				'inverterId':"",
				"seachName":seachName,
				'powerStationId':config.getPowerStationId()
			},
    		function(response){ 
            var data =response.results;
        	console.log(data);
        	setMeasureBoxList(data);
	        },
	        function(e){ 
	            console.log("--------error------"+e);
	        }
	)
}
function setMeasureBoxList(data){
	$("#measureBoxList").empty();
	var html="";
	for(var i=0;i<data.length;i++){
		
		html+='<div onclick="tomeasureBoxDetail('+data[i].id+');" class="clx_equipList"><div class="relaTive"><div class="clx_box" style="width: 2.35rem;">'+
				'<p class="clx_name"><span class="redBar borderRadius20"></span>'+
				'<b>'+data[i].measurementBoxName+'</b></p></div><ul class="centerBox"><li class="borderR">'+
				'<em class="blueColor">'+data[i].threePhasemeterCounts+'</em><p>交流电表</p></li><li>'+
				'<em class="blueColor">'+data[i].drictmeterCounts+'</em><p>直流电表</p></li></ul>'+
				'<div class="absoNext next floatR"><i class="ui-icon-next"></i>'+
				'</div></div></div>';
	}
	$("#measureBoxList").append(html);
}

function tomeasureBoxDetail(id){
	config.setMeasureBoxId(id);
	window.location.href ="measureDetail.html";
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
	config.setMessBoxCondition(newArr.toString());
	console.log(config.getMessBoxCondition());
	sethislist();
}

function sethislist(){
	var hisArr = config.getMessBoxCondition().split(",");
	$("#historyBox").empty();
	for(var j=0;j<hisArr.length;j++){
		$("#historyBox").append("<li onclick='seachNameFun("+j+");'>"+hisArr[j]+"</li>")
	}
}

function seachNameFun(param){
	var hisArr = config.getMessBoxCondition().split(",");
	$("#messBoxCondition").val(hisArr[param]);
}

function reloadthispage(){
	window.location.href="messboxList.html";
}