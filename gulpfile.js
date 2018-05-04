var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    runSequence = require('run-sequence'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function(){
    return gulp.src('app/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', ['styles']); 
    gulp.watch('app/**/*.html', ['html']); 
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

gulp.task('scripts', function(){
    return gulp.src('app/js/**')
        .pipe(gulp.dest('dist/js'))
})

gulp.task('clean:dist', function(){
    return del.sync('dist');
})

gulp.task('build', function(callback){
    runSequence('clean:dist', ['styles', 'html', 'images', 'fonts', 'scripts'])
})

gulp.task('default', ['build', 'watch'])