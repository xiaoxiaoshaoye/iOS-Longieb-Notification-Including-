var appSeachName = "";
var dataold={};
var curNavIndex=0;//未处理 0 已处理1;
var mescrollArr=new Array(2);//2个菜单
$(function(){
	
	var initStart = 1;//起始页码
    var scorllEnd = 4;//每页size
	var url = config.service+"alarmInfo/getAlarmListBySearchPost";
	var powerStationId = config.getPowerStationId();
//	var curNavIndex=0;//未处理 0 已处理1;
//	var mescrollArr=new Array(2);//2个菜单
	//初始化加载未处理数据
	mescrollArr[0]=initMescroll("mescroll0", "alarmList0");
	
	/*初始化菜单*/
	$(".headNav li").click(function(){
		/*未处理  已处理 点击 操作 移除增加class*/
		$(this).addClass("activeLi").siblings().removeClass("activeLi");
		$(this).find("i").addClass("redBorder").parent().siblings().find("i").removeClass("redBorder");
		
		
		var i=$(this).index();
		if(curNavIndex!=i) {
//					//隐藏当前列表
			$("#mescroll"+curNavIndex).hide();
			//显示对应的列表
			curNavIndex=i;
			$("#mescroll"+curNavIndex).show();
			//取出菜单所对应的mescroll对象,如果未初始化则初始化
			if(mescrollArr[i]==null) mescrollArr[i]=initMescroll("mescroll"+i, "alarmList"+i);
		}
		initStart = 1;
		mescrollArr[curNavIndex].resetUpScroll(true);
	})
	
	/*创建MeScroll对象*/
	function initMescroll(mescrollId,clearEmptyId){
		//创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,刷新列表数据;
		var mescroll = new MeScroll(mescrollId, {
			//上拉加载的配置
			up: {
				use:true,
				auto:false,
				callback: getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
				noMoreSize:2, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				loadFull:{
					use:false,
					delay:5000
				},
				page:{
					num:initStart,
					size:4,
					time:null
				},
//				empty: {
//					icon: "../res/img/mescroll-empty.png", //图标,默认null
//					tip: "暂无相关数据~", //提示
//					btntext: "去逛逛 >", //按钮,默认""
//					btnClick: function(){//点击按钮的回调,默认null
//						alert("点击了按钮,具体逻辑自行实现");
//					} 
//				},
				toTop:{
					src: "../img/mescroll-totop.png", //图标,默认null
					offset:100,
					warpClass:"mescroll-totop",
					showClass:"mescroll-fade-in",
					hideClass:"mescroll-fade-out",
					duration:300
				},
				hardwareClass:"mescroll-hardware",
				clearEmptyId: clearEmptyId //相当于同时设置了clearId和empty.warpId; 简化写法;默认null
			},
			down: {
				use:true,
				auto:true,
				callback: getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
				noMoreSize:2, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				offset:100,
				loadFull:{
					use:false,
					delay:5000
				},
				page:{
					num:initStart,
					size:4,
					time:null
				},
//				empty: {
//					icon: "../css/backImg/notice.png", //图标,默认null
//					tip: "暂无相关数据~", //提示
//					btntext: "去逛逛 >", //按钮,默认""
//					btnClick: function(){//点击按钮的回调,默认null
//						alert("点击了按钮,具体逻辑自行实现");
//					} 
//				},
				clearEmptyId: clearEmptyId //相当于同时设置了clearId和empty.warpId; 简化写法;默认null
			},
		});
		return mescroll;
	}
	
	/*联网加载列表数据  page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
	function getListData(page){
		if(page.num==undefined){
			page.num=1;
		}
		getListDataFromNet(curNavIndex, page.num, scorllEnd, function(data){
			//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
			//console.log("data.length="+data.length);
			if(data.length<4){
				mescrollArr[curNavIndex].lockUpScroll(true);
				mescrollArr[curNavIndex].lockDownScroll(true);
				mescrollArr[curNavIndex].endSuccess(data.length);//传参:数据的总数; mescroll会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
			}else{
				mescrollArr[curNavIndex].endSuccess(data.length);//传参:数据的总数; mescroll会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
			}
			
			//设置列表数据
			setListData(data);
		}, function(){
			//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescrollArr[curNavIndex].endErr();
		});
	}
	
	/*设置列表数据*/
	function setListData(data){
		var result="";
		if(data.length!=0){
		  for(var i = 0; i < data.length; i++){
		  		var gradeText="";
		  		var gradeSrc="";
				switch (data[i].alarmGrade){
					case 1:
						gradeText="一级报警";
						gradeSrc="../img/alarm1.png";
						break;
					case 2:
						gradeText="二级报警";
						gradeSrc="../img/alarm2.png";
						break;
					case 3:
						gradeText="三级报警";
						gradeSrc="../img/alarm3.png";
						break;
					default:
						gradeText="三级报警";
						gradeSrc="../img/alarm3.png";
						break;
						break;
				}
				var hrefUrl="";
				if(curNavIndex==1){
					hrefUrl='onclick="todetail('+data[i].id+')"';
				}
				if(curNavIndex==0){
					hrefUrl='onclick="tosubmit('+data[i].id+')"';
				}
				result +=   '<div '+hrefUrl+'class="alarmList borderB">'
								+'<p class="alarmTitle"><span class="redBar borderRadius20"></span>'+gradeText+'</p>'
								+'<div class="alarmBottom">'
									+'<div class="alarmImg">'
										+'<a href="###"><i class="centerImg"></i>'
										+'<img src="'+gradeSrc+'" alt="'+gradeText+'"/></a>'
									+'</div>'
									+'<div class="alarmMess">'
										+'<ul>'
											+'<li class="plantName">'+data[i].name+'</li>'
											+'<li><span>报警设备： </span><b class="redColor">'+data[i].alarmNumber+'</b></li>'
											+'<li><span>报警时间： </span><i>'+timeUtil.timeToString(data[i].eventTime,"yyyy-MM-dd HH:mi")+'</i></li>'
										+'</ul>'
										+'<div class="next floatR"><i class="ui-icon-next"></i>'
										+'</div>'
									+'</div>'
								+'</div>'
							+'</div></a>';	
			}		
			
		}else{
			result='<ul class="textCenter"><li class="noticeImg"></li>'+
				   '<li class="grayColor">还没有报警消息哦</li></ul>';
		}
		$('#alarmList'+curNavIndex).append(result);
		initStart++;
	}
	
	/*联网加载列表数据*/
	function getListDataFromNet(curNavIndex,pageNum,pageSize,successCallback,errorCallback) {
            ynzAjax.post(
	    		url,
		    	{
		    			"powerStationId":powerStationId,
		    			"status":curNavIndex,
		    			"page":pageNum,
		    			"pagesize":pageSize,
		    			"search":"",
		    			"equipmentName":"",
		    			"pointName":"",
		    			"appSeachName":encodeURI(appSeachName),
		    	},
		    	function(response){ 
			           var data =response.results;
	                	//回调
	                	successCallback(data);
			    	},
			        function(e){ 
			            console.log("--------error------"+JSON.stringify(e));
			    }
			)
      
	}
	
	//禁止PC浏览器拖拽图片,避免与下拉刷新冲突;如果仅在移动端使用,可删除此代码
	document.ondragstart=function() {return false;}

		

//	document.onkeydown = function(e){
//		var ev = document.all ? window.event:e;
//		if(ev.keyCode==13){
//			
//		}
//	}
	   
    
//	function refresh(){
//  	initStart = 1;
//		mescrollArr[curNavIndex].resetUpScroll(true);
//  }
});
function refresh(){
    	initStart = 1;
		mescrollArr[curNavIndex].resetUpScroll(true);
    }
