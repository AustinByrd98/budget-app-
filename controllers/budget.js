const express = require("express")
const router = express.Router()
const Entries = require('../models/entries.js')
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
router.get('/',isAuthenticated, async (req,res) =>{
    let allEntires 
    let allGoals
    try{
   allEntires = await Entries.find({})
    } catch(err){
        console.error
    }
    try {
         allGoals = await Goals.find({})
    } catch (error) {
        console.error()
    }
    
    res.render('landing.ejs',{
        entries: allEntires,
        goals: allGoals

    })
})
router.get('/entries/all',isAuthenticated, (req,res)=>{
    Entries.find({},(err,data)=>{
         res.render('entries_index.ejs',{
            entries: data
        })
    })
})

//new
router.get('/new/entries',isAuthenticated, (req,res) =>{
    //res.send('new page')
     res.render('new_entries.ejs')
})

//delete
router.delete('/entries/:id',isAuthenticated, (req,res) =>{
    Entries.findByIdAndDelete(req.params.id,(err,data)=>{
        res.redirect('/landing')
    })
})

router.delete('/userinfo/:id', (req,res) =>{
    UserInfo.findByIdAndDelete(req.params.id,(err,data)=>{
        res.redirect('/landing')
    })
})
//update
router.put('/entries/:id',isAuthenticated,(req,res)=>{
    if(req.body.isIncome === 'on') {
        req.body.isIncome = true
    } else {
        req.body.isIncome = false
    }
    Entries.findByIdAndUpdate(req.params.id,req.body,{new:true},(req,updatedData) =>{
        res.redirect('/budget')
    })
})

router.put('userinfo/:id',(req,res)=>{
    UserInfo.findByIdAndUpdate(req.params.id,req.body,{new:true},(req,updatedData) =>{
        res.redirect('/landing')
    })
})
//create
router.post('/',isAuthenticated,(req,res) =>{
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




//edit
router.get("/entries/:id/edit",isAuthenticated, (req,res)=>{
    Entries.findById(req.params.id,(err, founddata)=>{
        // res.send(founddata)
        res.render('entries_edit.ejs', {entries:founddata})
    })
})

//show
router.get('/entry/:id',isAuthenticated,(req,res)=>{
    Entries.findById(req.params.id,(err,foundEntry)=>{
        res.render('entries_show.ejs',{
            entry: foundEntry
        })
    })
})


module.exports = router