var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var concatUtil = require('gulp-concat-util');
var rename = require("gulp-rename");
var realm = require('realm-js');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

var spawn = require('child_process').spawn;
var node;

gulp.task('watch', function() {
   gulp.watch(['src/**/*.js'], ['build']);
});

gulp.task('server', function() {
   if (node) node.kill()
   node = spawn('node', ['app.js'], {
      stdio: 'inherit'
   })
   node.on('close', function(code) {
      if (code === 8) {
         gulp.log('Error detected, waiting for changes...');
      }
   });
});

gulp.task('start', ['server'], function() {
   gulp.watch(['src/**/*.js'], function() {
      runSequence('build', 'server')
   });
});

gulp.task("build", function() {
   return gulp.src("src/**/*.js").pipe(realm.transpiler({
         preffix: "morrr",
         base: "src",
         target: "./build.js"
      }))
      .pipe(babel({
         presets: ["es2016"],
         plugins: ["transform-decorators-legacy"]
      }))
      .pipe(realm.transpiler({
         wrap: true
      }))
      .pipe(gulp.dest("./"));
});
