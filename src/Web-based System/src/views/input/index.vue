<template>
	<div>
		<div class="wrapper">
			<div class="block">
				<br />
				<el-form :model="form" label-width="260px">
					<!-- <el-form-item label="Activity Name">
                        <el-input v-model="form.activityName" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="Period(Start Date)">
                        <el-input v-model="form.periodStartDate" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="Period(End Date)">
                        <el-input v-model="form.periodEndDate" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="Managing Organisational Unit">
                        <el-input v-model="form.managingOrganisationalUnit" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="Info">
                        <el-input v-model="form.info" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="Type">
                        <el-input v-model="form.type" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="Person Associations Name">
                        <el-input v-model="form.personAssociationsName" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="School">
                        <el-input v-model="form.school" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="Centres and Institute">
                        <el-input v-model="form.centresAndInstitute" style="width: 300px;"></el-input>
					</el-form-item>-->

					<el-form-item v-for="(v,idx) in cols" :key="idx" :label="v.label">
						<el-select
							style="width: 650px;"
							v-if="v.isSelect"
							v-model="form[v.prop]"
							filterable
							:allow-create="v.hasFilter"
							:multiple="v.multi"
							:default-first-option="v.hasFilter"
						>
							<el-option v-for="item in v.filters" :key="item.text" :label="item.text" :value="item.value"></el-option>
						</el-select>
						<el-input v-else v-model="form[v.prop]" style="width: 650px;"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit">Submit</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="wrapper">
			<Upload></Upload>
		</div>
	</div>
</template>
<script>
import formGroup from '@/mixins/formGroup'
import Upload from './upload'
export default {
	mixins: [formGroup],
	components: { Upload },
	created() {
		this.form = this.$route.query || {}
	},
	methods: {
		submit() {
			this.$http({
				url: '/data',
				data: this.form
			}).then(res => {
				this.$message.success('OK')
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
</style>
