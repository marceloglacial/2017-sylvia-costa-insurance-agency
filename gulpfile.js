const gulp = require('gulp');
const del = require('del');
const download = require('gulp-download');
const decompress = require('gulp-decompress');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const zip = require('gulp-zip');
const rename = require('gulp-rename');

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
const backend = new function() {
    this.url = 'https://wordpress.org';
    this.version = 'latest.zip';
    this.proxy = 'http://localhost:8888';
    this.root = './back-end';
    this.src = this.root + '/src/';
    this.dist = this.root + '/dist/';
    this.server = this.root + '/server/';
    this.tmp = this.root + '/tmp/';
    this.themeName = 'sylvia-costa-insurance-agency';
    this.themeFolder = this.server + '/wp-content/themes/' + this.themeName;
}

// ===================================================
// Front-end
// ===================================================

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
gulp.task('frontend-deploy', frontendDeploy)
gulp.task('frontend-build', frontendDeploy)
gulp.task('frontend-start', frontendServer)

//
// ===================================================
// Back-end
// ===================================================
//
// Fisrt steps:
// * Start PHP and MySQL servers 
// * Create a WordPress database
//

// Download Wordpress
function wpDownload() {
    return (
        download(backend.url + '/' + backend.version)
        .pipe(gulp.dest(backend.tmp))
    )
}
exports.wpDownload = wpDownload

// Decompress Wordpress and add to server folder
function wpUnzip() {
    return (
        gulp
            .src(backend.tmp + '/*.{tar,tar.bz2,tar.gz,zip}')
            .pipe(decompress({ strip: 1 }))
            .pipe(gulp.dest(backend.server))
    )
}
exports.wpUnzip = wpUnzip

// Copy file from work folder to server folder
function wpCopy() {
    return (
        gulp
            .src(frontend.src + '/**/*.*')
            .pipe(gulp.dest(backend.src))
            .pipe(gulp.src(backend.src))
            .pipe(gulp.dest(backend.themeFolder))
    )
}
exports.wpCopy = wpCopy

// Delete WordPress files
function wpClean() {
    return (
        del([backend.tmp, backend.server])
    )
}
exports.wpClean = wpClean

// BrowserSync with new file
function wpLive() {
    return (
        gulp
            .src(backend.src)
            .pipe(gulp.dest(backend.server + '/wp-content/themes/' + backend.themeName))
            .pipe(browserSync.stream())
    )
}
exports.wpLive = wpLive

// Start server
function wpStart() {
    browserSync.init({
        proxy: backend.proxy + '/' + backend.themeName + '/' + backend.server
    });
    wpWatch()
}
exports.wpStart = wpStart

// Watch
function wpWatch() {
    gulp.watch(backend.src).on('change', wpLive);
}
exports.wpWatch = wpWatch


// Deploy
function zipfiles() {
    return (
        gulp
            .src(paths.project.dist + '/**/*')
            .pipe(zip(backend.themeName + '.zip'))
            .pipe(gulp.dest(paths.project.deploy))
    )
}
exports.zipfiles = zipfiles

// Commands 
const install = gulp.series(wpClean, wpDownload, wpUnzip, wpCopy, () => del(backend.tmp))
// const build = gulp.series(() => del(paths.project.dist), styles, scripts, copy, images, html)
// const deploy = gulp.series(() => del(paths.project.dist), build, zipfiles)

gulp.task('backend-install', install)
gulp.task('backend-start', wpStart)
// gulp.task('backend-build', build)
// gulp.task('backend-deploy', deploy)