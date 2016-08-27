var gulp = require('gulp');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var namespace = require('gulp-jade-namespace');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var webserver = require('gulp-webserver');
var del = require('del');
var rsync = require('gulp-rsync');

var sassIncludePaths = ['./bower_components/bootstrap/scss']

gulp.task('polyfills', function () {
  return gulp.src(['./bower_components/es6-shim/es6-shim.js',
                   './bower_components/fetch/fetch.js',
                   './node_modules/jade/**/runtime.js'])
    .pipe(concat('polyfills.js'))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('jade', function () {
  return gulp.src(['./templates/!(includes)/*.jade', './templates/*.jade'])
    .pipe(jade({
      pretty: true
    }))
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

gulp.task('server', ['build', 'watch'], function (){
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

gulp.task('watch', function() {
  gulp.watch('scripts/**/*', ['scripts']);
  gulp.watch('styles/**/*', ['styles']);
  gulp.watch(['./templates/**/*.jade', './templates/*.jade'], ['jade']);
  gulp.watch('./client-templates/**/*', ['client-templates']);
});

gulp.task('build', ['polyfills','jade','styles','client-templates']);

gulp.task('deploy', ['build'], function(){
  return gulp.src('./dist/**')
    .pipe(rsync({
      root: 'dist',
      username: 'minecraft',
      hostname: 'linode',
      destination: '/var/www/html/blockyspaceman.com/public_html',
      archive: true,
      silent: false,
      compress: true,
      K: true,
    }));
});
