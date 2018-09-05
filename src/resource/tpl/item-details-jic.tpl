<ul>
	<li>
		<label>作品编号</label>
		<span>{{!it.id }}</span>
	</li>
	<li>
		<label>作品名称</label>
		<span>{{!it.opus_name }}</span>
	</li>
	<li>
		<label>作品类型</label>
		<span>{{!it.opus_type }}</span>
	</li>
	<li class="djjg">
		<label>作品登记机构</label>
		<span>{{!it.work_registration_institution }}</span>
	</li>
	<li class="wtjg">
		<label>作品登记委托机构</label>
		<span>{{!it.commission_agency }}</span>
	</li>

	<li class="new_shouquanren">
		<label>权利人</label>
		<span>{{!it.new_shouquanren }}</span>
	</li>
	<li class="new_beishouquanren">
		<label>被授权人</label>
		<span>{{!it.new_beishouquanren }}</span>
	</li>
	<li class="registration_number">
		<label>作品登记号</label>
		<span>{{!it.registration_number }}</span>
	</li>
	<li class="producer">
		<label>第一出品方名称</label>
		<span>{{!it.producer }}</span>
	</li>
	<!--<li class="joint_producer">
		<label>联合出品方名称</label>
		<span>{{!it.joint_producer }}</span>
	</li>
	<li class="creator_name">
		<label>主创人员名称</label>
		<span>{{!it.creator_name }}</span>
	</li>
	<li class="creator_type">
		<label>主创人员类型</label>
		<span>{{!it.creator_type }}</span>
	</li>
	<li class="storage_medium">
		<label>资源存储介质</label>
		<span>{{!it.storage_medium }}</span>
	</li>
	<li class="storage_medium_size">
		<label>资源大小</label>
		<span>{{!it.storage_medium_size }}</span>
	</li>-->

	<li class="ispay">
		<label>是否付酬</label>
		<span>{{!formatobligee_type(it.ispay) }}</span>
	</li>
	<li class="currency">
		<label>币种</label>
		<span>{{!it.currency }}</span>
	</li>
	<li class="paid_amount">
		<label>付酬金额</label>
		<span>{{!it.paid_amount }}</span>
	</li>
	

	<li>
		<label>题材类型</label>
		<span>{{!it.theme_type }}</span>
	</li>
	<li>
		<label>作品时长</label>
		<span>{{!it.opus_duration }}</span>
	</li>
	<li>
		<label>专辑发表时间</label>
		<span>{{!it.publish_date }}</span>
	</li>

	<li class="czt">
		<label>创作时间</label>
		<span>{{!it.indite_date }}</span>
	</li>
	<li class="sysj">
		<label>上映时间</label>
		<span>{{!it.indite_date }}</span>
	</li>
	
	<li class="slzj">
		<label>收录专辑</label>
		<span>{{!it.embody_album }}</span>
	</li>
	<li class="yj">
		<label>词曲是否有原件</label>
		<span>{{!formatobligee_type(it.is_original)}}</span>
	</li>
	<li class="w100">
		<label>版本说明</label>
		<span>{{!it.version_explain }}</span>
	</li>
	<li class="w100">
		<label>作品简介</label>
		<span>{{!it.opus_briefing }}</span>
	</li>
</ul>