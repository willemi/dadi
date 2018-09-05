import '../css/system-user.scss';

const util = require("./common/util.js")
const itemUserListTpl = require('../tpl/item-user-list.tpl');
let id;
let userid;
let $account = $("#account"),
    $password = $("#password"),
    $mobile = $("#mobile"),
    $email = $("#email"),
    $address = $("#address"),
    $department = $("#department"),
    $sex = $("#sex");

function bindEvents(){
    var $doc = $(document);
    $doc.on("click","#modal-b-authorization",function(){
        addData();
    }) 
    $doc.on("click",".user-dit",function(){
        // document.getElementById("user-f").reset();
        userid = $(this).parents("td").data("id");
        let $tr = $(this).parents("tr");
        let $accountVal = $tr.find(".account").text(),
            $passwordVal = $tr.find(".password").text(),
            $mobileVal = $tr.find(".mobile").text(),
            $emailVal = $tr.find(".email").text(),
            $addressVal = $tr.find(".address").text(),
            $departmentVal = $tr.find(".department").text(),
            $roleNames = $tr.find(".roleNames").text(),
            $sexVal = $tr.find(".sex").text();
        $account.val($accountVal),
        $password.val($passwordVal),
        $mobile.val($mobileVal),
        $email.val($emailVal),
        $address.val($addressVal),
        $department.val($departmentVal),
        $sex.val($sexVal);
        
        $roleNames = $roleNames.split(",");
        let $span = $(".js span");
        for(var i = 0;i < $span.length;i++){
            for(var j = 0;j < $roleNames.length;j++){
                if($roleNames[j] == $span.eq(i).find("p").text()){
                    $span.eq(i).find("input").attr("checked",true);
                }
            }
        }

        $("#modal-system-user").modal("show")
    })
    $doc.on("click",".user-del",function(){
        let _id = $(this).parents("td").data("id");
        delData(_id)
    })
}
//批量选取id
function getAllids(checkbox){  
    var id = [];  
    for ( var i = 0; i < checkbox.length; i++) {
        var $this = checkbox[i];
        if($this.checked){
            id.push($this.value);
        }
    }
    return id
}
$('#modal-system-user').on('hidden.bs.modal', function () {
    $("body input, textarea").val('');
    $("input[name=js]").attr("checked",false);
})
function addData(){
    
    let account = $account.val(),
        password = $password.val(),
        mobile = $mobile.val(),
        email = $email.val(),
        address = $address.val(),
        department = $department.val(),
        sex = $("input[name='sex']:checked").val(),
        roleId = getAllids($("input[name=js]"));
    if(util.isEmpty(account) || util.isEmpty(password) || util.isEmpty(roleId)){
        util.showMsg("用户名、密码、角色不能为空")
        return
    }
    let data = {
        id: userid,
        account: account,
        password: password,
        sex: sex,
        mobile: mobile,
        email: email,
        address: address,
        department: department,
        roleId: roleId
    }
    console.log(data)
    $.ajax({
        type: "POST",
        url: host +"/dadi/user/update",
        data: JSON.stringify(data),
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            if(res && res.status == 1){
                util.showMsg("提交成功！")
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
}
function initData5(){
    $.ajax({
        type: "get",
        url: host +"/dadi/role/list",
        // data: JSON.stringify(data),
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            if(res && res.status == 1){
                let html = '';
                let data = res.data;
                for(var i = 0;i < data.length;i++){
                    html += '<span>'+
                            '    <input type="checkbox" name="js" value="'+ data[i].id +'">'+
                            '    <p>'+ data[i].name +'</p>'+
                            '</span>';
                }
                $(".js").html(html)
            }else{
                util.showMsg(res.message)
            }
        }
    })
}
initData5()
function initData(page){
    page = page || 1;
    $.ajax({
        type: "POST",
        url: host +"/dadi/user/list",
        data: {
            pageNum: page,
            pageSize: 10
        },
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            if(res && res.status == 1){
                $(".user-list").append(itemUserListTpl(res.data));
                //util.pageinator("pageLimit", page, res.page.pageCount, initData);
            }else{
                util.showMsg(res.message)
            }
        },
        error: function(error){
            util.showMsg("error")
        }
    });
}
function delData(_id){
    _id = {
        id: _id
    }
    $.ajax({
        type: "get",
        url: host +"/dadi/user/delete",
        data: _id,
        dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
        success: function(res) {
            if(res && res.status == 1){
                util.showMsg("删除成功！")
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
}
function init(){
    initData();
	bindEvents();
}
init();