
import '../../css/bootstrap-datetimepicker.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import './sidebar-menu';
import '../../css/sidebar-menu.css';
import '../../css/font-awesome.css';
$.sidebarMenu($('.sidebar-menu'))

//window.host = "http://"+ (location.host || "118.26.10.50:9999");
window.host = "http://118.26.10.50:9999";
const datetimepicker = require("./bootstrap-datetimepicker.min.js");
const moment = require('./bootstrap-datetimepicker.zh-CN.js');
const bootstrapPaginator = require("./bootstrap-paginator.js");
const easyUpload = require("./easyUpload.js")
let util = {};
$('.modal').on('hidden.bs.modal', function () {
	// 执行一些动作...
	if($(".in").length > 0){
		$("body").addClass("modal-open");
	}
})
window.fileUrl = function(url){
	console.log(url)
	return host +'/file/'+ url;
}
if (window.console) {
	let log = window.console.log;
	window.console.log = process.env.NODE_ENV == 'production' ? () => {} : log
}
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
Date.prototype.Format = function(fmt) {
	fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
	if (this == 'Invalid Date') return '';
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

util.isEmpty = (str) => {
	str = $.trim(str)
	return (str === '' || typeof(str) === 'undefined' || str === null) ? true : false;
}
//提示弹框
let msgTimer = null;
util.showMsg = (msg) => {
	let $tip = $('.messages');
	$tip.html(msg).show();
	clearTimeout(msgTimer);
	msgTimer = setTimeout(() => {
		$tip.hide();
		clearTimeout(msgTimer);
	},2e3)
}
//times
util.options = {
	format: 'yyyy-mm-dd',
	minView:'month',
	language: 'zh-CN',
	autoclose:true
};
util.timepicker = (cont) => {
	$("#"+ cont).datetimepicker(util.options);
}
Array.prototype.distinct = function (){  
	var arr = this,   
		result = [],   
		len = arr.length; 
	arr.forEach(function(v, i ,arr){  
		//这里利用map，filter方法也可以实现   
		var bool = arr.indexOf(v,i+1);  
		//从传入参数的下一个索引值开始寻找是否存在重复  
		 if(bool === -1){    
			result.push(v);   
		}  
	})  
	return result; 
}; 

$("body input[type=text]").attr("autocomplete","off")
//start-end
util.timepickerSection = (start, end) => {
	var $start = $("#"+ start),
		$end = $("#"+ end);
		$start.datetimepicker(util.options).on("click",function(){
			$start.datetimepicker("setEndDate",$end.val())
    });
    $end.datetimepicker(util.options).on("click",function(){
        $end.datetimepicker("setStartDate",$start.val())
	});
}
//pages
util.pageinator = (cont, page, totalP, tplData) => {
	var $cont = $("#"+ cont);
	$cont.bootstrapPaginator({    
		currentPage: page,//当前页码
		totalPages: totalP,//总页码
		size:"normal",
		bootstrapMajorVersion: 3,//bootstrap版本
		alignment:"right",
		numberOfPages:5,//一页显示几个按钮
		itemTexts: function(type, page, current){
			switch (type){ 
				case "first": return "首页";
				case "prev": return "上一页";
				case "next": return "下一页";
				case "last": return "末页";
				case "page": return page;
			}
		},
		onPageClicked: function(event, originalEvent, type, page){
			tplData(page)
			// $.ajax({
			// 	url: '',
			// 	type: 'post',
			// 	data: {page: page},
			// 	dataType: 'json',
			// 	success: function (data) {
			// 		tplData(data);//处理成功返回的数据
			// 	}
			// });
		}
	});
}
//localStorage
// util.storage = {
// 	get(key) {
// 		try {
// 			return JSON.parse(localStorage[key] || '{}');
// 		} catch (e) {
// 			return {};
// 		}
// 	},
// 	set(key, val) {
// 		var data = this.get(key);
// 		this.setData(key, data);
// 	},
// 	setData(key, data) {
// 		localStorage[key] = JSON.stringify(data);
// 	}
// };

// var cookie = util.storage.get("user_mid");
// if(Object.keys(cookie).length != 0){
// 	console.log(cookie)
// }else{
// 	cookie = "perm"
// 	util.storage.set("user_mid", cookie);
// }
window.myStorage = (new (function(){
 
    var storage;    //声明一个变量，用于确定使用哪个本地存储函数
 
    if(window.localStorage){
        storage = localStorage;     //当localStorage存在，使用H5方式
    }
    else{
        storage = cookieStorage;    //当localStorage不存在，使用兼容方式
    }
 
    this.setItem = function(key, value){
        storage.setItem(key, value);
    };
 
    this.getItem = function(name){
        return storage.getItem(name);
    };
 
    this.removeItem = function(key){
        storage.removeItem(key);
    };
 
    this.clear = function(){
        storage.clear();
    };
})());
let jdata = {
	pid: 19
}
$.ajax({
	type: "POST",
	url: host +"/dadi/dic/list",
	data: JSON.stringify(jdata),
	dataType: "json",
	cache: false,
	contentType: "application/json;charset=UTF-8",
	success: function(res) {
		if(res.status == -10){
			util.showMsg(res.message)
			// setTimeout(() => {
			// 	location.href= "login.html"
			// }, 2000);				
		}
	}
})

window.cookie = JSON.parse(myStorage.getItem("user_mid"));
console.log(cookie)
if(!cookie || cookie == '{}'){
	// location.href= "login.html"
}else{
	for(var i = 0;i < cookie.length;i++){
		var coo = cookie[i]
		var num = i + 1;
		$("body .c-"+ coo.menuId).show();
		$("body .c-"+ coo.menuId).parents("li").show();
		for(var f = 0;f < coo.permissionId.length;f++){
			$("body .cont-"+ coo.menuId).addClass("show-z-"+ coo.permissionId[f])
		}
		// for(var j = 1;j = 13;j++){
		// 	if(coo.menuId == j){
		// 		$("body .c-"+ j).show();
		// 		$("body .c-"+ j).parents("li").show();
		// 		for(var f = 0;f < coo.permissionId.length;f++){
		// 			var permiss = coo.permissionId[f];
		// 			for(var k = 1;k = 5;k++){
		// 				if(permiss == k)
		// 				$("body .cont-"+ j).find(".z"+ k).show()
		// 			}
		// 		}
		// 	}
		// }
	}
}


// if(cookie != '{}'){
// 	console.log(JSON.parse(cookie))
// }else{
// 	var data = {
//         "perm":[
//             {
//                 "menuId":"1",
//                 "permissionId":[1,2]
//             },
//             {
//                 "menuId":"2",
//                 "permissionId":[4,6]
//             },
//             {
//                 "menuId":"3",
//                 "permissionId":[7,5]
//             },
// 		]
// 	}
// 	data = JSON.stringify(data)
// 	myStorage.setItem("user_mid", data)
// }

util.fileFun = (url, reslo) => {
	$("#easyContainer").easyUpload({
		allowFileTypes: '*.doc;*.docx;*.xls;*.xlsx;*.ppt;*.pptx;*.pdf;*.df;*.png;*.jpg;*.bmp;*.jpe;*.gif;*.txt',//允许上传文件类型，格式';*.doc;*.pdf'
		allowFileSize: 100000,//允许上传文件大小(KB)
		selectText: '选择文件',//选择文件按钮文案
		multi: true,//是否允许多文件上传
		multiNum: 6,//多文件上传时允许的文件数
		showNote: true,//是否展示文件上传说明
		note: '提示：最多上传6个文件，支持格式为doc,docx,xls,xlsx,ppt,pptx,pdf,df,png.jpg.bmp,jpe,jpeg,gif,txt',//文件上传说明
		showPreview: false,//是否显示文件预览
		url: url,//上传文件地址
		fileName: 'file',//文件filename配置参数
		//文件filename以外的配置参数，格式：{key1:value1,key2:value2}
		// formParam: {
		// 	token: $.cookie('token_cookie')//不需要验证token时可以去掉
		// },
		timeout: 30000,//请求超时时间
		contentType: "application/json;charset=UTF-8",
		successFunc: function(res) {//上传成功回调函数
			console.log('成功回调', res);
			reslo(res);
		},
		errorFunc: function(res) {//上传失败回调函数
			console.log('失败回调', res);
			reslo(res);
		},
		deleteFunc: function(res) {//删除文件回调函数
			console.log('删除回调', res);
			reslo(res);
		}
	});
}
$("input#contract-yes-time").focus(function(){
	let s = $(".s-t").val(),
		e = $(".e-t").val();
	if(util.isEmpty(s) || util.isEmpty(e)){
		return
	}else{
		let t = GetDateDiff(s,e,"day");
		$(this).val(t)
	}
})
function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime =new Date(startTime); //开始时间
    var eTime =new Date(endTime); //结束时间
    //作为除数的数字
    var timeType =1;
    switch (diffType) {
        case"second":
            timeType =1000;
        break;
        case"minute":
            timeType =1000*60;
        break;
        case"hour":
            timeType =1000*3600;
        break;
        case"day":
            timeType =1000*3600*24;
        break;
        default:
        break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
}
//sidbar
var $doc = $(document);
$doc.on("click", ".sid-li", function(e){
	var $this = $(this).parent("li");
    $this.addClass("active").siblings().removeClass("active height");
})
$doc.on("click", ".muen > li", function(e){
	var $this = $(this);
	$this.parents(".hassub").removeClass("active").addClass("height");
    $this.addClass("active").siblings().removeClass("active");
})
$doc.on("click", ".out", function(){
	$.ajax({
		type: "post",
		url: host +"/dadi/login/logout",		
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
			myStorage.removeItem("user_mid")
            util.showMsg(res.message)
            setTimeout(() => {
				location.href= "login.html"
			}, 2000);		
		},
		error: function(){			
		}
	});
})
let $floww = $(".floww"),flowwID, prod = false;
$doc.on("click", ".works-list-sh", function(){
	flowwID = $(this).parent("td").attr("id");
	$floww.show();
	if($(this).hasClass("prod")){
		prod = true
	}
	console.log(prod)
})
$doc.on("click", ".close-aa", function(){
	$floww.hide();
	$("#miaosu").val('')
})
$doc.on("click", ".floww-go", function(){
	sh("checkAllow")
})
$doc.on("click", ".floww-out", function(){
	sh("checkNoAllow")
})
function sh(url){
	let u ;
	if(prod){
		u = "product/" + url;
	}else{
		u = "opus/" + url;
	}
	console.log(u)
	let $v = $("#miaosu").val();
	if(util.isEmpty($v)){
		util.showMsg("不能为空！")
		return
	}else{
		$.ajax({
			type: "POST",
			url: host +"/dadi/"+ u,
			data: JSON.stringify({
				id: flowwID,
				check_remark: $v
			}),
			dataType: "json",
			cache: false,
			contentType: "application/json;charset=UTF-8",
			success: function(res) {
				util.showMsg(res.message)
				setTimeout(() => {
					//location.reload();
				}, 2000);
			}
	
		});
	}
	
}

