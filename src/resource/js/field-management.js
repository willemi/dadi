import '../css/trademark-management.scss';

const util = require("./common/util.js")
const trademarkList = require('../tpl/item-trademark-list.tpl')
const fieldList = require('../tpl/item-field-list.1.tpl');
const itemSearchListLook3Tpl = require('../tpl/item-look-xuanqu.3.tpl');
const itemSearchListTpl = require('../tpl/item-search-list.tpl');
const searchListProduc = require('../tpl/item-search-list-produc.tpl');
const itemSearchListLookTpl = require('../tpl/item-look-xuanqu.tpl');
const itemSearchListLook1Tpl = require('../tpl/item-look-xuanqu.1.tpl');
const itemSearchListLook2Tpl = require('../tpl/item-look-xuanqu.2.tpl');
const qianyuetTpl = require('../tpl/item-qianyue-list.tpl');

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
		url: host +"/dadi/realmname/list",
		data: {
			pageNum: page,
			pageSize: 10
		},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res.status == 1){
				for(var i = 0;i < res.data.length;i++){
					res.data[i].page = (page-1) * 10 + (i+1);
				}
				$(".management-list").html(fieldList(res.data));
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
		url: host +"/dadi/realmname/findById",
		data: {
			id: listId
		},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res.status == 1){
				console.log(res)
				$("#contract_id").val(res.data.realmname.contract_name);
				$("#mark_contract_id").val(res.data.realmname.contract_id);
				$("#realmname_address").val(res.data.realmname.realmname_address);
				$("#owner").val(res.data.realmname.owner);
				$("#owner_email").val(res.data.realmname.owner_email);
				$("#registrar").val(res.data.realmname.registrar);
				$("#regist_date input").val(res.data.realmname.regist_date);
				$("#end_date input").val(res.data.realmname.end_date);
				$("#cost").val(res.data.realmname.cost);
				$("#realm_status").val(res.data.realmname.realm_status);
				$("#dns_server").val(res.data.realmname.dns_server);
				$("#remarks").val(res.data.realmname.remarks);
				let html = '';
				for(var i = 0;i < res.data.fileobj.length;i++){
					var f = res.data.fileobj[i];
				   html += '<tr id="'+ f.id +'">'+
				   '	<td class=" click-pic" data-url="'+ window.fileUrl(f.file_url) +'">'+ f.file_name +'</td>'+
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
//币种
initpid(57, $("#currency1"))
//域名状态
initpid(102, $("#realm_status"))
$("#gengk-added").on("hidden.bs.modal", function() {
	// $(this).removeData("bs.modal");
	$("input, textarea").val('')
	$("#manage-file").html('')
 });
//默认展示列表
function bindEvents(){
	var $doc = $(document);
	$doc.on("click", ".reset-01", function(){
		$("input, textarea").val('')
		$("#manage-file").html('')
	})
	$doc.on("click", ".btn-xgg", function(){
		listId = $(this).parents("td").attr("id");
		xgData();
		$("#gengk-added").modal("show")
	})

	util.timepicker("regist_date");
	util.timepicker("end_date");

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
			type: "get",
			url: host +"/dadi/realmname/delete",
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
	
	$doc.on("click", ".btn-xz-qr", function(){
		let $this = $(this);
		let $contract_idVal = $("#mark_contract_id").val(),
			$realmname_addressVal = $("#realmname_address").val(),
			$ownerVal = $("#owner").val(),
			$owner_emailVal = $("#owner_email").val(),
			$registrarVal = $("#registrar").val(),
			$regist_dateVal = $("#regist_date input").val(),
			$end_dateVal = $("#end_date input").val(),
			$costVal = $("#cost").val(),
			$realm_statusVal = $("#realm_status").val(),
			$dns_serverVal = $("#dns_server").val(),
			$remarksVal = $("#remarks").val();

		if(util.isEmpty($realmname_addressVal)){
			util.showMsg("域名地址不能为空！")
			return
		}
		if(util.isEmpty($ownerVal)){
			util.showMsg("所有者不能为空！")
			return
		}
				
			let $tr3 = $("#manage-file tr");
			let files = [];
			for(let c = 0;c < $tr3.length;c++){
				files.push($tr3[c].id)
			}
			console.log(files)
			//$contract_idVal = $contract_idVal.split("-")
			let da = {
				id: listId,
				contract_id: $contract_idVal,
				realmname_address: $realmname_addressVal,
				owner: $ownerVal,
				owner_email: $owner_emailVal,
				registrar: $registrarVal,
				regist_date: $regist_dateVal,
				end_date: $end_dateVal,
				cost: $costVal,
				realm_status: $realm_statusVal,
				dns_server: $dns_serverVal,
				remarks: $remarksVal,

				files: files
			}
			$.ajax({
				type: "POST",
				url: host +"/dadi/realmname/update",
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
	//选择合同
	//搜索
	let NameVal;
	$doc.on("click", ".btn-ht", function(){
		NameVal = $("#ht-name").val();		
		searchHtList(1)
		
	})
	let type = 1;
	$doc.on("change", "#name-type", function(){
		type = $(this).val()
	})
	function searchHtList(page){
		page = page || 1;
			$.ajax({
				type: "GET",
				url: host +"/dadi/contract/list",
				data: {
					type:type,
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
			$contractYesTimeVal = $("#contract-yes-time input").val(),
			$contractPaymentPlanVal = $("#contract-payment-plan").val(),
			$contractPaymentMethodVal = $("#contract-payment-method").val(),
			$contractNotesVal = $("#contract-notes").val(),
			$currency1 = $("#currency").val(),
			$contractPartyPistHtml = $("#contract-party-list").html();
		
		//提交
		let $contractAppendicesListtHtml = $("#contract-appendices-list").html();
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
			currency: $currency1,
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
	$doc.on("click", ".btn-dile", function(){
		let id = $(this).attr("id")
		dile(id)
	})
}
function dile(id){
	$.ajax({
		type: "get",
		url: host +"/dadi/realmname/findById",
		data: {
			id:id
		},				
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res && res.status == 1){
				var html='',html1='';
				html += '<li><label>合同名称</label><span>'+ res.data.realmname.contract_name +'</span></li>'+
				'<li><label>合同金额</label><span>'+ res.data.realmname.contract_amount +'</span></li>'+
				'<li><label>域名地址</label><span>'+ res.data.realmname.realmname_address +'</span></li>'+
				'<li><label>所有者</label><span>'+ res.data.realmname.owner +'</span></li>'+
				'<li><label>所有者邮箱</label><span>'+ res.data.realmname.owner_email +'</span></li>'+
				'<li><label>注册商</label><span>'+ res.data.realmname.registrar +'</span></li>'+
				'<li><label>注册日期</label><span>'+ res.data.realmname.regist_date +'</span></li>'+
				'<li><label>到期日期</label><span>'+ res.data.realmname.end_date +'</span></li>'+
				'<li><label>费用</label><span>'+ res.data.realmname.cost +'</span></li>'+
				'<li><label>域名状态</label><span>'+ res.data.realmname.realm_status +'</span></li>'+
				'<li><label>DNS服务器</label><span>'+ res.data.realmname.dns_server +'</span></li>'+
				'<li><label>备注</label><span>'+ res.data.realmname.remarks +'</span></li>';

				for(var i = 0;i < res.data.fileobj.length;i++){
					var f = res.data.fileobj[i];
				   html1 += '<tr id="'+ f.id +'">'+
				   '	<td class=" click-pic" data-url="'+ window.fileUrl(f.file_url) +'">'+ f.file_name +'</td>'+
				   '	<td>'+ f.file_type +'</td>'+
				   '	<td>'+ f.file_size +'</td>'+
				   '	<td>'+ f.create_time +'</td>'+
				   '	<td>'+ f.creater +'</td>'+
				   '</tr>';
				}
				$(".ul-01").html(html);
				$(".ul-02").html(html1);
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