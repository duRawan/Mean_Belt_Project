var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/dist/public"));
app.use(bodyParser.json());


require('./server/config/mongoose.js')
require('./server/models/channel.js');
require('./server/models/user.js');
require('./server/config/routes.js')(app)

// this route will be triggered if any of the routes above did not match
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, function(){
    console.log("Listening on part: 8000");
})