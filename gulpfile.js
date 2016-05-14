var gulp = require("gulp"),
	sass = require("gulp-sass"),
	jshint = require("gulp-jshint"),
	sourcemaps = require("gulp-sourcemaps"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename")
	image = require('gulp-image'),
	prefix = require("gulp-autoprefixer");;

gulp.task('sass',function(){
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(prefix({
			browsers:['last 2 versions', '> 5%', 'ie 8']
		}))
		.pipe(rename({suffix:'.min'}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('jshint',function(){
	return gulp.src('./src/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('minifyjs',function(){
	return gulp.src('src/js/**/*')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('optimizeimg',function(){
	return gulp.src('./src/img/**/*')
		.pipe(image())
		.pipe(gulp.dest('./public/img'));
});

gulp.task('watch',function(){
	gulp.watch("./src/sass/**/*.scss",['sass']);
	gulp.watch("./src/js/**/*",['minifyjs']);
	gulp.watch("./src/img/*",['optimizeimg']);
});

gulp.task('default',['sass','minifyjs','optimizeimg','watch']);
gulp.task('compile',['sass','minifyjs','optimizeimg']);
