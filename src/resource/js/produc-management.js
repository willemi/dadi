import '../css/produc-management.scss';

const util = require("./common/util.js")

const producListTpl = require('../tpl/item-produc-list.tpl');
const worksSearchList = require('../tpl/item-works-search-list.tpl');
const searchListProduc = require('../tpl/item-search-list-produc.tpl');
const itemSearchListLookTpl = require('../tpl/item-look-xuanqu.tpl');
const itemSearchListLook1Tpl = require('../tpl/item-look-xuanqu.1.tpl');
const itemSearchListLook2Tpl = require('../tpl/item-look-xuanqu.2.tpl');
const itemSearchListLook3Tpl = require('../tpl/item-look-xuanqu.3.tpl');
const qianyuetTpl = require('../tpl/item-qianyue-list.tpl');
const producDatilsCpTpl = require('../tpl/item-produc-datils-cp.tpl');
const producDatilsCpzpTpl = require('../tpl/item-produc-datils-cp-zp.tpl');
const itemProducHtTpl = require('../tpl/item-produc-ht.tpl');
const itemProducHt1Tpl = require('../tpl/item-produc-ht.1.tpl');
const detailsFjianTpl = require('../tpl/item-details-fjian.tpl');

const detailsJicTpl = require('../tpl/item-details-jic.tpl');
const detailsListTpl = require('../tpl/item-details-list.tpl');
const detailsQlnewsTpl = require('../tpl/item-details-qlnews.tpl');
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
let c = window._user_name && window._user_name.account || '';
window.showXg = function(state,status){
	if(status != 1 && state == c){
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
let worksId;
let $cont1 = $(".content-01"),
	$cont2 = $(".content-02");


var vId =  util.GetQueryString("id");
if(vId){
	xiugai(vId)
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
//默认展示列表
let workslistPage = 1;
function workslist(page){
	page = page || 1;
	$.ajax({
		type: "GET",
		url: host +"/dadi/product/list",
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
					res.data[i].page = (page-1) * 10;
				}
				$(".produc-list").html(producListTpl(res.data));
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

// 打开询问是否删除的模态框并设置需要删除的大修的ID
let fun;
// 删除大修模态框的确定按钮的点击事件
$("#deleteHaulBtn").click(function() {
	// ajax异步删除
	fun()
});	

let $stepa = $(".stepa li");
let $step = $(".step li");
let cpnews = {}
function xiugai(id){
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
				var product = data.product
				worksId = product.id;
				$cont1.hide();
				$cont2.show();
				let dr = [];
				for(var z = 0;z < data.droit.length;z++){
					if(data.droit[z]){
						dr.push(data.droit[z]);
					}
				}
				$("#modal-right-info-numb").val(product.product_code);
				$("#modal-right-info-name").val(product.product_name);
				$("#modal-right-info-type").val(product.product_type);
				$("#modal-right-start-time input").val(product.publish_date);
				$("#modal-right-info-cpz").val(product.product_cycle);
				$("#modal-right-info-cpm").val(product.product_amount);
				$("#modal-right-info-jigou").val(product.register_institution);
				$("#modal-right-dj-time input").val(product.register_date);
				$("#modal-right-info-s").val(product.shou_quan_ren);
				 $("#modal-right-info-sqr").val(product.bei_shou_quan_ren);
				 $("#modal-right-info-sqp").val(dr[0].droit_propor);
				 $("#modal-right-info-sqm").val(dr[0].droit_price);
					
				 $("input[name='limit1'][value='"+product.product_xingtai+"']").prop("checked",true);
				 var str = dr[0].ishave_contract;
				 $(str.split(",")).each(function (i,e){
					 $("input[name='mode0'][value='"+e+"']").prop("checked",true);
				 });

				 $("#modal-right-info-qldesc").val(dr[0].droit_content);

				 $("input[name='limit3'][value='"+dr[0].droit_mode+"']").prop("checked",true);
				 $("input[name='region'][value='"+dr[0].sqxk_sydy+"']").prop("checked",true);
				 $("input[name='language'][value='"+dr[0].sqxk_syyy+"']").prop("checked",true);
				 $("input[name='limit4'][value='"+dr[0].is_deleg+"']").prop("checked",true);
				 $("input[name='limit'][value='"+dr[0].is_wripr+"']").prop("checked",true);
				 $("input[name='mode'][value='"+dr[0].sqxk_syqd+"']").prop("checked",true);

				 $("#modal-right-info-f").val(dr[0].sqxk_sycs);
				 $("#modal-right-info-desc").val(dr[0].htql_ms);
				 $("#modal-right-info-remarks").val(dr[0].droit_des);

				$("#datetimeStart").val(product.droit_startime);
				$("#datetimeEnd").val(product.droit_endtime);

					
				//作品
				$(".yy-list").html(producDatilsCpzpTpl(data.opus))
				let $tr = $(".yy-list tr");
				var htmla = '<td class="h"><button type="button" class="btn btn-default btn-upload-dele">删除</button></td>'
				for(var i = 0;i < $tr.length;i++){
					if($tr[i].className == "bto"){
					}else{
						$(htmla).appendTo($tr[i])
						$tr[i].className = "bto";
					}					
				}
				$(".yy-list .xh").remove();
				$(".yy-list input").hide();
				//产品
				product.opus_name = product.product_name
				product.opus_type = product.product_type
				product.new_shouquanren = product.shou_quan_ren
				product.new_beishouquanren = product.bei_shou_quan_ren
				product.ishave_contract = dr[0].ishave_contract
				product.droit_startime = dr[0].droit_startime
				product.droit_mode = dr[0].droit_mode
				product.sqxk_sydy = dr[0].sqxk_sydy
				product.sqxk_syyy = dr[0].sqxk_syyy
				product.is_deleg = dr[0].is_deleg
				product.is_wripr = dr[0].is_wripr
				product.sqxk_syqd = dr[0].sqxk_syqd
				product.sqxk_sycs = dr[0].sqxk_sycs
				product.droit_endtime = dr[0].droit_endtime
				product.sqxk_ksrq = dr[0].droit_startime
				$(".news-list").html(worksSearchList([product]))
				let $tr1 = $(".news-list tr");
				for(var i = 0;i < $tr1.length;i++){
					if($tr1[i].className == "bto"){
					}else{
						$(htmla).appendTo($tr1[i])
						$tr1[i].className = "bto";
					}	
				}
				$(".news-list input").hide();
				// //合同
				// contract
				$(".hl-ht-list").html(itemProducHt1Tpl(data.contract));
				$(".hl-ht-list .xh").remove();
				// //附件
				let html = '';
				for(var j = 0; j <data.fileobj.length;j++){
					var a = data.fileobj[j]
					
					//if("png.jpg.bmp,jpe,jpeg,gif".indexOf(a.file_type) > -1){
					html += '<tr id="'+ a.id +'"><td class="file-click click-pic" data-url="'+ host +'/file/'+ a.file_url +'">'+ a.file_name +'</td>';
					//}
					
					html +=	'	<td>'+ a.file_type +'</td>'+
							'	<td>'+ a.file_size +'</td>'+
							'	<td>'+ a.create_time +'</td>'+
							'	<td>'+ a.creater +'</td>'+
							//'	<td>'+ a.file_type +'</td>'+
							'	<td><button type="button" class="btn btn-default btn-upload-dele">删除</button></td>'+
							'</tr>';
				}
				console.log(html)
				$("#produc-fj-list").html(html);
				cpnews = {
					droit_startime:product.droit_startime,
					droit_endtime: product.droit_endtime,
					product_code: product.product_code,
					product_name: product.product_name,
					product_type: product.product_type,
					publish_date: product.publish_date,
					product_cycle: product.product_cycle,
					product_amount: product.product_amount,
					register_institution: product.register_institution,
					register_date: product.register_date,
					product_xingtai: product.product_xingtai,
					shou_quan_ren: product.shou_quan_ren,
					bei_shou_quan_ren: product.bei_shou_quan_ren
				}
			}else{
				util.showMsg(res.message)
			}
		}
	})
}
function bindEvents(){
	var $doc = $(document);
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
		let id = $(this).parent("td").attr("id");
		xiugai(id)
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
					let dra = [];
					for(var i = 0;i < data.droit.length;i++){
						if(data.droit[i]){
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
							dra.push(data.droit[i])
						}
						
					}
					for(var i = 0;i < data.opus.length;i++){
						data.opus[i].droit_startime = data.opus[i].droit_startime || data.opus[i].sqxk_ksrq;
						data.opus[i].droit_mode = data.opus[i].droit_mode || data.droitoldList[i].droit_mode;
					}
					data.opus && $(".details-list-a").html(producDatilsCpzpTpl(data.opus));
					//$(".details-list-b").html(producDatilsCpTpl([data.product]));
					data.droit && $(".details-list-b").html(producDatilsCpTpl(dra));
					data.contract && $(".details-list-c").html(itemProducHtTpl(data.contract));
					data.fileobj && $(".details-fjian").html(detailsFjianTpl(data.fileobj));
					$("#check_remark").text(data.product.check_remark)
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
	
	util.timepicker("modal-right-start-time");
	util.timepicker("modal-right-dj-time");

	util.timepicker("contract-signing-time");
	util.timepicker("contract-take-time");
	util.timepicker("contract-invalid-time");
	// util.timepicker("contract-yes-time");

	util.timepickerSection("datetimeStart", "datetimeEnd");	

	//新增
	
	$doc.on("click", ".btn-adda", function(){
		$cont1.hide();
		$cont2.show();
	})
	// $doc.on("click", ".pre-stepa", function(){
	// 	let $this = $(this);
	// 	preBtn($this, $stepa);
	// })
	$doc.on("click", ".pre-step", function(){
		let $this = $(this);
		preBtn($this, $step);
	})
	// //下一步\提交
	//作品下一步\提交	
	let $step = $(".step li");
	$doc.on("click", ".next-step", function(){		
		var $this = $(this);
		
		if($this.hasClass("next-step-01")){
			//第一步			
			if(util.isEmpty($(".yy-list").html()) || util.isEmpty($(".news-list").html())){
				util.showMsg("产品资源信息不能为空！")
			}else{
				nextBtn($this, $step);
			}
			// nextBtn($this, $step);		
		}else{
			//提交
			let $enclosureListHtml = $(".hl-ht-list").html();
			if(util.isEmpty($enclosureListHtml)){
				util.showMsg("产品合同信息不能为空！")
			}else{
				let $tr1 = $(".news-list tr");
				let droit_ids = [];
				for(let a = 0;a < $tr1.length;a++){
					droit_ids.push($tr1[a].id)
				}
				console.log(droit_ids)

				let $tr2 = $(".yy-list tr");
				let dro = [],droold=[];
				for(let b = 0;b < $tr2.length;b++){
					dro.push($tr2[b].id)
					droold.push($tr2[b].getAttribute("data-qid"))
				}
				var droit_olds = droold.distinct(); 
				var opus_ids = dro.distinct(); 
				console.log(opus_ids,droit_olds)
				
				let $tr3 = $("#produc-fj-list tr");
				let files = [];
				for(let c = 0;c < $tr3.length;c++){
					files.push($tr3[c].id)
				}
				console.log(files)

				let $tr4 = $(".hl-ht-list tr");
				let dro1 = [];
				for(let d = 0;d < $tr4.length;d++){
					dro1.push($tr4[d].id)
				}
				var contract_ids = dro1.distinct(); 
				console.log(contract_ids)

				console.log(cpnews)
				let da = {
					id: worksId,
					product_code: cpnews.product_code,
					product_name: cpnews.product_name,
					product_type: cpnews.product_type,
					publish_date: cpnews.publish_date,
					product_cycle: cpnews.product_cycle,
					product_amount: cpnews.product_amount,
					register_institution: cpnews.register_institution,
					product_xingtai: cpnews.product_xingtai,
					shou_quan_ren: cpnews.shou_quan_ren,
					bei_shou_quan_ren: cpnews.bei_shou_quan_ren,
					register_date: cpnews.register_date,

					droit_startime:cpnews.droit_startime,
					droit_endtime: cpnews.droit_endtime,
					
					droit_olds:droit_olds,
					contract_ids: contract_ids,
					droit_ids: droit_ids,
					opus_ids: opus_ids,
					files: files
				}
				console.log(da)
				$.ajax({
					type: "POST",
					url: host +"/dadi/product/update",
					data: JSON.stringify(da),				
					dataType: "json",
					cache: false,
					contentType: "application/json;charset=UTF-8",
					success: function(res) {
						if(res && res.status == 1){
							console.log(res)
							util.showMsg("提交成功！")
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
			}
		}
	})
	
	//引用原始库作品
	$doc.on("click", ".btn-index", function(){
		let c = copy();	
		if(util.isEmpty(c)){
			util.showMsg("请选取信息");
		}else{
			$('#modal-referenceWorks').modal('hide');
			$(".yy-list").append(c);
			let $tr = $(".yy-list tr");
			var htmla = '<td class="h"><button type="button" class="btn btn-default btn-upload-dele">删除</button></td>'
			for(var i = 0;i < $tr.length;i++){
				if($tr[i].className == "bto"){
				}else{
					$(htmla).appendTo($tr[i])
					$tr[i].className = "bto";
				}	
			}
			//listHtml = '';
			$("#workName").val("");
			$(".work-search-list").html("")
		}
		$(".yy-list input").hide();

		//$('#modal-referenceWorks').modal('hide');
		//$(".tr-hide").show();
		//$(".bnt-yy").removeClass("btn-default").addClass("btn-primary").attr("data-toggle", "modal").attr("data-target", "#modal-newly-added2")

	})
	let $t;
	$doc.on("click", ".btn-del", function(){
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
	//创建产品信息
	$doc.on("click", ".bnt-yy", function(){
		if(util.isEmpty($(".yy-list").html())){
			util.showMsg("请引用原始库内作品");
		}else{
			$(".add-n-list").html($(".yy-list").html());//listHtml
			$(".add-n-list input").show();
			$(".add-n-list .h").hide();
			$('#modal-newly-added2').modal('show');
		}
	})
	let zpNmaeVal;
	$doc.on("click", ".btn-yuans", function(){
		zpNmaeVal = $("#workName").val();
		// if(util.isEmpty(nameVal)){
		// 	util.showMsg("不能为空！")
		// }else{			
			workslistName()
		//}
	})
	function workslistName(page){
		page = page || 1;
		var data = {
			opus_name: zpNmaeVal,
			pageNum: page,
			pageSize: 10
		}
		$.ajax({
			type: "GET",
			url: host +"/dadi/opus/listByName",
			data: data,
			dataType: "json",
			cache: false,
			contentType: "application/json;charset=UTF-8",
			success: function(res) {
				if(res.status == 1 ){
					if(res.data && res.data.length > 0){
						$(".work-search-list").html(worksSearchList(res.data))
						util.pageinator("pageLimit-Indexes", page, res.page.pageCount, workslistName);
					}else{
						util.showMsg("无数据")
					}
				}else{
                    util.showMsg(res.message)
                }			
			},
			error: function(){			
			}
		});		
	}
	//创建产品信息
	
	$doc.on("click", ".btn-news", function(){
		let $modalRightInfoNumbVal = $("#modal-right-info-numb").val(),
			$modalRightInfoNameVal = $("#modal-right-info-name").val(),
			$modalRightInfoTypeVal = $("#modal-right-info-type").val(),
			$modalRightStartTimeVal = $("#modal-right-start-time input").val(),
			$modalRightInfoCpzVal = $("#modal-right-info-cpz").val(),
			$modalRightInfoCpmVal = $("#modal-right-info-cpm").val(),
			$modalRightInfoJigouVal = $("#modal-right-info-jigou").val(),
			$modalRightDjTimeVal = $("#modal-right-dj-time input").val(),
			$modalRightInfoSVal = $("#modal-right-info-s").val(),
			$modalRightInfoSqrVal = $("#modal-right-info-sqr").val(),
			$limit1Val = $("input[name='limit1']:checked").val(),

			$datetimeStartVal = $("#datetimeStart").val(),
			$datetimeEndVal = $("#datetimeEnd").val();
		
		if( util.isEmpty($modalRightInfoNumbVal)){
			util.showMsg("产品编号不能为空");
			return;
		}
		if(util.isEmpty($modalRightInfoNameVal)){
			util.showMsg("产品名称不能为空");
			return;
		}
		if(util.isEmpty($modalRightInfoTypeVal)){
			util.showMsg("产品类型不能为空");
			return;
		}
		if(util.isEmpty($modalRightInfoSVal)){
			util.showMsg("授权人不能为空");
			return;
		}
		if(util.isEmpty($modalRightInfoSqrVal)){
			util.showMsg("被授权人不能为空");
			return;
		}
		
			let c = $("#xzql-list").html();	
			cpnews = {
				droit_startime: $datetimeStartVal,
				droit_endtime: $datetimeEndVal,
				product_code: $modalRightInfoNumbVal,
				product_name: $modalRightInfoNameVal,
				product_type: $modalRightInfoTypeVal,
				publish_date: $modalRightStartTimeVal,
				product_cycle: $modalRightInfoCpzVal,
				product_amount: $modalRightInfoCpmVal,
				register_institution: $modalRightInfoJigouVal,
				register_date: $modalRightDjTimeVal,
				product_xingtai: $limit1Val,
				shou_quan_ren: $modalRightInfoSVal,
				bei_shou_quan_ren: $modalRightInfoSqrVal
			}
			$('#modal-newly-added2').modal('hide');
			$(".news-list").append(c);
			var htmla = '<td class="h"><button type="button" class="btn btn-default btn-upload-dele">删除</button></td>'
			let $tr1 = $(".news-list tr");
			for(var i = 0;i < $tr1.length;i++){
				if($tr1[i].classList.contains('bto')==true){
				}else{
					$(htmla).appendTo($tr1[i])
					$tr1[i].className += "bto";
				}	
			}
			document.getElementById("add-form").reset();
			$(".add-n-list").html("")
			$("#xzql-list").html('')
			
		$(".news-list input").remove();
	})
	//生成权利
	$doc.on("click", ".btn-scql", function(){
		let $modalRightInfoSVal = $("#modal-right-info-s").val(),
			$modalRightInfoSqrVal = $("#modal-right-info-sqr").val(),
			$modalRightInfoSqpVal = $("#modal-right-info-sqp").val(),

			$modalRightInfoNameVal = $("#modal-right-info-name").val(),
			$modalRightInfoTypeVal = $("#modal-right-info-type").val(),
			
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
			mode0 = $("input[name='mode0']:checked").val(),
			language = $("input[name='language']:checked").val(),
			region = $("input[name='region']:checked").val(),
			mode = $("input[name='mode']:checked").val();
			// language = showArr("language"),
			// mode = showArr("mode");
		if(util.isEmpty($modalRightInfoRemarks) || util.isEmpty($modalRightInfoSVal) || util.isEmpty($modalRightInfoSqrVal) || util.isEmpty($modalRightInfoSqpVal) || util.isEmpty($modalRightInfoSqmVal) || util.isEmpty($modalRightInfoQldescVal) || util.isEmpty($datetimeStartVal) || util.isEmpty($datetimeEndVal) || util.isEmpty($modalRightInfoDescVal) || util.isEmpty($modalRightInfoFVal) || util.isEmpty($limitVal) || util.isEmpty($limit1Val) || util.isEmpty($limit3Val) || util.isEmpty($limit4Val) || util.isEmpty(mode0) || util.isEmpty(language) || util.isEmpty(mode)){
			util.showMsg("权利信息新增不能为空！")
			return
		}else{
			let data = {
				droit_subject: $modalRightInfoSVal,
				bdroit_per: $modalRightInfoSqrVal,
				droit_propor: $modalRightInfoSqpVal,
				droit_price: $modalRightInfoSqmVal,
				is_propri: $limit1Val,
				ishave_contract: mode0,
				droit_content: $modalRightInfoQldescVal,
				droit_startime: $datetimeStartVal,
				droit_endtime: $datetimeEndVal,
				droit_mode: $limit3Val,
				sqxk_syyy: language,
				is_deleg: $limit4Val,
				is_wripr: $limitVal,
				sqxk_syqd: mode,
				sqxk_sydy: region,
				sqxk_sycs: $modalRightInfoFVal,
				htql_ms: $modalRightInfoDescVal,
				droit_des: $modalRightInfoRemarks
			}
			$.ajax({
				type: "POST",
				url: host +"/dadi/droit/update",
				data: JSON.stringify(data),
				dataType: "json",
				cache: false,
				contentType: "application/json;charset=UTF-8",
				success: function(res) {				
					if(res && res.status == 1){
						res.data.new_shouquanren = res.data.droit_subject
						res.data.new_beishouquanren = res.data.bdroit_per

						res.data.opus_name = $modalRightInfoNameVal
						res.data.opus_type = $modalRightInfoTypeVal

						res.data.sqxk_ksrq = res.data.droit_startime
						$("#xzql-list").append(worksSearchList([res.data]))
						$(".xzql-list").show();
						//$(".btn-news").addClass("modal-right-info-btn")
						
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
	
	//附件
	let className;
	$doc.on("click", "#btn-added, #btn-added-produc", function(){
		className = $(this).data("class");
		console.log(className)
		fileUpload()
		
		// if(className == "enclosure-list"){//作品附件
		// 	classNa 
		// }else{
		// 	//合同附件

		// }
		
	})
	//批量选取id
	function getAllids(checkbox){
		var id = "";
		for ( var i = 0; i < checkbox.length; i++) {
			var $this = checkbox[i];
			if($this.checked){
				//id = id + $this.value + ",";
				id = id + $this.getAttribute("data-qid") + ",";
			}
		}
		return id.slice(0,-1);
	}
	function getValue(checkbox, $val){
		for ( var i = 0; i < checkbox.length; i++) {
			var $this = checkbox[i];
			if($this.value == $val){
				$this.checked = true
			}
		}
	}
	$doc.on("click", ".add-n-list input[name=work-list]", function(){
		var checkbox = $(".add-n-list input[name=work-list]");		
		let id = getAllids(checkbox);
		console.log(id)
		//id = parseInt(id);
		$.ajax({
			type: "GET",
			url: host +"/dadi/droit/generateDroit",
			data: {
				droits: id
			},
			dataType: "json",
			cache: false,
			contentType: "application/json;charset=UTF-8",
			success: function(res) {
				if(res && res.status == 1){
					var data = res.data;
					//授权权利
					if(data.ishave_contract){
						getValue($("input[name=mode0]"), data.ishave_contract)
					}
					//授权方式
					if(data.droit_mode){
						getValue($("input[name=limit3]"), data.droit_mode)
					}
					//授权地域
					if(data.sqxk_sydy){
						getValue($("input[name=region]"), data.sqxk_sydy)
					}
					//授权语言
					if(data.sqxk_syyy){
						getValue($("input[name=language]"), data.sqxk_syyy)
					}
					//是否可以转授权
					if(data.is_deleg){
						getValue($("input[name=limit4]"), data.is_deleg)
					}
					//是否有维权权利
					if(data.is_wripr){
						getValue($("input[name=limit]"), data.is_wripr)
					}
					//使用渠道限制
					if(data.sqxk_syqd){
						getValue($("input[name=mode]"), data.sqxk_syqd)
					}
					//授权开始时间
					if(data.droit_startime){
						$("#datetimeStart").val(data.droit_startime);
					}
					//授权结束时间
					if(data.droit_endtime){
						$("#datetimeEnd").val(data.droit_endtime);
					}
					//许可使用次数
					if(data.sqxk_sycs){
						$("#modal-right-info-f").val(data.sqxk_sycs);
					}
					//授权比例
					if(data.droit_propor){
						$("#modal-right-info-sqp").val(data.droit_propor);
					}
					//授权价格
					if(data.droit_price){
						$("#modal-right-info-sqm").val(data.droit_price);
					}
				}else{
                    util.showMsg(res.message)
                }
			}
		})
	})
	$doc.on("click", ".btn-upload-dele", function(){
		$t = $(this);
		$("#delcfmOverhaul").modal({
			backdrop : 'static',
			keyboard : false
		});
		fun = deleteT;
	})
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
						let sho = '';						
						html += '<tr id="'+ res.data.id +'">';
						//if("png.jpg.bmp,jpe,jpeg,gif".indexOf(res.data.file_type) > -1){
							html += '<td class="file-click click-pic" data-url="'+ host +'/file/'+ res.data.file_url +'">'+ res.data.file_name +'</td>';
						//}
						
						html +=	'	<td>'+ res.data.file_type +'</td>'+
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

	// $doc.on("click", ".click-pic", function(){
	// 	let url = $(this).data("url");
	// 	$("#iframe").attr("src", url);
	// 	$(".iframe").show();
	// })
	// $doc.on("click", ".i-cloe", function(){
	// 	$("#iframe").attr("src", "");
	// 	$(".iframe").hide();
	// })
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
		$(".hl-ht-list").append($(".htn-list-xq").html());
		let $tr = $(".hl-ht-list tr");
		var htmla = '<td class="h"><button type="button" class="btn btn-default btn-upload-dele">删除</button></td>'
		for(var i = 0;i < $tr.length;i++){
			if($tr[i].className == "bto"){
			}else{
				$(htmla).appendTo($tr[i])
				$tr[i].className = "bto";
			}	
		}
		$('#modal-choiceContracts-produc').modal('hide');
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
		fun = qdele;
	})
	function qdele(){
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
					$(".htn-list-xq").html(searchListProduc([res.data]));
					$(".htn-list-xq input").remove();

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


function copy(){
	let listHtml = '';
	var checkbox = $("input[name=work-list]");
	let id,_id,qid;
	for (let i = 0; i < checkbox.length; i++) {
		var $this = checkbox[i];
		if($this.checked){
			id = $this.value;
			_id = $this.className;
			qid = $this.getAttribute("data-qid");
			//kkid.push(id)
			listHtml += '<tr class="f_'+ id +'" id="'+ id +'" data-id="'+ _id +'" data-qid="'+ qid +'">'+ $(".t_"+ id).html() +'</tr>';
		}
	}
	return listHtml;
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

// 导出文件
$("#exportProducBtn").click(function() {
    window.location.href=host+"/dadi/product/list/export"
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
function tatbInit($id, $main){
	return true;
}



function init(){
	workslist();
	bindEvents();
}
init();