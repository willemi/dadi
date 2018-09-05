{{~it :m:n}}
<tr id="{{!m.id}}">
	<th class="th" scope="row">{{!m.obligee_name}}</th>
	<td>{{!m.obligee_type}}</td>
	<td>{{!formatobligee_type(m.is_pay)}}</td>
	<td>{{!m.currency}}</td>
	<td>{{!m.pay_amount}}</td>
	<td><button type="button" class="btn btn-default btn-obligee-list-edit" data-toggle="modal" data-target="#modal-qbligeeAdd"><i class="glyphicon glyphicon-pencil"></i>修改</button><button type="button" class="btn btn-default btn-obligee-list-dele">删除</button></td>
</tr>
{{~}}