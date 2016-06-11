var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
 
gulp.task('default', function () {
  return gulp.src('css/*.css')
    .pipe(concatCss("css/bundle.css"))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(rename("bundle.min.css"))
    .pipe(gulp.dest('css/'))
    .pipe(notify("file <%= file.relative %> is modified"));
});

gulp.task('watch', function() {
	gulp.watch('css/*.css', ['default']);
});