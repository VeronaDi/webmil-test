//*********** IMPORTS *****************
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var gutil = require('gulp-util');
var rename = require("gulp-rename");
var map = require("map-stream");
var livereload = require("gulp-livereload");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
global.errorMessage = '';

//Configuration - Change me
var sassFiles = [
	{
		watch: 'source/stylesheets/site.css.scss',
		sass: 'source/stylesheets/site.css.scss',
		output: './webmil-test/source/stylesheets',
		name: 'site.css',
	},
];
var jsFiles = [
	{
		watch: 'source/javascripts/*.js',
		output: './webmil-test/source/javascripts/',
		name: 'main.js',
		nameMin: 'main.min.js'
	},
];
//END configuration


gulp.task('watch', function () {
	for (var i in sassFiles) {
		sassWatch(sassFiles[i]);
	}

	for (var j in jsFiles) {
		scriptWatch(jsFiles[j]);
	}
});

function sassWatch(sassData) {
	gulp.src(sassData.watch)
	.pipe(watch(sassData.watch, function() {
		gulp.src(sassData.sass)
		.pipe(sass(sassOptions))
		.on('error', function(err) {
				gutil.log(err.message);
				gutil.beep();
				global.errorMessage = err.message + " ";
		})
		.pipe(checkErrors())
		.pipe(rename(sassData.name))
		.pipe(gulp.dest(sassData.output))
		.pipe(livereload());
	}));
}

function scriptWatch(jsData) {
	gulp.src(jsData.watch)
	.pipe(watch(scriptData.watch, function() {
		gulp.src(jsData.watch)
		.pipe(concat(jsData.name))
		.pipe(gulp.dest(jsData.output))
		.pipe(uglify({outSourceMap: false}))
		.pipe(rename(jsData.nameMin))
		.pipe(gulp.dest(jsData.output));
	}));
}

gulp.task('default', ['watch']);

/// Defaults yo
var sassOptions = {
	'style': 'compressed',
	'unixNewlines': true,
	'cacheLocation': '_scss/.sass_cache'
};

// Does pretty printing of sass errors
var checkErrors = function (obj) {
	function checkErrors(file, callback, errorMessage) {
		if (file.path.indexOf('.scss') != -1) {
				file.contents  = new Buffer("\
					body * { white-space:pre; }\
					body * { display: none!important; }\
					body:before {\
						white-space:pre;\
						content: '"+ global.errorMessage.replace(/(\\)/gm,"/").replace(/(\r\n|\n|\r)/gm,"\\A") +"';\
					}\
					html{background:#ccf!important; }\
				");
		}
		callback(null, file);
	}
	return map(checkErrors);
};

