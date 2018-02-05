var TimeOutTime=60000;
/**
 *  时间处理等
 */

var timeUtil = {
		/**
		 * date转String
		 * _date :date时间
		 * _formator:转成字符串的时间格式 如：（yyyy-MM-dd HH:mi:ss \\ yyyy-mm-dd 00:00:00）
		 */
		dateToString : function(_date,_formator){
			var returnText = _formator.toUpperCase(); 
			if (returnText.indexOf("YYYY") > -1){ 
				returnText = returnText.replace("YYYY", _date.getFullYear()); 
			} 
			if (returnText.indexOf("MM") > -1){ 
				returnText = returnText.replace("MM", (_date.getMonth() + 1)>=10?(_date.getMonth() + 1):("0"+(_date.getMonth()+1))); 
			} 
			if (returnText.indexOf("DD") > -1){ 
				returnText = returnText.replace("DD",_date.getDate()>=10?_date.getDate():("0"+_date.getDate())); 
			} 

			if (returnText.indexOf("HH") > -1) { 
				returnText = returnText.replace("HH", _date.getHours()>=10?_date.getHours():("0"+_date.getHours())); 
			} 
			if (returnText.indexOf("MI") > -1){ 
				returnText = returnText.replace("MI",_date.getMinutes()>=10?_date.getMinutes():("0"+_date.getMinutes())); 
			} 
			if (returnText.indexOf("SS") > -1) { 
				returnText = returnText.replace("SS", _date.getSeconds()>=10?_date.getSeconds():("0"+_date.getSeconds())); 
			} 
			if (returnText.indexOf("SI") > -1){ 
				returnText = returnText.replace("SI", _date.getMilliseconds()); 
			} 
			return returnText; 
		} ,
		/**
		 * 时间戳转String
		 * _time时间戳
		 * _formator:转成字符串的时间格式 如：（yyyy-MM-dd HH:mi）
		 */
		timeToString : function(_time,_formator){
			var _date = new Date(_time);
			return timeUtil.dateToString(_date,_formator);
		},
		/**
		 * String转时间date
		 * _formator:参数 如：（2017-08-08 11:55:55）
		 * return 返回值类型 Tue Aug 08 2017 11:55:55 GMT+0800 (中国标准时间)
		 */
		stringToDate : function(_formator){
			return new Date(_formator.replace(/-/,"/"));
		}
}
/**
 * 
 * @param v
 * @param e 要保留的位数
 * @returns
 */
function toDecimal(v,e){
	var f = parseFloat(v);
	if(isNaN(f)){
		return "";
	}
	var temp = 1;
	for(var i=0;i<e;i++){
		temp=temp*10;
	}
	
	return Math.round(f*temp)/temp;
}	