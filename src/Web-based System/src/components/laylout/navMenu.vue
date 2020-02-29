<template>
	<div :class="{collapse}"> 
		<template v-for="sub in menus">
			<el-submenu
			 v-if="sub.children"
			 :key="sub.link"
			 :index="sub.link"
			>
				<template slot="title">
					<i
					 v-if="sub.icon"
					 :class="sub.icon"
					 class="iconfont"
					></i>
					<span class="title-text">{{getTitle(sub.title)}}</span>
				</template>
				<!-- Recursively handle nested routines -->
				<navMenu :menus="sub.children" :collapse="collapse"></navMenu>
			</el-submenu>
			<el-menu-item
			 v-else
			 :key="sub.link"
			 @click.native="$router.push(sub.link)"
			 :index="sub.link"
			>
				<i
				 v-if="sub.icon"
				 class="iconfont"
				 :class="sub.icon"
				></i>
				<span slot="title" class="title-text">{{getTitle(sub.title)}}</span>
			</el-menu-item>
		</template>
	</div>
</template>
<script>


export default {
	name: "navMenu",
	props: {
		menus: {
			type: Array,
			default: () => []
		},
		collapse: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		getTitle(str = "") {
			const arr = str.split("/");
			const l = arr.length;
			return arr[l - 1];
		} 
	},
};
</script>
<style lang="scss" scoped>
.iconfont {
	font-size: 18px;
	margin-right: 25px;
	color: rgba(255, 255, 255, 0.7);
}
.title-text {
	font-weight: 300;
}
.el-menu-item.is-active {
	background-color: $__theme !important;
}
</style>

