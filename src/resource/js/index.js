import '../css/index.scss';

const util = require("./common/util")

const echarts = require('echarts');
const worksListTpl = require('../tpl/item-works-list.1.tpl');
const worksListTpl2 = require('../tpl/item-works-list.2.tpl');

var worksData = [] // 作品信息
var produceData = [] // 产品信息
var produceDataTitle = []

window.formatopus = function(state){
	state = parseInt(state)
	switch(state){
		case 1:
			return '音乐';
		case 2:
			return '美术';
		case 3:
			return '文字';
		case 4:
			return '戏剧';
		case 5:
			return '影视动漫';
		default:
			return "无";
	}
}

function initEcharts(){
	var dom = document.getElementById("container");
	var myChart = echarts.init(dom);
	var app = {},
		option = null;
	option = {
	    // title : {
	    //     text: '某站点用户访问来源',
	    //     subtext: '纯属虚构',
	    //     x:'center'
	    // },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        bottom: 'bottom',
	        icon: 'circle',
	        data: ['音乐','美术','文字','戏剧','影视动漫']
	    },
	    series : [
	        {
	            name: '作品名称',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '50%'],
	            data: worksData,
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}

	var dom1 = document.getElementById("container1");
	var myChart1 = echarts.init(dom1);
	var app1 = {},
	option1 = null;
	app1.title = '环形图';

	option1 = {
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    legend: {
	        orient: 'horizontal',
	        y: 'bottom',
			icon: 'circle',
	        data: produceDataTitle
	    },
	    series: [
	        {
	            name:'产品名称',
	            type:'pie',
	            radius: ['40%', '60%'],
	            center: ['50%', '50%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
						show: true,
						orient: 'vertical',
						position: 'outside'
	                },
	                emphasis: {
	                    show: true,
	                    textStyle: {
	                        fontSize: '30',
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: true
	                }
	            },
	            data: produceData
	        }
	    ]
	};
	if (option1 && typeof option1 === "object") {
	    myChart1.setOption(option1, true);
	}
}
function getOpusList(){
	$.ajax({
		type: "GET",
		url: host +"/dadi/opus/list",
		data: {
			pageNum: 1,
			pageSize: 5
		},
		dataType: "json",
		cache: false,
		success: function(res) {
			if(res.status == 1){
				$(".list-1").html(worksListTpl(res.data));
			}else{
				util.showMsg(res.message)
			}			
		},
		error: function(){			
		}
	});
}
getOpusList()

function getProduceList(){
	$.ajax({
		type: "GET",
		url: host +"/dadi/product/list",
		data: {
			pageNum: 1,
			pageSize: 5
		},
		dataType: "json",
		cache: false,
		success: function(res) {
			if(res.status == 1){
				$(".list-2").html(worksListTpl2(res.data));
			}else{
				util.showMsg(res.message)
			}			
		},
		error: function(){			
		}
	});
}
getProduceList()

function getOpusCount(){
	$.ajax({
		type: "GET",
		url: host +"/dadi/opus/count",
		dataType: "json",
		async: false,
		cache: false,
		success: function(res) {
			if(res.status == 1){
				for(var i =0;i<res.data.length;i++){
					worksData.push({
						value: res.data[i].COUNT,
						name: window.formatopus(res.data[i].opus_classify)
					});
				}
				initEcharts()
			}else{
				util.showMsg(res.message)
			}			
		},
		error: function(){
			return sendData	
		}
	});
}

getOpusCount()

function getProduceCount(){
	$.ajax({
		type: "GET",
		url: host +"/dadi/product/count",
		dataType: "json",
		async: false,
		cache: false,
		success: function(res) {
			if(res.status == 1){
				for(var i =0;i<res.data.length;i++){
					produceData.push({
						value: res.data[i].count, 
						name: res.data[i].product_xingtai
					});
					produceDataTitle.push(res.data[i].product_xingtai)
				}
				initEcharts()
			}else{
				util.showMsg(res.message)
			}			
		},
		error: function(){
			return sendData	
		}
	});
}

getProduceCount()

function bindEvents(){
    var $doc = $(document);
    // $doc.on("click", "#sideNav > li", function(e){
    //     var $this = $(this);
    //     $this.addClass("active").siblings().removeClass("active");
    // })
}

function init(){
    bindEvents();
}
init();