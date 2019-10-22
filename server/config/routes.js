const channels = require('../controllers/channels.js');
const users = require('../controllers/users.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = function (app) {
    ///////////channels////////////
    //Retrieve all channels
    app.get('/channels', (req, res) => {
        channels.GetAllChannels(req, res);
    });
    //Retrieve a channel by ID
    app.get('/channels/:id/', (req, res) => {
        channels.GetChannelById(req, res);
    });
    //Create a channel
    app.post('/channels', (req, res) => {
        channels.newChannel(req, res);
    });
    //Update a channel by ID
    app.put('/channels/:id/', (req, res) => {
        channels.EditChannel(req, res);
    });
    //Delete a channel by ID
    app.delete('/channels/:id/', (req, res) => {
        channels.DeleteChannel(req, res);
    });
    ///////////users////////////
    //Retrieve all users
    app.get('/users', (req, res) => {
        users.GetAllUsers(req, res);
    });
    //Retrieve a user by ID
    app.get('/users/:id/', (req, res) => {
        users.GetUserById(req, res);
    });
    //Create a user
    app.post('/users', (req, res) => {
        users.newUser(req, res);
    });
    //Update a user by ID
    app.put('/users/:id/', (req, res) => {
        users.EditUser(req, res);
    });
    //Delete a user by ID
    app.delete('/users/:id/', (req, res) => {
        users.DeleteUser(req, res);
    });

    // // sign Up
    // app.post('/signup', (req, res) => {
    //     console.log(req.body.email);
    //     //check if user already existed
    //     User.findOne({ 'email': req.body.email }).exec((err, data) => {
    //         if (err)
    //             return res.json(err)
    //         if (data) {
    //             return res.json({ message: "already a member" })
    //         } else {
    //             //create a new user
    //             //hash the password
    //             // bcrypt.hash(req.body.password, saltRounds).then((hash) => {
    //             var user = new User()
    //             user.userName = req.body.name;
    //             user.email = req.body.email;
    //             user.password = req.body.password;//hash;

    //             user.save((err) => {
    //                 if (err)
    //                     res.json(err)
    //                 // saved!
    //                 res.json({ message: "signed up successfully", status: true })
    //             })
    //             //});

    //         }
    //     })

    // })

    // signin
    app.post('/signin', (req, res) => {

        User.findOne({ 'email': req.body.email }).exec((err, data) => {
            if (data) {
                // compare hash from your password DB.
                //bcrypt.compare(req.body.password, data.password, (err, result) => {
                if (req.body.password == data.password)
                    // result == true
                    //if (result == true)
                    res.json({ message: "signed in successfully", id: data._id, name: data.userName, status: true })
                else {
                    res.json({ message: "can't sign in" })
                }
                //});
            }
            else res.json({ message: "can't sign in" })
        })
    })


}

