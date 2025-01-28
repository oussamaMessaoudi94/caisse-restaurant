const mongoose = require('mongoose')

const archiveSchema = mongoose.Schema({
    name : String,
    prix : String,
    date : String,
    time : String
})

const archive = mongoose.model('archive', archiveSchema)

module.exports = archive