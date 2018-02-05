//$(function(){
//	echarts.init(document.getElementById("generatDay")).setOption(option1);
//});
/*功率折线图start*/
var option2;
/*日发电量*/
var option1;
function setoption1(data){
	option1 = {
    color: ['#ff4d2e'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : data.time,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'日发电量',
            type:'bar',
            barWidth: '50%',
            data:data.value
        }
    ]
};
}
function setoption2(data){
	option2 = {
    color: ['#eb190e'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data:data.time,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'功率',
            type:'line',
            barWidth: '50%',
            data:data.value
        }
    ]
};
}

	
/*功率折线图end*/