const mongoose = require("mongoose")

const goalsSchema = new mongoose.Schema({
    name: {type:String, required: true},
    goalAmmount: {type: Number, required: true},
    currentAmmount:{type: Number, required: true},
    disc: String,
    accomplished: Boolean
})

const Goals = mongoose.model('Goals', goalsSchema)

module.exports = Goals