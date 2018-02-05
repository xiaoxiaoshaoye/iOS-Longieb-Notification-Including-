window.hasUserEditData=function(){
	var ttoken = config.getToken();
	return "aaaa";
}

var config = function(){
	var istest = true;
	var  xianservice="http://221.11.8.54:8180/longieb/";
	
	if(istest){
		xianservice = "http://test.yunengzhe.com:846/longieb/";
	}
	var  defaulttype="0";//西安
	var  taizhouservice="http://66.0.91.6:8080/longieb/";
	var  ynzservice="http://test.yunengzhe.com:846/longieb/";
//	var  ynzservice="http://127.0.0.1:8080/longieb/";
	var config={
			
	}
	config.uploadUrl="http://221.11.8.54:8180/tools/file/base64uploadmap";
	config.pushMSG="alarmMess.html";
	config.service_0=xianservice;
	config.service_1=taizhouservice;
	config.service_2=ynzservice;
	config.service_type="0";
	config.service="http://127.0.0.1:8080/longieb/";
	config.initService=function(){
		var storage = window.localStorage;
		config.service_type =storage.getItem('ynz_service_type');
		if(!config.service_type){
			 config.service_type = defaulttype;//西安
			 config.service = xianservice;
		}else{
			if(config.service_type=="1"){
				config.service = taizhouservice;
			}else if(config.service_type=="2"){
				config.service = ynzservice;
			}else{
				config.service_type="0";
				config.service = xianservice;
			}
		}
		storage.setItem('ynz_service_type', config.service_type);
	}
	
	config.setService = function(type) {
		var storage = window.localStorage;
		config.service_type = type;
		storage.setItem('ynz_service_type', config.service_type);
		if(config.service_type == "1") {
			config.service = taizhouservice;
		} else if(config.service_type == "2") {
			config.service = ynzservice;
		} else {
			config.service_type = "0";
			config.service = xianservice;
		}
	}
	
	config.getUserInfo=function(){
		var storage = window.localStorage;
		var userInfo = storage.getItem('ynz_user_info');
		if(userInfo){
			return userInfo;
		}else{
			return "";
		}
	}
	config.setUserInfo=function(user){
		var storage = window.localStorage;
		storage.setItem('ynz_user_info',user);
	}
	config.getMeasureBoxId=function(){
		var storage = window.localStorage;
		var measureBoxId = storage.getItem('ynz_measureBox_id');
		if(measureBoxId){
			return measureBoxId;
		}else{
			return "";
		}
	}
	config.setMeasureBoxId=function(id){
		var storage = window.localStorage;
		storage.setItem('ynz_measureBox_id',id);
	}
	config.getPowerStationId=function(){
		var storage = window.localStorage;
		var powerStationId = storage.getItem('ynz_powerStation_id');
		if(powerStationId){
			return powerStationId;
		}else{
			return "";
		}
	}
	config.setPowerStationId=function(id){
		var storage = window.localStorage;
		storage.setItem('ynz_powerStation_id',id);
	}
	config.getToken=function(){
		var storage = window.localStorage;
		var token = storage.getItem('ynz_token');
		if(token){
			return token;
		}else{
			return "";
		}
	}
	config.setToken=function(tk){
		var storage = window.localStorage;
		storage.setItem('ynz_token',tk);
	}
	//测量箱搜索条件
	config.getMessBoxCondition=function(){
		var storage = window.localStorage;
		var messBox = storage.getItem('ynz_messBoxCondition');
		if(messBox){
			return messBox;
		}else{
			return "";
		}
	}
	config.setMessBoxCondition=function(messBox){
		var storage = window.localStorage;
		storage.setItem('ynz_messBoxCondition',messBox);
	}
	//逆变器搜索条件
	config.getInverterConditionArr=function(){
		var storage = window.localStorage;
		var arr = storage.getItem('ynz_inverterArr');
		if(arr){
			return arr;
		}else{
			return "";
		}
	}
	config.setInverterConditionArr=function(arr){
		var storage = window.localStorage;
		storage.setItem('ynz_inverterArr',arr);
	}
	//报警搜索条件
	config.getAlarmConditionArr=function(){
		var storage = window.localStorage;
		var arr = storage.getItem('ynz_alarmArr');
		if(arr){
			return arr;
		}else{
			return "";
		}
	}
	config.setAlarmConditionArr=function(arr){
		var storage = window.localStorage;
		storage.setItem('ynz_alarmArr',arr);
	}
	//电站搜索条件
	config.getPowerConditionArr=function(){
		var storage = window.localStorage;
		var arr = storage.getItem('ynz_powerArr');
		if(arr){
			return arr;
		}else{
			return "";
		}
	}
	config.setPowerConditionArr=function(arr){
		var storage = window.localStorage;
		storage.setItem('ynz_powerArr',arr);
	}
	config.initService();
	return config;
}();