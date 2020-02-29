//Input mongoose to operate Mongodb
const mongoose = require('mongoose')
// mongoose.set('debug', true)
//Connect MongoDB
mongoose.connect('mongodb://47.52.162.192:27017/Ning', { useNewUrlParser: true, useCreateIndex: true })

const con = mongoose.connection;
con.on('error', console.error.bind(console, 'Unable to connect to the database!'));
con.once('open', () => {
    console.log('Mongodb connect success')
})



module.exports = con