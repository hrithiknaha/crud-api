const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();

//Database Configuration
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true}, function(err){
    if(!err)
        return console.log("Connected to Database.");
    console.log("Error while connecting to Database.");
});


app.use(bodyParser.json());


//Routes
app.use('/users', require('./Routes/users'));

//Server Setup
app.listen(process.env.PORT, function(){
    console.log(`Server up at ${process.env.PORT}`);
})