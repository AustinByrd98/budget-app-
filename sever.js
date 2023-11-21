require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const MONGOURI = process.env.MONGOURI
const Controller = require('./controllers/budget.js')


app.listen(3000)
