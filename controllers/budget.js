const express = require("express")
const router = express.Router()
const Entries = require('../models/entries.js')
const Goals = require('../models/goals.js')
//const Entries = require("../models/entries.js")


//routes (induces)

//index
router.get('', async (req,res) =>{
    try{
    allentires = await Entries.find({})
    } catch(err){
        console.error
    }
    try {
         allgoals = await Goals.find({})
    } catch (error) {
        console.error()
    }
    
    res.render('landing.ejs',{
        entries: allentires,
        goals: allgoals

    })
})
router.get('/entries/all',async (req,res)=>{
    Entries.find({},(err,data)=>{
         res.render('entries_index.ejs',{
            entries: data
        })
    })
})
router.get('/goals/all',(req,res)=>{
    Goals.find({},(err,data)=>{
        res.render("goals_index.ejs",{
            goals: data
        })
    })
})
//new
router.get('/new/entries', (req,res) =>{
    //res.send('new page')
     res.render('new_entries.ejs')
})
router.get('/new/goals', (req,res) =>{
    // res.send('new page')
    res.render('new_goals.ejs')
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
router.put('/entries/:id',(req,res)=>{
    if(req.body.isIncome === 'on') {
        req.body.isIncome = true
    } else {
        req.body.isIncome = false
    }
    Entries.findByIdAndUpdate(req.params.id,req.body,{new:true},(req,updatedData) =>{
        res.redirect('/budget')
    })
})
router.put('/goals/:id',(req,res)=>{
    if(req.body.accomplished === 'on') {
        req.body.accomplished = true
    } else {
        req.body.accomplished = false
    }
    Goals.findByIdAndUpdate(req.params.id,req.body,{new:true},(req,updatedData) =>{
        res.redirect('/budget')
    })
})
router.put('userinfo/:id',(req,res)=>{
    UserInfo.findByIdAndUpdate(req.params.id,req.body,{new:true},(req,updatedData) =>{
        res.redirect('/landing')
    })
})
//create
router.post('/',(req,res) =>{
    if(req.body.isIncome === 'on'){
        req.body.isIncome = true
    } else{
        req.body.isIncome = false
    }

    Entries.create(req.body,(err,createdData)=>{
        if (err){
            res.send(err)
        } else{
            res.redirect("/budget")
        }
    })
})
router.post('/goals',(req,res) =>{
    Goals.create(req.body,(err,createdData)=>{
        if (err){
            res.send(err)
        } else{
            res.redirect("/budget")
        }
    })
})



//edit
router.get("/entries/:id/edit", (req,res)=>{
    Entries.findById(req.params.id,(err, founddata)=>{
        // res.send(founddata)
        res.render('entries_edit.ejs', {entries:founddata})
    })
})
router.get("/goals/:id/edit", (req,res)=>{
    Goals.findById(req.params.id,(err, foundGoals)=>{
        res.render('goals_edit.ejs', {goals:foundGoals})
    })
})
//show
router.get('entry/:id',(req,res)=>{
    Entries.findById(req.params.id,(err,foundEntry)=>{
        res.render('entries_show.ejs',{
            entry: foundEntry
        })
    })
})
router.get('goal/:id',(req,res)=>{
    Entries.findById(req.params.id,(err,foundGoal)=>{
        res.render('goals_show.ejs',{
            goal: foundGoal
        })
    })
})

module.exports = router