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

var insert = require('gulp-insert');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var base64 = require('gulp-base64-inline');
var cssmin = require('gulp-cssmin');
var sketch = require('gulp-sketch');

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
      .pipe(base64('svg'))
      .pipe(cssmin({
         sourceMap: true
      }))
      .pipe(rename('editor.min.css'))
      .pipe(gulp.dest('build/'))
      .pipe(gulp.dest('dist/frontend'));
});

gulp.task('icons', function() {
   return gulp.src('src/icons.sketch')
      .pipe(sketch({
         export: 'artboards',
         formats: 'svg'
      }))
      .pipe(gulp.dest('src/scss/svg/'));
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

gulp.task('start', function() {

   runSequence('build-riot', 'build-universal', 'babel-all', 'frontend-libs', function() {
      runSequence('server')
      gulp.watch(['src/sherlock/admin/tags/**/*.tag'], function() {
         runSequence('build-riot')
      });
      gulp.watch(['src/morrr/**/*.js'], function() {
         runSequence('build-universal', 'babel-all');

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
      .pipe(babel({
         presets: ["es2016"],
         plugins: ["transform-decorators-legacy"]
      }))
      .on('error', function(e) {
         console.log(e.stack);
         this.emit('end');
      })
      .pipe(gulp.dest('./build'));
});

gulp.task("babel-all", function() {
   return gulp.src(["build/frontend.js", "build/backend.js", "build/universal.js"])
      .pipe(babel({
         presets: ["es2016"],
         plugins: ["transform-decorators-legacy"]
      }))
      .on('error', function(e) {
         console.log(e.stack);
         this.emit('end');
      })
      .pipe(gulp.dest("./build"));
});

gulp.task('dist', function(callback) {
   runSequence('build-universal', 'babel-all', 'frontend-libs', 'dist-backend', 'dist-frontend', 'icons', 'sass', callback)
});

gulp.task('dist-backend', function() {
   return gulp.src(["build/universal.js", "build/backend.js"])
      .pipe(concat("backend.js"))
      .pipe(gulp.dest("./dist/backend/"))
});
gulp.task('dist-frontend', function() {
   return gulp.src(["build/lib.js", "build/universal.js"])
      .pipe(concat('editor.js'))
      .pipe(gulp.dest("./dist/frontend/"))
});

gulp.task('uglify', function() {
   return gulp.src("dist/editor.js")
      .pipe(uglify())
      .pipe(rename('editor.min.js'))
      .pipe(gulp.dest('./dist'));

})

gulp.task("build-universal", function() {
   return realm.transpiler2.universal(__dirname + "/src/morrr/", __dirname + "/build", {
      preffix: "morrr"
   });
});;

gulp.task("frontend-libs", function() {
   return gulp.src("src/frontend-libs/**/*.js")
      .pipe(concat('lib.js'))
      .pipe(gulp.dest("./build/"))
});;
