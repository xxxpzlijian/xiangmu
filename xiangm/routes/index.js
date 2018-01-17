var express = require('express');
var router = express.Router();
var UserModel = require("../model/User.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: '后台模版'});
});
router.post('/api/login4ajax', function(req, res, next) {
  	var username = req.body.username;
  	var psw = req.body.psw;
  	console.log(username,psw)
  	var result = {
  		code : 1,
  		message : "登录成功"
  	}
  	// console.log(UserModel.find({username:123}))
  	UserModel.find({username:username,psw:psw},function(err,dosc){
  		console.log(dosc)
  		if(dosc.length > 0){
  			req.session.username = username;
  			res.json(result);
  			return
  		}else{
  			result.code = -100;
  			result.message = "登录失败，密码或帐号错误";
  			res.json(result);
  			res.end()
  	  		}
  	})
});

router.get('/loginAction', function(req, res, next) {
  res.render('loginAction', { title: '后台系统'});
});
module.exports = router;
