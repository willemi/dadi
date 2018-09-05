{{~it :m:n}}
//{{=m.vid_num || 0}}
<tr>
	<th scope="row">{{!m.id}}</th>
	<!--<td><a class="btn-details" data-id="{{!m.id}}">{{!m.opus_name}}</a></td>-->
	<td>{{!m.number}}</td>
	<td>{{!m.name}}</td>
	<td></td>
	<td>{{!m.status}}</td>
	<td>{{!m.droit_type}}</td>
	<td>{{!m.designer}}</td>
	<td>{{!m.paten}}</td>
	<td>{{!m.authorize_unit}}</td>
	<td>{{!m.authorized_unit}}</td>
	<td>{{!m.authorize_type}}</td>
	<td>{{!m.term_of_validity_start}}</td>
	<td>{{!m.term_of_validity_end}}</td>
	<td>{{!m.authorized_area}}</td>
	<td>{{!m.scope_of_authorization}}</td>
	<td>{{!m.scope_of_operation}}</td>
	<td id="{{!m.id}}">		
		<!--<button class="btn btn-primary">修改</button>-->
		<button class="btn btn-default worksList-dele">删除</button>
	</td>
</tr>
{{~}}