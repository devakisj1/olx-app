var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/layout',function(req,res,next){
	res.render('layout');
	var name= req.body.name;
	var name= req.body.password;

	req.checkBody('name','name is required').notEmpty();
});

router.post('/register',function(req,res,next){
	res.render('login');
});


function login(req,res){
  try{
    var username = req.body.username;
    var pass = req.body.pass;
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
  try{
    var username = req.body.username;
    var email=req.body.email;
    var pass = req.body.pass;
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
router.post('/register',login);

module.exports = router;
