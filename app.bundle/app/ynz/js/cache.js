var cacheUtil = function(){
	var cacheUtil={
			
	}
	var storage = window.localStorage;
	/**
	 * 
	 * @param {Object} type
	 * @param {Object} param
	 * @param {Object} str
	 * ==========================
	 * type:1 表示电站列表
	 * param:userId 表示用户ID
	 * str:表示缓存值
	 * ==========================
	 * ==========================
	 * type:2 表示电站详情
	 * param:表示电站ID
	 * str:表示缓存值
	 * ==========================
	 * ==========================
	 * type:3 表示逆变器的列表数据
	 * param:表示电站ID
	 * str:表示缓存值
	 * ==========================
	 */
	cacheUtil.setCache=function(type,param,str){
		var key = "CACHE_"+type+"_"+param;
		storage.setItem(key,str);
	}
	cacheUtil.getCache=function(type,param){
		var key = "CACHE_"+type+"_"+param;
		var value = storage.getItem(key);
		if(value){
			return value;
		}else{
			return "";
		}
	}
	return cacheUtil;
}();
