import '../css/system-right.scss';

const util = require("./common/util.js")
let qizId, qlzNmae, droit_g_id;
let qizzId;
let fun;
// 删除大修模态框的确定按钮的点击事件
$("#deleteHaulBtn").click(function() {
	// ajax异步删除
	fun()
})
function bindEvents(){
    var $doc = $(document);
	$doc.on("click", ".btn-List-qr", function(){
		let name = $("#name").val(),
			bz = $("#bz").val();
		if(util.isEmpty(name) || util.isEmpty(bz)){
			util.showMsg("不能为空")
		}else{
			let data = {
				name: name,
				bz: bz,
				id: qizId
			}
			qlzFun(data)
		}
	})
	$doc.on("click", ".btn-ht", function(){
		qlzNmae = $("#ht-name").val();		
		qlzinit()
	})
	$doc.on("click", "input[name='qlz']", function(){
		droit_g_id = $("input[name='qlz']:checked").val();	
		qlzqlinit()		
	})
	$doc.on("click", ".btn1-edit", function(){
		qizId = $("input[name='qlz']:checked").val();	
		let name = $("input[name='qlz']:checked")[0].dataset.name,
		bz = $("input[name='qlz']:checked")[0].dataset.bz;
		$("#name").val(name);
		$("#bz").val(bz);			
	})
	$doc.on("click", ".btn1-del", function(){
		qizId = $("input[name='qlz']:checked").val();
		$("#deleteHaulId").val(qizId);// 将模态框中需要删除的大修的ID设为需要删除的ID
		$("#delcfmOverhaul").modal({
			backdrop : 'static',
			keyboard : false
		});
		fun = qdele;
	})

	$doc.on("click", ".btn2-edit", function(){
		qizzId = $("input[name='qlzz']:checked").val();
		xg(qizzId)
	})
	$doc.on("click", ".btn2-del", function(){
		qizzId = $("input[name='qlzz']:checked").val();
		$("#deleteHaulId").val(qizzId);// 将模态框中需要删除的大修的ID设为需要删除的ID
		$("#delcfmOverhaul").modal({
			backdrop : 'static',
			keyboard : false
		});
		fun = qzdele;
	})
	
	$("#modal-qlz").on('hidden.bs.modal', function () {
		qizId = ''
		$("#name").val('');
		$("#bz").val('');
	})

	$("#modal-newly-added3").on('hidden.bs.modal', function () {
		qizzId = ''
	})
	util.timepickerSection("sqxk_ksrq", "sqxk_jsrq");	
	$doc.on("click",".btn-news",function(){
		let droit_propor = $("#droit_propor").val(),
			droit_price = $("#droit_price").val(),
			is_propri = $("input[name='limit1']:checked").val(),
			ishave_contract = showArr("mode0"),
			droit_content = $("#droit_content").val(),
			sqxk_ksrq = $("#sqxk_ksrq").val(),
			sqxk_jsrq = $("#sqxk_jsrq").val(),
			droit_mode = $("input[name='limit3']:checked").val(),
			sqxk_sydy = $("input[name='region']:checked").val(),
			sqxk_syyy = $("input[name='language']:checked").val(),
			is_deleg = $("input[name='limit4']:checked").val(),
			is_wripr = $("input[name='limit']:checked").val(),
			sqxk_syqd = $("input[name='mode']:checked").val(),
			sqxk_sycs = $("#sqxk_sycs").val();

		let data = {
			id: qizzId,
			droit_propor: droit_propor,
			droit_price: droit_price,
			is_propri: is_propri,
			ishave_contract: ishave_contract,
			droit_content: droit_content,
			sqxk_ksrq: sqxk_ksrq,
			sqxk_jsrq: sqxk_jsrq,
			droit_mode: droit_mode,
			sqxk_sydy: sqxk_sydy,
			sqxk_syyy: sqxk_syyy,
			is_deleg: is_deleg,
			is_wripr: is_wripr,
			sqxk_syqd: sqxk_syqd,
			sqxk_sycs: sqxk_sycs
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
					
				}
				util.showMsg(res.message)
			},
			error: function(error){
				util.showMsg("error")
			}
		});

	})
}
function qdele(){
	let qizId = $("#deleteHaulId").val();
	$.ajax({
		type: "get",
		url: host +"/dadi/droitg/delete",
		data: {id:qizId},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res && res.status == 1){
				setTimeout(() => {
					location.reload();
				}, 2000);
			}else{
				
			}
			util.showMsg(res.message)
		},
		error: function(error){
			util.showMsg("error")
		}
	});			
}
function qzdele(){
	let qizzId = $("#deleteHaulId").val();
	$.ajax({
		type: "get",
		url: host +"/dadi/droit/delete",
		data: {id:qizzId},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res && res.status == 1){
				setTimeout(() => {
					location.reload();
				}, 2000);
			}else{
				
			}
			util.showMsg(res.message)
		},
		error: function(error){
			util.showMsg("error")
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

function xg(){
	$.ajax({
		type: "POST",
		url: host +"/dadi/droit/....",
		data: {id: qizzId},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res && res.status == 1){
				let data= res.data;
				$("#droit_propor").val(data.droit_propor),
				$("#droit_price").val(data.droit_price),
				getValue($("input[name=limit1]"), data.is_propri)
				//ishave_contract = showArr("mode0"),
				getValue($("input[name=mode0]"), data.ishave_contract)
				$("#droit_content").val(data.droit_content),
				$("#sqxk_ksrq").val(data.sqxk_ksrq),
				$("#sqxk_jsrq").val(data.sqxk_jsrq),
				// droit_mode = $("input[name='limit3']:checked").val(),
				getValue($("input[name=limit3]"), data.droit_mode)
				// sqxk_sydy = $("input[name='region']:checked").val(),
				getValue($("input[name=region]"), data.sqxk_sydy)
				// sqxk_syyy = $("input[name='language']:checked").val(),
				getValue($("input[name=language]"), data.sqxk_syyy)
				// is_deleg = $("input[name='limit4']:checked").val(),
				getValue($("input[name=limit4]"), data.is_deleg)
				// is_wripr = $("input[name='limit']:checked").val(),
				getValue($("input[name=limit]"), data.is_wripr)
				// sqxk_syqd = $("input[name='mode']:checked").val(),
				getValue($("input[name=mode]"), data.sqxk_syqd)
				$("#sqxk_sycs").val(data.sqxk_sycs);
			}
			util.showMsg(res.message)
		},
		error: function(error){
			util.showMsg("error")
		}
	});
}
function getValue(checkbox, $val){
	for ( var i = 0; i < checkbox.length; i++) {
		var $this = checkbox[i];
		if($this.value == $val){
			$this.checked = true
		}
	}
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
function qlzFun(data){
	$.ajax({
		type: "POST",
		url: host +"/dadi/droitg/update",
		data: JSON.stringify(data),
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res && res.status == 1){
				setTimeout(() => {
					location.reload();
				}, 2000);
			}else{
				
			}
			util.showMsg(res.message)
		},
		error: function(error){
			util.showMsg("error")
		}
	});	
}

