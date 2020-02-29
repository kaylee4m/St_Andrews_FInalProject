const { Parser } = require('json2csv');
const send = require('koa-send');
const fs = require('fs');

const ActivityDetailModel = require('../models/activityDetail')

class ActivityDetail {
    static async save(ctx) {
        const data = ctx.request.body
        await ActivityDetailModel.create(data)
        ctx.body = {
            succ: true,
        }
    }
    static async getList(ctx) {
        const { pageSize = 20, pageNum, cond = {} } = ctx.request.body
        const conditions = {}
        for (let key in cond) {
            conditions[key] = new RegExp(cond[key], 'i')
        }
        const count = await ActivityDetailModel.getCount(conditions)
        const list = await ActivityDetailModel.getList(pageSize, pageNum, conditions)
        ctx.body = {
            succ: true,
            data: {
                count,
                list
            }
        }
    }
    static async download(ctx) {
        const name = ctx.params.name;
        const path = `/public/download/${name}`;
        ctx.attachment(path);
        await send(ctx, path);
    }
    static async csv(ctx) {
        const json = await ActivityDetailModel.getAll()
        const fields = [
            "activityTitle",
            "date",
            "nameOfPrimaryContact",
            "contactDetailsOfPrimaryContact",
            "undergraduates",
            "postgraduates",
            "postdoctorate",
            "academicStaff",
            "profStaff",
            "external",
            "universityUnit",
            "universitySchool",
            "eventTitle",
            "project",
            "targetAudience",
            "evaluated",
            "involve",
            "generalPublic",
            "note",
        ]
        const json2csvParser = new Parser({ fields });
        const result = json2csvParser.parse(json);
        const fileName = `activity_detail_${new Date().getTime()}.csv`
        const src = `./public/download/${fileName}`
        await fs.writeFileSync(src, result);
        ctx.body = {
            succ: true,
            data: fileName
        }
    }
}

module.exports = ActivityDetail