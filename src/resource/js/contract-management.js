import '../css/contract.scss';

const util = require("./common/util.js")
const itemSearchListTpl1  = require('../tpl/item-search-list.1.tpl');
const itemSearchListLookTpl = require('../tpl/item-look-xuanqu.tpl');
const itemSearchListLook1Tpl = require('../tpl/item-look-xuanqu.1.tpl');
const itemSearchListLook2Tpl = require('../tpl/item-look-xuanqu.2.tpl');
const itemSearchListLook3Tpl = require('../tpl/item-look-xuanqu.3.tpl');

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
let type = 1,contract_name,rel_typ,contract_amount,sign_date,effect_date,invalid_date,contract_subject,pay_type,pay_standard,contract_explain;
function bindEvents(){
    var $doc = $(document);
	util.timepicker("sign_date");
	util.timepicker("effect_date");
	util.timepicker("invalid_date");

	$doc.on("change", "#name-type", function(){
		type = $(this).val()
	})
	$doc.on("click", ".btn-ht", function(){
		contract_name = $("#ht-name").val();
		searchHtList(1)		
	})
	$doc.on("click","#modal-b-authorization",function(){
		rel_typ= $("input[name='mode0']:checked").val();
		contract_name= $("#ht-name").val();
		contract_amount= $("#contract_amount").val();
		sign_date= $("#sign_date input").val();
		effect_date= $("#effect_date input").val();
		invalid_date= $("#invalid_date input").val();
		//contract_subject= contract_subject;
		pay_type= $("#pay_type").val();
		pay_standard= $("#pay_standard").val();
		contract_explain= $("#contract_explain").val();
		searchHtList(1);
	})
}
function searchHtList(page){
	page = page || 1;
	$.ajax({
		type: "GET",
		url: host +"/dadi/contract/list",
		data: {
			rel_typ: rel_typ,
			type: type,
			contract_name: contract_name,
			contract_amount: contract_amount,
			sign_date: sign_date,
			effect_date: effect_date,
			invalid_date: invalid_date,
			//contract_subject: contract_subject,
			pay_type: pay_type,
			pay_standard: pay_standard,
			contract_explain: contract_explain,
			pageNum: page,
			pageSize: 10
		},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res && res.status == 1){
				if(res.data){//搜索
					for(var i = 0;i < res.data.length;i++){
						res.data[i].page = (page-1) * 10 + (i+1);
					}
					$(".htn-list").html(itemSearchListTpl1(res.data));
					util.pageinator("pageLimit", page, res.page.pageCount, searchHtList);
					$("#modal-search").modal("hide");
				}else{
                    util.showMsg("无数据！")
                }
			}else{
				util.showMsg(res.message)
			}
							
		},
		error: function(error){
			util.showMsg("error")
		}
	});
}
searchHtList(1)
//查看合同详情
let $doc = $(document)
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
function init(){
	bindEvents();
}
init();