
const express = require('express')
const bodyparser =  require('body-parser')

const db = require('./db')
const menuItems  = require('./menu')
const personRouter = require('./route/personRoute')
const menuitemsRouter = require('./route/menuItemsRoute')
const app  = express();

app.use(bodyparser.json())

app.get('/',(req,res)=>{
    res.send('Dhaba is on 24/7')
})

app.use('/person',personRouter)
app.use('/menu',menuitemsRouter)


// menuItems



app.listen(3000,()=>{console.log('server live on 3000')})