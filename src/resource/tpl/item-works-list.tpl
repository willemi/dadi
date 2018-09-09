{{~it :m:n}}
//{{=m.vid_num || 0}}
<tr>
	<th scope="row">{{!n+1}}</th>
	<td scope="row">{{=m.id}}</td>
	<td><a class="btn-details aaa" data-id="{{=m.id}}">{{!m.opus_name}}</a></td>
	<td>{{=m.opus_type}}</td>
	<td>{{=m.theme_type}}</td>
	
	<td id="{{=m.data_status}}">{{=formatState(m.data_status)}}</td>
	<td id="{{!m.id}}">
		<button class="btn btn-primary works-list-bg  {{!showXg(m.creater,m.data_status)}}" data-olds="{{!m.new_shouquanren}}" data-oldb="{{!m.new_beishouquanren}}" data-toggle="modal" data-target="#modal-changeRights">权利变更</button>
		<button id="4" class="btn btn-primary works-list-sh z-4">审核</button>
		<button id="3" class="btn btn-primary works-list-edit z-3 {{!showXg(m.creater,m.data_status)}}">修改</button>
		<button id="5" class="btn btn-default worksList-dele z-5" >删除</button>
	</td>
</tr>
{{~}}