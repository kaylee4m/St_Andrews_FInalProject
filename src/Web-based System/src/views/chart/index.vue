<template>
	<div class="wrapper">
		<el-button v-for="(item,idx) in urls" :key="idx" type="text" @click="go(item)"> {{item.title}}</el-button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			urls: [
				{title: 'Line Chart Trend: Number - Unit Types ',height: '900px',chartType: 'stackLine'},
				// {title: 'Pie Charts',height: '',chartType: 'pie'},
				{title: 'Stacked Bar Chart: Number - Activity Type',height: '1200px',chartType: 'stackBar'},
				{title: 'Bar Chart: Number - Number - Unit Types',height: '',chartType: 'bar'},
				{title: 'Line Chart Trend: Number - Unit ',height: '1500px',chartType: 'line',unSelectAll: true},
			]
		}
	},
	methods: {
		go(item) {
			this.$router.push({
				path: '/chart/item',
				query: item
			})
		}
	}
}
</script>
<style lang="scss" scoped>

</style>
