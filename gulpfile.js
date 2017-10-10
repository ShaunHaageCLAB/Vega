var gulp 		= require('gulp'),
	gutil 		= require('gulp-util'),
    
	filter      = require("gulp-filter"),
    fs          = require('fs'),
    del         = require('del'),
    es          = require('event-stream'),
    zip         = require('gulp-zip'),

	sass 		= require('gulp-sass'),
	sourcemaps 	= require('gulp-sourcemaps'),
	rename 		= require('gulp-rename'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	stripDebug 	= require('gulp-strip-debug'),
	buffer 		= require('vinyl-buffer'),
	watchify 	= require('watchify'),
	source 		= require('vinyl-source-stream'),
	xtend 		= require('xtend'),
	jscs 		= require('gulp-jscs'),
	jshint 		= require('gulp-jshint'),
	stylish 	= require('jshint-stylish'),
	notify 		= require("gulp-notify"),
	autoprefixer = require('gulp-autoprefixer'),
	combineMq 	= require('gulp-combine-mq');

var paths = {
	themename : 'vega',
	scss: {
		src: './scss/*.scss',
		dest: './css',
		imports : './scss/**/*.scss'
	},
	scripts: {
		src: ['./js/plugins/jquery-2.2.4.js', './js/plugins/bootstrap.min.js', './js/plugins/slick.1.8.0.js', './js/script.js']
	},
	developmentScripts : './scripts',
	productionScripts : './scripts/production'
}


function buildJS(source, filename) {
	gulp.src(source)
	.on("error", notify.onError("Error: <%= error.message %>"))
	.pipe(concat(filename))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(paths.developmentScripts))
	.pipe(stripDebug())
	.pipe(uglify())
	.pipe(gulp.dest(paths.productionScripts));
}

// Build SCSS files
gulp.task('scss', function () {
	return gulp.src(paths.scss.src)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.on("error", notify.onError("Error: <%= error.message %>"))
		.pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(paths.scss.dest));
});	

// Build scripts.js
gulp.task('scripts', function() {
	buildJS(paths.scripts.src, 'scripts.js');
});

// Watch changes in SCSS and Javscript
gulp.task('watch', function () {
	gulp.watch(paths.scss.imports, 		['scss']);
	gulp.watch(paths.scripts.src, 		['scripts']);
});


// Build all Front End code, Less and JS
gulp.task('default', ['scss', 'scripts', 'watch']);