const express = require("express")
const router = express.Router()
const Entries = require('../models/budget.js')
const Goals = require('../models/goals.js')
const Entries = require("../models/budget.js")


//routes (induces)

//index
router.get('', async (req,res) =>{
    try{
   const  allentires = await Entries.find({})
    } catch(err){
        console.error
    }
    try {
        const allgoals = await Goals.find({})
    } catch (error) {
        console.error()
    }
    res.render('landing.ejs',{
        entries: allentires,
        goal: allgoals

    })
})
//new
router.get('/new', (req,res) =>{
    res.send('new page')
    // res.render('new.ejs')
})
//delete
router.delete('/entries/:id', (req,res) =>{
    Entries.findByIdAndDelete(req.params.id,(err,data)=>{
        res.redirect('/landing')
    })
})
router.delete('/goals/:id', (req,res) =>{
    Goals.findByIdAndDelete(req.params.id,(err,data)=>{
        res.redirect('/landing')
    })
})
router.delete('/userinfo/:id', (req,res) =>{
    UserInfo.findByIdAndDelete(req.params.id,(err,data)=>{
        res.redirect('/landing')
    })
})
//update
router.put('entires/:id',(req,res)=>{
    Entries.findByIdAndUpdate(req.params.id,req.body,{new:true},(req,updatedData) =>{
        res.redirect('/landing')
    })
})
router.put('goals/:id',(req,res)=>{
    Goals.findByIdAndUpdate(req.params.id,req.body,{new:true},(req,updatedData) =>{
        res.redirect('/landing')
    })
})
router.put('userinfo/:id',(req,res)=>{
    UserInfo.findByIdAndUpdate(req.params.id,req.body,{new:true},(req,updatedData) =>{
        res.redirect('/landing')
    })
})
//create
router.post('',(req,res) =>{
    if(req.body.isIncome === 'on'){
        req.body.isIncome = true
    } else{
        req.body.isIncome = false
    }

    Entries.create(req.body,(err,createdData)=>{
        if (err){
            res.send(err)
        } else{
            res.redirect("/landing")
        }
    })
})
router.post('',(req,res) =>{
    Entries.create(req.body,(err,createdData)=>{
        if (err){
            res.send(err)
        } else{
            res.redirect("/landing")
        }
    })
})
router.post('',(req,res) =>{
    Entries.create(req.body,(err,createdData)=>{
        if (err){
            res.send(err)
        } else{
            res.redirect("/landing")
        }
    })
})


//edit
router.get("entries/:id/edit", (req,res)=>{
    Entries.findById(req.params.id,(err, founddata)=>{
        res.render('edit.ejs', {entries:founddata})
    })
})
router.get("goals/:id/edit", (req,res)=>{
    Goals.findById(req.params.id,(err, foundGoals)=>{
        res.render('edit.ejs', {fruit:foundGoals})
    })
})
//show