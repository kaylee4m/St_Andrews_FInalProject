<template>
	<div class="wrapper">
		<EchartBlock
			:years="years"
			:option="opts"
			v-loading="loading"
			:title="title"
			:height="height"
            :unSelectAll="unSelectAll"
			@select="handleSelect"
		></EchartBlock>

	</div>
</template>
<script>
import EchartBlock from './echartBlock'
export default {
	data() {
		return {
			years: [],
            opts: {},
            loading: false,
            chartType: '',
            height: '',
            unSelectAll: false
		}
	},
	created() {
        this.getAllYears()
        const {chartType,height,unSelectAll,title} = this.$route.query
        this.chartType = chartType
        this.height = height
        this.title = title
        this.unSelectAll = !!unSelectAll || unSelectAll === 'true'
    },
	methods: {
		getAllYears() {
			this.$http({
				url: '/data/getAllValue',
				data: { field: 'periodStartDate' },
				method: 'get'
			}).then(res => {
				this.years = res.sort((a, b) => a - b)
			})
		},
		getStackData(res, field, type) {
			const schools = Object.keys(res)
			const years = Object.keys(Object.values(res)[0]).sort((a, b) => a - b)
			const series = []
			for (let school in res) {
				const yearsData = Object.entries(res[school]).sort((a, b) => a[0] - b[0]).map(v => v[1])		//按年份排序
				series.push({
					name: school,
					type,
					stack: type === 'line' ? null : 'total',
					data: yearsData
				})
			}
			const options = {
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: schools,
					top: 35,
				},
				grid: {
					bottom: 20,
					height: '70%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: years
				},
				yAxis: {
					type: 'value'
				},
				series
			};
			return options
		},
		handleSelect({ start, end }) {          
            const type = this.chartType
			if (start > end) {
				this.$notify.error('input error')
				return
			}
			let options = {}
			let field = ''
			switch (type) {
				case 'stackLine':
					field = 'orgType'
					this.loading = true
					this.mapFieldToYearsNum({ start, end, field }).then(res => {
						this.loading = false
						this.opts = this.getStackData(res, field, 'line')
					})
					break;
				case 'stackBar':
					field = 'type'
					this.loading = true
					this.mapFieldToYearsNum({ start, end, field }).then(res => {
						this.loading = false
						this.opts = this.getStackData(res, field, 'bar')
					})
					break;
				case 'pie':
					field = 'orgType'
					this.loading = true
					this.mapOrgTypeToNum({ start, end, field }).then(map => {
						this.loading = false
						const seriesData = []
						for (let key in map) {
							seriesData.push({
								name: key,
								value: [map[key]],
							})
						}
						options = {
							tooltip: {
								trigger: 'item',
								formatter: "{a} <br/>{b} : {c} ({d}%)"
							},
							series: [
								{
									name: 'School',
									type: 'pie',
									// radius: '55%',
									minAngle: 15,
									center: ['50%', '50%'],
									data: seriesData.sort(function (a, b) { return a.value - b.value; }),
									roseType: 'radius',
									label: {
									},
									labelLine: {
									},
									itemStyle: {
									},
									animationType: 'scale',
									animationEasing: 'elasticOut',
									animationDelay: function (idx) {
										return Math.random() * 200;
									}
								}
							]
						}
						this.opts = options
                    })
                    break;
				case 'bar':
					field = 'orgType'
					this.loading = true
					this.mapOrgTypeToNum({ start, end, field }).then(map => {
						this.loading = false
						const series = [{
							data: Object.values(map),
							type: 'bar'
						}]
						const xAxis = Object.keys(map)
						options = {
							yAxis: {
								type: 'category',
								data: xAxis
							},
							tooltip: {},
							grid: {
								// containLabel: true,
								left: 300
							},
							xAxis: {
								type: 'value'
							},
							label: {
								ellipsis: true
							},
							series: series
						};
						this.opts = options
                    })
                    break;
				case 'line':
					field = 'managingOrganisationalUnit'
					this.loading = true
					this.mapFieldToYearsNum({ start, end, field }).then(res => {
                        this.loading = false
						this.opts = this.getStackData(res, field, 'line')
                    })
                    break;
				default:
                    return 
			}
		},
		mapOrgTypeToNum(query) {
			return this.$http({
				url: '/data/mapOrgTypeToNum',
				data: query,
				method: 'get'
			})
		},
		mapFieldToYearsNum(query) {
			return this.$http({
				url: '/data/mapFieldToYearsNum',
				data: query,
				method: 'get'
			})
		}
	},
	components: { EchartBlock }
}
</script>

<style lang="scss" scoped>
.wrapper {
	display: flex;
	justify-content: space-around;

	flex-direction: column;
	// flex-wrap: wrap;
}
.chart {
	padding: 20px;
	background: white;
	margin-bottom: 30px;
}
</style>
