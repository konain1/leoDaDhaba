
const express = require('express')
const bodyparser =  require('body-parser')
require('dotenv').config()

const db = require('./db')
const menuItems  = require('./menu')
const passport = require('./auth')

const personRouter = require('./route/personRoute')
const menuitemsRouter = require('./route/menuItemsRoute');
const app  = express();

const Port = process.env.PORT || 3000

app.use(bodyparser.json())

// middleware
function logData(req,res,next){
    console.log(`[${new Date().toLocaleString()}] route  ${req.originalUrl}`);
    next();

}





app.use(logData)
app.use(passport.initialize())

let LocalAuthMiddleware = passport.authenticate('local',{session:false})
console.log( typeof LocalAuthMiddleware)

app.get('/',(req,res)=>{
    res.send('Dhaba is on 24/7')
})


app.use('/person',LocalAuthMiddleware,personRouter)
app.use('/menu',menuitemsRouter)




app.listen(Port,()=>{console.log('server live on 3000')})
module.exports = LocalAuthMiddleware