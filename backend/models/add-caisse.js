const mongoose = require('mongoose')


const caisseSchema = mongoose.Schema({
    name : String,
    prix : Number
})

const caisse = mongoose.model('caisse', caisseSchema)

module.exports = caisse