var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var concatUtil = require('gulp-concat-util');
var rename = require("gulp-rename");
var realm = require('realm-js');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var addsrc = require('gulp-add-src');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');

var spawn = require('child_process').spawn;
var node;

gulp.task('sass', function() {
   return sass('src/scss/styles.scss', {
         sourcemap: true
      }).on('error', function(err) {
         console.error('Error!', err.message);
      })
      .pipe(autoprefixer({
         browsers: ['last 2 versions', 'ie 8', 'ie 9'],
         map: {
            inline: false
         }
      }))
      .pipe(cssmin({
         sourceMap: true
      }))
      .pipe(rename('editor.min.css'))
      .pipe(gulp.dest('build/'));
});

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
   gulp.watch(['src/**/*.js', 'src/scss/*'], function() {
      runSequence('build', 'sass', 'server')
   });
});

gulp.task('uglify', ['build'], function() {
   return gulp.src("build/build.js")
      .pipe(uglify())
      .pipe(rename('build.min.js'))
      .pipe(gulp.dest('build'));

});

gulp.task("build", function() {
   return gulp.src("src/morrr/**/*.js").pipe(realm.transpiler({
         preffix: "morrr",
         base: "src/morrr",
         target: "./build.js"
      }))
      .pipe(babel({
         presets: ["es2016"],
         plugins: ["transform-decorators-legacy"]
      }))
      .on('error', function(e) {
         console.log(e.stack);
         this.emit('end');
      })
      .pipe(realm.transpiler({
         wrap: true
      }))
      .pipe(addsrc('src/lib/**/*.js'))
      .pipe(concat('build.js'))
      .pipe(gulp.dest("./build"));
});;
