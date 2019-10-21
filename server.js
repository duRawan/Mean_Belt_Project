var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/dist/public"));
app.use(bodyParser.json());
const server = app.listen(8000);

require('./server/config/mongoose.js')
require('./server/models/channel.js');
require('./server/models/user.js');
require('./server/config/routes.js')(app)
const channels = require('/Users/rawan/Desktop/Mean-Belt-project/Mean_Belt_Project/server/controllers/channels.js');


//socket
const io = require('socket.io')(server);
// var messages = []
io.on('connection', function (socket) {
    socket.on('channelID', function (data) {
    console.log("---------chanel----------",data);
    // channel=channels.GetChannelById(data._id);
    console.log("mmmmmm",data['data']['messages']);

    io.emit('getAllMessages', { messages: data.messages })
})

    // socket.on('newMessage', function (data) {

    //     messages.push(data.name+": "+data.msg)
    //     io.emit('getAllMessages', { messages: channel.messages });
    // })


});




// this route will be triggered if any of the routes above did not match
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

// app.listen(8000, function(){
//     console.log("Listening on part: 8000");
// })