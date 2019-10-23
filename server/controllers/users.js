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
        console.log("Here", req)
        User.findOne().or([{email: req.body.email },{userName: req.body.name}]).exec((err, data) => {
            if (err)
                return res.json(err)
            if (data) {
                return res.json({ message: "already a member" })
            } else {
                User.create({userName:req.body.name, email:req.body.email, password:req.body.password })
        
                .then(res.json({message: "signed up successfully", status: true}))
                .catch(err => res.json(err));

        }
    })},
    EditUser: function (req, res) {//Update a User by ID
        User.update({ _id: req.params.id }, { $set: { userName:req.body.userName, email:req.body.email, password:req.body.password, updatedAt: Date.now } })
            .then(data => { console.log("User Updated succesfully"), res.json(data) })
            .catch(err => res.json(err));

    },
    DeleteUser: function (req, res) {//Delete a User by ID
        User.remove({ _id: req.params.id })
            .then(console.log("User Deleted succesfully"))
            .catch(err => res.json(err));
    },
    login: function(req,res){
        User.findOne({ 'email': req.body.email }).exec((err, data) => {
            if (data) {
                // compare hash from your password DB.
                //bcrypt.compare(req.body.password, data.password, (err, result) => {
                if (req.body.password == data.password)
                    // result == true
                    //if (result == true)
                    res.json({ message: "signed in successfully", id: data._id, name: data.userName, email: data.email, status: true })//should send user obj
                else {
                    res.json({ message: "can't sign in" })
                }
                //});
            }
            else res.json({ message: "can't sign in" })
        })
    }
}