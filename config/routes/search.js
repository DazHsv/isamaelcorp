var router = require('express').Router();
var Course = require('../models/Course');
var logged = require('../middlewares/logged');

router.get('/',logged,function(req,res){
	Course.find({
		title: new RegExp(req.query.q,"i")
	}, function(err, courses){
		var resp = {
			exist: courses != null ? true : false,
			cursos: courses,
			q: req.query.q
		}
		
		res.render('app/search',{resp: resp});
	});
});

module.exports = router;