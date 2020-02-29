const multer = require('koa-multer')
const router = require('koa-router')()
const ActivityDetail = require('../controllers/activityDetail')

router.prefix('/activityDetail')

router
    .post('/', ActivityDetail.save)
    .get('/getList', ActivityDetail.getList)
    .get('/csv', ActivityDetail.csv)
    .get('/download/:name', ActivityDetail.download)

module.exports = router
