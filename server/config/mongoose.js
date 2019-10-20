const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ChatDB', { useNewUrlParser: true });
const fs = require("fs")
const path = require("path")
const models_path = path.join(__dirname, "./../models")
fs.readdirSync(models_path).forEach(file => {
	if(file.toLowerCase().includes(".js")){
		require(path.join(models_path, file))
	}
})