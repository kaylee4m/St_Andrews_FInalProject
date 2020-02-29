const router = require('koa-router')()
const Users = require('../controllers/user')

router.prefix('/user')

const err = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('time error')
    }, 100);
})

router
    .post('/login', Users.login)
    .post('/register', Users.register)

module.exports = router
