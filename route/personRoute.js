

const person = require('../person')
const express = require('express');
const route = express.Router()
const  {jwtAuthMiddleware,generateToken} = require('../jwt')


// person  
route.post('/',async(req,res)=>{

    try {

        const data = req.body;
        const newPerson = new person(data)


        const token = generateToken(newPerson.email)
        await newPerson.save()
        res.send(token)
        
    } catch (error) {
        
        console.log(error)
    }


})
route.post('/login',async(req,res)=>{
    let {username,password} = req.body;

    try {
     const user = await person.findOne({username:username})


   if(!user || (!await user.comparePassword(password) )) {
    res.status(401).json({msg:"username or password invalid"})
   }
 
   const token = generateToken(user.email)

   res.json({token})
        
    } catch (error) {
        console.log(error)
     throw error
    }

   

})

route.get('/',jwtAuthMiddleware,async(req,res)=>{
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

route.get('/profile',jwtAuthMiddleware,async(req,res)=>{

    let userData = req.user;
    console.log(userData)

    try {   
        if(!userData){ res.json({msg:"Unauthorize"})}

        let user = await person.findOne({email:userData})
        res.json({user})
        
    } catch (error) {
        console.log(error);
        throw error
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
