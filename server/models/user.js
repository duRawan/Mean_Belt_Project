const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
userName: {type: String, uniqe:true},
email:{type: String},
password:{type: String},
}, {timestamps: true})
mongoose.model("User", UserSchema)

// var mongoose = require('mongoose')
// var Schema = mongoose.Schema

// // createing the Model Schema
// var authSchema = new Schema({
//   name: { type: String},
//   email: { type: String, index: true, required: true},
//   password: { type: String, required: true},
//   created_at: { type: Date, default: Date.now }
// })

// // createing the Model
// module.exports = mongoose.model('Auth', authSchema)
