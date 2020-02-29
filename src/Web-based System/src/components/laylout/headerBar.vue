<template>
	<div class="header-bar">
		<div>
			<el-dropdown>
				<div class="username">
					<!-- <span>admin</span> -->
					<i class="el-icon-setting" style="margin-left:15px"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<!-- <el-dropdown-item>Change the password</el-dropdown-item> -->
					<el-dropdown-item @click.native="logout">Logout</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>
<script>

export default {
	methods: {
		logout() {
			this.$confirm('Want to log out the system?', 'Alarm', {
				confirmButtonText: 'Log Out',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
				this.$router.push('/login')
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Keep login'
				})
			})
		}
	},
	created() {

	},
};
</script>
<style lang="scss" scoped>
.header-bar {
	display: flex;
	justify-content: flex-end;
	.username {
		cursor: pointer;
	}
}
</style>


