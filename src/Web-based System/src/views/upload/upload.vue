<template>
	<div class="wrapper" v-loading="loading">
		<el-upload
			action="http://localhost:3000/data/upload"
			:file-list="fileList"
			:before-upload="handleBefore"
			:on-success="handleSucc"
			:before-remove="handleRemove"
			:on-error="handleErr"
		>
			<el-button size="big" type="primary">Upload</el-button>
		</el-upload>
	</div>
</template>
<script>
export default {
	data() {
		return {
			fileList: [],
			loading: false
		}
	},
	methods: {
		handleBefore(file) {
			if (file.type === 'application/json') {
				this.loading = true
				return true
			} else {
				this.$notify.error('only .json file is allowed')
				return false
			}
		},
		handleSucc(res) {
			if(res.succ) {
                this.$notify.success('upload success')
			}else {
				this.$notify.error('upload error')
				this.fileList = []
			}
			this.loading = false	
		},
		handleErr() {
			this.loading = false
			this.$notify.error('upload error')
		},
		handleRemove() {
			return false
		}
	}
}
</script>

<style lang="scss" scoped>
.wrapper {
	width: 500px;
	padding: 30px;
	background: white;
}
</style>


