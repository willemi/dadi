import '../css/produc-search.scss';

const util = require("./common/util.js")
const producListTpl = require('../tpl/item-produc-list.tpl');
const itemSearchListLookTpl = require('../tpl/item-look-xuanqu.tpl');
const itemSearchListLook1Tpl = require('../tpl/item-look-xuanqu.1.tpl');
const itemSearchListLook2Tpl = require('../tpl/item-look-xuanqu.2.tpl');
const itemSearchListLook3Tpl = require('../tpl/item-look-xuanqu.3.tpl');
const producDatilsCpTpl = require('../tpl/item-produc-datils-cp.tpl');
const producDatilsCpzpTpl = require('../tpl/item-produc-datils-cp-zp.tpl');
const itemProducHtTpl = require('../tpl/item-produc-ht.tpl');
const detailsFjianTpl = require('../tpl/item-details-fjian.tpl');

const detailsJicTpl = require('../tpl/item-details-jic.tpl');
const detailsListTpl = require('../tpl/item-details-list.tpl');
const detailsQlnewsTpl = require('../tpl/item-details-qlnews.tpl');
const echarts = require('echarts');

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
let product_name;
function workslist(page){
	page = page || 1;
	$.ajax({
		type: "GET",
		url: host +"/dadi/product/list",
		data: {
			product_name: product_name,
			pageNum: page,
			pageSize: 10
		},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res.status == 1){
				if(res.data){//搜索
					$(".produc-list").html(producListTpl(res.data));
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
// 打开询问是否删除的模态框并设置需要删除的大修的ID
let fun;
// 删除大修模态框的确定按钮的点击事件
$("#deleteHaulBtn").click(function() {
	// ajax异步删除
	fun()
});	
function bindEvents(){
	var $doc = $(document);
	$doc.on("click", ".btn-query", function(){
		product_name = $("#ht-name").val();		
		workslist()		
	})
	$doc.on("click", ".worksList-dele", function(){
		var delete_id = $(this).parent("td").attr("id");// 获取隐藏的ID
		$("#deleteHaulId").val(delete_id);// 将模态框中需要删除的大修的ID设为需要删除的ID
		$("#delcfmOverhaul").modal({
			backdrop : 'static',
			keyboard : false
		});
		fun = deleteHaulinfo;
	})
	function deleteHaulinfo() {
		//alert("你即将删除的大修ID" + $("#deleteHaulId").val())
		let id = $("#deleteHaulId").val();
		$.ajax({
			type: "get",
			url: host +"/dadi/product/delete",
			data: {
				id: id
			},
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			cache: false,
			success: function(res) {
				if(res && res.status == 1){
					util.showMsg(res.message)
					workslist()
					$("#delcfmOverhaul").modal("hide")
				}else{
					util.showMsg(res.message)
				}
			},
			error: function(){
				
			}
		});
	}
	$doc.on("click", ".works-list-edit", function(){
		let id = $(this).parents("td").attr("id");
		location.href = "produc-management.html?id="+ id;
	})
	//查看产品详情
	$doc.on("click", ".btn-details", function(){
		let id = $(this).data("id");
		$.ajax({
			type: "GET",
			url: host +"/dadi/product/findById",
			data: {
				id: id
			},
			dataType: "json",
			cache: false,
			contentType: "application/json;charset=UTF-8",
			success: function(res) {
				if(res && res.status == 1){
					let data = res.data;
					for(var i = 0;i < data.droit.length;i++){
						data.droit[i].product_code = data.product.product_code;
						data.droit[i].product_name = data.product.product_name;
						data.droit[i].product_type = data.product.product_type;
						data.droit[i].publish_date = data.product.publish_date;
						data.droit[i].product_cycle = data.product.product_cycle;
						data.droit[i].product_amount = data.product.product_amount;
						data.droit[i].register_date = data.product.register_date;
						data.droit[i].register_institution = data.product.register_institution;
						data.droit[i].shou_quan_ren = data.product.shou_quan_ren;
						data.droit[i].bei_shou_quan_ren = data.product.bei_shou_quan_ren;
					}

					$(".details-list-a").html(producDatilsCpzpTpl(data.opus));
					$(".details-list-b").html(producDatilsCpTpl(data.droit));
					$(".details-list-c").html(itemProducHtTpl(data.contract));
					$(".details-fjian").html(detailsFjianTpl(data.fileobj));
					$(".details-list-a input").hide();
					$('#modal-produc-details-look').modal('show');
				}else{
                    util.showMsg(res.message)
                }
			},
			error: function(error){
				util.showMsg("error")
			}
		});
	})
	//查看作品详情
	$doc.on("click", ".produc-dtai", function(){
		let id = $(this).data("id");
		$.ajax({
			type: "GET",
			url: host +"/dadi/opus/findById",
			data: {
				id: id
			},
			dataType: "json",
			cache: false,
			contentType: "application/json;charset=UTF-8",
			success: function(res) {
				if(res && res.status == 1){
					let data = res.data;
					$(".details-jic").html(detailsJicTpl(data.opus));
					$(".details-list").html(detailsListTpl(data.obligee));
					$(".details-qlnews").html(detailsQlnewsTpl(data.droit));
					$(".details-fjian").html(detailsFjianTpl(data.fileobj));

					$('#modal-details-look').modal('show');
				}else{
                    util.showMsg(res.message)
                }
			},
			error: function(error){
				util.showMsg("error")
			}
		});
	})
	//查看合同详情
	let droitJson = [];
	$doc.on("click", ".btn-ht-news", function(){
		let $this = $(this);
		let id = $this.parents("tr").attr("id");
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
				}else{
                    util.showMsg(res.message)
                }					
			},
			error: function(error){
				util.showMsg("error")
			}
		});		
		

	})	
    $doc.on("click", ".dropdown-menu li", function(){
		var $this = $(this)
		var $text = $this.text(),
			$button = $this.parent().prev();
		$button.html($text +'<span class="caret"></span>');
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
			getProduceCount()
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
	        data: produceDataTitle
	    },
	    series : [
	        {
	            name: '产品名称',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '50%'],
	            data: produceData,
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
			// formatter: "{a} <br/>{b} : {c} ({d}%)",
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
	    },
		xAxis : [
			{
				type : 'category',
				data: produceDataTitle,
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
	            name:'产品分析',
	            type:'bar',
	            barWidth: '60%',
	            data: produceData
	        }
	    ]
	};
	if (option1 && typeof option1 === "object") {
	    myChart1.setOption(option1, true);
	}
}

var produceData = [] // 产品信息
var produceDataTitle = []

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
			return produceData	
		}
	});
}
// 导出文件
$("#exportProducBtn").click(function() {
    window.location.href=host+"/dadi/product/list/export"
});	
function init(){
	bindEvents();
}
init();