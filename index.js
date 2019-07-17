const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const localStrategy = require('passport-local');
const app = express();

const User = require('./models/Users');

//Database Configuration
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true}, function(err){
    if(!err)
        return console.log("Connected to Database.");
    console.log("Error while connecting to Database.");
});

//Middleware
app.use(bodyParser.json());

//Passport Session
app.use(session({
    secret: 'theGoatUpTheHill',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));


//Routes
app.use('/users', require('./Routes/users'));

//Server Setup
app.listen(process.env.PORT, function(){
    console.log(`Server up at ${process.env.PORT}`);
})