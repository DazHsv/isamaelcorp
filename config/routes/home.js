var router = require('express').Router();
var Course = require('../models/Course');
var User = require('../models/User');

router.get('/',function(req,res){
	var logged = false;
	if(req.session.user) logged = true;

	Course
		.find({})
		.sort('-published_date')
		.limit(8)
		.exec(function(err,course){
			res.render('app/home',{
				cursos:course,
				logged:logged
			});
		});
});

router.get('/post_registry',function(req,res){
	res.render('app/post_registry');
});

router.get('/terms',function(req,res){
	res.render('app/terms');
});

router.get('/logout',function(req,res){
	if(req.session && req.session.user){
		req.session.destroy(function(){
			res.redirect('/e/');
		});
	}
});

module.exports = router;