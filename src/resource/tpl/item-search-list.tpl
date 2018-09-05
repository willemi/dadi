{{~it :m:n}}
//{{=m.vid_num || 0}}
<tr id="{{!m.id}}">
	<th scope="row">{{!m.contract_code}}</th>
	<td>{{!m.contract_name}}</td>
	<td>{{!m.sign_date}}</td>
	<td>{{!m.effect_date}}</td>
	<td>{{!m.invalid_date}}</td>	
	<td><a class="loog btn-ht-news" data-toggle="modal" data-target="#modal-detailsContract">查看并选择权利</a></td>
</tr>
{{~}}