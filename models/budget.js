const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    name:{type: String, required: true},
    amount:{type: Number, required:true},
    disc:String,
    isIncome: Boolean
})

const entries = mongoose.model('Entries',entrySchema)

module.exports = entries