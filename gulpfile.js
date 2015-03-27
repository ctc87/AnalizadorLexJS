var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat');
var del     = require('del');
var minifyHTML = require('gulp-minify-html');
var minifyCSS  = require('gulp-minify-css');
var karma = require('gulp-karma');

gulp.task('minify', function () {
  gulp.src('js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('minified'));

  gulp.src('./index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./minified/'))

  gulp.src('./*.css')
   .pipe(minifyCSS({keepBreaks:true}))
   .pipe(gulp.dest('./minified/'))
});

gulp.task('clean', function(cb) {
  del(['minified/*'], cb);
});

gulp.task('test', function() {
	return gulp.src([])
		.pipe(karma({
		configFile: 'karma.conf.js',
		action: 'run'
	}))
	.on('error', function(err) {
		throw err;
	});
});

gulp.task('default', function() {
	gulp.src([])
	.pipe(karma({
		configFile: 'karma.conf.js',
		action: 'watch'
	}));
});
