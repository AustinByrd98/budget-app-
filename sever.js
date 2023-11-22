require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
//controllers variables
const budgetController =  require('./controllers/budget.js')
//env variables
const MONGOURI = process.env.MONGOURI
const PORT = process.env.PORT
//database connection
mongoose.connect(MONGOURI+"budget")
mongoose.connection.once('open',()=>{
    console.log('connected to mongo')
})
//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

//controllers middlewear
app.use('/budget',budgetController)



app.listen(PORT)
