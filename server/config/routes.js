const channels = require('../controllers/channels.js');
const users = require('../controllers/users.js');

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
    //Retrieve channels by UserName
    app.get('/channels/username/:UserName/',(req, res) => {
        channels.GetAllChannelForUser(req, res);
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
    app.get('/leave/:ChannelID/:UserName/', (req, res) => {
        channels.LeaveChannelByUserName(req, res);
    })
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
    // signin
    app.post('/signin', (req, res) => {
        users.login(req, res);
    });
    app.get('/memEmail/:UN/',(req, res)=>{
        console.log(req.params.UN)
        users.getemail(req,res);
    });
    app.get('/sendMail/:email/',(req, res)=>{
        users.Sendemail(req,res);
    });
    // function verifyToken(req, res, next) {
    //     if (!req.headers.authorization) {
    //         return res.status(401).send('Unauthorized request')
    //     }
    //     let token = req.headers.authorization.split(' ')[1]
    //     if (token === 'null') {
    //         return res.status(401).send('Unauthorized request')
    //     }
    //     let payload = jwt.verify(token, 'secretKey')
    //     if (!payload) {
    //         return res.status(401).send('Unauthorized request')
    //     }
    //     req.userId = payload.subject
    //     next()
    // }
}

