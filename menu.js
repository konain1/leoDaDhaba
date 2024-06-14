
const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    taste:{
        type:String,
        emum:["spicy","sweet","sour"],
        require:false
    },
    price:{
        type:Number,
        require:true
    },
    num_sales:{
        type:Number,
        default:0
    }
})

const menuItems = mongoose.model('menuItems',menuSchema)

module.exports = menuItems