<template>
    <div ref="echart" :style="{width,height}"></div>
</template>
<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            instance: null
        }
    },
    mounted() {
        this.instance = echarts.init(this.$refs.echart)
    },
    props: {
        width: String,
        height: String,
        title: String,
        option: {
            type: Object,
            default() {
                return {}
            }
        },
        unSelectAll: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        option: {
            deep: true,
            handler(val) {
                if (!this.instance) { return }
                this.instance.dispose()
                this.instance = echarts.init(this.$refs.echart)
                const option = JSON.parse(JSON.stringify(val))
                if (option.legend && option.legend.data && option.legend.data.length) {
                    option.legend.data.sort()
                    console.log(this.unSelectAll,'unselectall')
                    if (this.unSelectAll) {
                        const selected = {}
                        option.legend.data.forEach(v => selected[v] = false)
                        option.legend.selected = selected
                    }
                }
                this.instance.setOption({
                    title: {
                        text: this.title,
                        left: 'center'
                    },
                    ...option
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
</style>


