var gulp = require('gulp'),
  clean = require('gulp-clean'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  compass = require('gulp-compass'),
  rename = require('gulp-rename'),
  zip = require('gulp-zip'),
  minifyCSS = require('gulp-minify-css'),
  livereload = require('gulp-livereload'),
  gutil = require('gulp-util'),
  dest = "./";

gulp.task('serve', function(next) {
  var staticS = require('node-static'),
      server = new staticS.Server('./' + dest),
      port = 9876;

  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      server.serve(request, response);
    }).resume();
  }).listen(port, function() {
    gutil.log('Server listening on port: ' + gutil.colors.magenta(port));
    next();
  });
});

gulp.task('watch', ['serve'], function() {
  var server = livereload();
  gulp.watch(dest + '/**').on('change', function(file) {
      server.changed(file.path);
  });
});


gulp.task('clean', function() {
    gulp.src([
      'dist/js/*',
      'dist/css/*'
      ], {read: false})
        .pipe(clean());
});

gulp.task('test', function() {
  gulp.src([
    'gulpFile.js',
    'src/js/*'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minifyJS', function() {

  gulp.src([
    'src/js/*'
    ])
  .pipe(gulp.dest('dist/js'))
  .pipe(uglify())
  .pipe(rename(function(path){
    path.basename += ".min";
  }))
  .pipe(gulp.dest('dist/js'));

});

gulp.task('compass', function() {
  gulp.src('src/sass/*.scss')
      .pipe(compass({
          fonts: 'src/font',
          css: 'src/css',
          sass: 'src/sass',
          image: 'src/img'
      }))
      .pipe(gulp.dest('dist/css'))
      .pipe(minifyCSS())
      .pipe(rename(function(path){
        path.basename += ".min";
      }))
      .pipe(gulp.dest('dist/css'));
});


gulp.task('release', function () {
  gulp.src('dist/*')
      .pipe(zip('release.zip'))
      .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean',  'test', 'minifyJS', 'compass', 'release']);