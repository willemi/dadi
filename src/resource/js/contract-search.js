import '../css/contract-search.scss';
const util = require("./common/util.js")

const echarts = require('echarts');

const producListTpl = require('../tpl/item-works-list.4.tpl')
const itemSearchListLookTpl = require('../tpl/item-look-xuanqu.tpl');
const itemSearchListLook1Tpl = require('../tpl/item-look-xuanqu.1.tpl');
const itemSearchListLook2Tpl = require('../tpl/item-look-xuanqu.2.tpl');
const itemSearchListLook3Tpl = require('../tpl/item-look-xuanqu.3.tpl');
const producDatilsCpTpl = require('../tpl/item-produc-datils-cp.tpl');
window.formatobligee_type = function(state){
	state = parseInt(state)
	switch(state){
		case 0:
			return '否';
		case 1:
			return '是';
	}
}
window.formatobligee_sign = function (state){
	state = parseInt(state)
	switch(state){
		case 0:
			return '甲';
		default:
			return '已';
	}
}
window.formatState = function(state){
	state = parseInt(state)
	switch(state){
		case 0:
			return '待审核';
		case 1:
			return '已通过';
		case 2:
			return '未通过';
		default:
			return "无";
	}
}
window.formatobligee_you = function(state){
	state = parseInt(state)
	switch(state){
		case 0:
			return '无';
		case 1:
			return '有';
	}
}

window.formatContract = function(state){
	state = parseInt(state)
	switch(state){
		case 1:
			return '作品';
		case 2:
			return '产品';
		case 3:
			return '商标';
		case 4:
			return '专利';
		case 5:
			return '域名';
		default:
			return "无";
	}
}

let contract_name,rel_typ;
function workslist(page){
	page = page || 1;
	$.ajax({
		type: "GET",
		url: host +"/dadi/contract/list",
		data: {
			rel_typ: rel_typ,
			contract_name: contract_name,
			pageNum: page,
			pageSize: 10
		},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res.status == 1){
				if(res.data){//搜索
					for(var i = 0;i < res.data.length;i++){
						res.data[i].page = (page-1) * 10 + (i+1);
					}
					$(".contract-list").html(producListTpl(res.data));
					util.pageinator("pageLimit", page, res.page.pageCount, workslist);
				}else{
                    util.showMsg("无数据！")
                }
				
			}else{
				util.showMsg(res.message)
			}			
		},
		error: function(){			
		}
	});
	
}
workslist()	



function bindEvents(){
	var $doc = $(document);
	$doc.on("click", ".btn-query", function(){
		contract_name = $("#ht-name").val();		
		workslist()		
	})
	$doc.on("click", ".dropdown-menu li", function(){
		var $this = $(this)
		var $text = $this.text(),
			$button = $this.parent().prev();
		$button.val($this.attr("id"))
		rel_typ = $this.attr("id")
		$button.html($text +'<span class="caret"></span>');
	})

    $doc.on("click", ".dropdown-menu li", function(){
		var $this = $(this)
		var $text = $this.text(),
			$button = $this.parent().prev();
		$button.html($text +'<span class="caret"></span>');
	})
	//查看合同详情
	let droitJson = [];
	$doc.on("click", ".btn-details", function(){
		let $this = $(this);
		let id = $this.data("id");
		$.ajax({
			type: "GET",
			url: host +"/dadi/contract/findById",
			data: {
				id: id
			},				
			dataType: "json",
			cache: false,
			contentType: "application/json;charset=UTF-8",
			success: function(res) {
				if(res && res.status == 1){
					for(var i = 0;i < res.data.droit.length;i++){
						res.data.droit[i]._id = res.data.contract.contract_name +"-"+ res.data.contract.id;
						res.data.droit[i].contract_name = res.data.contract.contract_name
					}
					$.extend(droitJson, res.data.droit)
					$(".look-details-01").html(itemSearchListLookTpl([res.data.contract]))
					$(".qlnews-cont").html(itemSearchListLook1Tpl(res.data.droit))
					$(".qyfNews").html(itemSearchListLook2Tpl(res.data.sign))
					$(".fileobj").html(itemSearchListLook3Tpl(res.data.fileobj))
					$(".qlnews-cont input").remove();
					$("#modal-detailsContract-produc").modal("show")
				}else{
                    util.showMsg(res.message)
                }					
			},
			error: function(error){
				util.showMsg("error")
			}
		});		
		

	})	
    //pages
	util.pageinator("pageLimit", "10", "url", tplData);
	function tplData(data){
		console.log(data)
	}
	let chart = true;
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		// 获取已激活的标签页的名称
		let activeTab = $(e.target).text(); 
		if(activeTab == "数据图" && chart){
			chart = false;
			getData()
			initEcharts()
		}
		//e.target // 激活的标签页
		//e.relatedTarget // 前一个激活的标签页
	})
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
	        data: sendDataName
	    },
	    series : [
	        {
	            name: '合同名称',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '50%'],
	            data: sendData,
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
		color: ['#3398DB'],
	    tooltip: {
	        trigger: 'axis',
			// formatter: "{a} <br/>{b}: {c} ({d}%)",
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
	    },
		xAxis : [
			{
				type : 'category',
				data: sendDataName,
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
	    series: [
	        {
	            name:'合同名称',
	            type:'bar',
	            barWidth: '60%',
	            data: sendData
	        }
	    ]
	};
	if (option1 && typeof option1 === "object") {
	    myChart1.setOption(option1, true);
	}
}

var sendData = [] // 数据返回存储
var sendDataArr = [] // 柱状图需要的数据
var sendDataName = []

function getData() {
	$.ajax({
		type: "GET",
		url: host +"/dadi/contract/count",
		dataType: "json",
		async: false,
		cache: false,
		success: function(res) {
			if(res.status == 1){
				for(var i =0;i<res.data.length;i++){
					sendData.push({
						value: res.data[i].count,
						name: window.formatContract(res.data[i].rel_typ) + '合同'
					});
					sendDataArr.push(res.data[i].count);
					sendDataName.push(window.formatContract(res.data[i].rel_typ) + '合同');
				}
			}else{
				util.showMsg(res.message)
			}			
		},
		error: function(){
			return sendData	
		}
	});
}

function init(){
	bindEvents();
}
init();