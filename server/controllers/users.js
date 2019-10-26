const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
nodemailer = require("nodemailer")
const OTP_EMAIL_CONFIG= {
    "host": 'smtp.gmail.com',
    "port": 465,
    "secure": true,
    "auth": {
        "user": 'vsecure4@gmail.com',
        "pass": 'Rrdsm@123'
    }
  };
  let mailModule = nodemailer.createTransport(OTP_EMAIL_CONFIG);
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
        User.findOne({$or:[{ 'email': req.body.email },{ 'userName': req.body.userName }]}).exec((err, data) => {
            if (err) {
                console.log(err);
                return res.json(err)
            }
            if (data) {
                console.log("----------------y----------------",data);
                return res.json({ message: "already a member", status: false })
            } else {
                // User.create({ userName: req.body.name, email: req.body.email, password: req.body.password })
                //     .then(res.json({ message: "signed up successfully", status: true }))
                //     .catch(err => res.json(err));
                // let userData = req.body
                let user = new User(req.body)
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
    },
    getemail: function(req,res) {
        console.log(req.params.UN)
        User.findOne({userName:req.params.UN}).exec((err,data)=>{
            if(data){
                res.json({email:data.email})
            }
            else{
                res.json("Cant Find !!")
            }
        })
    },
    Sendemail: function(req,res) {
        console.log(req.params.email,'request');
        var mailOptions = {
            from: '"jsonworld " enter gmail account which you want to use for sending email',
            to: req.params.email,
            subject: "Co Base - Notification",
            text: "Hello Our Dear Member,\nThis email is sent to you to inform you that you have been Added to a new Channel \nLog in to check it out.. \nThank You \n-Co Base Team"
        }; 
        mailModule.sendMail(mailOptions);
        res.status(200).send({msg:'Mail sent successfully'});
    }
}