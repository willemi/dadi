{{~it :m:n}}
//{{=m.vid_num || 0}}
<tr data-id="{{!m._id}}" id="{{!m.id}}">
	<th scope="row"><input value="{{!m.id}}" type="checkbox" name="ht-list">{{!m.contract_code}}</th>
	<td>{{!m.contract_name}}</td>
	<td>{{!m.sign_date}}</td>
	<td>{{!m.effect_date}}</td>
	<td>{{!m.invalid_date}}</td>	
	<td><a class="loog btn-ht-news" data-toggle="modal" data-target="#modal-detailsContract-produc">查看详情</a></td>
</tr>
{{~}}