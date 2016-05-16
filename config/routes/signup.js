var router = require('express').Router();
var Course = require('../models/Course');
var enc = require('../enc');

var e = {
	nickname_exist: false,
	email_exist: false,
	email_dont_match:false,
	pwd_wrong:false,
	pwd_dont_match:false
};

router.get('/',function(req,res){
	res.render('app/signup',{error:e});
});

router.post('/',function(req,res){
	var opts = {
		email:req.body.email,
		nickname:req.body.nickname
	};
	var pwd = enc(req.body.pwd);
	var exist = User.alreadyExist(opts.email,opts.nickname);

	if( exist == 0 ){
		var newUser = {
			nickname: req.body.nickname,
			name: req.body.name,
			email:req.body.email,
			pwd: pwd,
			acceptedTerms: req.body.acceptedTerms
		};

		var user = new User(newUser);

		user.save(function(err){
			res.redirect('/e/login/post_registry');
		});
	}else if(exist == 1){
		e.email_exist = true;
	}else{
		e.nickname_exist = true;
	}
	res.render('app/signup',{error:e});
});

module.exports = router;