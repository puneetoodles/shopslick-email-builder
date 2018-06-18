const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const less = require('gulp-less');
const inject = require('gulp-inject');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const ngAnnotate = require('gulp-ng-annotate');
const runSequence = require('run-sequence');
const replace = require('gulp-string-replace');
const config = require('./app/config.js');
const es6transpiler = require('gulp-es6-transpiler');
var minifyJS = require('gulp-minify');

/* Available tasks

 gulp compile_less - compile main stylesheet (app.min.css)
 gulp less:watch - autocompile *.less when have changes

 gulp common_scripts - common scripts/plugins used in template
 gulp app_js - concatenate/minify /app (without /app/bower_components) files (app.min.js) in /build folder

 gulp copy_files - copy needed files from /app to /_dist

 */

var source = {
  js: {
      src: [
        'app/controllers/email-controller.js',
        'app/services/storage-services.js',
        'app/services/utils-services.js',
        'app/directives/common-directives.js',
      ]
  }
};

gulp.task('common_scripts', function() {
  return gulp
    .src([
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-loader/angular-loader.js',

      'app/bower_components/angular-translate/angular-translate.js',
      'app/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',

      'app/bower_components/tinymce/tinymce.js',
      'app/bower_components/angular-ui-tinymce/src/tinymce.js',

      'app/bower_components/angular-tooltips/dist/angular-tooltips.js',

      'app/bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',

      'app/bower_components/alertifyjs/dist/js/alertify.js',
      'app/bower_components/alertifyjs/dist/js/ngAlertify.js',

      'app/bower_components/angular-dragula/dist/angular-dragula.js',

    ])
    .pipe(ngAnnotate())
    .pipe(concat('common.min.js'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('controller_scripts', function() {
  return gulp
    .src(source.js.src)
    .pipe(ngAnnotate())
    .pipe(concat('common-controller.js'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('watch', function() {
  gulp.watch(source.js.src, ['controller_scripts']);
});


gulp.task('compile_less', function() {
  return gulp
    .src(
      `app/css/_dark-theme.less`
    )
    .pipe(less())
    .pipe(
      cleanCSS({
        compatibility: 'ie8',
      })
    )
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('less:watch', function() {
  gulp.watch(
    [
      `app/css/*.less`,
      'app/*.less',
      'app/md/*.less'
    ],
    ['compile_less']
  );
});

gulp.task('copy_tinymce', function() {
  return gulp
    .src('app/bower_components/tinymce/**/*', {
      base: './app',
    })
    .pipe(gulp.dest(config.buildFolder));
});

gulp.task('replace', function() {
  return gulp
    .src('./app/index.html')
    .pipe(
      replace(
        new RegExp('@builderTitle@|@UA@|@builderDescription@', 'g'),
        function(rep) {
          return config[rep.replace(/@/gi, '')];
        }
      )
    )
    .pipe(gulp.dest(config.buildFolder));
});

gulp.task('copy_files', function() {
  return gulp
    .src(
      [
        'app/**',
        '!app/{bower_components,bower_components/**,**/*.less,app.js,config.js,controllers/*.js,index.html,md,md/**}',
      ],
      {
        base: './app',
      }
    )
    .pipe(gulp.dest(`_dist`));
});

gulp.task('app_js', function() {
  return gulp
    .src(['app/config.js', 'app/app.js'])
    .pipe(concat('app.min.js'))
    .pipe(
      es6transpiler({
        disallowUnknownReferences: false,
      })
    )
    .pipe(ngAnnotate())
    .pipe(gulp.dest(config.buildFolder));
});

gulp.task('add_app_min', function() {
  let target = gulp.src(config.buildFolder + '/index.html');
  let sources = gulp.src(config.buildFolder + '/app.min.js', {
    read: false,
  });

  return target
    .pipe(
      inject(sources, {
        ignorePath: config.buildFolder,
        addRootSlash: false,
        relative: false,
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest(config.buildFolder));
});

gulp.task('default', function() {
  return runSequence(
    ['common_scripts', 'controller_scripts', 'watch', 'compile_less', 'replace'],
    ['copy_tinymce', 'copy_files', 'less:watch'],
    'app_js',
    'add_app_min'
  );
});
