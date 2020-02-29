// This file is a database model file, used to define a collection of json data, export database operations

const mongoose = require('mongoose')
const db = require('../db/mongodb')

// The structure of the json data 
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        index: true
    },
    password: String,
    email: String,
    organisation: String,
    postition: String
})

//// Model of user generation
const User = db.model('User', UserSchema)

// Export json
module.exports = {
    // Create new user
    create(payload) {
        return new User(payload).save()
    },
    // Read user information
    read({ username }) {
        return User.where({ username }).findOne()
    },
    findByIdAndUpdate(id, data) {
        return User.findByIdAndUpdate(id, data)
    },
}