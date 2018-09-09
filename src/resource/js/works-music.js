import '../css/works.scss';

const util = require("./common/util.js")

const rightNewsTpl = require('../tpl/item-right-news.tpl');
const itemSearchListTpl = require('../tpl/item-search-list.tpl');
const worksListTpl = require('../tpl/item-works-list.tpl');
const obligeeListTpl = require('../tpl/item-obligee-list.tpl');
const qianyuetTpl = require('../tpl/item-qianyue-list.tpl');
const itemSearchListLookTpl = require('../tpl/item-look-xuanqu.tpl');
const itemSearchListLook1Tpl = require('../tpl/item-look-xuanqu.1.tpl');
const itemSearchListLook4Tpl = require('../tpl/item-look-xuanqu.4.tpl');
const itemSearchListLook2Tpl = require('../tpl/item-look-xuanqu.2.tpl');

const detailsJicTpl = require('../tpl/item-details-jic.tpl');
const detailsListTpl = require('../tpl/item-details-list.tpl');
const detailsQlnewsTpl = require('../tpl/item-details-qlnews.tpl');
const detailsFjianTpl = require('../tpl/item-details-fjian.tpl');

const itemfileListTpl = require('../tpl/item-field-list.tpl')

let worksId;
let $RightNews = $(".right-news");

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

window.formatopus = function(state){
	state = parseInt(state)
	switch(state){
		case 1:
			return '歌曲 ';
		case 2:
			return '乐曲 ';
		case 3:
			return '戏剧 ';
		case 4:
			return '戏曲';
		default:
			return "无";
	}
}
window.formattheme = function(state){
	state = parseInt(state)
	switch(state){
		case 1:
			return '通俗 ';
		case 2:
			return '美声 ';
		case 3:
			return '嘻哈 ';
		case 4:
			return '摇滚';
		case 5:
			return '民谣 ';
		case 6:
			return '影视 ';
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

function initpid(id, $div, type, name,){
    let data = {
        pid: id
    }
    $.ajax({
        type: "POST",
        url: host +"/dadi/dic/list",
        data: JSON.stringify(data),
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
			var html = '';
            if(res && res.status == 1){
				console.log(res.data)
                for(var i = 0;i < res.data.length;i++){
					if(type == "radio"){
						html += '<label class="radio-inline">'+
								'	<input type="'+type+'" name="'+name+'" id="'+res.data[i].id+'" value="'+res.data[i].name+'">'+res.data[i].name+''+
								'</label>';
					}else if(type == "checkbox"){
						html += '<label class="checkbox-inline">'+
								'	<input type="'+type+'" name="'+name+'" id="'+res.data[i].id+'" value="'+res.data[i].name+'">'+res.data[i].name+''+
								'</label>';
					}else{
						html += '<option value="'+res.data[i].name+'" id="'+res.data[i].id+'">'+res.data[i].name+' </option>'
					}					
				}
				$div.html(html)
            }else{
               // util.showMsg(res.message)
            }
        }
    })
}
//作品类型
initpid(46, $("#work-type"))
//题材类型
initpid(3, $("#theme-type"))
//作品登机构
initpid(49, $("#work_registration_institution"))
//作品登委托机构
initpid(51, $("#commission_agency"))
//权利人类型
initpid(54, $("#modal-obligee-type"))
//币种
initpid(57, $("#modal-obligee-currency"))
//签约方类型
initpid(59, $("#modal-contract-party"))

//产品形态
initpid(18, $(".limit1"), "radio", "limit1")
//授权权利
initpid(19, $(".mode0"), "checkbox", "mode0")
//授权方式
initpid(20, $(".limit3"), "radio", "limit3")
//许可使用地域
initpid(21, $(".limit5"), "radio", "limit5")
//授权语言
initpid(22, $(".language"), "radio", "language")
//使用渠道限制
initpid(25, $(".mode"), "radio", "mode")
// window.formatobligee_syfs = function(state){
// 	state = parseInt(state)
// 	switch(state){
// 		case 0:
// 			return '无限制';
// 		case 1:
// 			return '有线';
// 		case 2:
// 			return '无线';
// 	}
// }
// window.formatobligee_syqd = function(state){
// 	state = parseInt(state)
// 	switch(state){
// 		case 0:
// 			return '无限制';
// 		case 1:
// 			return 'OTT';
// 		case 2:
// 			return 'IPTV';
// 		case 3:
// 			return '广播';
// 		case 4:
// 			return '电视';
// 		case 5:
// 			return 'APP';
// 	}
// }
// window.formatis_pay = function(state){
// 	state = parseInt(state)
// 	switch(state){
// 		case 0:
// 			return '否';
// 		case 1:
// 			return '是';
// 	}
// }
// window.formatcurrency = function(state){
// 	state = parseInt(state)
// 	switch(state){
// 		case 0:
// 			return '否';
// 		case 1:
// 			return '是';
// 	}
// }
// window._user_name.account= 4
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
function qlzinit(page){
	page = page || 1;
	$.ajax({
		type: "get",
		url: host +"/dadi/droitg/list",
		data: {
			pageNum: page,
			pageSize: 10
		},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res && res.status == 1){
				let html = '';
				for(let i = 0;i < res.data.length;i++){
					html += '<option value="'+res.data[i].id+'">'+res.data[i].name+'</option>';
				}
				$(".sel-ly").html(html)
			}else{
				//util.showMsg(res.message)
			}
		},
		error: function(error){
			util.showMsg("error")
		}
	});	
}
qlzinit()
let $cont1 = $(".content-01"),
	$cont2 = $(".content-02");