util.checkB = (me, name) =>{
	if(me.hasClass("cut")){
		$("input[name='"+ name +"']").removeAttr("checked");
		me.removeClass("cut")
	}else{
		$("input[name='"+ name +"']").attr("checked","true");
		me.addClass("cut")
	}
}
util.GetQueryString = (name) =>{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}
// var Cookie = {
// 	get: function(key) {
// 		try {
// 			var doc = document,
// 			a, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
// 			if (a = doc.cookie.match(reg)) {
// 				return unescape(a[2]);
// 			} else {
// 				return "";
// 			}
// 		} catch (e) {
// 			return "";
// 		}
// 	},
// 	set: function(key, val, options) {
// 		options = options || {};
// 		var expires = options.expires;
// 		var doc = document;
// 		if (typeof(expires) === "number") {
// 			expires = new Date();
// 			expires.setTime(expires.getTime() + options.expires);
// 		}

// 		try {
// 			doc.cookie = key + "=" + escape(val) + (expires ? ";expires=" + expires.toGMTString() : "") + (options.path ? ";path=" + options.path : "") + (options.domain ? "; domain=" + options.domain : "");
// 		} catch (e) {}
// 	}
// };
// var cookie = util.storage.get("user_mid");
// if(cookie){
// 	cookie = cookie
// }else{
// 	util.storage.set("user_mid", cookie);
// }

util.export = (opus_classify) => {
	//window.location.href=host+"/dadi/opus/list/export?opus_classify="+opus_classify;
	window.open(host+"/dadi/opus/list/export?opus_classify="+opus_classify)
}
$doc.on("click", ".click-pic", function(){
	let url = $(this).data("url");
	window.open(url)
})
module.exports = util
