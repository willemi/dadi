{{~it :m:n}}
//{{=m.vid_num || 0}}
<tr id="{{!m.id}}">
	<th scope="row">{{!m.page}}</th>
	<td>{{!m.contract_code}}</td>
	<td><a class="btn-details aaa" data-id="{{=m.id}}">{{!m.contract_name}}</a></td>
	<td>{{!m.contract_amount}}</td>
	<td>{{!m.sign_date}}</td>	
	<td>{{!m.effect_date}}</td>	
	<td>{{!m.invalid_date}}</td>	
	<td>{{!m.sign_parts}}</td>	
	<td title="{{!m.rel_status}}" style="max-width:300px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{!m.rel_status}}</td>
</tr>
{{~}}