//默认展示列表
let workslistPage = 1;
function workslist(page){
	page = page || 1;
	$.ajax({
		type: "GET",
		url: host +"/dadi/opus/list",
		data: {
			opus_classify: 1,
			pageNum: page,
			pageSize: 10
		},
		dataType: "json",
		cache: false,
		success: function(res) {
			if(res.status == 1){
				$("#works-list").html(worksListTpl(res.data));
				util.pageinator("pageLimit", page, res.page.pageCount, workslistData);
			}else{
				util.showMsg(res.message)
			}			
		},
		error: function(){			
		}
	});
	
}
function workslistData(page){
	workslist(page)
}
let qlListJson = [];
function bindEvents(){
	var $doc = $(document);
	//合同信息
	// $doc.on("change", "#right-news", function(){
	// 	var $this = $(this);
	// 	var $div = $this.parents(".btn-group"),
	// 		$button = $div.next("button"),
	// 		$btnOperation = $div.nextAll(".btn-operation");
	// 	var val = $this.val();
	// 	if(val == 0){
	// 		//是
	// 		$button.removeAttr("disabled");
	// 		$btnOperation.hide();
	// 	}else{
	// 		$button.attr("disabled", "disabled");
	// 		$btnOperation.show();
	// 	}
	// })
	// $doc.on("click", ".hetong li", function(){
	// 	$(this).addClass("active").siblings().removeClass("active")
	// })
	//列表操作
	//列表删除
	// 打开询问是否删除的模态框并设置需要删除的大修的ID
	let fun;
	$doc.on("click", ".worksList-dele", function(){
		var delete_id = $(this).parent("td").attr("id");// 获取隐藏的ID
		$("#deleteHaulId").val(delete_id);// 将模态框中需要删除的大修的ID设为需要删除的ID
		$("#delcfmOverhaul").modal({
			backdrop : 'static',
			keyboard : false
		});
		fun = deleteHaulinfo;
	})
	// 删除大修模态框的确定按钮的点击事件
	$("#deleteHaulBtn").click(function() {
		// ajax异步删除
		fun()
	});
	function deleteHaulinfo() {
		//alert("你即将删除的大修ID" + $("#deleteHaulId").val())
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
		
	// $doc.on("click", ".worksList-dele", function(){
	// 	let $this = $(this),
	// 		id = $this.parent("td").attr("id");
	// 	$.ajax({
	// 		type: "POST",
	// 		url: host +"/dadi/opus/delete",
	// 		data: JSON.stringify({
	// 			id: id
	// 		}),
	// 		dataType: "json",
	// 		contentType: "application/json;charset=UTF-8",
	// 		cache: false,
	// 		success: function(res) {
	// 			if(res && res.status == 1){
	// 				util.showMsg(res.message)
	// 				workslist()
	// 			}else{
    //                 util.showMsg(res.message)
    //             }
	// 		},
	// 		error: function(){
				
	// 		}
	// 	});
	// })
	//权利变更
	let $modalPObligee = $("#modal-p-obligee"),
		$modalPAuthorizedPerson = $("#modal-p-authorized-person"),
		$modalNAuthorizingPerson = $("#modal-n-authorizing-person"),
		$modalNAuthorizedPerson = $("#modal-n-authorized-person"),
		$modalBAuthorization = $("#modal-b-authorization");
		let woid;
	$doc.on('click', ".works-list-bg", function () {
		let olds = $(this).data("olds");
		let oldb = $(this).data("oldb");
		woid = $(this).parent("td").attr("id")
		// 执行一些动作...
		$modalPObligee.val(olds);
		$modalPAuthorizedPerson.val(oldb);
	})
	$doc.on("click", "#modal-b-authorization", function(){
		let val1 = $modalNAuthorizingPerson.val(),
			val2 = $modalNAuthorizedPerson.val();
		if(util.isEmpty(val1) || util.isEmpty(val2)){
			util.showMsg('权利变更不能为空')
		}
		let data = {
			id: woid,
			new_shouquanren: val1,
			new_beishouquanren: val2
		};
		$.ajax({
			type: "POST",
			url: host +"/dadi/opus/updateShouquan",
			data: JSON.stringify(data),
			dataType: "json",
			cache: false,
			contentType: "application/json;charset=UTF-8",
			success: function(res) {
				if(res && res.status == 1){
					setTimeout(function(){
						location.reload();
					}, 1000)
				}else{
                    util.showMsg(res.message)
                }
			},
			error: function(error){
				util.showMsg("error")
			}
		});		
	})
	
	//新增作品
	
	$doc.on("click", ".btn-adda", function(){
		$cont1.hide();
		$cont2.show();
	})
	//作品权利信息
	//查询引用
	let kkid = [];
	$("input[name='news']").on("click",function(){
		$(".right-news").html("")
		if($(this).val() == 1){
			let jsond = {
				droit_g_id: $(".sel-ly").val(),
				pageNum: 1,
				pageSize: 20
			}
			$.ajax({
				type: "get",
				url: host +"/dadi/droit/list",
				data: jsond,
				dataType: "json",
				cache: false,
				contentType: "application/json;charset=UTF-8",
				success: function(res) {
					if(res && res.status == 1){
						$RightNews.html('')
						if(res.data && res.data.length > 0){
							for(var i = 0;i < res.data.length;i++){
								kkid.push(res.data[i].id)
							}
							console.log(kkid)
							$RightNews.html(itemSearchListLook1Tpl(res.data));
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
	})
	$("#query-reference").on("click", function(){		
		let $val = $("input[name='news']:checked").val();
		if($val == 0){
			kkid = [];
			$('#modal-choiceContracts').modal('show')
		}else{
			util.showMsg('选择权利来源！')
		}
	})
	//来源于权利
	$doc.on("change", ".sel-ly", function(){
		var $this = $(this);		
		let $val = $("input[name='news']:checked").val();
		if($val == 1){
			kkid = [];			
			let jsond = {
				droit_g_id: $this.val(),
				pageNum: 1,
				pageSize: 20
			}
			$.ajax({
				type: "get",
				url: host +"/dadi/droit/list",
				data: jsond,
				dataType: "json",
				cache: false,
				contentType: "application/json;charset=UTF-8",
				success: function(res) {
					if(res && res.status == 1){
						$RightNews.html('')
						if(res.data && res.data.length > 0){
							for(var i = 0;i < res.data.length;i++){
								kkid.push(res.data[i].id)
							}
							console.log(kkid)
							$RightNews.html(itemSearchListLook1Tpl(res.data));
						}
						
					}else{
						util.showMsg(res.message)
					}
				},
				error: function(error){
					util.showMsg("error")
				}
			});
		}else{
			util.showMsg('选择权利来源！')
		}
	})
	//选择合同
	//搜索
	let NameVal;
	$doc.on("click", ".btn-ht", function(){
		NameVal = $("#ht-name").val();		
		searchHtList(1)
		
	})
	function searchHtList(page){
		page = page || 1;
		$.ajax({
			type: "GET",
			url: host +"/dadi/contract/list",
			data: {
				contract_name: NameVal,
				pageNum: page,
				pageSize: 10
			},				
			dataType: "json",
			cache: false,
			contentType: "application/json;charset=UTF-8",
			success: function(res) {
				if(res && res.status == 1){
					if(res.data){//搜索
						$(".htn-list").html(itemSearchListTpl(res.data));
						util.pageinator("htn-list-page", page, res.page.pageCount, searchHtList);
					}else{//创建
						$(".htn-list").html('<div class="ht-list-s"><p>查询无结果</p><a class="cjht" data-toggle="modal" data-target="#modal-createContract">创建合同</a></div>');
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
	//查看并选择权利
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
					// for(var i = 0;i < res.data.droit.length;i++){
					// 	res.data.droit[i]._id = res.data.contract.id;
					// }
					for(var i = 0;i < res.data.droit.length;i++){
						res.data.droit[i]._id = res.data.contract.contract_name +"-"+ res.data.contract.id;
						res.data.droit[i].contract_name = res.data.contract.contract_name
					}
					$.extend(droitJson, res.data.droit)
					$(".look-details-01").html(itemSearchListLookTpl([res.data.contract]))
					$(".qlnews-cont").html(itemSearchListLook4Tpl(res.data.droit))
					$(".qyfNews").html(itemSearchListLook2Tpl(res.data.sign))
				}else{
                    util.showMsg(res.message)
                }					
			},
			error: function(error){
				util.showMsg("error")
			}
		});		
		

	})	
	//批量选取id
	function copy(){
		var checkbox = $("input[name=a1]");
		let html = '',id, _id;
		for (let i = 0; i < checkbox.length; i++) {
			var $this = checkbox[i];
			if($this.checked){
				id = $this.value;
				_id = $this.id;
				kkid.push(id)
				html += '<tr class="a b_'+ id +'" id="'+ id +'" data-id="'+ _id +'">'+ $(".c_"+ id).html() +'</tr>';
			}
		}
		return html;
	}	
	//合同详情选取
	$doc.on("click", ".btn-xqu", function(){
		console.log(droitJson)
		let c = copy();	
		if(util.isEmpty(c)){
			util.showMsg("请选取权利信息");
		}else{
			
			
			var $tr1 = $(".qlnews-xuanqu tr");
			var $tr = $(".qlnews-cont tr");
			for(var i = 0;i < $tr.length;i++){
				for(var j = 0;j < $tr1.length;j++){
					if($tr.eq(i).attr("id") == $tr1.eq(j).attr("id")){
						util.showMsg("不能有重复！");
						return
					}
				}
			}
			var $tr3 = $(".right-news tr");
			var $tr2 = $(".qlnews-cont tr");
			for(var i = 0;i < $tr2.length;i++){
				for(var j = 0;j < $tr3.length;j++){
					if($tr2.eq(i).attr("id") == $tr3.eq(j).attr("id")){
						util.showMsg("不能有重复！");
						return
					}
				}
			}

			$('#modal-detailsContract').modal('hide');
			$(".qlnews-xuanqu").append(c);			
		}
		$(".a input").remove();
	})
	$('#modal-choiceContracts').on('hidden.bs.modal' ,function(e){
    	$("#ht-name").val('');
		$(".htn-list").html('');
		$(".qlnews-xuanqu").html('');
	});
	$('#modal-createContract').on('hidden.bs.modal' ,function(e){
		$("#contract-party-list").html('');
		$(".qlnews-list").html('');
		$("#contract-appendices-list").html('');
		document.getElementById("htjcxx").reset();
	});
	$doc.on("click", ".btn-xuanqu-z", function(){
		//if(util.isEmpty($RightNews.html())){
		//	util.showMsg("请选取权利信息");
		//}else{
			var $tr = $(".qlnews-xuanqu tr");
			var $tr1 = $(".right-news tr");
			for(var i = 0;i < $tr.length;i++){
				for(var j = 0;j < $tr1.length;j++){
					if($tr.eq(i).attr("id") == $tr1.eq(j).attr("id")){
						util.showMsg("不能有重复！");
						return
					}
				}
			}


			
			console.log(2222)
			$('#modal-choiceContracts').modal('hide');
			let htname = $(".qlnews-xuanqu tr").data("id").split("-")[0];
			$("#source-contract-name").val(htname);
			$RightNews.append($(".qlnews-xuanqu").html());

			let $tr2 = $RightNews.find("tr");
			var htmla = '<td class="h"><button type="button" class="btn btn-default btn-upload-dele">删除</button></td>'
			for(var i = 0;i < $tr2.length;i++){
				if($tr2[i].className == "bto"){
				}else{
					$(htmla).appendTo($tr2[i])
					$tr2[i].className = "bto";
				}	
			}
			
			console.log(kkid)
		//}		
	})
	//创建合同
	// 创建合同、无权利信确认
	// $doc.on("click", ".btn-cjqr", function(){
	// 	$('#modal-createContract').modal('hide');
	// 	$(".htn-list").html(itemSearchListTpl(data3));
	// })	
	//合同下一步\提交	
	let $stepa = $(".stepa li");
	$doc.on("click", ".next-stepa", function(){
		let $this = $(this);
		let $contractNumVal = $("#contract-num").val(),
			//$contractSubVal = $("#contract-sub").val(),
			$contractNameVal = $("#contract-name").val(),
			$contractMoneyVal = $("#contract-money").val(),
			$contractSigningTimeVal = $("#contract-signing-time input").val(),
			$contractYakeTimeVal = $("#contract-take-time input").val(),
			$contractInvalidTimeVal = $("#contract-invalid-time input").val(),
			$contractYesTimeVal = $("#contract-yes-time").val(),
			$contractPaymentPlanVal = $("#contract-payment-plan").val(),
			$contractPaymentMethodVal = $("#contract-payment-method").val(),
			$contractNotesVal = $("#contract-notes").val(),
			$contractPartyPistHtml = $("#contract-party-list").html();
		if($this.hasClass("next-step-01")){
			//第一步
			
			if(util.isEmpty($contractNumVal) || util.isEmpty($contractNameVal) || util.isEmpty($contractMoneyVal) || util.isEmpty($contractSigningTimeVal)){
				util.showMsg("合同编号、合同名称、合同金额、签约日期不能为空！")
				return
			}else{
				nextBtn($this, $stepa);
			}			

		}else if($this.hasClass("next-step-02")) {
			//第二步
			let $qlnewsListHtml = $(".qlnews-list").html();
			//if(util.isEmpty($qlnewsListHtml)){
			//	util.showMsg("合同权利信息不能为空！")
				//return
			//}else{
				nextBtn($this, $stepa);
			//}
		}else{
			//提交
			let $contractAppendicesListtHtml = $("#contract-appendices-list").html();
			//if(util.isEmpty($contractAppendicesListtHtml)){
			//	util.showMsg("合同附件信息不能为空！")
				//return
			//}else{
				let $tr1 = $("#contract-party-list tr");
				let sign_ids = [];
				for(let a = 0;a < $tr1.length;a++){
					sign_ids.push($tr1[a].id)
				}
				console.log(sign_ids)

				let $tr2 = $(".qlnews-list tr");
				let droit_ids = [];
				for(let b = 0;b < $tr2.length;b++){
					droit_ids.push($tr2[b].id)
				}
				console.log(droit_ids)
				
				let $tr3 = $("#contract-appendices-list tr");
				let files = [];
				for(let c = 0;c < $tr3.length;c++){
					files.push($tr3[c].id)
				}
				console.log(files)
				let da = {
					contract_code: $contractNumVal,
					contract_name: $contractNameVal,
					contract_amount: $contractMoneyVal,
					sign_date: $contractSigningTimeVal,
					effect_date: $contractYakeTimeVal,
					invalid_date: $contractInvalidTimeVal,
					effect_period: $contractYesTimeVal,
					pay_plan: $contractPaymentPlanVal,
					pay_standard: $contractPaymentMethodVal,
					contract_explain: $contractNotesVal,
					sign_ids: sign_ids,
					droit_ids: droit_ids,
					files: files
				}
				$.ajax({
					type: "POST",
					url: host +"/dadi/contract/update",
					data: JSON.stringify(da),				
					dataType: "json",
					cache: false,
					contentType: "application/json;charset=UTF-8",
					success: function(res) {
						if(res && res.status == 1){
							console.log(res)
							util.showMsg("提交成功！")

							//合同详情选取
							$('#modal-createContract').modal('hide');
							$(".qlnews-xuanqu").append($(".qlnews-list").html());
							$(".right-news input").remove();
							// setTimeout(function(){
							// 	location.reload();
							// })
						}else{
							util.showMsg(res.message)
						}					
					},
					error: function(error){
						util.showMsg("error")
					}
				});		
			//}
		}		
	})	
	//附件
	let className;
	$doc.on("click", "#btn-added", function(){
		className = $(this).data("class");
		console.log(className)
		fileUpload()
		
		// if(className == "enclosure-list"){//作品附件
		// 	classNa 
		// }else{
		// 	//合同附件

		// }
		
	})
	let $t;
	$doc.on("click", ".btn-upload-dele", function(){
		$t = $(this);		
		$("#delcfmOverhaul").modal({
			backdrop : 'static',
			keyboard : false
		});
		fun = deleteT;
	})
	function deleteT(){
		$t.parents("tr").remove()
		$("#delcfmOverhaul").modal("hide")
	}
	$doc.on("click", ".btn-upload", function(){
		for(var i = 0;i < resD.success.length;i++){
			let file = resD.success[i].data[0];
			let da = {
				file_name: file.file_name,
				file_type: file.file_type,
				file_url: file.file_url,
				file_size: file.file_size
			}
			$.ajax({
				type: "POST",
				url: host +"/dadi/fileobj/update",
				data: JSON.stringify(da),				
				dataType: "json",
				cache: false,
				contentType: "application/json;charset=UTF-8",
				success: function(res) {
					if(res && res.status == 1){
						console.log(res)
						let html = '';
						html += '<tr id="'+ res.data.id +'">'+
								// '	<th class="th" scope="row">1</th>'+
								'	<td>'+ res.data.file_name +'</td>'+
								'	<td>'+ res.data.file_type +'</td>'+
								'	<td>'+ res.data.file_size +'</td>'+
								'	<td>'+ res.data.create_time +'</td>'+
								'	<td>'+ res.data.creater +'</td>'+
								//'	<td>'+ res.data.file_type +'</td>'+
								'	<td><button type="button" class="btn btn-default btn-upload-dele">删除</button></td>'+
								'</tr>';						
						$("#file-added").remove();
						$(".modal-backdrop").remove();
						$("body").removeClass("modal-open");
						console.log(className);
						$("#"+ className).append(html);
					}else{
						util.showMsg(res.message)
					}					
				},
				error: function(error){
					util.showMsg("error")
				}
			});		
		}
	})
	//合同签约方
	let qyListJson = [];
	let $modalContractParty = $("#modal-contract-party"),
		$modalContractName = $("#modal-contract-name"),
		$modalContractIphone = $("#modal-contract-iphone"),
		$modalContractPepo = $("#modal-contract-pepo"),
		$modalContractDiz = $("#modal-contract-diz"),
		$modalContractBtn = $(".modal-contract-btn");
	$doc.on("click", ".modal-contract-btn", function(){
		let $this = $(this);
		let $modalContractPartyVal = $modalContractParty.val(),
			$modalContractNameVal = $modalContractName.val(),
			$modalContractIphoneVal = $modalContractIphone.val(),
			$modalContractPepoVal = $modalContractPepo.val(),
			$modalContractDizVal = $modalContractDiz.val();
		if(util.isEmpty($modalContractPartyVal) || util.isEmpty($modalContractNameVal)){
			util.showMsg("签约方类型、签约方名称不能为空！")
			return
		}else{
			let $id = $(this).attr("id");
			let jsond = {
				id: $id,
				sign_name: $modalContractNameVal,
				sign_type: $modalContractPartyVal,
				sign_phone: $modalContractIphoneVal,
				sign_person:  $modalContractPepoVal,
				sign_address: $modalContractDizVal
			}
			let pushD = true;
			if(qyListJson.length > 0){//有数据判断是修改还是增加
				for(var i = 0;i < qyListJson.length;i++){
					if(qyListJson[i] && qyListJson[i].id == $id){ //修改
						$.extend(qyListJson[i], jsond);
						pushD = false;
						break
					}
				}
			}
			$.ajax({
				type: "POST",
				url: host +"/dadi/sign/update",
				data: JSON.stringify(jsond),
				dataType: "json",
				cache: false,
				contentType: "application/json;charset=UTF-8",
				success: function(res) {
					if(res && res.status == 1){
						if(pushD){
							jsond.id = res.data.id;
							qyListJson.push(jsond);
						}
						document.getElementById("qianyForm").reset();
						$this.attr("id", "")						
						console.log(qyListJson)
						$("#contract-party-list").html(qianyuetTpl(qyListJson));
						$('#modal-signatoryInformation').modal('hide');
					}else{
						util.showMsg(res.message)
					}
				},
				error: function(error){
					util.showMsg("error")
				}
			});			
		}
	})
	//修改
	$doc.on("click", ".btn-qiany-list-edit", function(){
		let id = $(this).parents("tr").attr("id");
		for(var i = 0;i < qyListJson.length;i++){
			let json = qyListJson[i];
			if(json.id == id){
				$modalContractBtn.attr("id", json.id);
				$modalContractName.val(json.sign_name);
				$modalContractParty.val(json.sign_type);
				$modalContractIphone.val(json.sign_phone);
				$modalContractPepo.val(json.sign_person);
				$modalContractDiz.val(json.sign_address);
				break;
			}
		}		
	})
	//删除
	$doc.on("click", ".btn-qiany-list-dele", function(){
		var delete_id = $(this).parents("tr").attr("id");// 获取隐藏的ID
		$("#deleteHaulId").val(delete_id);// 将模态框中需要删除的大修的ID设为需要删除的ID
		$("#delcfmOverhaul").modal({
			backdrop : 'static',
			keyboard : false
		});
		fun = deleqianQl;
	})
	
	function deleqianQl() {		
		//alert("你即将删除的大修ID" + $("#deleteHaulId").val())
		let id = $("#deleteHaulId").val();
		$.ajax({
			type: "POST",
			url: host +"/dadi/opus/delete",
			data: JSON.stringify({id: id}),
			dataType: "json",
			cache: false,
			contentType: "application/json;charset=UTF-8",
			success: function(res) {
				if(res && res.status == 1){
					util.showMsg("删除成功！")
					for(var i = 0;i < qyListJson.length;i++){
						let json = qyListJson[i];
						if(json.id == id){
							qyListJson.splice(i, 1);  
						}
					}
					console.log(qyListJson)
					$("#contract-party-list").html(qianyuetTpl(qyListJson));
					$("#delcfmOverhaul").modal("hide")
				}else{
                    util.showMsg(res.message)
                }
			},
			error: function(error){
				util.showMsg("error")
			}
		});
		
	}

	// $("input.s-t, input.e-t").blur(function(){
	// 	let s = $(".s-t").val(),
	// 		e = $(".e-t").val();
	// 	setTimeout(() => {
	// 		if(util.isEmpty(s) || util.isEmpty(e)){
	// 			return
	// 		}else{
	// 			console.log(1)
	// 			let t = GetDateDiff(s,e,"day");
	// 			console.log(t)
	// 		}
	// 	}, 1000);
		
	// })
	//权利信息新增
	$doc.on("click", ".modal-right-info-btn", function(){
		let $modalRightInfoNameVal = $("#modal-right-info-name").val(),
			$modalRightInfoSetVal = $("#modal-right-info-set").val(),
			$modalRightInfoUntilVal = $("#modal-right-info-until").val(),
			$modalRightInfoSVal = $("#modal-right-info-s").val(),
			$modalRightInfoSqrVal = $("#modal-right-info-sqr").val(),
			$modalRightInfoSqpVal = $("#modal-right-info-sqp").val(),
			$modalRightInfoSqmVal = $("#modal-right-info-sqm").val(),
			$modalRightInfoQldescVal = $("#modal-right-info-qldesc").val(),
			$datetimeStartVal = $("#datetimeStart").val(),
			$datetimeEndVal = $("#datetimeEnd").val(),
			$modalRightInfoDescVal = $("#modal-right-info-desc").val(),
			$modalRightInfoRemarks = $("#modal-right-info-remarks").val(),
			$modalRightInfoFVal = $("#modal-right-info-f").val();
		let $limitVal = $("input[name='limit']:checked").val(),
			$limit1Val = $("input[name='limit1']:checked").val(),
			$limit3Val = $("input[name='limit3']:checked").val(),
			$limit4Val = $("input[name='limit4']:checked").val(),
			$limit5Val = $("input[name='limit5']:checked").val(),
			mode0 = showArr("mode0"),
			language = $("input[name='language']:checked").val(),
			mode = $("input[name='mode']:checked").val();
		if(util.isEmpty($modalRightInfoNameVal) || util.isEmpty($modalRightInfoSVal) || util.isEmpty($modalRightInfoSqrVal)){
			util.showMsg("作品名称、授权人、被授权人不能为空！")
			return
		}else{
			let data = {
				opus_name: $modalRightInfoNameVal,
				peri_num: $modalRightInfoSetVal,
				unit_price: $modalRightInfoUntilVal,
				droit_subject: $modalRightInfoSVal,
				bdroit_per: $modalRightInfoSqrVal,
				droit_propor: $modalRightInfoSqpVal,
				droit_price: $modalRightInfoSqmVal,
				is_propri: $limit1Val,
				ishave_contract: mode0,
				droit_content: $modalRightInfoQldescVal,
				sqxk_ksrq: $datetimeStartVal,
				sqxk_jsrq: $datetimeEndVal,
				droit_mode: $limit3Val,
				sqxk_sydy: $limit5Val,
				sqxk_syyy: language,
				is_deleg: $limit4Val,
				is_wripr: $limitVal,
				sqxk_syqd: mode,
				sqxk_sycs: $modalRightInfoFVal,
				htql_ms: $modalRightInfoDescVal,
				droit_des: $modalRightInfoRemarks
			}
			console.log(data)
			$.ajax({
				type: "POST",
				url: host +"/dadi/droit/update",
				data: JSON.stringify(data),
				dataType: "json",
				cache: false,
				contentType: "application/json;charset=UTF-8",
				success: function(res) {
					if(res && res.status == 1){
						console.log(1)
						data.id = res.data.id;
						data._id = $("#contract-name").val() +"-"+ data.id;
						$(".qlnews-list").append(itemSearchListLook4Tpl([data]));
						let $tr2 = $(".qlnews-list").find("tr");
						var htmla = '<td class="h"><button type="button" class="btn btn-default btn-upload-dele">删除</button></td>'
						for(var i = 0;i < $tr2.length;i++){
							if($tr2[i].className == "bto"){
							}else{
								$(htmla).appendTo($tr2[i])
								$tr2[i].className = "bto";
							}	
						}
						//document.getElementById("ht-add").reset();
						$('#modal-newly-added1').modal('hide');
					}else{
						util.showMsg(res.message)
					}
				},
				error: function(error){
					util.showMsg("error")
				}
			});
		}
	})
	$doc.on("click", ".modal-right-info-rest", function(){
		document.getElementById("ht-add").reset();
	})
	$doc.on("click", ".pre-stepa", function(){
		let $this = $(this);
		preBtn($this, $stepa);
	})
	// $doc.on("click", ".ip-click", function(){
	// 	location.href = "ipdetails.html"
	// })

	//作品下一步\提交	
	let $step = $(".step li");
	$doc.on("click", ".next-step", function(){		
		var $this = $(this);
		let $workNameVal = $("#work-name").val(),
			$workTypeVal = $("#work-type").val(),
			$themeTypeVal = $("#theme-type").val(),
			$lenghtTimeVal = $("#lenght-time").val(),
			$publicTimeVal = $("#public-time input").val(),
			$creationTimeVal = $("#creation-time input").val(),
			$registration_number = $("#registration_number").val(),
			$new_shouquanren = $("#new_shouquanren").val(),
			$new_beishouquanren = $("#new_beishouquanren").val(),
			$work_registration_institution = $("#work_registration_institution").val(),
			$commission_agency = $("#commission_agency").val(),
			$albumVal = $("#album").val(),
			$originalScriptVal = $("#original-script").val(),
			$versionDescriptionVal = $("#version-description").val(),
			$worksDescVal = $("#works-desc").val(),
			$obligeeListHtml = $(".obligee-list").html();
		if($this.hasClass("next-step-01")){
			//第一步			
			if(util.isEmpty($workNameVal) || util.isEmpty($workTypeVal) || util.isEmpty($themeTypeVal) || util.isEmpty($lenghtTimeVal)){
				util.showMsg("作品名称、作品类型、作品题材、作品时长不能为空！")
			}else{
				nextBtn($this, $step);
			}			
		}else if($this.hasClass("next-step-02")) {
			//第二步
			let $rightNewsHtml = $RightNews.html();
			//if(util.isEmpty($rightNewsHtml)){
			//	util.showMsg("作品权利信息不能为空！")
			//}else{
				nextBtn($this, $step);
			//}
		}else{
			//提交
			//let $enclosureListHtml = $("#enclosure-list").html();
			//if(util.isEmpty($enclosureListHtml)){
			//	util.showMsg("作品附件信息不能为空！")
			//}else{
				let $tr1 = $(".obligee-list tr");
				let obligeeIds = [];
				for(let a = 0;a < $tr1.length;a++){
					obligeeIds.push($tr1[a].id)
				}
				console.log(obligeeIds)

				let $tr2 = $(".right-news tr");
				let dro = [], contract_name= '',cid = [];
				for(let b = 0;b < $tr2.length;b++){
					let htid = $tr2[b].dataset.id.split("-")[0];
					contract_name = contract_name + htid + ",";
					cid.push($tr2[b].dataset.id.split("-")[1])
					dro.push($tr2[b].id)
				}
				console.log(dro, contract_name.slice(0,-1))
				var contract_ids = cid.distinct()
				var droitIds = dro.distinct(); 
				console.log(droitIds,contract_ids)
				let $tr3 = $("#enclosure-list tr");
				let files = [];
				for(let c = 0;c < $tr3.length;c++){
					
					files.push($tr3[c].id)
				}
				console.log(files)
				let da = {
					id: worksId,
					opus_classify: 1,
					embody_album: $albumVal,
					is_original: $originalScriptVal,
					opus_name: $workNameVal,
					opus_type: $workTypeVal,
					new_shouquanren: $new_shouquanren,
					new_beishouquanren: $new_beishouquanren,
					theme_type: $themeTypeVal,
					registration_number: $registration_number,
					work_registration_institution: $work_registration_institution,
					commission_agency: $commission_agency,
					opus_duration: $lenghtTimeVal,
					publish_date: $publicTimeVal,
					indite_date: $creationTimeVal,
					version_explain: $versionDescriptionVal,
					opus_briefing: $worksDescVal,
					obligee_ids: obligeeIds,
					droit_ids: droitIds,
					files: files,
					contract_name: contract_name.slice(0,-1),
					contract_ids:contract_ids
				}
				$.ajax({
					type: "POST",
					url: host +"/dadi/opus/update",
					data: JSON.stringify(da),				
					dataType: "json",
					cache: false,
					contentType: "application/json;charset=UTF-8",
					success: function(res) {
						if(res && res.status == 1){
							console.log(res)
							util.showMsg("提交成功！")
							location.search = ''
							setTimeout(function(){								
								location.reload();
							}, 1000)
							worksId = '';
						}else{
							util.showMsg(res.message)
						}
					},
					error: function(error){
						util.showMsg("error")
					}
				});	
			//}
		}
	})
	$doc.on("click", ".pre-step", function(){
		var $this = $(this);
		preBtn($this, $step);
	})	
	
	
	//作品名称模糊搜索
	let $selectDiv = $('.select-div');
	// $("#work-name").keyup(function(e){
	// 	var $this = $(this);
	// 	//如果输入空格自动删除
	// 	this.value=$this.val().replace(' ','');
	// 	console.log(this.value)
	// 	//列表框显示
	// 	$selectDiv.show();
	// 	if(e.keyCode == 38) {
	// 		//up
	// 		console.log('up');
	// 	}else if(e.keyCode == 40) {
	// 		//down
	// 		console.log('down');		
	// 	}else if(e.keyCode == 13) {
	// 		//enter
	// 		console.log('enter');
	// 		$selectDiv.hide();
	// 	}else {
	// 		//other
	// 		console.log('other');
	// 	}
	// })
	//权利人列表选取	
	// $selectDiv.on("click", "li", function(){
	// 	$(".obligee-list").html(obligeeListTpl(data4));
	// 	$selectDiv.hide();
	// })
	
	//权利人列表新增
	let $modalObligeeName = $("#modal-obligee-name"),
		$modalObligeeType = $("#modal-obligee-type"),
		$modalObligeeRemuneration = $("#modal-obligee-remuneration"),
		$modalObligeeCurrency = $("#modal-obligee-currency"),
		$modalObligeeMoney = $("#modal-obligee-money"),
		$btnListQr = $(".btn-List-qr");
	//弹框提交
	$doc.on("click", ".btn-List-qr", function(){
		let $this = $(this)
		let $modalObligeeNameVal = $modalObligeeName.val(),
			$modalObligeeTypeVal = $modalObligeeType.val(),
			$modalObligeeRemunerationVal = $modalObligeeRemuneration.val(),
			$modalObligeeCurrencyVal = $modalObligeeCurrency.val(),
			$modalObligeeMoneyVal = $modalObligeeMoney.val();
		if(util.isEmpty($modalObligeeNameVal) || util.isEmpty($modalObligeeTypeVal)){
			util.showMsg("权利人名称，权利人类型不能为空！")
			return
		}else{
			let $id = $(this).attr("id");
			let jsond = {
				id: $id,
				obligee_name: $modalObligeeNameVal,
				obligee_type: $modalObligeeTypeVal,
				is_pay: $modalObligeeRemunerationVal,
				currency:  $modalObligeeCurrencyVal,
				pay_amount: $modalObligeeMoneyVal
			}
			let pushD = true;
			if(qlListJson.length > 0){//有数据判断是修改还是增加
				for(var i = 0;i < qlListJson.length;i++){
					if(qlListJson[i] && qlListJson[i].id == $id){ //修改
						$.extend(qlListJson[i], jsond);
						pushD = false;
						break
					}
				}
			}
			
			console.log(jsond.id)
			$.ajax({
				type: "POST",
				url: host +"/dadi/obligee/update",
				data: JSON.stringify(jsond),
				dataType: "json",
				cache: false,
				contentType: "application/json;charset=UTF-8",
				success: function(res) {
					if(res && res.status == 1){
						if(pushD){
							qlListJson.push(res.data);
						}
						document.getElementById("qbligForm").reset();
						$this.attr("id", "")						
						console.log(qlListJson)
						$(".obligee-list").html(obligeeListTpl(qlListJson));
						$('#modal-qbligeeAdd').modal('hide');
					}else{
						util.showMsg(res.message)
					}
				},
				error: function(error){
					util.showMsg("error")
				}
			});
		}
	})
	//修改
	$doc.on("click", ".btn-obligee-list-edit", function(){
		let id = $(this).parents("tr").attr("id");
		for(var i = 0;i < qlListJson.length;i++){
			let json = qlListJson[i];
			console.log(qlListJson)
			if(json.id == id){
				$btnListQr.attr("id", json.id);
				$modalObligeeName.val(json.obligee_name);
				$modalObligeeType.val(json.obligee_type);
				$modalObligeeRemuneration.val(json.is_pay);
				$modalObligeeCurrency.val(json.currency);
				$modalObligeeMoney.val(json.pay_amount);
				break;
			}
		}		
	})
	// $doc.on("click", ".obligee-checkbox-btn", function(){
	// 	util.checkB($(this), "obligee-checkbox")
	// })
	//删除
	$doc.on("click", ".btn-obligee-list-dele", function(){
		var delete_id = $(this).parents("tr").attr("id");// 获取隐藏的ID
		$("#deleteHaulId").val(delete_id);// 将模态框中需要删除的大修的ID设为需要删除的ID
		$("#delcfmOverhaul").modal({
			backdrop : 'static',
			keyboard : false
		});
		fun = deleQl;
	})
	
	function deleQl() {		
		//alert("你即将删除的大修ID" + $("#deleteHaulId").val())
		let id = $("#deleteHaulId").val();
		$.ajax({
			type: "POST",
			url: host +"/dadi/obligee/delete",
			data: JSON.stringify({id: id}),
			dataType: "json",
			cache: false,
			contentType: "application/json;charset=UTF-8",
			success: function(res) {
				if(res && res.status == 1){
					util.showMsg("删除成功！")
					for(var i = 0;i < qlListJson.length;i++){
						let json = qlListJson[i];
						if(json.id == id){
							qlListJson.splice(i, 1);  
						}
					}
					console.log(qlListJson)
					$(".obligee-list").html(obligeeListTpl(qlListJson));
					$("#delcfmOverhaul").modal("hide")
				}else{
                    util.showMsg(res.message)
                }
			},
			error: function(error){
				util.showMsg("error")
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
					$("#check_remark").text(data.opus.check_remark)
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
	$doc.on("click", ".works-list-edit", function(){
		let id = $(this).parent("td").attr("id");
		xiugai(id)
	})
	// $doc.on("click", ".basics .add", function(){		
	// 	var $this = $(this);
	// 	var $formLen = $(".form-3").length;
	// 	var $div = $this.parent("div");
	// 	if($formLen < 3){
	// 		$div.after($div.clone())
	// 	}		
	// })
	// $doc.on("click", ".basics .delete", function(){
	// 	var $this = $(this);
	// 	var $formLen = $(".form-3").length;
	// 	var $div = $this.parent("div");
	// 	if($formLen > 1){
	// 		$div.remove();
	// 	}
	// })
		
	//time
	util.timepicker("public-time");
	util.timepicker("creation-time");
	util.timepicker("contract-signing-time");
	util.timepicker("contract-take-time");
	util.timepicker("contract-invalid-time");
	// util.timepicker("contract-yes-time");
	util.timepicker("modal-right-start-time")
	util.timepicker("modal-right-dj-time")

	util.timepickerSection("datetimeStart", "datetimeEnd");	

	//pages	
	
	//util.pageinator("pageLimit", "10", pageData);
	// util.pageinator("pageLimit2", "10", "url", tplData);
	// util.pageinator("pageLimit3", "10", "url", tplData);
	// util.pageinator("pageLimit4", "10", "url", tplData);
	// util.pageinator("pageLimit5", "10", "url", tplData);
	// util.pageinator("pageLimit6", "10", "url", tplData);
	
	
}
var vId =  util.GetQueryString("id");
if(vId){
	xiugai(vId)	
}
function xiugai(id){
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
				// $(".details-jic").html(detailsJicTpl(data.opus));
				// $(".details-list").html(detailsListTpl(data.obligee));
				// $(".details-qlnews").html(detailsQlnewsTpl(data.droit));
				// $(".details-fjian").html(detailsFjianTpl(data.fileobj));	
				worksId = data.opus.id;
				for(let k = 0;k < res.data.obligee.length;k++){
					qlListJson.push(res.data.obligee[k])
				}
				$RightNews.html(itemSearchListLook1Tpl(res.data.droit));
				let $tr2 = $RightNews.find("tr");
				var htmla = '<td class="h"><button type="button" class="btn btn-default btn-upload-dele">删除</button></td>'
				for(var i = 0;i < $tr2.length;i++){
					if($tr2[i].className == "bto"){
					}else{
						$(htmla).appendTo($tr2[i])
						$tr2[i].className = "bto";
					}	
				}
				$("#enclosure-list").html(itemfileListTpl(res.data.fileobj));
				$("#work-name").val(data.opus.opus_name);
				$("#work-type").val(data.opus.opus_type);
				$("#theme-type").val(data.opus.theme_type);
				$("#registration_number").val(data.opus.registration_number);
				$("#work_registration_institution").val(data.opus.work_registration_institution);
				$("#commission_agency").val(data.opus.commission_agency);
				$("#lenght-time").val(data.opus.opus_duration);
				$("#public-time input").val(data.opus.publish_date);
				$("#creation-time input").val(data.opus.indite_date);
				$("#album").val(data.opus.embody_album);
				$("#original-script").val(data.opus.is_original);
				$("#version-description").val(data.opus.version_explain);
				$("#works-desc").val(data.opus.opus_briefing);
				$("#new_shouquanren").val(data.opus.new_shouquanren);
				$("#new_beishouquanren").val(data.opus.new_beishouquanren);
				$(".obligee-list").html(obligeeListTpl(data.obligee));

				// $("#").val();
				// $("#").val();
				// $("#").val();
				// $("#").val();
				$cont1.hide();
				$cont2.show();
			}else{
				util.showMsg(res.message)
			}
		},
		error: function(error){
			util.showMsg("error")
		}
	});
}

// 导出文件
$("#exportMusicBtn").click(function() {
	util.export(1)
});	

//下一步
function nextBtn(me, $li){
	let $main = me.parents(".main"),
	$nextMain = $main.next(".main");
	let index = $main.index();
	$li.eq(++index).addClass("active").siblings().removeClass("active");
	$main.hide();
	$nextMain.show();
}
//上一步
function preBtn(me, $li){
	let $main = me.parents(".main"),
	$pretMain = $main.prev(".main");
	let index = $main.index();
	$li.eq(--index).addClass("active").siblings().removeClass("active");
	$main.hide();
	$pretMain.show();
}
let resD;
function reslo(res){
	console.log(res)
	resD = res;
}
let upload = '';
upload += '<div class="modal fade " style="display:blos1ck; z-index:9999" id="file-added" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
			'	<div class="modal-dialog">'+
			'		<div class="modal-content">'+
			'			<div class="modal-header">'+
			'				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
			'				<h4 class="modal-title" id="myModalLabel">新增</h4>'+
			'			</div>'+
			'			<div class="modal-body">'+
			'				<div id="easyContainer"></div>'+
			'			</div>'+
			'			<div class="modal-footer">	'+			
			'				<button type="button" class="btn btn-primary btn-upload">确认</button>'+
			'				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
			'			</div>'+
			'		</div>'+
			'	</div>'+
			'</div>'

//上传
function fileUpload(){
	$("body").append(upload)
	
	let url = host +"/dadi/fileobj/upload";
	util.fileFun(url, reslo);
	$("#file-added").modal('show');
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

//批量删除
function batchFun(me){
	var getAll = getAllids();
	var getAllS = getAll.split("|"),
		id = getAllS[0];
	//var dstext = $(this).attr("data-text");
	if(id == ""){
		util.showMsg('选择要删除目录！')
	}else{
		//confirmData(id)
		util.showMsg("删除成功！ id="+ id)
	}
}
//批量选取id
function getAllids(){
	var checkbox = $(".checkbox");
	var id = "", num = "";
	for ( var i = 0; i < checkbox.length; i++) {
		var $this = checkbox[i];
		if($this.checked){
			num = num + $this.value + ",";
			id = id + $this.id + ",";
		}
	}
	return id.slice(0,-1) +"|"+ num.slice(0,-1);
}
function show(name){
    let obj = document.getElementsByName(name) || "";
    let check_val = [];
    for(let k in obj){
        if(obj[k].checked)
            check_val.push(obj[k].value);
    }
    return check_val;
}
function showArr(name){
    let obj = document.getElementsByName(name) || "";
    let check_val = '';
    for(let k in obj){
        if(obj[k].checked)
		check_val = check_val + obj[k].value + ",";
    }
    return check_val.slice(0,-1);
}
function init(){
	workslist();
	bindEvents();
}
init();