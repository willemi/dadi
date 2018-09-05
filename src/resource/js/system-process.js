import '../css/system-process.scss';

const util = require("./common/util.js")
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
                let html = '';
                let data = res.data;
                for(var i = 0;i < data.length;i++){
                    html += '<option value="'+ data[i].id +'">'+ data[i].name +'</option>'
                }
                $("#auditor").html(html);
            }else{
                util.showMsg(res.message)
            }
        }
    })
}
initData()

function initList(page){
    page = page || 1
    $.ajax({
        type: "get",
        url: host +"/dadi/process/list",
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
                let data = res.data;
                if(data && data.length != 0){
                    for(var i = 0;i < data.length;i++){
                        let j = i + 1;
                        html += '<tr><th class="th" scope="row">'+ j +'</th>'+
                                '<td>'+ data[i].name +'</td>'+
                                '<td>'+ data[i].type +'</td>'+
                                '<td>'+ data[i].node +'</td>'+
                                '<td id="'+ data[i].role_id +'">'+ data[i].auditor +'</td>'+
                                '<td id="'+ data[i].id +'">'+
                                '    <a id="'+ data[i].id +'" class="del">删除</a>'+
                                '</td></tr>';
                    }
                    $("#auditor1").html(html);
                }
               
            }else{
                util.showMsg(res.message)
            }
        }
    })
}
initList()


let id
function bindEvents(){
    var $doc = $(document);
    let id;
    $doc.on("click", "#modal-b-authorization", function(){
        let data = {
            id: id,
            node: $("#node").val(),
            name: $("#name").val(),
            type: $("#type").val(),
            auditor: $("#auditor").find("option:selected").text(),
            role_id: $("#auditor").val(),
        }
        $.ajax({
            type: "post",
            url: host +"/dadi/process/update",
            data: JSON.stringify(data),
            dataType: "json",
            cache: false,
            contentType: "application/json;charset=UTF-8",
            success: function(res) {
                if(res && res.status == 1){
                    util.showMsg("成功")
                    setTimeout(() => {
                        location.reload()
                    }, 2000);
                }else{
                    util.showMsg(res.message)
                }
            }
        })
    })
    $doc.on("click", ".del", function(){
       let id = $(this).attr("id")
        $.ajax({
            type: "get",
            url: host +"/dadi/process/delete",
            data: {id: id},
            dataType: "json",
            cache: false,
            contentType: "application/json;charset=UTF-8",
            success: function(res) {
                if(res && res.status == 1){
                    util.showMsg("成功")
                    setTimeout(() => {
                        location.reload()
                    }, 2000);
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