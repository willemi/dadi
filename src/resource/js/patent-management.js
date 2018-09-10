import '../css/trademark-management.scss';

const util = require("./common/util.js")
const trademarkList = require('../tpl/item-trademark-list.tpl')
const managementList = require('../tpl/item-patent-management.tpl');
const itemSearchListLook3Tpl = require('../tpl/item-look-xuanqu.3.tpl');
const itemSearchListTpl = require('../tpl/item-search-list.tpl');
const searchListProduc = require('../tpl/item-search-list-produc.tpl');
const itemSearchListLookTpl = require('../tpl/item-look-xuanqu.tpl');
const itemSearchListLook1Tpl = require('../tpl/item-look-xuanqu.1.tpl');
const itemSearchListLook2Tpl = require('../tpl/item-look-xuanqu.2.tpl');
const qianyuetTpl = require('../tpl/item-qianyue-list.tpl');

// let $RightNews = $(".right-news");

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
window.formatobligee_you = function(state){
	state = parseInt(state)
	switch(state){
		case 0:
			return '无';
		case 1:
			return '有';
	}
}
let $stepa = $(".stepa li");


function initData(page){
	page = page || 1;
	$.ajax({
		type: "GET",
		url: host +"/dadi/patent/list",
		data: {
			pageNum: page,
			pageSize: 10
		},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res.status == 1){
				$(".management-list").html(managementList(res.data));
				util.pageinator("pageLimit", page, res.page.pageCount, initData);
			}else{
				util.showMsg(res.message)
			}			
		},
		error: function(){			
		}
	});
}
let listId;
function xgData(){
	$.ajax({
		type: "GET",
		url: host +"/dadi/patent/findById",
		data: {
			id: listId
		},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res.status == 1){
				console.log(res)
				$("#ht-news").val(res.data.contract.contract_name);
				$("#zs-nub").val(res.data.zsNub);
				$("#qlzt").val(res.data.status);
				console.log($("#qlzt").val())
				$("#qllx").val(res.data.droit_type);
				$("#name").val(res.data.name);
				$("#designer").val(res.data.designer);
				$("#number").val(res.data.number);
				$("#paten").val(res.data.paten);
				$("#apply_date input").val(res.data.apply_date);
				$("#notice_date input").val(res.data.notice_date);
				$("#agency").val(res.data.agency);
				$("#product_name").val(res.data.product_name);
				$("#next_payment_time").val(res.data.next_payment_time);
				$("#total_cost").val(res.data.total_cost);
				$("#is_patent").val(res.data.is_patent);
				$("#project").val(res.data.project);
				$("#authorize_unit").val(res.data.authorize_unit);
				$("#authorized_unit").val(res.data.authorized_unit);
				$("#authorize_type").val(res.data.authorize_type);
				$("#term_of_validity_start input").val(res.data.term_of_validity_start);
				$("#term_of_validity_end input").val(res.data.term_of_validity_end);
				$("#authorized_years").val(res.data.authorized_years);
				$("#authorized_area").val(res.data.authorized_area);
				$("#scope_of_authorization").val(res.data.scope_of_authorization);
				$("#scope_of_operation").val(res.data.scope_of_operation);
				$("#authorized_amount").val(res.data.authorized_amount);
				$("#bz").val(res.data.bz);
				$("#qlzt").val(res.data.qlzt);
				$("#mark_contract_id").val(res.data.contract_id);

				$("#zs-nub").val(res.data.certificate_number)
				$("#qlzt").val(res.data.droit_sttus)

				let html = '';
				for(var i = 0;i < res.data.fileobj.length;i++){
					var f = res.data.fileobj[i];
				   html += '<tr id="'+ f.id +'">'+
				   '	<td class=" click-pic" data-url="http://118.26.10.50:9999/file/'+ f.file_url +'">'+ f.file_name +'</td>'+
				   '	<td>'+ f.file_type +'</td>'+
				   '	<td>'+ f.file_size +'</td>'+
				   '	<td>'+ f.create_time +'</td>'+
				   '	<td>'+ f.creater +'</td>'+
				   '	<td><button type="button" class="btn btn-default btn-upload-dele">删除</button></td>'+
				   '</tr>';
				}
				$("#manage-file").html(html)

			}else{
				util.showMsg(res.message)
			}			
		},
		error: function(){			
		}
	});
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
//签约方类型
initpid(59, $("#modal-contract-party"))

