const mongoose = require('mongoose')
const ChannelSchema = new mongoose.Schema({
name: {type: String},
owner: {type: String},
messages:{type:[Object], default:{}}, //Object keys later {userName:"",message:"", time:""}
sharedFiles:{type: [String],default:[]},//will be an object + buffer //GridFS
members:{type:[String]}
}, {timestamps: true})
mongoose.model("Channel", ChannelSchema)