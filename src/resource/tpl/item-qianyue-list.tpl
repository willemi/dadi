{{~it :m:n}}
<tr id="{{!m.id}}">
	<th class="th" scope="row">{{=formatobligee_sign(m.sign_type)}}</th>
	<td>{{=m.sign_name}}</td>
	<td>{{!m.sign_phone}}</td>
	<td>{{!m.sign_person}}</td>
	<td>{{!m.sign_address}}</td>
	<td>
	<button type="button" class="btn btn-default btn-qiany-list-edit" data-toggle="modal" data-target="#modal-signatoryInformation"><i class="glyphicon glyphicon-pencil"></i>修改</button>
	<button type="button" class="btn btn-default btn-qiany-list-dele">删除</button></td>
</tr>
{{~}}