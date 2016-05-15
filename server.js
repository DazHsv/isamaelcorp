var express        = require('express'),
	bodyParser     = require('body-parser'),
	helmet         = require('helmet'),
	methodOverride = require('method-override'),
	session        = require('express-session'),
	mongoose       = require('mongoose'),
	MongoStore     = require('connect-mongo/es5')(session),
	app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP,
	port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

	if (typeof ipaddress === "undefined") {
		//  Log errors on OpenShift but continue w/ 127.0.0.1 - this
		//  allows us to run/test the app locally.
		console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
		ipaddress = "127.0.0.1";
	};

var connection_string = '127.0.0.1:27017/e3';
	if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
		connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
		process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
		process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
		process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
		process.env.OPENSHIFT_APP_NAME;
	}

	mongoose.connect("mongodb://"+connection_string);

	var db = mongoose.connection;
	db.on('error', function(){
		console.error.bind(console, 'Conection error to db:');
	});
	db.on('open', function() {
		console.log('Conected to mongodb');
	});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/static',express.static(__dirname + '/public/'));
app.use(helmet());
app.set("view engine","pug");
app.use(session({
	secret:"221weqofyb9iuqxegoi",
	resave:false,
	saveUninitialized:false,
	store: new MongoStore({
		mongooseConnection: db,
		ttl: 24 * 60 * 60
	})
}));
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}


app.get('/',function(req,res){
	res.render('home/index');
});

app.get('/e',function(req,res){
	res.render('app/home',{cursos:cursos});
});

app.get('/e/login',function(req,res){
	res.render('app/login');
});

app.get('/e/signup',function(req,res){
	res.render('app/signup');
});

var cursos = [{
	id:"904782595705786",
	title:"Node js",
	description:"Curso de node js desde cero. Lorem ipsum doloret sit amed borem",
	owner: {
		nickname:"DazHsv"
	},
	image_url:"http://lorempixel.com/400/150"
},{
	id:"435612848512356",
	title:"CSS3",
	description:"Curso de CSS3 desde cero. Lorem ipsum doloret sit amed borem",
	owner: {
		nickname:"DazHsv"
	},
	image_url:"http://lorempixel.com/400/150/sports"
},{
	id:"548945641335465",
	title:"HTML5",
	description:"Curso de HTML5 desde cero. Lorem ipsum doloret sit amed borem",
	owner: {
		nickname:"DazHsv"
	},
	image_url:"http://lorempixel.com/400/150/nature"
},{
	id:"754864654168418",
	title:"JavaScript",
	description:"Curso de JavaScript desde cero. Lorem ipsum doloret sit amed borem",
	owner: {
		nickname:"DazHsv"
	},
	image_url:"http://lorempixel.com/400/150"
}];

app.listen(port,ipaddress);