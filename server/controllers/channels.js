const mongoose = require('mongoose');
const Channel = mongoose.model('Channel');
module.exports = {
    GetAllChannels: function (req, res) {//Retrieve all Channels
        Channel.find()
            .then(data =>{console.log("data in server",data),res.json(data)})
            .catch(err => res.json(err));
    },
    GetChannelById: function (req, res) {//Retrieve a Channel by ID
        console.log(req.params.id);
        Channel.find({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    newChannel: function (req, res) {//Create a Channel
        Channel.create({name:req.body.name, owner:req.body.owner, members:req.body.members })
            .then(data =>{console.log("Channel Created succesfully"), res.json(data)} )
            .catch(err => res.json(err));
    },
    EditChannel: function (req, res) {//Update a Channel by ID
        //channel.messages >>push >>send
        Channel.update({ _id: req.params.id }, { $set: { 'name': req.body.name, 'messages': req.body.messages, 'sharedFiles': req.body.sharedFiles, 'members':req.body.members, 'link':req.body.link, 'updatedAt': Date.now } })
            .then(data => { console.log("Channel Updated succesfully"), res.json(data) })
            .catch(err => res.json(err));

    },
    DeleteChannel: function (req, res) {//Delete a Task by ID
        Channel.remove({ _id: req.params.id })
            .then(data=>{console.log("Channel Deleted succesfully"), res.json(data) })
            .catch(err => res.json(err));
    },
    GetAllChannelForUser: function (req,res){//Find all channels for a user by UserName
        console.log("User name -------",req.params.UserName)
        Channel.find().or([{owner:req.params.UserName},{members:req.params.UserName}])
        .then(data =>{console.log(" all Channels for user",data),res.json(data)})
        .catch(err => res.json(err));
    },
    LeaveChannelByUserName:function (req,res){//Find all channels for a user by UserName
        console.log("User name -------",req.params.UserName)
        console.log("User ChannelID -------",req.params.ChannelID)
        Channel.findOne({_id:req.params.ChannelID})
        .then(data => {console.log("befor",data['members']),
        console.log(data['members'].indexOf(req.params.UserName))
        data['members'].splice(data['members'].indexOf(req.params.UserName),1 )
        console.log("after",data['members']);
        Channel.update({ _id: req.params.ChannelID }, { $set: { 'members': data['members'],'updatedAt': Date.now } })
        .then(data => { console.log("Channel Updated succesfully"), res.json(data) })
        .catch(err => res.json(err))
        })
        .catch(err => res.json(err));
    },
}