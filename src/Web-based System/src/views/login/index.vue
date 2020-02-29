<template>
	<div>
		<el-button type="primary" class="admin" icon="el-icon-user" @click="admin">Admin</el-button>
		<div class="block">
			Username
			<el-input v-model="username"></el-input>
			<br />
			<br />Password
			<el-input v-model="password" type="password"></el-input>
			<br />
			<br />Captcha
			<div class="check-code">
				<div class="el-input__inner code" @click="createCheckCode">{{defaultCheckCode}}</div>
				<el-input v-model="checkCode"></el-input>
			</div>
			<br />

			<br />
			<el-button @click="login" class="login" type="primary">Login</el-button>
			<el-button @click="register" type="text">Register</el-button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			username: "",
			password: "",
			defaultCheckCode: '',
			checkCode: ''
		};
	},
	created() {
		this.createCheckCode()
	},
	methods: {
		createCheckCode() {
			var length = 4;
			var code = "";
			var codeLength = parseInt(length); //The length of the captcha
			//// All candidates that make up the verification code
			var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
				'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
				'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
			// Loop the string that makes up the verification code
			for (var i = 0; i < codeLength; i++) {
				//Get the random verification code subscript
				var charNum = Math.floor(Math.random() * 62);
				// Group synthesis specified character verification code
				code += codeChars[charNum];
			}
			this.defaultCheckCode = code
		},
		check() {
			if (this.checkCode.toUpperCase() === this.defaultCheckCode.toUpperCase()) {
				return true
			} else {
				this.createCheckCode()
				this.$notify.error('Captcha error')
				return false
			}
		},
		login() {
			const { username, password, checkCode } = this;
			if (username && password && checkCode) {
				if (!this.check()) {
					return
				}

				this.$http({
					url: "/user/login",
					method: 'post',
					data: {
						username,
						password
					}
				})
					.then(res => {
						this.$router.push("/input");
					});
			} else {
				this.$notify.error('Please check that all fields have been filled in')
			}

		},
		register() {
			this.$router.push('/register')
		},
		admin() {
			window.open('http://localhost:1234')
		}
	}
};
</script>
<style lang="scss" scoped>
.block {
	width: 350px;
	margin: 0 auto;
	padding-top: 200px;
	.login {
		width: 100%;
		margin-left: 0;
		margin-bottom: 15px;
	}
	.check-code {
		display: flex;
		justify-content: space-between;
		> .code {
			cursor: pointer;
			width: 45%;
			background: #e6a23c;
			color: #fff;
			font-weight: bolder;
			// line-height: 60px;
			text-align: center;
			vertical-align: middle;
			font-style: italic;
			font-size: 24px;
		}
	}
}
.admin {
	position: fixed;
	right: 10px;
	top: 10px;
}
</style>