function clearInp(){
	$("#alarmCondition").val("");
}
function seacherBtn(){
	var messBoxCondition = $("#alarmCondition").val();
	seachName = messBoxCondition;
	var arr = config.getAlarmConditionArr();
	arr = arr.split(",");
	sethistory(arr,messBoxCondition);
	appSeachName = messBoxCondition;
	$("#mainCon").show();
	$("#seachCon").hide();
	if(messBoxCondition!=null&&messBoxCondition!=""){
		$("#seachName").html(messBoxCondition);
	}else{
		$("#seachName").html("搜索");
	}
	refresh();
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
	config.setAlarmConditionArr(newArr.toString());
	console.log(config.getAlarmConditionArr());
	sethislist();
}

function sethislist(){
	var hisArr = config.getAlarmConditionArr().split(",");
	$("#historyBox").empty();
	for(var j=0;j<hisArr.length;j++){
		$("#historyBox").append("<li onclick='seachNameFun("+j+");'>"+hisArr[j]+"</li>")
	}
}

function seachNameFun(param){
	var hisArr = config.getAlarmConditionArr().split(",");
	$("#alarmCondition").val(hisArr[param]);
}


function todetail(id){
	console.log(id);
	$("#mainCon").hide();
	$("#detailDiv").show();
	getAlarmInfo(id,1);
}
function tosubmit(id){
	console.log(id);
	$("#mainCon").hide();
//	$("#conformDiv").show();
	$("#conformDetail").show();
	getAlarmInfo(id,0);
}

function toconform(){
	console.log(dataold);
	$("#conformDetail").hide();
	$("#conformDiv").show();
	setdata(dataold);
}
function conformDetailBackMain(){
	$("#conformDetail").hide();
	$("#mainCon").show();
}

function detailBackMain(){
	$("#detailDiv").hide();
	$("#mainCon").show();
}
function conformBackMain(){
	$("#conformDiv").hide();
	$("#mainCon").show();
}

