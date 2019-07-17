const router = require('express').Router();
const User = require('../models/Users');
const passport = require('passport');
const Joi = require('@hapi/joi');

//Validation Schema
const ValidationSchema = {
    username : Joi.string().min(5).max(30).required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
}


//Register Route - To add users to database
router.post('/register', function(req, res){
    //Validation
    const { error } = Joi.validate(req.body, ValidationSchema);
    if(error)
        return res.json(error.details[0].message);
    
    var username = req.body.username;
    var password = req.body.password;
    const user = new User({
        username, 
        date : Date.now()
    });
    User.register(user, password, function(err, user){
        if(err)
            return res.json(err);
        passport.authenticate("local")(req,res,function(){
            res.json(req.user)
        });
    })
    
    // user.save(function(err, savedUser){
    //     if(err)
    //         return console.log('Error while saving to the database');
    //     res.json(savedUser);
    // });
});

//Find all route - To get all users from Database
router.post("/",passport.authenticate('local', {
    successRedirect : "/loggedin",
    failureRedirect : "/"
}) ,function(req, res){
    
});

//Find one route - To get one user from the Database
router.get('/:id', function(req, res){
    User.findById(req.params.id,  function(err, users){
        if(err)
            return console.log(`Error while finding ${req.params.id} using from Database.`)
        else{
            res.send(users);
        };
    });
});

router.put("/:id", function(req, res){
    User.findByIdAndUpdate(req.params.id, {username: req.body.username},{new: true} ,function(err, user){
        if(err)
            return console.log(`Error while updating ${req.params.id} username from the Database.`);
        if(user !== null)
            res.send(user);
        else    
            res.json("No user found!");
    });
});

router.delete("/:id", function(req, res){
    User.findByIdAndDelete(req.params.id, function(err, user){
        if(err)
            return console.log(`Error while deleting ${req.params.id} data from the Database.`);
        else
            res.send(user);
    })  
})

module.exports = router;