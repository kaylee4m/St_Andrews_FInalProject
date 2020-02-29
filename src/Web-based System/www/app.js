const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');


// 导入路由
const data = require('./routes/data')
const user = require('./routes/user')
const activityDetail = require('./routes/activityDetail')


// error handler
// onerror(app)
app.use(cors());

// app.use(async (ctx, next) => {
//    // Capture error middleware:
//    // In the process, when the first error is caught, it will enter the catch branch. The statement after the wrong statement is no longer executed.
//    // Add 'await' before all asynchronous statements, or return (recommended await) or the error will not be caught.
//    // Add 'await' before all 'next()'
//     try {
//         await next()
//     } catch (error) {
//         ctx.body = {
//             succ: false,
//             err: error,
//             msg: error.message || error.toString() || ''
//         }
//     }
// })
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(data.routes(), data.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(activityDetail.routes(), activityDetail.allowedMethods())



// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
