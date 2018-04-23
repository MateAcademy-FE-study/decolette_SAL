var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('hello', function() {
    console.log('hello, man!')
})

gulp.task('sass', function(){
    return gulp.src('app/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', ['build']); 
    gulp.watch('app/**/*.html', ['build']); 
    // Other watchers
  })

gulp.task('html', function(){
    return gulp.src('app/*.html')
      .pipe(gulp.dest('dist'))
  });

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
})


gulp.task('fonts', function(){
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function(){
    return del.sync('dist');
})

gulp.task('build', function(callback){
    runSequence('clean:dist', ['sass', 'html', 'images', 'fonts'])
})