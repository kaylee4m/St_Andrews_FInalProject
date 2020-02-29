<template>
	<div id="app">
		<!-- 登陆页不需要菜单等布局 -->
		<div class="login-wrapper" v-if="$route.path === '/login' || $route.path === '/register' ">
			<transition name="fade-transform" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>

		<el-container v-else>
			<el-aside width="250px">
				<h3 class="logo">PURE</h3>
				<el-menu
					:default-active="$route.path"
					:collapse="false"
					:collapse-transition="false"
					background-color="#434343"
					text-color="#fff"
					unique-opened
					active-text-color="#fff"
				>
					<NavMenu :collapse="false" :menus="menus"></NavMenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header>
					<div class="curr-info">
						<!-- <el-breadcrumb separator="/">
							<el-breadcrumb-item
							 v-for="item in breadcrumbs"
							 :key="item"
							>{{item}}</el-breadcrumb-item>
						</el-breadcrumb>-->
					</div>
					<HeaderBar></HeaderBar>
				</el-header>
				<el-main>
					<transition name="fade-transform" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
import { NavMenu, HeaderBar } from "@/components/laylout/";
import menus from "@/const/menu.js";

export default {
	data() {
		return {
			menus,
			isCollapse: window.innerWidth < 1440 //分辨率小于1440默认折叠菜单
		};
	},
	computed: {
		breadcrumbs() {
			const str = this.$route.name || "";
			return str.split("/");
		}
	},
	components: {
		NavMenu,
		HeaderBar,
	}
};
</script>

<style scoped lang="scss">
.el-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	color: #333;
	line-height: $__header_H;
	// box-shadow: $__shadow;
	border-bottom: 1px solid #ddd;
	.collapse-icon {
		transform: rotate(540deg);
	}
}

.el-aside {
	color: #333;
	height: 100vh;
	overflow-x: hidden;
	// transition: all 0.5s;
	.logo {
		// width: calc(100% - 1px);
		height: $__header_H;
		// background: white;
		text-align: center;
		color: white;
		line-height: $__header_H;
		background: #434343;
	}
}

.el-main {
	background: #f2f2f2;
	max-height: calc(100vh - #{$__header_H});
	overflow: auto;
}
.el-menu {
	height: calc(100% - #{$__header_H});
	width: calc(100% + 1px);
}
.pd-shouqicaidan {
	cursor: pointer;
	font-size: 28px;
	transition: transform 0.3s;
	margin-right: 20px;
	&:hover {
		color: $__theme;
	}
}
.curr-info {
	display: flex;
	align-items: center;
}
</style>