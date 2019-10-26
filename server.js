var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var cors =require("cors")
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/dist/public"));
app.use(bodyParser.json());
app.use(cors());
const server = app.listen(8000);
nodemailer = require("nodemailer")
require('./server/config/mongoose.js')
require('./server/models/channel.js');
require('./server/models/user.js');
require('./server/config/routes.js')(app)
const channels = require('./server/controllers/channels.js');


//socket
const io = require('socket.io')(server);
// var messages = []
io.on('connection', function (socket) {
    socket.on('ChannelUpdated', function (data) {
    console.log("---------chanel----------",data.channel);
    io.emit('GotNewChange', { channel: data.channel })
})

    // socket.on('newMessage', function (data) {

    //     messages.push(data.name+": "+data.msg)
    //     io.emit('getAllMessages', { messages: channel.messages });
    // })


});

// const OTP_EMAIL_CONFIG= {
//   "host": 'smtp.gmail.com',
//   "port": 465,
//   "secure": true,
//   "auth": {
//       "user": 'durawan18@gmail.com',
//       "pass": '18rango.'
//   }
// };
// let mailModule = nodemailer.createTransport(OTP_EMAIL_CONFIG);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};
  
    res.status(err.status || 500);
    res.json('error');
  });

  // app.post('/sendemail',function(req,res){
  //       console.log(req.body,'request');
  //       var mailOptions = {
  //           from: '"jsonworld " enter gmail account which you want to use for sending email',
  //           to: req.body.to,
  //           subject: "mail sending with angularjs and nodejs",
  //           text: req.body.text
  //       }; 
  //       mailModule.sendMail(mailOptions);
  //       res.status(200).send('Mail sent successfully');
  //   })

// this route will be triggered if any of the routes above did not match
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

// app.listen(8000, function(){
//     console.log("Listening on part: 8000");
// })