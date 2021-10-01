/**
 * Main Gulp File
 * Removed dead/unused code
 * Add ES6 uglifier Terser for es6+ uglifying
 * add cleanCSS in place of minifyCSS (depreciated, has some weird bugs)
 * Files listed in js task will be concatenated, minified, and piped into main.min.js
 */

 var config = require('./config.js');

 var gulp = require("gulp");
 var sass = require('gulp-sass')(require('sass'));
 var rename = require("gulp-rename");
 var cleanCSS = require('gulp-clean-css');
 
 // compiles css and minifies css
 gulp.task("sass", function() {
     return gulp
     .src("public/stylesheets/style.scss")
     .pipe(sass().on("error", sass.logError))
     .pipe(gulp.dest("public/stylesheets/"))
     .pipe(cleanCSS())
     .pipe(rename('style.min.css'))
     .pipe(gulp.dest("public/stylesheets/"));
 });


 
 //split this into individual watches so that everything doenst run every time
 gulp.task("watch", function() {
     gulp.watch("public/stylesheets/*.scss", gulp.parallel("sass"));
 });
 
 gulp.task(
     "default",
     gulp.series(
     "sass",
     "watch", function(done) {
         done();
     })
 );
 