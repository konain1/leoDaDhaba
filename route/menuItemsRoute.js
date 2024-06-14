

const express = require('express');
const menuItems = require('../menu');
const route = express.Router()

route.post('/',async(req,res)=>{
    let data = req.body;
    

    let allItems = new menuItems(data)
   await allItems.save()

   res.json(data)
})

route.get('/',async(req,res)=>{
    let items = await menuItems.find();
    res.json({items:items})
})

route.get('/:taste',async(req,res)=>{

    let taste = req.params.taste;

    try {
        if(taste == "spicy" || taste == "sour" || taste == "sweet"){
            let tasty = await menuItems.find({taste:taste})
            res.status(200).json({menu:tasty})
        }else{
            res.status(404).json({msg:"invalid order "})
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:"internal server error",error})
    }
})

module.exports = route