var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
   // runSequence = require('run-sequence'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer');

function styles(){
    return gulp.src('app/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
};

function watch() {
    gulp.watch('app/scss/**/*.scss', styles); 
    gulp.watch('app/**/*.html', html);
    gulp.watch('app/js/**/*.js', scripts); 
  }

function html() {
    return gulp.src('app/*.html')
      .pipe(gulp.dest('dist'));
  };

function css() {
    return gulp.src('app/css/*.css')
      .pipe(gulp.dest('dist/css'));
  };

function images() {
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
};

function fonts() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
}

function scripts() {
    return gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));
}

function clean() {
    return del(['dist']);
}

var build = gulp.series(clean, gulp.parallel(styles, html, images, fonts, scripts, css));

gulp.task('default', gulp.series(build, watch));