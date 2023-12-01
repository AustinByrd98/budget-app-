require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
//controllers variables
const budgetController =  require('./controllers/budget.js')
const goalsController = require('./controllers/goals.js')
const userController = require('./controllers/users.js')
const sessionsController = require('./controllers/sessions.js')
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
app.use(session({
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

//controllers middlewear
app.use('/budget',budgetController)
app.use('/goals',goalsController)
app.use('/users', userController)
app.use('/sessions',sessionsController)

app.get('/',(req,res)=>{
    res.render('sessions/new.ejs')
})

app.listen(PORT)
