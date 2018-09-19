import '../css/system-Journal.scss';

const util = require("./common/util.js")
function workslist(page){
	page = page || 1;
	$.ajax({
		type: "GET",
		url: host +"/dadi/permissionslog/list",
		data: {
			pageNum: page,
			pageSize: 10
		},
		dataType: "json",
        cache: false,
        contentType: "application/json;charset=UTF-8",
		success: function(res) {
			if(res.status == 1){
				let html ='';
				//var res = {"status":"1","data":[{"id":"809a7b8698494f2aab7988b171afcc82","actionType":"2","operatorUserId":"1","operatorUserName":"超级管理员","operatorUserRoles":"超级管理员","operatorObjectType":2,"operatorObjectId":"","operatorObjectName":"超级管理员","actionContent":"&lt;contenttsplit&gt;&lt;contenttsplit&gt;","createUserId":1,"createTime":"2018-05-15"},{"id":"19ca6e3bf501482b8aeab8af57d9f8f7","actionType":"2","operatorUserId":"1","operatorUserName":"超级管理员","operatorUserRoles":"超级管理员","operatorObjectType":2,"operatorObjectId":"","operatorObjectName":"超级管理员","actionContent":"&lt;contenttsplit&gt;&lt;contenttsplit&gt;业务管理 - 栏目管理&lt;br&gt;业务管理 - 测试用例 - 测试用例管理 - 删除Htmlcase&lt;br&gt;业务管理 - 测试用例 - 测试用例管理 - 批量删除Htmlcase&lt;br&gt;业务管理 - 测试用例 - 测试用例管理 - 导出Htmlcase&lt;br&gt;业务管理 - 测试用例 - 测试用例管理 - 查看Htmlcase&lt;br&gt;业务管理 - 测试用例 - 测试用例管理 - 修改Htmlcase&lt;br&gt;业务管理 - 测试用例 - 测试用例管理 - 导入Htmlcase&lt;br&gt;业务管理 - 测试用例 - 页面字段管理 - 删除Htmlfield&lt;br&gt;业务管理 - 测试用例 - 页面字段管理 - 批量删除Htmlfield&lt;br&gt;业务管理 - 测试用例 - 页面字段管理 - 导出Htmlfield&lt;br&gt;业务管理 - 测试用例 - 页面字段管理 - 查看Htmlfield&lt;br&gt;业务管理 - 测试用例 - 页面字段管理 - 修改Htmlfield&lt;br&gt;业务管理 - 测试用例 - 页面字段管理 - 导入Htmlfield&lt;br&gt;业务管理 - 测试用例 - 页面功能管理 - 删除Htmlfunction&lt;br&gt;业务管理 - 测试用例 - 页面功能管理 - 批量删除Htmlfunction&lt;br&gt;业务管理 - 测试用例 - 页面功能管理 - 导出Htmlfunction&lt;br&gt;业务管理 - 测试用例 - 页面功能管理 - 查看Htmlfunction&lt;br&gt;业务管理 - 测试用例 - 页面功能管理 - 修改Htmlfunction&lt;br&gt;业务管理 - 测试用例 - 页面功能管理 - 导入Htmlfunction&lt;br&gt;业务管理 - 测试用例 - 验证规则管理 - 删除Validaterule&lt;br&gt;业务管理 - 测试用例 - 验证规则管理 - 批量删除Validaterule&lt;br&gt;业务管理 - 测试用例 - 验证规则管理 - 导出Validaterule&lt;br&gt;业务管理 - 测试用例 - 验证规则管理 - 查看Validaterule&lt;br&gt;业务管理 - 测试用例 - 验证规则管理 - 修改Validaterule&lt;br&gt;业务管理 - 测试用例 - 验证规则管理 - 导入Validaterule&lt;br&gt;业务管理 - 内容管理&lt;br&gt;业务管理 - 站点管理","createUserId":1,"createTime":"2018-05-15"}],"page":{"pageNum":1,"pageSize":10,"totalCount":2,"pageCount":1,"sort":"desc","order":"id","firstPage":true,"hasPrev":false,"hasNext":false,"lastPage":true,"selectpagecount":true,"empty":false,"firstResult":0},"queryBean":{},"statusCode":"0"}
                for(var i = 0;i < res.data.length;i++){
					let pagec = (page-1) * 10 + (i+1);
					html += ' <tr id="'+ res.data[i].id +'">'+
							'<th scope="row">'+ pagec +'</th>'+
							'<td id="'+ res.data[i].operatorUserId +'">'+ res.data[i].operatorUserName +'</td>'+
							'<td>'+ res.data[i].operatorObjectName +'</td>'+
							'<td>'+ res.data[i].createTime +'</td>'+
							'<td>'+ res.data[i].actionType +'</td>'+
							'</tr>';
                }
				$("#works-list").html(html);
				util.pageinator("pageLimit", page, res.page.pageCount, workslist);
			}else{
				util.showMsg(res.message)
			}			
		},
		error: function(){			
		}
	});
	
}
workslist()
function bindEvents(){
    var $doc = $(document);
    
}
function init(){
	bindEvents();
}
init();