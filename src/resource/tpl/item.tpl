{{~it :m:n}}
//{{=m.vid_num || 0}}
<tr>
	<th scope="row">{{!m.title}}</th>
	<td>{{!m.type}}</td>
	<td>{{!m.sub}}</td>
	<td>{{!m.source}}</td>
	<td>{{!m.status}}</td>
	<td>{{!m.status}}</td>
	<td>
		{{?m.s=='1'}}
			<button class="btn btn-primary btn-md" data-toggle="modal" data-target="#newly-added">修改</button>
			<button class="btn btn-danger btn-md" data-toggle="modal" data-target="#delete" data-id="1">删除</button>
		{{??}}
			<button class="btn btn-primary btn-look">查看</button>
		{{?}}
		
	</td>
</tr>
{{~}}