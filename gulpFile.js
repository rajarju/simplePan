var gulp = require('gulp'),
  rjs = require('gulp-requirejs'),
  clean = require('gulp-clean'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  compass = require('gulp-compass'),
  rename = require('gulp-rename'),
  minifyCSS = require('gulp-minify-css');

gulp.task('clean', function() {
    // gulp.src('public/dist/', {read: false})
    //     .pipe(clean());
});

gulp.task('test', function() {
  gulp.src([
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


gulp.task('default', ['clean',  'test', 'minifyJS', 'compass']);