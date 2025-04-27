const mongoose = require('mongoose')


const caisseSchema = mongoose.Schema({
    name : String,
    prix : Number,
    qty : Number,
    specify : String
})

const caisse = mongoose.model('caisse', caisseSchema)

module.exports = caisse