var gulp = require('gulp');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var namespace = require('gulp-jade-namespace');
var sass = require('gulp-sass');
var bourbon = require('./bower_components/bourbon');
var neat = require('./bower_components/neat');
var babel = require('gulp-babel');
var webserver = require('gulp-webserver');
var del = require('del');

var sassIncludePaths = [].concat(bourbon.includePaths, neat.includePaths);

gulp.task('polyfills', function () {
  return gulp.src(['./bower_components/es6-shim/es6-shim.js',
                   './bower_components/fetch/fetch.js',
                   './node_modules/jade/**/runtime.js'])
    .pipe(concat('pollyfills.js'))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('jade', function () {
  return gulp.src('./templates/!(includes)/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function () {
  return gulp.src('./styles/*.scss')
    .pipe(sass({includePaths: sassIncludePaths}))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('client-templates', function() {
  return gulp.src('./client-templates/*.jade')
    .pipe(jade({ client: true}))
    .pipe(namespace({namespace: 'jade'}))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('scripts', function (){
  return gulp.src('./scripts/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('server', ['build'], function (){
  gulp.src('./dist')
    .pipe(webserver(
      {liveReload: true, open: true}
    ));
});

gulp.task('clean', function () {
  return del([
    'dist/**',
    '!dist'
  ]);
});

gulp.task('build', ['polyfills','jade','styles','client-templates']);
