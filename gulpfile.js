const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Paths
const frontend = new function() {
    this.root = './front-end';
    this.all = this.root + '/**/*.*';
    this.src = this.root + '/src/';
    this.dist = this.root + '/dist/';
    this.css = this.root + this.src + '/assets/css/';
    this.sass = this.root + this.src + '/assets/sass/**/*.*';
    this.js = this.root + this.src + '/assets/js/**/*.js';
    this.images = this.root + this.src + '/assets/img/**/*.*';
}

// Minify CSS with SASS
function styles() {
    return (
        gulp
            .src(frontend.sass)
            .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: 'compressed' }))
            .on('error', sass.logError)
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
            }))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(frontend.css))
    );
}
exports.styles = styles

// Minify JavaScript
function scripts() {
    return (
        gulp
            .src(frontend.js, {
                sourcemaps: true
            })
            .pipe(uglify())
            // .pipe(concat('main.min.js'))
            .pipe(gulp.dest(frontend.dist + '/assets/js/'))
    );
}
exports.scripts = scripts

// Minify Images
function images() {
    return (
        gulp
            .src(frontend.src + '/**/*.*')
            .pipe(imagemin())
            .pipe(gulp.dest(frontend.dist))
    )
};
exports.images = images

// Minify HTML 
function html() {
    return (
        gulp
            .src(frontend.src + '/**/*.html')
            .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true }))
            .pipe(gulp.dest(frontend.dist))
    )
}
exports.html = html

// Live Server
function frontendServer() {
    browserSync.init({
        server: {
            baseDir: frontend.src
        }
    });
    frontendWatch();
}
exports.frontendServer = frontendServer

// Watch
function frontendWatch() {
    gulp.watch(frontend.sass, styles)
    gulp.watch(frontend.all).on('change', browserSync.reload);
}
exports.frontendWatch = frontendWatch

// Build and Deploy
const frontendDeploy = gulp.series(() => del(frontend.dist), styles, images, scripts, html)

// Commands
gulp.task('deploy', frontendDeploy)
gulp.task('build', frontendDeploy)
gulp.task('serve', frontendServer)