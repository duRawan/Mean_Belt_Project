const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken')
module.exports = {
    GetAllUsers: function (req, res) {//Retrieve all Users
        User.find()
            .then(data => { console.log("data in server", data), res.json(data) })
            .catch(err => res.json(err));
    },
    GetUserById: function (req, res) {//Retrieve a User by ID
        User.find({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    newUser: function (req, res) {//Create a User
        User.findOne().or([{ email: req.body.email }, { userName: req.body.name }]).exec((err, data) => {
            if (err) {
                console.log(err);
                return res.json(err)
            }
            if (data) {
                return res.json({ message: "already a member" })
            } else {
                // User.create({ userName: req.body.name, email: req.body.email, password: req.body.password })
                //     .then(res.json({ message: "signed up successfully", status: true }))
                //     .catch(err => res.json(err));
                let userData = req.body
                let user = new User(userData)
                user.save((err, registeredUser) => {
                    if (err) {
                        console.log(err)
                    } else {
                        let id = registeredUser._id;
                        let name = registeredUser.userName;
                        let payload = { subject: registeredUser._id }
                        let token = jwt.sign(payload, 'secretKey')
                        console.log(token);
                        res.status(200).send({ token, id, name, status: true  })
                    }
                })

            }
        })
    },
    EditUser: function (req, res) {//Update a User by ID
        User.update({ _id: req.params.id }, { $set: { userName: req.body.userName, email: req.body.email, password: req.body.password, updatedAt: Date.now } })
            .then(data => { console.log("User Updated succesfully"), res.json(data) })
            .catch(err => res.json(err));

    },
    DeleteUser: function (req, res) {//Delete a User by ID
        User.remove({ _id: req.params.id })
            .then(console.log("User Deleted succesfully"))
            .catch(err => res.json(err));
    },
    login: function (req, res) {
        console.log(req.body)
        User.findOne({ email: req.body.email }).exec((err, data) => {
            if (data) {
                // compare hash from your password DB.
                //bcrypt.compare(req.body.password, data.password, (err, result) => {
                if (req.body.password == data.password) {
                    // result == true
                    //if (result == true)
                    // res.json({ message: "signed in successfully", id: data._id, name: data.userName, email: data.email, status: true })//should send user obj
                    let id = data._id;
                    let name = data.userName;
                    console.log("Hiiiiiiiiiii------------______---------", id, "-------", name)
                    let payload = { subject: data._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token, id, name, status: true ,message: "signed in successfully" })
                }
                else {
                    res.json({ message: "can't sign in" })
                }
                //});
            }
            else res.json({ message: "can't sign in" })
        })
    }
}