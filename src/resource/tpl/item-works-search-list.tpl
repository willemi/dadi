{{~it :m:n}}
<tr class="t_{{!m.id}}" id="{{!m.id}}" name="{{!m._id}}" data-qid="{{!m.droit_id}}">
	<th scope="row"><input value="{{!m.id}}" class="{{!m._id}}" type="checkbox" name="work-list" data-qid="{{!m.droit_id}}">{{!m.id}}</th>
	<td>{{!m.opus_name}}</td>
	<td>{{!m.opus_type}}</td>
	<td>{{!m.new_shouquanren}}</td>
	<td>{{!m.new_beishouquanren}}</td>
	<td>{{!m.ishave_contract}}</td>
	<td>{{!m.sqxk_ksrq}}</td>
	<td>{{!m.droit_mode}}</td>
	<td>{{!m.sqxk_sydy}}</td>
	<td>{{!m.sqxk_syyy}}</td>
	<td>{{!formatobligee_you(m.is_deleg)}}</td>
	<td>{{!formatobligee_you(m.is_wripr)}}</td>
	<td>{{!m.sqxk_syqd}}</td>
	<td>{{!m.sqxk_sycs}}</td>
	<!--<td><button type="button" class="btn btn-default btn-del">删除</button></td>-->
</tr>
{{~}}