function qlzinit(page){
	page = page || 1;
	$.ajax({
		type: "get",
		url: host +"/dadi/droitg/list",
		data: {
			pageNum: page,
			pageSize: 10,
			name: qlzNmae
		},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res && res.status == 1){
				let html = '';
				for(let i = 0;i < res.data.length;i++){
					html += '<tr>'+
							'<th class="th" scope="row"><input type="radio" name="qlz" value="'+ res.data[i].id +'" data-bz="'+ und(res.data[i].bz) +'" data-name="'+ res.data[i].name +'">'+ res.data[i].name +'</th>'+
							'<td>'+ und(res.data[i].bz) +'</td>'+
							'<td>'+ res.data[i].creat_time +'</td>'+
							'</tr>';
				}
				$(".qlztr").html(html)
			}else{
				util.showMsg(res.message)
			}
		},
		error: function(error){
			util.showMsg("error")
		}
	});	
}
qlzinit()

function qlzqlinit(page){
	page = page || 1;
	$.ajax({
		type: "get",
		url: host +"/dadi/droit/list",
		data: {
			pageNum: page,
			pageSize: 10,
			droit_g_id: droit_g_id
		},
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res && res.status == 1){
				let html = '';
				for(let i = 0;i < res.data.length;i++){
					html += '<tr>'+
							'<th class="th" scope="row"><input type="radio" name="qlzz" value="'+ res.data[i].id +'">'+ res.data[i].droit_propor +'</th>'+
							'<td>'+ res.data[i].ishave_contract +'</td>'+
							'<td>'+ res.data[i].droit_mode +'</td>'+							
							'<td>'+ res.data[i].sqxk_sydy +'</td>'+							
							'<td>'+ res.data[i].sqxk_syyy +'</td>'+
							'<td>'+ res.data[i].sqxk_sycs +'</td>'+							
							'<td>'+ res.data[i].sqxk_ksrq +'</td>'+
							'<td>'+ res.data[i].sqxk_jsrq +'</td>'+	
							'</tr>';
				}
				$(".qlzql").html(html)
			}else{
				util.showMsg(res.message)
			}
		},
		error: function(error){
			util.showMsg("error")
		}
	});	
}

function und(num){
	if(num == undefined){return ''}else{return num}
}
function init(){
	bindEvents();
}
init();