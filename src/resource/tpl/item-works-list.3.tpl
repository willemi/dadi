{{~it :m:n}}
//{{=m.vid_num || 0}}
<tr>
	<th scope="row">{{!n+1}}</th>
	<td>{{!m.id}}</td>
	<td><a class="btn-details aaa" data-id="{{=m.id}}">{{!m.opus_name}}</a></td>
	<td>{{!m.opus_type}}</td>
	<td>{{!m.theme_type}}</td>
	<td>{{!m.contract_name}}</td>
	<td>{{!m.new_shouquanren}}</td>
	<td>{{!m.create_time}}</td>
	<td>{{!m.creater}}</td>
	<td id="{{!m.id}}">
		<button class="btn btn-primary works-list-edit" data-classify="{{!m.opus_classify}}">修改</button>
		<button class="btn btn-default worksList-dele">删除</button>
	</td>
</tr>
{{~}}