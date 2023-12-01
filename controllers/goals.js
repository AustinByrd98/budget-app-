const express = require("express")
const goal = express.Router()
const Goals = require('../models/goals.js')


// authentication function
const isAuthenticated = (req,res,next) =>{
    if(req.session.currentUser){
        return next()
    }else {
        res.redirect('/sessions/new')
    }
}

//routes (induces)
//index
goal.get('/all',isAuthenticated,(req,res)=>{
    Goals.find({},(err,data)=>{
        res.render("goals_index.ejs",{
            goals: data
        })
    })
})

//new
goal.get('/new/goals',isAuthenticated, (req,res) =>{
    // res.send('new page')
    res.render('new_goals.ejs')
})
//delete
goal.delete('/:id',isAuthenticated, (req,res) =>{
    Goals.findByIdAndDelete(req.params.id,(err,data)=>{
        res.redirect('/budget')
    })
})
//update
goal.put('/:id',isAuthenticated, (req,res)=>{
    if(req.body.accomplished === 'on') {
        req.body.accomplished = true
    } else {
        req.body.accomplished = false
    }
    Goals.findByIdAndUpdate(req.params.id,req.body,{new:true},(req,updatedData) =>{
        res.redirect('/budget')
    })
})
//create
goal.post('/',isAuthenticated, (req,res) =>{
    Goals.create(req.body,(err,createdData)=>{
        if (err){
            res.send(err)
        } else{
            res.redirect("/budget")
        }
    })
})
//edit
goal.get("/:id/edit",isAuthenticated, (req,res)=>{
    Goals.findById(req.params.id,(err, foundGoals)=>{
        res.render('goals_edit.ejs', {goals:foundGoals})
    })
})
//show

goal.get('/:id',isAuthenticated, (req,res)=>{
    Goals.findById(req.params.id,(err,foundGoal)=>{
        res.render('goals_show.ejs',{
            goal: foundGoal
        })
    })
})

module.exports = goal