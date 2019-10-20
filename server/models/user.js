const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
Fname: {type: String},
Lname: {type: String},
email:{type: String},
password:{type: String},
}, {timestamps: true})
mongoose.model("User", UserSchema)