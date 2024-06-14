

const person = require('../person')
const express = require('express');
const route = express.Router()

// person  
route.post('/',async(req,res)=>{

    try {
        // const {name,email,work} = req.body;

// const newPerson = new person();

// newPerson.name = name;

// newPerson.email = email;
// newPerson.work = work;

const data = req.body;
const newPerson = new person(data)

await newPerson.save()
res.send(newPerson)
        
    } catch (error) {
        
        console.log(error)
    }


})

route.get('/',async(req,res)=>{
    let persons = await person.find();
    res.json({persons:persons})
})
route.put('/:id',async(req,res)=>{
    let id = req.params.id;

    try {
        let updateperson = req.body
        let personId = await person.findByIdAndUpdate( id , updateperson)
        if(!personId){
            res.json({msg:'person not found'})
        }
        res.status(200).json({msg:"person updated"})
        
    } catch (error) {
        console.log(error)
    }
})
route.delete('/:id',async(req,res)=>{
    let id = req.params.id;

    try {
        let deletedperson = await person.findByIdAndDelete(id)
        res.status(200).json({msg:"person has been deleted"})
    } catch (err) {
        console.log(err)
        res.status(500),json({msg:"internal server error"})
    }
})

route.get('/:worktype',async(req,res)=>{

    let worktype = req.params.worktype

    try {
        if(worktype == "teacher" || worktype == "student"){
            let response = await person.find({work:worktype})
            res.status(200).json({res:response})
        }else{
            console.log('invalid request')
            res.status(404).json({msg:'invalid request'})
        }
        
    } catch (error) {
        res.status(500).json({msg:'internal server error'})
    }

   
})

module.exports = route
