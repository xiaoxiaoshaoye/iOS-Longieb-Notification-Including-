(function($){
	$.fn.pageUtil = function(obj){
		var pageObj = obj;
		var maxshowpageNum=5;//每页显示爽
		if(obj.maxshowpageNum){
			maxshowpageNum = obj.maxshowpageNum;
		}
		var  page = {
		    "pageId":pageObj.pageId,
		    "data":null,
		    "maxshowpageNum":maxshowpageNum,//最多显示的页码个数
		    "pagelistcount":pageObj.pageSize,//每一页显示的内容条数
		    "init":function(){
				this.data=pageObj.data,
		      	page.initPage(pageObj.data,pageObj.currentPage);
		  },
		  /**
		     * 初始化数据处理
		     * @param listCount 列表总量
		     * @param currentPage 当前页
		     */
		  "initPage":function(listCount,currentPage){
		        var maxshowpageNum = page.maxshowpageNum;
		        if(maxshowpageNum!=null&&maxshowpageNum>0&&maxshowpageNum!=""){
		            page.maxshowpageNum = maxshowpageNum;
		        }
		        var pagelistcount = page.pagelistcount;              
		        if(pagelistcount!=null&&pagelistcount>0&&pagelistcount!=""){
		            page.pagelistcount = pagelistcount;
		        }   
		        page.pagelistcount=pagelistcount;
		        if(listCount<0){
		            listCount = 0;
		        }
		        if(currentPage<=0){
		            currentPage=1;
		        }
		     
		        page.setPageListCount(listCount,currentPage);
		   },
		    /**
		     * 初始化分页界面
		     * @param listCount 列表总量
		     */
		    "initWithUl":function(listCount,currentPage){
		        var pageCount = 1;
		        if(listCount>=0){
		            var pageCount = listCount%page.pagelistcount>0?parseInt(listCount/page.pagelistcount)+1:parseInt(listCount/page.pagelistcount);
		        }
		        var appendStr = page.getPageListModel(pageCount,currentPage);
		        $("#"+page.pageId).html(appendStr);
		    },
		    /**
		     * 设置列表总量和当前页码
		     * @param listCount 列表总量
		     * @param currentPage 当前页码
		     */
		    "setPageListCount":function(listCount,currentPage){
		        listCount = parseInt(listCount);
		        currentPage = parseInt(currentPage);
		        page.initWithUl(listCount,currentPage);
		        page.initPageEvent(listCount);
		        page.currentPage=currentPage;
		        //page.viewPage(currentPage,listCount,page.pagelistcount,page.data)
//		      fun(currentPage);
		    },
		    //页面显示功能
		     "viewPage":function (currentPage,listCount,pagelistcount,data){//当前页  列表总量   
		    	 	var obj = new Object();
		    	 	obj.currentPage = currentPage;
		    	 	obj.listCount = listCount;
		    	 	pageObj.callBack(obj);
		    	 
//		            var NUM=listCount%pagelistcount==0?listCount/pagelistcount:parseInt(listCount/pagelistcount)+1;
//		            if(currentPage==NUM){
//		                var result=data.slice((currentPage-1)* pagelistcount,data.length);
//		            }
//		            else{
//		                var result=data.slice((currentPage-1)*pagelistcount,(currentPage-1)*pagelistcount+pagelistcount);
//		            }
//		            pageObj.callBack(result);
		    },
		    "initPageEvent":function(listCount){
		        $("#"+page.pageId +">li[class='pageNum']").on("click",function(){
		            page.setPageListCount(listCount,$(this).attr("page-data"),page.fun);
		            page.viewPage(page.currentPage,listCount,page.pagelistcount,page.data);
		        });
		    },
		    "getPageListModel":function(pageCount,currentPage){
		        var prePage = currentPage-1;
		        var nextPage = currentPage+1;
		        var prePageClass ="pageNum";
		        var nextPageClass = "pageNum";
		        if(prePage<=0){
		            prePageClass="pageNumDisable";
		        }
		        if(nextPage>pageCount){
		            nextPageClass="pageNumDisable";
		        }
		        var appendStr ="";
		        appendStr+="<li class='"+prePageClass+"' page-data='1' page-rel='firstpage'>"+ window.ynz.local.table_sfirst +"</li>";
		        appendStr+="<li class='"+prePageClass+"' page-data='"+prePage+"' page-rel='prepage'>"+ window.ynz.local.table_sprevious +"</li>";
		        var miniPageNumber = 1;
		        if(currentPage-parseInt(page.maxshowpageNum/2)>0&&currentPage+parseInt(page.maxshowpageNum/2)<=pageCount){
		            miniPageNumber = currentPage-parseInt(page.maxshowpageNum/2);
		        }else if(currentPage-parseInt(page.maxshowpageNum/2)>0&&currentPage+parseInt(page.maxshowpageNum/2)>pageCount){
		            miniPageNumber = pageCount-page.maxshowpageNum+1;
		            if(miniPageNumber<=0){
		                miniPageNumber=1;
		            }
		        }
		        var showPageNum = parseInt(page.maxshowpageNum);
		        if(pageCount<showPageNum){
		            showPageNum = pageCount;
		        }
		        for(var i=0;i<showPageNum;i++){
		            var pageNumber = miniPageNumber++;
		            var itemPageClass = "pageNum";
		            if(pageNumber==currentPage){
		                itemPageClass = "activeNum";
		            }

		            appendStr+="<li class='"+itemPageClass+"' page-data='"+pageNumber+"' page-rel='itempage'>"+pageNumber+"</li>";
		        }
		        appendStr+="<li class='"+nextPageClass+"' page-data='"+nextPage+"' page-rel='nextpage'>"+window.ynz.local.table_snext +"</li>";
		        appendStr+="<li class='"+nextPageClass+"' page-data='"+pageCount+"' page-rel='lastpage'>"+window.ynz.local.table_slast +"</li>";
		       return appendStr;

		    }
		}
		return page.init();
	}
})(jQuery);