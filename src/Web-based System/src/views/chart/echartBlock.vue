<template>
    <div class="chart">
        <div class="top">
            <el-select v-model="start" style="width: 100px;" size="small" @change="handleSelect">
                <el-option
                    v-for="item in startYears"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                    :disabled="item.disabled"
                ></el-option>
            </el-select>&nbsp;&nbsp;
            <span>-</span>&nbsp;&nbsp;
            <el-select v-model="end" style="width: 100px;" size="small" @change="handleSelect">
                <el-option
                    v-for="item in endYears"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                    :disabled="item.disabled"
                ></el-option>
            </el-select>
        </div>
        <Echart
            width="100%"
            :height="height || '600px'"
            :option="option"
            :unSelectAll="unSelectAll"
            :title="title"
        ></Echart>
    </div>
</template>
<script>
import Echart from '@/components/Echart'
export default {
    data() {
        return {
            start: '',
            end: '',
            startYears: [],
            endYears: []
        }
    },
    methods: {
        handleSelect() {
            const { start, end } = this
            this.$emit('select', { start, end })
        }
    },
    props: {
        years: {
            type: Array,
            default() {
                return []
            }
        },
        option: Object,
        title: String,
        height: String,
        unSelectAll: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        years(val) {
            const start = val[0]
            const end = val[val.length - 1]
            this.end = end
            this.start = start
            this.$emit('select', { start, end })
            const arr = val.map(v => ({
                value: v,
                disabled: false
            }))
            this.endYears = [...arr]
            this.startYears = [...arr]
        },
        start(val) {
            this.endYears.forEach((v, idx) => {
                this.endYears.splice(idx, 1, {
                    ...v,
                    disabled: val >= v.value
                })
            })
        },
        end(val) {
            this.startYears.forEach((v, idx) => {
                this.startYears.splice(idx, 1, {
                    ...v,
                    disabled: val <= v.value
                })
            })
        },
    },
    components: { Echart }
}
</script>

<style lang="scss" scoped>
.chart {
    padding: 20px;
    margin-bottom: 30px;
    .top {
        display: flex;
    }
}
</style>
