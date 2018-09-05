{{~it :m:n}}
//{{=m.vid_num || 0}}
<tr>
	<th class="th">{{!n+1}}</th>
	<td id="{{!m.id}}" class="btn-dile">{{!m.mark_name}}</td>
	<td>{{!m.mark_type}}</td>
	<td>{{!m.mark_register_leibie}}</td>
	<td>{{!m.mark_agent_institution}}</td>
	<td>{{!m.mark_agent_contract_name}}</td>
	<td>{{!m.mark_contract_amout}}</td>
	<td>{{!m.mark_danxiang_amout}}</td>
	<td>{{!m.mark_zhizuo_team}}</td>
	<td>{{!m.mark_zhizuo_team_phone}}</td>
	<td id="{{!m.id}}">		
		<button class="btn btn-primary btn-xgg">修改</button>
		<button class="btn btn-default worksList-dele">删除</button>
	</td>
</tr>
{{~}}