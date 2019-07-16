// gulpfile.js
const gulp  = require('gulp'),
    browserSync = require('browser-sync').create(),
    htmlmin = require('gulp-htmlmin'),
    nunjucksRender = require('gulp-nunjucks-render'); // importing the plugin
var sass = require('gulp-sass');
 
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');

const PATHS = {
    output: 'assets',
    templates: 'src/templates',
    pages: 'src/pages',
    images: 'src/images',
    js: 'src/js',
    sass: 'src/sass',
    fonts: 'src/fonts'
}

gulp.task('sass', function () {
  return gulp.src(PATHS.sass + '/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(PATHS.output + '/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(PATHS.sass + '/*.scss', ['sass']);
  gulp.watch(PATHS.sass + '/**/*.scss', ['sass']);
});
// writing up the gulp nunjucks task
gulp.task('nunjucks', function() {
    console.log('Rendering nunjucks files..');
    return gulp.src(PATHS.pages + '/**/*.+(html|js|css)')
        .pipe(nunjucksRender({
          path: [PATHS.templates],
          watch: true,
        }))
        .pipe(gulp.dest(PATHS.output));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: PATHS.output
        },
    });
});

gulp.task('watch', function() {
    // trigger Nunjucks render when pages or templates changes
    gulp.watch([PATHS.pages + '/**/*.+(html|js|css)', PATHS.templates + '/**/*.+(html|js|css)'], ['nunjucks'])
    
    // reload browsersync when `dist` changes
    gulp.watch(PATHS.output + '/*').on('change', browserSync.reload);
    gulp.watch(PATHS.output + '/*/**').on('change', browserSync.reload);
});

gulp.task('minify', function() {
  return gulp.src(PATHS.output + '/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        cssmin: true,
        jsmin: true,
        removeOptionalTags: true,
        removeComments: false
    }))
    .pipe(gulp.dest(PATHS.output));
});
gulp.task('images-loader', function() {
  return gulp.src([
            PATHS.images + '/*.*',
            PATHS.images + '/**/*.*'
        ])
    .pipe(gulp.dest(PATHS.output + '/images'));
});
gulp.task('js-loader', function() {
  return gulp.src([
            PATHS.js + '/*.*',
            PATHS.js + '/**/*.*'
        ])
    .pipe(gulp.dest(PATHS.output + '/js'));
});

gulp.task('fonts-loader', function() {
  return gulp.src([
            PATHS.fonts + '/*.*'
        ])
    .pipe(gulp.dest(PATHS.output + '/fonts'));
});



gulp.task('images-loader:watch', function () {
  gulp.watch(PATHS.images + '/*.*', ['images-loader'])
  gulp.watch(PATHS.images + '/**/*.*', ['images-loader'])
});
// run browserSync auto-reload together with nunjucks auto-render
gulp.task('auto', ['browserSync', 'watch', 'sass:watch', 'images-loader:watch', 'js-loader']);

gulp.task('build', ['nunjucks', 'sass', 'sass', 'images-loader', 'fonts-loader', 'js-loader']);


//default task to be run with gulp
gulp.task('default', ['nunjucks']);
