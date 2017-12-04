var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

// Static Server
gulp.task('serve', function () {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/**/*.*").on('change', browserSync.reload);
});

// Optmize Images
gulp.task('images', () =>
    gulp.src('src/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/img'))
);

// Build 
gulp.task('build', ['images']);

// Run Default
gulp.task('default', ['serve']);