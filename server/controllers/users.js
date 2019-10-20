const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = {
    GetAllUsers: function (req, res) {//Retrieve all Users
        User.find()
            .then(data =>{console.log("data in server",data),res.json(data)})
            .catch(err => res.json(err));
    },
    GetUserById: function (req, res) {//Retrieve a User by ID
        User.find({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    newUser: function (req, res) {//Create a User
        User.create({Fname:req.body.Fname, Lname:req.body.Lname, email:req.body.email, password:req.body.password })
            .then(console.log("User Created succesfully"))
            .catch(err => res.json(err));
    },
    EditUser: function (req, res) {//Update a User by ID
        User.update({ _id: req.params.id }, { $set: { Fname:req.body.Fname, Lname:req.body.Lname, email:req.body.email, password:req.body.password, updatedAt: Date.now } })
            .then(data => { console.log("User Updated succesfully"), res.json(data) })
            .catch(err => res.json(err));

    },
    DeleteUser: function (req, res) {//Delete a User by ID
        User.remove({ _id: req.params.id })
            .then(console.log("User Deleted succesfully"))
            .catch(err => res.json(err));
    },
}