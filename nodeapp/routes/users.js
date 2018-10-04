var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*function login(req,res){
  try{
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    res.send({
      status:true,
      msg : "login success"
    });
  }
  catch(e){
    res.send({
      status:false,
      msg : "login failed"
    });
  }

}
router.post('/login',login);*/


router.post('/login',
  passport.authenticate('local',{failureRedirect:'/login/',successRedirect:'/',failureFlash:'invalid username or password'}),
  function(req, res) {
    req.flash('success','you are now logged in');
    res.redirect('/');
  });

 passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });


  passport.use(new LocalStrategy(function(username, password, done)
{
  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if (!user) {
      return done(null, false, {message: 'Unknown User'});

    }
    User.comparePassword(password, user.password, function(err, isMatch){
      if (err) return done(err);
      if(isMatch){
        return done(null, user);
      }
      else {
        return done(null, false, {message:'invalid password'});
      }
    });
  });
}));















function register(req,res){
  try{
    var username = req.body.username;
    var email=req.body.email;
    var password = req.body.password;
    console.log(req.body);
    var newUser= new User({
      username:username,
      password:password,
      email:email,
    });
    User.createUser(newUser,function(err,user){
      if (err) {
        throw(err);

      }
    console.log(user);
    });
    res.redirect('/login/')
  }
  catch(e){
    res.send({
      status:false,
      msg : "registration failed"
    });
  }

}
router.post('/register',register);

module.exports = router;
