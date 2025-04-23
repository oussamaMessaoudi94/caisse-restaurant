const mongoose = require('mongoose')


const caisseSchema = mongoose.Schema({
    name : String,
    prix : Number,
    qty : Number,
    specify : String
})

const prod = mongoose.model('prod', caisseSchema)

module.exports = prod