function getAlarmInfo(id,num){
	var url = config.service+"alarmInfo/getAlarmBaseInfo/"+id
	 ynzAjax.get(
				url,
		    	function(response){ 
			           var data =response.data;
		            	console.log(data);
		            	if(num==1){//已处理
		            		setdataInfo(data);
		            	}else{//未处理
//		            		setdata(data);
							dataold = data;
		            		setconfdataInfo(data);
		            	}
			    	},
			        function(e){ 
			            console.log("--------error------"+JSON.stringify(e));
			    });
}

function setdata(data){
	var alarm = data.aInfo;
	var power = data.pwInfo;
	if(alarm.alarmGrade==1){
		$("#alarmGradeMess").html(power.powerStationName+'</br><span class="deepRedColor">一级报警</span>');
		$("#imgUrl").html('<i class="centerImg"></i><img id='+alarm.id+' src="../img/alarm1.png" alt="一级报警">')
	}else if(alarm.alarmGrade==2){
		$("#alarmGradeMess").html(power.powerStationName+'</br><span class="deepRedColor">二级报警</span>');
		$("#imgUrl").html('<i class="centerImg"></i><img id='+alarm.id+' src="../img/alarm2.png" alt="二级报警">')
	}else if(alarm.alarmGrade>2){
		$("#alarmGradeMess").html(power.powerStationName+'</br><span class="deepRedColor">三级报警</span>');
		$("#imgUrl").html('<i class="centerImg"></i><img id='+alarm.id+' src="../img/alarm3.png" alt="三级报警">')
	}
}

function setdataInfo(data){
	var alarm = data.aInfo;
	var power = data.pwInfo;
	if(alarm.alarmGrade==1){
		$("#alarmGrade").html("一级报警</br><span>完成</span>");
		$("#alarmGradeIII").val("I");
	}else if(alarm.alarmGrade==2){
		$("#alarmGrade").html("二级报警</br><span>完成</span>");
		$("#alarmGradeIII").val("II");
	}else if(alarm.alarmGrade>2){
		$("#alarmGrade").html("三级报警</br><span>完成</span>");
		$("#alarmGradeIII").val("III");
	}
	$("#alarmOpreate").html(alarm.handling);
	$("#alarmMessage").html(alarm.alarmMessage);
	$("#stationName").val(power.powerStationName);
	$("#createTime").val(timeUtil.timeToString(alarm.createTime,"YYYY-MM-dd HH:MI:ss"));
	$("#equipType").val(alarm.descriptionType);
	$("#equipNum").val(alarm.equipmentcontainerName);
	$("#pointType").val(alarm.measurePointDiscription);
	$("#handler").val(alarm.handler);
	$("#remarkMesage").val(alarm.remaker);
	$("#orderCompany").val(alarm.corporation);
}

function setconfdataInfo(data){
	var alarm = data.aInfo;
	var power = data.pwInfo;
	if(alarm.alarmGrade==1){
		$("#alarmGradecon").html("一级报警</br><span>未处理</span>");
		$("#alarmGradeIIIcon").val("I");
	}else if(alarm.alarmGrade==2){
		$("#alarmGradecon").html("二级报警</br><span>未处理</span>");
		$("#alarmGradeIIIcon").val("II");
	}else if(alarm.alarmGrade>2){
		$("#alarmGradecon").html("三级报警</br><span>未处理</span>");
		$("#alarmGradeIIIcon").val("III");
	}
	$("#alarmMessagecon").html(alarm.alarmMessage);
	$("#stationNamecon").val(power.powerStationName);
	$("#createTimecon").val(timeUtil.timeToString(alarm.createTime,"YYYY-MM-dd HH:MI:ss"));
	$("#equipTypecon").val(alarm.descriptionType);
	$("#equipNumcon").val(alarm.equipmentcontainerName);
	$("#pointTypecon").val(alarm.measurePointDiscription);
}

function onSubmit(){
	var id = $("#imgUrl").find("img")[0].id;
	var handling = $("#alarmOpreateMess").val();
	var remaker = $("#remarkMesageMess").val();
	var corporation = $("#orderCompanyMess").val();
	if(handling==""||remaker==""||corporation==""){
		sendMessage("温馨提示","请输入内容！");
		return;
	}
	ynzAjax.post(
		config.service+"/alarmInfo/confirmAlarmById.do",  
		{
			'id':id,
			'remaker':remaker,
			'handling':handling,
			'corporation':corporation,
		},
		function(response){ 
			console.log(response);
			$("#conformDiv").hide();
			$("#mainCon").show();
			location.reload();
//			refresh();
		},
		function(e){ 
			console.log("--------error------"+e);
		}
	);
}

function reloadthispage(){
	window.location.href="alarmMess.html";
}


