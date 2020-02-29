//Controller layer

const UserModel = require('../models/user')

class User {
    //Register Logic
    static async register(ctx) {
        const { username, password } = ctx.request.body
        const userInfo = await UserModel.read({ username })
        if (userInfo) {
            ctx.body = {
                succ: false,
                msg: 'The username has already existed',
                err: 'The username has already existed'
            }
            return
        }
        await UserModel.create({ username, password })
        ctx.body = {
            succ: true,
        }
    }
    //Login Logic
    static async login(ctx) {
        const { username, password } = ctx.request.body
        const userInfo = await UserModel.read({ username })
        if (userInfo && userInfo.password === password) {
            ctx.body = {
                succ: true,
                data: userInfo
            }
        } else {
            ctx.body = {
                succ: false,
                err: 'User or password error',
                msg: 'User or password error'
            }
        }
    }

    static async editUserInfo(ctx) {
        const { username, password, email, organisation, postition, userId } = ctx.request.body
        await UserModel.findByIdAndUpdate(userId, { username, password, email, organisation, postition })
        ctx.body = {
            succ: true,
        }
    }
}

module.exports = User