//产品形态
initpid(18, $(".limit1"), "radio", "limit1")
//授权权利
initpid(19, $(".mode0"), "checkbox", "mode0")
//授权方式
initpid(20, $(".limit3"), "radio", "limit3")
//许可使用地域
initpid(21, $(".region"), "radio", "region")
//授权语言
initpid(22, $(".language"), "radio", "language")
//使用渠道限制
initpid(25, $(".mode"), "radio", "mode")

//权利状态
initpid(92, $("#qlzt"))
//权利类型
initpid(94, $("#qllx"))
//专利信息
// initpid(96, $("#is_patent"))
//授权形式
initpid(90, $("#authorize_type"))
//授权区域
initpid(98, $("#authorized_area"))
//授式范围
initpid(100, $("#scope_of_authorization"))
$("#gengk-added").on("hidden.bs.modal", function() {
	// $(this).removeData("bs.modal");
	$("input").val('')
	$("#manage-file").html('')
 });
//默认展示列表
function bindEvents(){
	var $doc = $(document);
	$doc.on("click", ".btn-xgg", function(){
		listId = $(this).parents("td").attr("id");
		xgData();
		$("#gengk-added").modal("show")
	})
	
	util.timepicker("apply_date");
	util.timepicker("notice_date");
	util.timepicker("term_of_validity_start");
	util.timepicker("term_of_validity_end");

	util.timepicker("contract-signing-time");
	util.timepicker("contract-take-time");
	util.timepicker("contract-invalid-time");
	util.timepicker("contract-yes-time");
	util.timepicker("modal-right-start-time")
	util.timepicker("modal-right-dj-time")

	util.timepickerSection("datetimeStart", "datetimeEnd");	
	
	
	//列表删除
	// 打开询问是否删除的模态框并设置需要删除的大修的ID
	let fun;
	// 删除大修模态框的确定按钮的点击事件
	$("#deleteHaulBtn").click(function() {
		// ajax异步删除
		fun()
	});	
	$doc.on("click", ".worksList-dele", function(){
		var delete_id = $(this).parent("td").attr("id");// 获取隐藏的ID
		$("#deleteHaulId").val(delete_id);// 将模态框中需要删除的大修的ID设为需要删除的ID
		$("#delcfmOverhaul").modal({
			backdrop : 'static',
			keyboard : false
		});
		fun = deleteHaulinfo;
	})
	function deleteHaulinfo(){
		let id = $("#deleteHaulId").val();
		$.ajax({
			type: "GET",
			url: host +"/dadi/patent/delete",
			data: {
				id: id
			},
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			cache: false,
			success: function(res) {
				if(res && res.status == 1){
					initData()
					$("#delcfmOverhaul").modal("hide")
				}else{
                    util.showMsg(res.message)
                }
			},
			error: function(){
				
			}
		});
	}

	
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
							for(var i = 0;i < res.data.length;i++){
								res.data[i]._id = res.data[i].contract_name +"-"+ res.data[i].id;
							}
							$(".htn-list").html(searchListProduc(res.data));
						util.pageinator("htn-list-page", page, res.page.pageCount, searchHtList);
						}else{//创建
							$(".htn-list").html('<div class="ht-list-s"><p>查询无结果</p><a class="cjht" data-toggle="modal" data-target="#modal-createContract-produc">创建合同</a></div>');
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
	//合同详情选取
	$doc.on("click", ".htn-list input[name=ht-list]", function(){
		var checkbox = $(".htn-list input[name=ht-list]");
		let kkidTr = [];
		for (let i = 0; i < checkbox.length; i++) {
			var $this = checkbox[i];
			if($this.checked){
				let $tr =$this.parentNode.parentNode.cloneNode(true);
				kkidTr.push($tr)
			}
		}
		$(".htn-list-xq").html(kkidTr);
		$(".htn-list-xq input").remove()
	})
	$('#modal-choiceContracts-produc').on('hidden.bs.modal' ,function(e){
    	$("#ht-name").val('');
		$(".htn-list").html('');
		$(".qlnews-xuanqu").html('');
	});
	$doc.on("click", ".btn-xuanqu-z", function(){
		// if(util.isEmpty($RightNews.html())){
		// 	util.showMsg("请选取权利信息");
		// }else{			
			$('#modal-choiceContracts-produc').modal('hide');
			let id = $(".htn-list-xq tr").data("id");
			//$RightNews.html($(".qlnews-xuanqu").html());
			id = id.split("-");
			// console.log(id[1])
			 $box.val(id[0])
			let $name = $box.parents(".htname");
			$name.nextAll(".htid").val(id[1]);
			//console.log(kkid)
			// $.ajax({
			// 	type: "GET",
			// 	url: host +"/dadi/contract/findById",
			// 	data: {
			// 		id: id[1]
			// 	},				
			// 	dataType: "json",
			// 	cache: false,
			// 	contentType: "application/json;charset=UTF-8",
			// 	success: function(res) {
			// 		if(res && res.status == 1){
			// 			let data = res.data;
			// 			$box.val(data.contract.contract_name)
			// 			let $name = $box.parents(".htname");
			// 			$name.nextAll(".htid").val(data.contract.id);
			// 			$name.nextAll(".htbh").find("input").val(data.contract.contract_code);
			// 			$name.nextAll(".htje").find("input").val(data.contract.contract_amount);
			// 			$name.nextAll(".hrq").find("input").val(data.contract.effect_date);
			// 			$name.nextAll(".hrqend").find("input").val(data.contract.invalid_date);
			// 		}					
			// 	},
			// 	error: function(error){
			// 		util.showMsg("error")
			// 	}
			// });		
		//}		
	})
	//创建合同
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
		
		//提交
		if(util.isEmpty($contractNumVal)){
			util.showMsg("合同编号不能为空！")
			return
		}
		if(util.isEmpty($contractNameVal)){
			util.showMsg("合同名称不能为空！")
			return
		}
		if(util.isEmpty($contractMoneyVal)){
			util.showMsg("合同金额不能为空！")
			return
		}
		if(util.isEmpty($contractSigningTimeVal)){
			util.showMsg("签约日期不能为空！")
			return
		}
		
		let $tr1 = $("#contract-party-list tr");
		let sign_ids = [];
		for(let a = 0;a < $tr1.length;a++){
			sign_ids.push($tr1[a].id)
		}
		console.log(sign_ids)
		
		let $tr3 = $("#contract-appendices-list tr");
		let files = [];
		for(let c = 0;c < $tr3.length;c++){
			files.push($tr3[c].id)
		}
		console.log(files)
		let da = {
			contract_code: $contractNumVal,
			//contract_subject: $contractSubVal,
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
					let dataId = res.data.contract_name +"-"+ res.data.id;
											

					$(".htn-list-xq").html(searchListProduc([res.data]));
					$(".htn-list-xq input").remove();
					$(".htn-list-xq tr").attr("data-id", dataId)

					$('#modal-createContract-produc').modal('hide');
				}else{
					util.showMsg(res.message)
				}					
			},
			error: function(error){
				util.showMsg("error")
			}
		});	
	})	
	//附件
	let className;
	$doc.on("click", "#btn-added", function(){
		className = $(this).data("class");
		console.log(className)
		fileUpload()		
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
		$t.parents("tr").remove();
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
			if(util.isEmpty($modalContractPartyVal)){
				util.showMsg("签约方类型不能为空！")
				return
			}
			if(util.isEmpty($modalContractNameVal)){
				util.showMsg("签约方名称不能为空！")
				return
			}
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
		fun = de1;
	})
	function de1(){
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
	let $box;
	$doc.on("click", ".ht-name-add", function(){
		$('#modal-choiceContracts-produc').modal('show');
		$box = $(this);
	})
	$doc.on("click", ".btn-xz-qr", function(){
		let $this = $(this);
		let $qllxVal = $("#qllx").val(),
			$nameVal = $("#name").val(),
			$designerVal = $("#designer").val(),
			$numberVal = $("#number").val(),
			$patenVal = $("#paten").val(),
			$apply_dateVal = $("#apply_date input").val(),
			$notice_dateVal = $("#notice_date input").val(),
			$agencyVal = $("#agency").val(),
			$product_nameVal = $("#product_name").val(),
			$next_payment_timeVal = $("#next_payment_time").val(),
			$total_costVal = $("#total_cost").val(),
			$is_patentVal = $("#is_patent").val(),
			$projectVal = $("#project").val(),
			$authorize_unitVal = $("#authorize_unit").val(),
			$authorized_unitVal = $("#authorized_unit").val(),
			$authorize_typeVal = $("#authorize_type").val(),
			$term_of_validity_startVal = $("#term_of_validity_start input").val(),
			$term_of_validity_endVal = $("#term_of_validity_end input").val(),
			$authorized_yearsVal = $("#authorized_years").val(),
			$authorized_areaVal = $("#authorized_area").val(),
			$scope_of_authorizationVal = $("#scope_of_authorization").val(),
			$scope_of_operationVal = $("#scope_of_operation").val(),
			$authorized_amountVal = $("#authorized_amount").val(),
			$bzVal = $("#bz").val(),
			//$statusVal = $("#qlzt").val(),
			$certificate_number = $("#zs-nub").val(),
			$droit_sttus = $("#qlzt").val(),


			$contract_idVal = $("#mark_contract_id").val();

		if(util.isEmpty($certificate_number)){
			util.showMsg("证书号不能为空！")
			return
		}
		if(util.isEmpty($nameVal)){
			util.showMsg("专利名称不能为空！")
			return
		}
		if(util.isEmpty($designerVal)){
			util.showMsg("发明人/设计人不能为空！")
			return
		}
		if(util.isEmpty($numberVal)){
			util.showMsg("专利号不能为空！")
			return
		}
			// let $tr1 = $("#contract-party-list tr");
			// let sign_ids = [];
			// for(let a = 0;a < $tr1.length;a++){
			// 	sign_ids.push($tr1[a].id)
			// }
			// console.log(sign_ids)

			// let $tr2 = $(".qlnews-list tr");
			// let contract_id = [];
			// for(let b = 0;b < $tr2.length;b++){
			// 	contract_id.push($tr2[b].id)
			// }
			// console.log(contract_id)
			//$contract_idVal = $contract_idVal.split("-")
			
			let $tr3 = $("#manage-file tr");
			let files = [];
			for(let c = 0;c < $tr3.length;c++){
				files.push($tr3[c].id)
			}
			console.log(files)
			let da = {
				id: listId,
				droit_type: $qllxVal,
				//zsNub: $zsNubVal,
				name: $nameVal,
				designer: $designerVal,
				number: $numberVal,
				paten: $patenVal,
				apply_date: $apply_dateVal,
				notice_date: $notice_dateVal,
				agency: $agencyVal,
				product_name: $product_nameVal,
				next_payment_time: $next_payment_timeVal,
				total_cost: $total_costVal,
				is_patent: $is_patentVal,
				project: $projectVal,
				authorize_unit: $authorize_unitVal,
				authorized_unit: $authorized_unitVal,
				authorize_type: $authorize_typeVal,
				term_of_validity_start: $term_of_validity_startVal,
				term_of_validity_end: $term_of_validity_endVal,
				authorized_years: $authorized_yearsVal,
				authorized_area: $authorized_areaVal,
				scope_of_authorization: $scope_of_authorizationVal,
				scope_of_operation: $scope_of_operationVal,
				authorized_amount: $authorized_amountVal,
				bz: $bzVal,
				//status: $statusVal,
				certificate_number: $certificate_number,
				droit_sttus: $droit_sttus,

				contract_id: $contract_idVal,
				files: files
			}
			$.ajax({
				type: "POST",
				url: host +"/dadi/patent/update",
				data: JSON.stringify(da),				
				dataType: "json",
				cache: false,
				contentType: "application/json;charset=UTF-8",
				success: function(res) {
					if(res && res.status == 1){
						console.log(res)
						util.showMsg("提交成功！")

						$('#gengk-added').modal('hide');
						$(".qlnews-xuanqu").append($(".qlnews-list").html());
						$(".right-news input").remove();
						setTimeout(function(){
							location.reload();
						})
					}else{
						util.showMsg(res.message)
					}
				},
				error: function(error){
					util.showMsg("error")
				}
			});
	})
	$doc.on("click", ".btn-dile", function(){
		let id = $(this).attr("id")
		dile(id)
	})
}
function dile(id){
	$.ajax({
		type: "get",
		url: host +"/dadi/patent/findById",
		data: {
			id:id
		},				
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res && res.status == 1){
				var html = '',html1 = '',html2 = '';
				html += '<li><label>证书号</label><span>'+ res.data.certificate_number +'</span></li>'+
				'<li><label>权力状态</label><span>'+ res.data.droit_sttus +'</span></li>'+
				'<li><label>权利类型</label><span>'+ res.data.droit_type +'</span></li>'+
				'<li><label>专利名称</label><span>'+ res.data.name +'</span></li>'+
				'<li><label>发名称/设计人</label><span>'+ res.data.designer +'</span></li>'+
				'<li><label>专利号</label><span>'+ res.data.number +'</span></li>'+
				'<li><label>专利权人</label><span>'+ res.data.paten +'</span></li>'+
				'<li><label>专利申请日</label><span>'+ res.data.apply_date +'</span></li>'+
				'<li><label>授权公告日</label><span>'+ res.data.notice_date +'</span></li>'+
				'<li><label>代理机构</label><span>'+ res.data.agency +'</span></li>'+
				'<li><label>产品名称</label><span>'+ res.data.product_name +'</span></li>'+
				'<li><label>下次缴费时间</label><span>'+ res.data.next_payment_time +'</span></li>'+
				'<li><label>费用总额</label><span>'+ res.data.total_cost +'</span></li>';

				html1 += '<li><label>专利信息</label><span>'+ res.data.is_patent +'</span></li>'+
				'<li><label>专利号</label><span>'+ res.data.number +'</span></li>'+
				'<li><label>项目</label><span>'+ res.data.project +'</span></li>'+
				'<li><label>授权单位</label><span>'+ res.data.authorize_unit +'</span></li>'+
				'<li><label>被授权单位</label><span>'+ res.data.authorized_unit +'</span></li>'+
				'<li><label>授权形式</label><span>'+ res.data.authorize_type +'</span></li>'+
				'<li><label>有效期</label><span>'+ res.data.term_of_validity_end +'</span></li>'+
				'<li><label>授权范围</label><span>'+ res.data.scope_of_authorization +'</span></li>'+
				'<li><label>授权年限</label><span>'+ res.data.authorized_years +'</span></li>'+
				'<li><label>授权区域</label><span>'+ res.data.authorized_area +'</span></li>'+
				'<li><label>合同信息</label><span>'+ res.data.contract.contract_name +'</span></li>'+
				'<li><label>授权单位经营范围</label><span>'+ res.data.scope_of_operation +'</span></li>'+
				'<li><label>授权金额</label><span>'+ res.data.authorized_amount +'</span></li>'+
				//'<li><label>合同金额</label><span>'+ res.data.contract_id +'</span></li>'+
				'<li><label>备注信息</label><span>'+ res.data.bz +'</span></li>';

				for(var i = 0;i < res.data.fileobj.length;i++){
					var f = res.data.fileobj[i];
				   html2 += '<tr id="'+ f.id +'">'+
				   '	<td class=" click-pic" data-url="http://118.26.10.50:9999/file/'+ f.file_url +'">'+ f.file_name +'</td>'+
				   '	<td>'+ f.file_type +'</td>'+
				   '	<td>'+ f.file_size +'</td>'+
				   '	<td>'+ f.create_time +'</td>'+
				   '	<td>'+ f.creater +'</td>'+
				   '</tr>';
				}
				$(".ul-01").html(html);
				$(".ul-02").html(html1);
				$(".ul-03").html(html2);
				$("#modal-details-look").modal("show")
			}else{
				util.showMsg(res.message)
			}					
		},
		error: function(error){
			util.showMsg("error")
		}
	});		
}
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
function showArr(name){
    let obj = document.getElementsByName(name) || "";
    let check_val = '';
    for(let k in obj){
        if(obj[k].checked)
		check_val = check_val + obj[k].value + ",";
    }
    return check_val.slice(0,-1);
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
function init(){
	initData();
	bindEvents();
}
init();