const mongoose = require('mongoose');
const Channel = mongoose.model('Channel');
module.exports = {
    GetAllChannels: function (req, res) {//Retrieve all Channels
        Channel.find()
            .then(data =>{console.log("data in server",data),res.json(data)})
            .catch(err => res.json(err));
    },
    GetChannelById: function (req, res) {//Retrieve a Channel by ID
        console.log("idddd",req.params.id);
        Channel.find({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    newChannel: function (req, res) {//Create a Channel
        Channel.create({name:req.body.name, owner:req.body.owner, members:req.body.members })
            .then(console.log("Channel Created succesfully"))
            .catch(err => res.json(err));
    },
    EditChannel: function (req, res) {//Update a Channel by ID
        //channel.messages >>push >>send
        Channel.update({ _id: req.params.id }, { $set: { 'name': req.body.name, 'messages': req.body.messages, 'sharedFiles': req.body.sharedFiles, 'members':req.body.members, 'updatedAt': Date.now } })
            .then(data => { console.log("Channel Updated succesfully"), res.json(data) })
            .catch(err => res.json(err));

    },
    DeleteChannel: function (req, res) {//Delete a Task by ID
        Channel.remove({ _id: req.params.id })
            .then(console.log("Channel Deleted succesfully"))
            .catch(err => res.json(err));
    },
}