
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


personSchema.pre('save',async function(next){
    const person = this

    if(!person.isModified('password') ) return next();

    try {
        // hashed password generate

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password,salt)
        console.log(hashedPassword)
        person.password = hashedPassword
        

    } catch (error) {
        console.log('error from schema',error)
        throw error
    }

})

personSchema.methods.comparePassword = async function(condidataPassword){

    try {
        let isMatched = await bcrypt.compare(condidataPassword,this.password)
        return isMatched
    } catch (error) {
        throw error
    }
}

const person = mongoose.model('person',personSchema)

module.exports = person