{{~it :m:n}}
//{{=m.vid_num || 0}}
<tr>
	<th scope="row">{{!m.page}}</th>
	<td>{{!m.contract_code}}</td>
	<td><a class="btn-details aaa" data-id="{{=m.id}}">{{!m.contract_name}}</a></td>
	<td>{{!m.contract_amount}}</td>
	<td>{{!m.effect_date}}</td>
	<td>{{!m.invalid_date}}</td>
	<td>{{!m.signInfo}}</td>
	<td>{{!m.contract_explain}}</td>	
	
</tr>
{{~}}