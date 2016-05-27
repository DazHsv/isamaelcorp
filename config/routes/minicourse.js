var router = require('express').Router();
var MiniCourse = require('../models/Course').MiniCourse;

router.get('/new',function(req,res){
	res.render('app/curso/mini/new',{
		logged: (req.session != null ? true : false )
	});
});

router.post('/',function(req,res){
	console.log(req.body);
	var minicurso = new MiniCourse({
		owner: req.session.user.id,
		title: req.body.title,
		description: req.body.description,
		url: String(req.body.url),
		player_url: String(req.body.player_url)
	});

	minicurso.save(function(err){
		if (!err) res.redirect('/e/');
	});
});

router.get('/:id',function(req,res){
	MiniCourse
		.findOne({ _id:req.params.id })
		.populate('owner')
		.exec(function(err,c){
			res.render('app/curso/mini/curso',{
				curso: c,
				logged: (req.session != null ? true : false )
			});
		});

});

module.exports = router;