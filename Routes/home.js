const router = require('express').Router();
const User = require('../models/Users');
const passport = require('passport');

router.get('/', function(req,res){
    res.render('home');
})

router.get('/login', function(req, res){
    res.render('login');
})

router.post("/login/user",passport.authenticate('local', {
    failureRedirect : "/login"
}) ,function(req, res){ 
    res.redirect('/user/' + req.user.username); 
});


router.get('/user/:username', function(req,res){
    User.findOne({username : req.params.username}, function(err, user){
        if(err)
            return console.log(`Error in finding User ${req.params.username}.`);
        if(user.length !== null){
            res.render('profile', {user});
            console.log(user);
        }
        else
            console.log("No User found!");
    })
})

router.get('/register', function(req,res){
    res.render('register');
})
router.post('/register', function(req,res){
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var description = req.body.description;
    var graduation = req.body.graduation;
    var subjects = req.body.favorites;
    var department = req.body.department;

    const user = new User ({
        name,
        username,
        description,
        graduation,
        subjects,
        department
    })

    User.register(user, password, function(err, user){
        if(err)
            return res.json(err);
        passport.authenticate("local")(req,res,function(){
            res.json(user);
            res.redirect('')
        });
    })
})

module.exports = router;