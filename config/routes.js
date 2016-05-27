module.exports = function(app) {
	app.get('/',function(req,res){
		res.render('home/index');
	});

	app.use('/e', require('./routes/home'));
	app.use('/e/login', require('./routes/login'));
	app.use('/e/signup', require('./routes/signup'));
	app.use('/e/course', require('./routes/course'));
	app.use('/e/course/mini', require('./routes/minicourse'));
	app.use('/e/profile', require('./routes/profile'));
	app.use('/e/video', require('./routes/video'));
	app.use('/e/search',require('./routes/search'));
}