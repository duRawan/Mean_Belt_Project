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

}