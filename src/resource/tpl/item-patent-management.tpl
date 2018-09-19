{{~it :m:n}}
//{{=m.vid_num || 0}}
<tr>
	<th class="th">{{!m.page}}</th>
	<td id="{{!m.id}}" class="btn-dile">{{!m.name}}</td>
	<td>{{!m.designer}}</td>
	<td>{{!m.number}}</td>                        
	<td>{{!m.certificate_number}}</td>
	<td>{{!m.droit_sttus}}</td>
	<td>{{!m.droit_type}}</td>
	<td>{{!m.paten}}</td>
	<td>{{!m.project}}</td>
	<td>{{!m.authorize_unit}}</td>
	<td>{{!m.authorized_unit}}</td>
	<td>{{!m.authorize_type}}</td>
	<td>{{!m.authorized_years}}</td>
	<td>{{!m.authorized_area}}</td>
	<td>{{!m.scope_of_authorization}}</td>
	<td>{{!m.scope_of_operation}}</td>
	<td>{{!m.authorized_amount}}</td>
	<td id="{{!m.id}}">		
		<button class="btn btn-primary btn-xgg">修改</button>
		<button class="btn btn-default worksList-dele">删除</button>
	</td>
</tr>
{{~}}