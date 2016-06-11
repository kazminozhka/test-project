var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var prefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var scss = require("gulp-scss");
var uncss = require('gulp-uncss');

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
  return gulp.src('scss/*.scss')
    .pipe(scss())
    .pipe(uncss({
            html: ['index.html']
        }))
    .pipe(prefix('last 2 versions', '> 1%', 'ie 9'))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('css/'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('scss/*.scss', ['css']);
	gulp.watch('index.html', ['html']);
});

gulp.task('default', ['connect', 'watch']);