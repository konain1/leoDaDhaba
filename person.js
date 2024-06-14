
const mongoose = require('mongoose')


const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    work:{
        type:String,
        emum:["student","teacher"],
        require:true
    }
})

const person = mongoose.model('person',personSchema)

module.exports = person