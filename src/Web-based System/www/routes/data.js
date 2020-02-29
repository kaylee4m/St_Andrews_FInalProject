const multer = require('koa-multer')
const router = require('koa-router')()
const Data = require('../controllers/data')

var storage = multer.diskStorage({
    // File save path
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    // Modify file name
    filename: function (req, file, cb) {
        cb(null, Date.now() + "." + file.originalname);
    }
})

var upload = multer({ storage: storage });

router.prefix('/data')

router
    .post('/', Data.save)
    .post('/upload', upload.single('file'), Data.upload)
    .get('/getAllValue', Data.getAllValue)
    .post('/getList', Data.getList)
    .get('/mapFieldToYearsNum', Data.mapFieldToYearsNum)
    .get('/mapOrgTypeToNum', Data.mapOrgTypeToNum)

module.exports = router
