const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
userName: {type: String, uniqe:true},
email:{type: String},
password:{type: String},
}, {timestamps: true})
mongoose.model("User", UserSchema)