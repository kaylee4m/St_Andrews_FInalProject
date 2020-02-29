import { orgs } from '@/const/orgs'
export default {
    created() {
        this.getFilters()
    },
    data() {
        return {
            form: {},
            cols: [
                { filters: [], label: 'Activity Name', prop: 'activityName', hasFilter: false, },
                { filters: [], label: 'Period(Start Date)', prop: 'periodStartDate', hasFilter: true, isSelect: true, },
                { filters: [], label: 'Period(End Date)', prop: 'periodEndDate', hasFilter: true, isSelect: true, },
                { filters: orgs.map(v => ({ text: v, value: v })), label: 'ManagingOrganisationalUnit', prop: 'managingOrganisationalUnit', hasFilter: false, isSelect: true, },
                { filters: [], label: 'Info', prop: 'info', hasFilter: false },
                { filters: [], label: 'Type', prop: 'type', hasFilter: true, isSelect: true },
                { filters: [], label: 'Person Associations Name', prop: 'personAssociationsName', hasFilter: false },
                // { filters: [], label: 'School', prop: 'school', hasFilter: true },
                // { filters: [], label: 'Centres and Institute', prop: 'centresAndInstitute', hasFilter: true },
            ],
        };
    },
    methods: {
        getAllValue(field) {
            return this.$http({
                url: '/data/getAllValue',
                data: { field },
                method: 'get'
            })
        },
        getFilters() {
            const hasFilterIdxArr = []
            const hasFilterPropArr = []
            this.cols.forEach((v, idx) => {
                if (v.hasFilter) {
                    hasFilterIdxArr.push(idx)
                    hasFilterPropArr.push(v.prop)
                }
            })
            Promise.all(hasFilterPropArr.map(v => this.getAllValue(v))).then(arr => {
                arr.forEach((item, idx) => {
                    const currIndex = hasFilterIdxArr[idx]
                    const currItem = this.cols[currIndex]
                    this.cols.splice(currIndex, 1, {
                        ...currItem,
                        filters: item.filter(Boolean).sort((a, b) => a - b).map(v => ({ text: v, value: v })),
                        // filterMethod: (value, row, col) => {
                        // 	this.filterHandle(currItem.prop, value)
                        // }
                    })
                })
            })
        },
    }
}