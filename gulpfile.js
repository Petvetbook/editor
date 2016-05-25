var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var concatUtil = require('gulp-concat-util');
var rename = require("gulp-rename");
var realm = require('realm-js');
var riot = require('gulp-riot');
var gulpFile = require('gulp-file')
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var addsrc = require('gulp-add-src');
var prettify = require('gulp-jsbeautifier');
var bump = require('gulp-bump');
var insert = require('gulp-insert');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var base64 = require('gulp-base64-inline');
var cssmin = require('gulp-cssmin');
var sketch = require('gulp-sketch');

var spawn = require('child_process').spawn;
var node;

// Publish sc
gulp.task('increment-version', function() {
   gulp.src('./package.json')
      .pipe(bump())
      .pipe(gulp.dest('./'));
});
gulp.task('push', function(done) {
   var publish = spawn('npm', ['publish'], {
      stdio: 'inherit'
   })
   publish.on('close', function(code) {
      if (code === 8) {
         gulp.log('Error detected, waiting for changes...');
      }
      done()
   });
});
gulp.task("publish", ['dist', 'increment-version'], function(done) {
   runSequence('push')
});

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
      .pipe(base64('svg'))
      .pipe(cssmin({
         sourceMap: true
      }))
      .pipe(rename('editor.min.css'))
      .pipe(gulp.dest('build/'))
});

gulp.task('icons', function() {
   return gulp.src('src/icons.sketch')
      .pipe(sketch({
         export: 'artboards',
         formats: 'svg'
      }))
      .pipe(gulp.dest('src/scss/svg/'));
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

gulp.task('start', function() {
   runSequence('build-riot', 'build-universal', 'frontend-libs', 'sass', function() {
      runSequence('server')
      gulp.watch(['tags/**/*.tag'], function() {
         runSequence('build-riot')
      });
      gulp.watch(['src/scss/*.scss'], function() {
         runSequence('sass')
      });
      gulp.watch(['src/morrr/**/*.js'], function() {
         runSequence('build-universal')

      });
   });
});

gulp.task("build-riot", function() {
   return gulp.src("tags/**/*.tag")
      .pipe(riot({
         compact: true
      }))
      .pipe(realm.transpiler2.gulp(__dirname + "/tags/", "riot-tags.js", {
         preffix: "test.tags"
      }))
      .on('error', function(e) {
         console.log(e.stack);
         this.emit('end');
      })
      .pipe(gulp.dest('./build'));
});
gulp.task("build-universal", function() {
   return realm.transpiler2.universal(__dirname + "/src/morrr", "build/", {
      preffix: "morrr"
   })
});

gulp.task('dist', function(callback) {
   runSequence('build-universal', 'frontend-libs', 'dist-backend', 'icons', 'sass',
      'dist-frontend', 'concat-libs',
      'uglify-frontend',
      'dist-css', callback)
});

gulp.task("frontend-libs", function() {
   return gulp.src("src/frontend-libs/**/*.js")
      .pipe(concat('lib.js'))
      .pipe(gulp.dest("./build/"))
});;

gulp.task('dist-backend', function() {
   return gulp.src(["build/universal.js", "build/backend.js"])
      .pipe(concat("editor.js"))
      .pipe(prettify({
         js: {
            max_preserve_newlines: 1
         }
      }))
      .pipe(gulp.dest("./dist/backend/"))
});
gulp.task('dist-frontend', function() {
   return gulp.src(["build/universal.js"])
      .pipe(concat('editor.js'))
      .pipe(babel({
         presets: ["es2016"]
      }))
      .pipe(gulp.dest("./build"))
      .pipe(gulp.dest("./dist/frontend/"))
});
gulp.task('concat-libs', function() {
   return gulp.src(["build/lib.js", "dist/frontend/editor.js"])
      .pipe(concat('editor.js'))
      .pipe(gulp.dest("./dist/frontend/"))
});
gulp.task('uglify-frontend', function() {
   return gulp.src("dist/frontend/editor.js")
      .pipe(uglify())
      .pipe(rename('editor.min.js'))
      .pipe(gulp.dest('./dist/frontend/'));
});
gulp.task('dist-css', function() {
   return gulp.src(["build/editor.min.css"])
      .pipe(gulp.dest("./dist/frontend/"))
});
