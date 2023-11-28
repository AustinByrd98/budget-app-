const mongoose = require("mongoose")

const goalsSchema = new mongoose.Schema({
    name: {type:String, required: true},
    goalAmmount: {type: Number, required: true},
    dateDue:Date,
    currentAmmount:{type: Number, required: true},
    priority:{type:Number, required: true},
    reward: String,
    disc: String,
    accomplished: Boolean
})

const Goals = mongoose.model('Goals', goalsSchema)

module.exports = Goals