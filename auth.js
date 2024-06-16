



const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const person = require('./person')


passport.use(new LocalStrategy(async(username,password,done)=>{

    try {
        let user = await person.findOne({username:username});
        
        if(!user){
            return done(null,false,{message:"inccorect username"})
        }

        let isPasswordMatched = user.comparePassword(password)
        if(isPasswordMatched){
            return done(null,true)
        }else{
            console.log('incorrect password')
            return done(null,false,{message:'incorrect password'})
        }
    } catch (error) {
        console.log(error)
        return done(error)

    }
}));

module.exports = passport