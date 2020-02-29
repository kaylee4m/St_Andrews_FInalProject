<template>
    <div>
        <div class="wrapper">
            <div class="search-items">
                <div class="item" v-for="(v,idx) in cols" :key="idx">
                    <span>{{v.label}}</span>
                    <el-select
                        style="width: 650px;"
                        v-if="v.isSelect"
                        v-model="form[v.prop]"
                        filterable
                        :allow-create="v.hasFilter"
                        :multiple="v.multi"
                        :default-first-option="v.hasFilter"
                    >
                        <el-option
                            v-for="item in v.filters"
                            :key="item.text"
                            :label="item.text"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input v-else v-model="form[v.prop]" style="width: 650px;"></el-input>
                </div>
            </div>
            <el-divider></el-divider>
            <el-button @click="reset">Reset</el-button>
            <el-button type="primary" @click="search">Search</el-button>
        </div>

        <div class="table-wrapper">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column
                    show-overflow-tooltip
                    v-for="(col,idx) in cols"
                    :key="idx"
                    :width="col.width"
                    :prop="col.prop"
                    :label="col.label"
                ></el-table-column>
            </el-table>
            <br />
            <br />
            <el-pagination
                background
                :current-page="pageNum"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="total"
                @current-change="goPage"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
// import moment from "moment";
import formGroup from '@/mixins/formGroup'
export default {
	mixins: [formGroup], 
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            tableData: [],
            total: 0
        };
    },
    created() {
        this.getList()
    },
    methods: {
        reset() {
            this.form = {}
            this.search()
        },
        search() {
            this.goPage()
        },
        filterHandle(value, row, col) {
            console.log(value, row, col)
        },
        goPage(pageNum) {
            this.pageNum = pageNum
            this.getList(pageNum)
        },
        getList(pageNum = 1) {
            this.$http({
                url: '/data/getList',
                data: {
                    pageNum,
                    pageSize: this.pageSize,
                    cond: this.form
                }
            }).then(res => {
                this.tableData = res.list
                this.total = res.count
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.wrapper {
    background: white;
    padding: 30px;
    margin-bottom: 20px;
    .search-items {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 10px;
        > .item {
            width: 45%;
            display: flex;
            margin-bottom: 10px;
            align-items: center;
            span {
                width: 250px;
                font-size: 14px;
                text-align: right;
                margin-right: 10px;
            }
            >>> .el-tag {
                max-width: 200px !important;
                display: block !important;
            }
        }
    }
}
.table-wrapper {
    padding: 30px;
    background: white;
}
</style>
