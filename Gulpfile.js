/**
 * Created by daneding on 7/13/15.
 */
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('clean:fixture', function(cb) {
  del([
    './dist/fixture.bundle.js'
  ], cb);
});

gulp.task('clean:app', function(cb) {
  del([
    './dist/app.bundle.js'
  ], cb);
});

gulp.task('fixture', ['clean:fixture'],  function() {
  return gulp.src('./js/fixtures/main.js')
    .pipe(browserify({
      transform: ['babelify', 'envify']
    }))
    .pipe(rename('fixture.bundle.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('app', ['clean:app'], function() {
  return gulp.src('./js/app.js')
    .pipe(browserify({
      transform: ['babelify', 'envify', 'browserify-css']
    }))
    .pipe(rename('app.bundle.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['fixture', 'app']);
gulp.task('clean', ['clean:app', 'clean:fixture']);