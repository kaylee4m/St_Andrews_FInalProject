<template>
	<div>
		<div class="wrapper">
			<div class="block">
				<br />
				<el-form :model="form" label-width="600px" label-position="left">
					<el-form-item v-for="(v,idx) in cols" :key="idx" :label="v.label">
						<el-select
							style="width: 250px;"
							v-if="v.type === 'select'"
							v-model="form[v.prop]"
							filterable
							:allow-create="v.hasFilter"
							:multiple="v.multi"
							:default-first-option="v.hasFilter"
						>
							<el-option
								v-for="item in v.options"
								:key="item.title"
								:label="item.title"
								:value="item.value"
							></el-option>
						</el-select>
						<el-date-picker
							style="width: 250px;"
							v-else-if="v.type === 'date'"
							v-model="form[v.prop]"
							type="date"
							value-format="yyyy/M/d"
							range-separator="/"
						></el-date-picker>
						<el-input v-else v-model="form[v.prop]" :type="v.inputType" style="width: 250px;"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit">Submit</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="table-wrapper">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column
					show-overflow-tooltip
					v-for="(col,idx) in cols"
					:key="idx"
					:width="col.width"
					:prop="col.prop"
					:label="col.label"
				></el-table-column>
			</el-table>
			<br />
			<br />
			<el-pagination
				background
				:current-page="pageNum"
				:page-size="pageSize"
				layout="prev, pager, next"
				:total="total"
				@current-change="goPage"
			></el-pagination>
			<br />
			<el-button type="primary" @click="download">Download</el-button>
		</div>
	</div>
</template>
<script>

export default {
	data() {
		return {
			form: {},
			cols: [
				{ prop: 'activityTitle', label: 'Activity Title', },
				{ prop: 'date', label: 'Date of activity', type: 'date' },
				{ prop: 'nameOfPrimaryContact', label: 'Name of primary contact' },
				{ prop: 'contactDetailsOfPrimaryContact', label: 'Contact details of primary contact' },
				{ prop: 'undergraduates', label: 'Undergraduates', inputType: 'number' },
				{ prop: 'postgraduates', label: 'Postgraduates', inputType: 'number' },
				{ prop: 'postdoctorate', label: 'Postdoctorate', inputType: 'number' },
				{ prop: 'academicStaff', label: 'Academic Staff', inputType: 'number' },
				{ prop: 'profStaff', label: 'Prof Staff', inputType: 'number' },
				{ prop: 'external', label: 'External', inputType: 'number' },
				{ prop: 'universityUnit', label: 'University Unit' },
				{ prop: 'universitySchool', label: 'University School' },
				{ prop: 'eventTitle', label: 'Event Title' },
				{ prop: 'project', label: 'Project', type: 'select', options: ['Exploration', 'science discovery day'].map(v => ({ value: v, title: v })) },
				{ prop: 'Postcode', label: 'Postcode where activity occurred' },
				{
					prop: 'targetAudience', label: 'Target Audience', type: 'select',
					options: [
						"Primary school ",
						"Hard to reach primary school",
						"Secondary school ",
						"Hard to reach secondary school ",
						"Family audience ",
						"Hard to reach family audience ",
						"Not specified ",
						"Youth group ",
						"Hard to reach youth group",
						"Adult group ",
						"Hard to reach adult group",
						"General Public"
					].map(v => ({ value: v, title: v }))
				},
				{ prop: 'evaluated', label: 'Was the event evaluated', type: 'select', options: ['Yes', 'No'].map(v => ({ value: v === 'Yes' ? 'y' : 'n', title: v })) },
				{
					prop: 'involve', label: `Did you're activity involve any input from the Public Engagement with Research Team?`, type: 'select',
					options: ['Yes', 'No'].map(v => ({ value: v === 'Yes' ? 'y' : 'n', title: v }))
				},
				{
					prop: 'generalPublic', label: 'General Public', type: 'select',
					options: [
						"Hard to reach' High School",
						"General' adult group",
						"Hard to reach' adult group",
						"General youth group",
						"Hard to reach' youth group",
						"Hard to reach' Public",
						"General family audience",
						"Hard to reach' family audience"
					].map(v => ({ value: v, title: v }))
				},
				{ prop: 'note', label: 'Note (External Info)' },
			],
			pageNum: 1,
			pageSize: 10,
			tableData: [],
			total: 0
		}
	},
	created() {
		this.getList()
	},
	methods: {
		submit() {
			this.$http({
				url: '/activityDetail',
				data: this.form
			}).then(res => {
				this.$message.success('OK')
				this.getList()
			})
		},
		goPage(pageNum) {
			this.pageNum = pageNum
			this.getList(pageNum)
		},
		getList(pageNum = 1) {
			this.$http({
				url: '/activityDetail/getList',
				data: {
					pageNum,
					pageSize: this.pageSize,
				},
				method: 'get'
			}).then(res => {
				this.tableData = res.list
				this.total = res.count
			})
		},
		download() {
			this.$http({
				url: '/activityDetail/csv',
				method: 'get'
			}).then(res => {
				window.open('http://localhost:3000/activityDetail/download/' + res)
			})
		}
	}
};
</script>
<style lang="scss" scoped>
.wrapper {
	background: white;
}
.block {
	width: 100%;
	padding: 30px;
	margin-bottom: 15px;
}
.qrcode {
	border: 1px solid;
	width: 150px;
	height: 150px;
}
.table-wrapper {
	padding: 30px;
	background: white;
}
</style>