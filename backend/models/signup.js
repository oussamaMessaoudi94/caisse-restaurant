const mongoose = require('mongoose')


const signupSchema = mongoose.Schema({
    name : String,
    email : {type: String, unique :true},
    password : String,
})

const signup = mongoose.model('signup', signupSchema)

module.exports = signup