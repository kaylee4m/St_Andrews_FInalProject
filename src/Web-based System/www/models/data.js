// This file is a database model file, used to define a collection of json data, export database operations
const mongoose = require('mongoose')
const db = require('../db/mongodb')

// The structure of the json data 
var DataShema = new mongoose.Schema({
    activityName: String,
    periodStartDate: Number,
    periodEndDate: Number,
    managingOrganisationalUnit: String,
    // organisation: Array,
    info: String,
    type: String,
    personAssociationsName: String,
    orgType: String
    // school: String,
    // centresAndInstitute: String
}, {
        timestamps: { createdAt: 'createdTime', updatedAt: 'updatedTime' }
    })

// Model of json generationvar Data = db.model('Data', DataShema)

// Export json
const Dao = {
    create(payload) {
        return new Data(payload).save()
    },
    saveMany(arr) {
        return Data.insertMany(arr.map(v => new Data(v)))
    },
    distinct(field) {
        return Data.distinct(field)
    },
    getCount(conditions) {
        return Data.count(conditions)
    },
    getList(pageSize, pageNum, conditions) {
        const start = (pageNum - 1) * pageSize
        return Data.find(conditions).sort({ createdTime: 'desc' }).skip(start).limit(pageSize)
    },
    getDataByPeriod(start, end, field = '') {
        const cond = {}
        if (end) {
            cond.$lte = +end
        }
        if (start) {
            cond.$gte = +start
        }
        return Data.find({ periodStartDate: cond }, `${field} periodStartDate`)
    }
}

module.exports = Dao

// Dao.distinct('managingOrganisationalUnit').then(res => {
//     console.log(res.length, 'LENGTH')
// })