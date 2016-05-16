var router = require('express').Router();
var User = require('../models/User');
var enc = require('../enc');

router.get('/',function(req,res){
	res.render('app/login');
});

router.get('/post_registry',function(req,res){
	res.render('app/login',{msg:"Ahora debes iniciar sesión."});
});

router.post('/',function(req,res){
	var pwd = enc(req.body.pwd);
	User.findOne({
		'email':req.body.email,
		'pwd':pwd
	},function(err,user){

		if(user != null){
			req.session.user = {
				id: user._id,
				email: user.email,
				nickname: user.nickname,
				name: user.name,
				verified: user.verified,
				avatar_url: user.avatar_url,
				acceptedTerms: user.acceptedTerms
			};
			res.redirect('/e/');
		}else{
			res.render('app/login',{error:"El usuario no existe o la contraseña es incorrecta."});
		}

	});
});

module.exports = router;