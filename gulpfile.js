var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var gulpCopy = require('gulp-copy');
var smushit = require('gulp-smushit');


// Static Server
gulp.task('serve', function () {
    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/**/*.*").on('change', browserSync.reload);
});



// Minify CSS
gulp.task('min-css', () => {
    return gulp.src('src/assets/css/*.css')
        .pipe(cleanCSS({
            debug: true
        }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(gulp.dest('dist/assets/css'));
});

// Minimize JS
gulp.task('min-js', function (cb) {
    pump([
            gulp.src('src/assets/js/*.js'),
            uglify(),
            gulp.dest('dist/assets/js')
        ],
        cb
    );
});

// Copy files to dist
gulp.task('copy', function () {
    gulp.src('src/**/*')
        .pipe(gulp.dest('dist/'));
});

// Build
gulp.task('build', function () {
    gulp.start('copy');
    gulp.start('min-css');
    gulp.start('min-js');

    // Optimize images
    gulp.src('src/assets/img/*')
        .pipe(smushit())
        .pipe(gulp.dest('dist/assets/img'))
        .on('end', function () {
            browserSync.init({
                server: "./dist"
            })
        });
});


// Run Default
gulp.task('default', ['serve']);