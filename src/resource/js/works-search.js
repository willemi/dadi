import '../css/works-search.scss';

const util = require("./common/util.js")

const echarts = require('echarts');

const tabelTpl3 = require('../tpl/item-works-list.3.tpl');

const detailsJicTpl = require('../tpl/item-details-jic.tpl');
const detailsListTpl = require('../tpl/item-details-list.tpl');
const detailsQlnewsTpl = require('../tpl/item-details-qlnews.tpl');
const detailsFjianTpl = require('../tpl/item-details-fjian.tpl');
window.formatobligee_type = function(state){
	state = parseInt(state)
	switch(state){
		case 0:
			return '否';
		case 1:
			return '是';
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

window.showXg = function(state,status){
	if(status != 1 && state == window._user_name.account){
		return 'show';
	}else{
		return 'hide';
	}
	// switch(state){
	// 	case window._user_name.account:
	// 		return 'show';
	// 	default:
	// 		return 'hide';
	// }
}
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
window.formattheme = function(state){
	state = parseInt(state)
	switch(state){
		case 1:
			return '通俗';
		case 2:
			return '美声';
		case 3:
			return '嘻哈';
		case 4:
			return '摇滚';
		case 5:
			return '民谣';
		case 6:
			return '影视';
		default:
			return "无";
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
// 打开询问是否删除的模态框并设置需要删除的大修的ID
let fun;
// 删除大修模态框的确定按钮的点击事件
$("#deleteHaulBtn").click(function() {
	// ajax异步删除
	fun()
});	
let opus_classify,opus_name;
function workslist(page){
	page = page || 1;
	$.ajax({
		type: "GET",
		url: host +"/dadi/opus/list",
		data: {
			opus_classify: opus_classify,
			opus_name: opus_name,
			pageNum: page,
			pageSize: 10
		},
		dataType: "json",
		cache: false,
		success: function(res) {
			if(res.status == 1){
				if(res.data){//搜索
					$(".tabel-cont").html(tabelTpl3(res.data));
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
	$doc.on("click", ".works-list-edit", function(){
		let id = $(this).parents("td").attr("id");
		let classify = $(this).data("classify");
		let url;
		switch(classify){
			case 1:
				url = 'works-music.html';
				break;
			case 2:
				url =  'works-fineArts.html';
				break;
			case 3:
				url =  'works-words.html';
				break;
			case 4:
				url =  'works-theatre.html';
				break;
			case 5:
				url =  'works-movies.html';
				break;
		}
		location.href = url +"?id="+ id;
	})
	$doc.on("click", ".btn-query", function(){
		opus_name = $("#ht-name").val();		
		workslist()		
	})

	$doc.on("click", ".worksList-dele", function(){
		var delete_id = $(this).parent("td").attr("id");
		$("#deleteHaulId").val(delete_id);// 将模态框中需要删除的大修的ID设为需要删除的ID
		$("#delcfmOverhaul").modal({
			backdrop : 'static',
			keyboard : false
		});
		fun = deleteHaulinfo;
	})
	function deleteHaulinfo() {
		let id = $("#deleteHaulId").val();
		$.ajax({
			type: "POST",
			url: host +"/dadi/opus/delete",
			data: JSON.stringify({
				id: id
			}),
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
	//查看详情
	$doc.on("click", ".btn-details", function(){
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
					for(var i = 0;i < data.droit.length;i++){
						data.droit[i].contract_name = data.opus.contract_name;
						data.droit[i].opus_name = data.opus.opus_name;
						
					}
					
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
	// $doc.on("click", "#sideNav > li", function(e){
	//     var $this = $(this);
	//     $this.addClass("active").siblings().removeClass("active");
	// })
	//全选反选
	// $doc.on("click", ".batch", function(){
	// 	if($(this).hasClass("cut")){
	// 		$("input[name='checkbox']").removeAttr("checked");
	// 		$(this).removeClass("cut")
	// 	}else{
	// 		$("input[name='checkbox']").attr("checked","true");
	// 		$(this).addClass("cut")
	// 	}
	// })
	//pages
	//model
	// $('#delete').on('show.bs.modal', function (e) {
	// 	// 执行一些动作...
	// 	var button = $(e.relatedTarget);
	// 	console.log(button.data("id"))
	// });
	// $('#delete').on('hide.bs.modal', function () {
	// 	// 执行一些动作...
	// });	
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


	$doc.on("click", ".dropdown-menu li", function(){
		var $this = $(this)
		var $text = $this.text(),
			$button = $this.parent().prev();
		$button.val($this.attr("id"))
		opus_classify = $this.attr("id")
		$button.html($text +'<span class="caret"></span>');
	})
}

function initEcharts(){
	var dom = document.getElementById("container");
	var myChart = echarts.init(dom);
	var app = {},option = null;

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
	            name: '作品名称',
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
	            name:'作品分析',
	            type:'bar',
	            barWidth: '60%',
	            data: sendDataArr
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
// 导出文件
$("#exportMusicBtn").click(function() {
	util.export(opus_classify)
});	
function getData() {
	$.ajax({
		type: "GET",
		url: host +"/dadi/opus/count",
		dataType: "json",
		async: false,
		cache: false,
		success: function(res) {
			if(res.status == 1){
				for(var i =0;i<res.data.length;i++){
					sendData.push({
						value: res.data[i].COUNT,
						name: window.formatopus(res.data[i].opus_classify)
					});
					sendDataArr.push(res.data[i].COUNT);
					sendDataName.push(window.formatopus(res.data[i].opus_classify))
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