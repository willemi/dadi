import '../css/system-Jurisdiction.scss';

const util = require("./common/util.js")

const itemJurisdictionTpl = require("../tpl/item-Jurisdiction.tpl")
const itemDictionariesList = require("../tpl/item-dictionaries-list.tpl")
function initData(){
    $.ajax({
        type: "get",
        url: host +"/dadi/role/list",
        // data: JSON.stringify(data),
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            if(res && res.status == 1){
                $(".yiji").html(itemJurisdictionTpl(res.data))
            }else{
                util.showMsg(res.message)
            }
        }
    })
}
initData()

function initData2(){
    $.ajax({
        type: "get",
        url: host +"/dadi/menu/list",
        // data: JSON.stringify(data),
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            if(res && res.status == 1){
                $(".erji").html(itemDictionariesList(res.data))
            }else{
                util.showMsg(res.message)
            }
        }
    })
}
initData2()

function initData3(ckId){
    $.ajax({
        type: "get",
        url: host +"/dadi/permission/list",
        // data: JSON.stringify(data),
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            if(res && res.status == 1){
                let data = res.data;
                let html = ''
                for(var i = 0;i < data.length;i++){
                    var checked = ckId.indexOf(data[i].id) > -1 ? "checked" : '';
                    console.log(checked)
                    html += '<li class="li-'+ data[i].id +'">'+
                            '    <input type="checkbox" '+ checked +' value="'+ data[i].id +'" name="checkbox">'+
                            '    <label>'+ data[i].name +'</label>'+
                            ' </li>';
                }
                $("#permission").html(html);
                if(menuId == 1 || menuId == 2){
                    $("#permission").find("li.li-4").show()
                }
            }else{
                util.showMsg(res.message)
            }
        }
    })
}

function initData4(){
    let data = {
        roleId: roleId,
        menuId: menuId
    }
    $.ajax({
        type: "get",
        url: host +"/dadi/role/list/byroleAndmenu",
        data: data,
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            if(res && res.status == 1){
                let data = res.data;
                let ckId = [];
                for(var i = 0;i < data.length;i++){
                    ckId.push(data[i].id)
                }
                initData3(ckId)
            }else{
                util.showMsg(res.message)
            }
        }
    })
}

function addData(data){
    $.ajax({
        type: "post",
        url: host +"/dadi/role/update",
        data: JSON.stringify(data),
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            if(res && res.status == 1){
                util.showMsg("操作成功")
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }else{
                util.showMsg(res.message)
            }
        }
    })
}

function delData(data){
    $.ajax({
        type: "get",
        url: host +"/dadi/role/delete",
        data: data,
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            if(res && res.status == 1){
                util.showMsg("操作成功")
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }else{
                util.showMsg(res.message)
            }
        }
    })
}
//批量选取id
function getAllids(checkbox){  
    var id = "";  
    for ( var i = 0; i < checkbox.length; i++) {
        var $this = checkbox[i];
        if($this.checked){
            id = id + $this.value + ",";
        }
    }
    return id.slice(0,-1);
}

let pidId,yiname;
let roleId,menuId,pemissionId,addOrdelete;
let shoe

let erjiHtml = '';
erjiHtml += '<div class="dd-fixed">'+
            '<h3><i>角色操作</i><a class="cloe">X</a></h3>'+
            '<div>'+
            '     <label>角色</label><input type="text" id="e-type">'+
            '</div>'+
            '<a class="f-qr">确认</a>'+
            '</div>';
function bindEvents(){
    var $doc = $(document);
    let dlHtml = '';
    dlHtml += '<dl class="dl-tk" style="display:block">'+
                '<dt class="addyj">增加角色</dt>'+
                '<dd class="edt">修改角色</dd>'+
                '<dd class="del">删除角色</dd>'+
                '</dl>';
    $(".admin-tabel").bind("contextmenu", function(){return false;}) 
    $(".yiji").mousedown("li", function(e) {
        $(".dl-tk").remove();
        yiname = e.target.innerHTML;
        pidId = e.target.id;        
        //右键为3       
        if (3 == e.which) {        
            $("body").append(dlHtml)
            $(".dl-tk").css({
                'top': e.clientY+10,
                'left': e.clientX+10
            })
        }
    })
    $(".yiji").on("click", "li", function(){
        roleId = $(this).attr("id")
        $(this).addClass("active").siblings().removeClass("active");
        $(".ee").show();
        if(!util.isEmpty(roleId) && !util.isEmpty(menuId)){
            initData4()
        }        
    })
    $(".erji").on("click", "li", function(){
        menuId = $(this).attr("id")
        $(this).addClass("active").siblings().removeClass("active");
        $(".ss").show();
        if(!util.isEmpty(roleId) && !util.isEmpty(menuId)){
            initData4()
        }
    })
    $doc.on("click", ".addyj", function(){
        $("body").append(erjiHtml)
        $(".dd-fixed").show();
        shoe = true
    })
    $doc.on("click", ".edt", function(){
        $("body").append(erjiHtml)
        $(".dd-fixed").show();
        $("#e-type").val(yiname)
        shoe = false    
    })
    $doc.on("click", ".del", function(){
        let data = {
            id: pidId
        }
        delData(data)
    })
    $doc.on("click", ".cloe", function(){
        $(".dd-fixed").remove();
        $("#e-type").val("")
    })
    $doc.on("click", ".f-qr", function(){
        let val = $("#e-type").val();
        if(util.isEmpty(val)){
            util.showMsg("不能为空")
        }else{
            let data = {};
            if(shoe){
                 data = {
                    name: val
                }
            }else{
                data = {
                    id: pidId,
                    name: val
                }
            }        
            addData(data)
        }
    })
    $doc.on("click", "#permission input[name=checkbox]", function(){
        pemissionId = $(this).val();
        if($(this).is(':checked')){
            addOrdelete = 0
        }else{
            addOrdelete = 1
        }
        
        let data = {
            roleId: roleId,
            menuId: menuId,
            pemissionId: pemissionId,
            addOrdelete: addOrdelete
        }
        console.log(data)
        $.ajax({
            type: "post",
            url: host +"/dadi/role/updateRoleAddPermission",
            data: JSON.stringify(data),
            dataType: "json",
            cache: false,
            contentType: "application/json;charset=UTF-8",
            success: function(res) {
                if(res && res.status == 1){
                    util.showMsg("操作成功")
                    // setTimeout(() => {
                    //     location.reload();
                    // }, 2000);
                }else{
                    util.showMsg(res.message)
                }
            }
        })
    })
}
function init(){
	bindEvents();
}
init();