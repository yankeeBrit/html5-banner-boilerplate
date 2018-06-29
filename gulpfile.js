const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      babel = require('gulp-babel'),
      minify = require('gulp-minify'),
      foreach = require('gulp-foreach');

gulp.task('build-css', function(){
  return gulp.src('src/*')
  .pipe(foreach(function(stream, file){
    var fileName = file.path.substr(file.path.lastIndexOf('/')+1);
    gulp.src('src/' + fileName + '/_sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/' + fileName + '/styles/'))
    return stream;
  }));
});

gulp.task('build-js', function(){
  return gulp.src('src/*')
  .pipe(foreach(function(stream, file){
    var fileName = file.path.substr(file.path.lastIndexOf('/')+1);
    gulp.src('src/' + fileName + '/_js/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(minify({
      ext:{
        min:'.min.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest('dist/' + fileName + '/scripts/'))
    return stream;
  }));
});

gulp.task('default', ['watch']);

gulp.task('watch', function() {
  return gulp.src('src/*')
  .pipe(foreach(function(stream, file){
    var fileName = file.path.substr(file.path.lastIndexOf('/')+1);
    gulp.watch('src/' + fileName + '/_sass/*.scss',['build-css']);
    gulp.watch('src/' + fileName + '/_js/*.js', ['build-js']);
    return stream;
  }));
})
