var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function login(req,res){
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
router.post('/login',login);


function register(req,res){

    var username = req.body.username;
    var email=req.body.email;
    var pass = req.body.password;
    console.log(req.body);
    var newUser= new User({
      username:username,
      password:password,
      email:email,
    });
    User.createUser(newUser,function(err,user){
    console.log(user);
    });
    res.redirect('/')




}
router.post('/register',register);

module.exports = router;
