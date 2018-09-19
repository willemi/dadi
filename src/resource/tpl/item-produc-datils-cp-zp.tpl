{{~it :m:n}}
<tr id="{{!m.id}}" data-qid="{{!m.droit_id}}">
	<td class="xh">{{!n+1}}</td>
	<td scope="row"><input value="{{!m.id}}" type="checkbox" name="work-list" data-qid="{{!m.droit_id}}"><a class="produc-dtai aaa" data-id="{{!m.id}}">{{!m.id}}</a></td>
	<td ><a class="produc-dtai" data-id="{{!m.id}}">{{!m.opus_name}}</a></td>
	<td>{{!m.opus_type}}</td>
	<td>{{!m.droit_subject}}</td>
	<td>{{!m.bdroit_per}}</td>
	<td>{{!m.ishave_contract}}</td>
	<td>{{!m.droit_startime}}至{{!m.droit_endtime}}</td>
	<td>{{!m.droit_mode}}</td>
	<td>{{!m.sqxk_sydy}}</td>
	<td>{{!m.sqxk_syyy}}</td>
	<td>{{!formatobligee_you(m.is_deleg)}}</td>
	<td>{{!formatobligee_you(m.is_wripr)}}</td>
	<td>{{!m.sqxk_syqd}}</td>
	<td>{{!m.sqxk_sycs}}</td>
</tr>
{{~}}