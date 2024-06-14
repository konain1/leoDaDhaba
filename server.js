
const express = require('express')
const bodyparser =  require('body-parser')
require('dotenv').config()

const db = require('./db')
const menuItems  = require('./menu')

const personRouter = require('./route/personRoute')
const menuitemsRouter = require('./route/menuItemsRoute')
const app  = express();

const Port = process.env.PORT || 3000

app.use(bodyparser.json())

app.get('/',(req,res)=>{
    res.send('Dhaba is on 24/7')
})

app.use('/person',personRouter)
app.use('/menu',menuitemsRouter)





app.listen(Port,()=>{console.log('server live on 3000')})