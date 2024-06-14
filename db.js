
const mongoose = require('mongoose')

const mongodbURL = mongoose.connect('mongodb://127.0.0.1:27017/leoDaDhaba')

const db = mongoose.connection;
db.on('connected',()=>console.log('mongo is connected'))
db.on('error',(err)=>console.log('mongo has erro = ',err))
db.on('disconnected',()=>console.log('mongo is disconnected'))

module.exports = db