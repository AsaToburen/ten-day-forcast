var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    inject = require('gulp-inject');

gulp.task('copy-html-files', function() {
    gulp.src(['./app/*.html'], {
            base: './app'
        })
        .pipe(gulp.dest('build/'));
});

gulp.task('imagemin', function() {
    return gulp.src('./app/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('build/images/'));
});

gulp.task('usemin', function() {
    gulp.src('./app/index.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat', rev()],
            vendor: [rev()],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest('build/'));
});


gulp.task('sass', function() {
    return sass('app/styles/scss', {
            sourcemap: true
        })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('app/styles/css/'))
        .pipe(browserSync.stream());
});

gulp.task('clean', function() {
    del(['build'], function(err, paths) {
        console.log('Deleted files/folders:\n', paths.join('\n'));
    });
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/**/**/*.js").on('change', browserSync.reload);
    gulp.watch("app/styles/scss/**/*.scss", ['sass'], browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});
