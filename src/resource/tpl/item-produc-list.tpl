{{~it :m:n}}
//{{=m.vid_num || 0}}
<tr>
	<th scope="row">{{!m.page}}</th>
	<td><a class="btn-details aaa" data-id="{{!m.id}}">{{!m.product_code}}</a></td>
	<td>{{!m.product_name}}</td>
	<td>{{!m.product_type}}</td>
	<td>{{!m.product_xingtai}}</td>
	<td>{{!m.shou_quan_ren}}</td>
	<td>{{!m.bei_shou_quan_ren}}</td>
	<td>{{!m.ishave_contract}}</td>
	<td>{{!m.droit_startime}}</td>
	<td>{{!m.droit_endtime}}</td>
	<td>{{!m.droit_mode}}</td>
	<td>{{!m.sqxk_sydy}}</td>
	<td>{{!m.sqxk_syyy}}</td>
	<td>{{!formatobligee_type(m.is_deleg)}}</td>
	<td>{{!formatobligee_type(m.is_wripr)}}</td>
	<td>{{!m.sqxk_syqd}}</td>
	<td>{{!m.sqxk_sycs}}</td>
	<td id="{{=m.check_status}}">{{=formatState(m.check_status)}}</td>
	<td id="{{!m.id}}">
		<button id="4" class="btn btn-primary works-list-sh z-4 prod">审核</button>
		<button id="3" class="btn btn-primary works-list-edit z-3 {{!showXg(m.creater,m.data_status)}}">修改</button>
		<button id="5" class="btn btn-default worksList-dele z-5">删除</button>
	</td>
</tr>
{{~}}