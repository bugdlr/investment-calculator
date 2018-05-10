'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const connect = require('gulp-connect');
const open = require('gulp-open');

gulp.task('less', () => {
  return gulp.src('less/**/*.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

gulp.task('html', () => {
  return gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('connect', () => {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', () => {
  gulp.watch('less/*.less', ['less']);
  gulp.watch('index.html', ['html']);
  gulp.watch('script.js', ['html']);
});

gulp.task('open', () => {
  gulp.src('index.html')
  .pipe(open({uri: 'http://localhost:8080/'}));
});

gulp.task('default', [ 'less', 'html', 'watch', 'connect', 'open' ]);
