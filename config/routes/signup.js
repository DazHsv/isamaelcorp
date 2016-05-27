var router = require('express').Router();
var Course = require('../models/Course');
var User = require('../models/User');
var enc = require('../enc');

var e = {
	nickname_exist: false,
	email_exist: false,
	email_dont_match:false,
	pwd_wrong:false,
	pwd_dont_match:false
};

router.get('/',function(req,res){
	res.render('app/user/signup',{error:e});
});

router.post('/',function(req,res){
	var enc_pwd = enc(req.body.pwd);

	User.find({
		$or: [{email:req.body.email},{nickname:req.body.nickname}]
	},function(err,user){
		if(user != null) {
			var newUser = {
				nickname: req.body.nickname,
				name: req.body.name,
				email:req.body.email,
				pwd: enc_pwd,
				acceptedTerms: req.body.acceptedTerms
			};

			var user = new User(newUser);

			user.save(function(err){
				res.redirect('/e/post_registry');
				console.log('User registered');
			});

		}else {
			e.email_exist = true;
			e.nickname_exist = true;
			res.render('app/user/signup',{error:e});
		}
	});
});

module.exports = router;