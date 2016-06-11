var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var prefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true,
    open: true
  });
});

gulp.task('html', function() {
  gulp.src('index.html')
  	.pipe(connect.reload());
});
 
gulp.task('css', function () {
  return gulp.src('css/*.css')
    .pipe(concatCss("css/bundle.css"))
    .pipe(prefix('last 2 versions', '> 1%', 'ie 9'))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(rename("bundle.min.css"))
    .pipe(gulp.dest('css/'))
    .pipe(notify("file <%= file.relative %> is modified"))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('css/*.css', ['css']);
	gulp.watch('index.html', ['html']);
});

gulp.task('default', ['connect', 'watch']);