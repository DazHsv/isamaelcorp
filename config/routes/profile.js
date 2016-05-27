var router = require('express').Router();
var Course = require('../models/Course');
var logged = require('../middlewares/logged');

router.get('/:nickname',logged,function(req,res){
	res.redirect('/e/');
});

module.exports = router;