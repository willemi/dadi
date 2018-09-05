import '../css/system-dictionaries.scss';
const util = require("./common/util.js")
const itemDictionariesList = require("../tpl/item-dictionaries-list.tpl")
function initData(pid){
    pid = pid || -2
    let data = {
        pid: pid
    }
    $.ajax({
        type: "POST",
        url: host +"/dadi/dic/list",
        data: JSON.stringify(data),
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            if(res && res.status == 1){
                if(pid > 0){
                    $(".erji").html(itemDictionariesList(res.data))
                }else{
                    $(".yiji").html(itemDictionariesList(res.data))
                }                
            }else{
                util.showMsg(res.message)
            }
        }
    })
}
initData()
function addData(addj){
    let data = {};
    $.extend(data, addj)
    console.log(data)
    $.ajax({
        type: "post",
        url: host +"/dadi/dic/update",
        data: JSON.stringify(data),
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            // if(res && res.status == 1){
            //     //if(res.data.pid > -1){
            //         $(".erji").append(itemDictionariesList([res.data]))
            //     // }else{
            //     //     $(".yiji").append(itemDictionariesList([res.data]))
            //     // }
            //     $(".dd-fixed").remove();
            // }else{
            //     util.showMsg(res.message)
            // }
            util.showMsg(res.message)
            setTimeout(() => {
                location.reload()
            }, 1500);
        }
    })
}
function delData(id){
    $.ajax({
        type: "get",
        url: host +"/dadi/dic/delete",
        data: {
            id: id
        },
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            util.showMsg(res.message)
            setTimeout(() => {
                location.reload()
            }, 1500);
        }
    })
}
// console.log(2)
// $(".title-h3").on("click",function(){
//     let data = {
//         name: "币种",
//         pid: -2
//     }
//     addData(data)
// })
let erjiHtml = '';
erjiHtml += '<div class="dd-fixed">'+
            '<h3><i>操作</i><a class="cloe">X</a></h3>'+
            '<div>'+
            '     <label>名称</label><input type="text" id="e-type">'+
            '</div>'+
            '<a class="f-qr">确认</a>'+
            '</div>';

let yiname,pidId,zpidId;
let $dlTk = $(".dl-tk");
$(".yiji").on("click", "li", function(){
    $(this).addClass("active").siblings().removeClass("active")
    zpidId = $(this).attr("id");
    yiname = $(this).attr("value");
    console.log(yiname)
    initData(zpidId)
    $dlTk.hide();
})
let json = {};
$("body").on("click", ".addtong", function(){
    $("body").append(erjiHtml)    
    $(".dd-fixed").show();
    let id = $(this).attr("id")
    $(".f-qr").attr("id", id)
})
$("body").on("click", ".addxia", function(){
    $("body").append(erjiHtml)
    $(".dd-fixed").show();
    let id = $(this).parent("dl").attr("id");
    $(".f-qr").attr("id", id)
})
$("body").on("click", ".edit", function(){
    $("body").append(erjiHtml)
    $(".dd-fixed").show();
    json.id = $(this).parent("dl").attr("id");
})
$("body").on("click", ".dele", function(){
    let id = $(this).parent("dl").attr("id");
    delData(id)
})
$("body").on("click", ".cloe", function(){
    $(".dd-fixed").remove();
})
$("body").on("click", ".f-qr", function(){
    let val = $("#e-type").val();
    if(util.isEmpty(val)){
        util.showMsg("不能为空")
    }else{
        let pid = $(this).attr("id")
        let data = {
            name: val            
        }
        if(pid){
            let a = {
                pid: pid
            }
            $.extend(data, a)
        }else{
            $.extend(data, json)
        }
        console.log(data)
        addData(data)
    }
})
$(".admin-tabel").bind("contextmenu", function(){return false;}) 
$(".yiji").mousedown("li", function(e) {
    yiname = e.target.value;
    zpidId = e.target.id;
    //右键为3       
    if (3 == e.which) {        
        $dlTk.css({
            'top': e.clientY+10,
            'left': e.clientX+10,
            "display": "block"
        })
        $(".addtong").attr("id", "-2")
        $(".addxia").show();
        $dlTk.attr("id", zpidId)
    }
})
$(".erji").mousedown("li", function(e) {
    pidId = e.target.id;
    //右键为3       
    if (3 == e.which) {        
        $dlTk.css({
            'top': e.clientY+10,
            'left': e.clientX+10,
            "display": "block"
        })
        $(".addtong").attr("id", zpidId)
        $(".addxia").hide();
        $dlTk.attr("id", pidId)
    }
})