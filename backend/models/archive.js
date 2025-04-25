const mongoose = require('mongoose')

const archiveSchema = mongoose.Schema({
    name : String,
    prix : Number,
    qty : Number,
    specify : String,
    date : String,
    time : String
})

const archive = mongoose.model('archive', archiveSchema)

module.exports = archive