const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');

var files5 = [
  'gulpfile.js',
  'server.js'
];
var files6 = ['app/js/*.js',
  'gulpfile.js',
  'server.js'
];

gulp.task('lint:6', () => {
  return gulp.src(files6)
  .pipe(eslint( {
    useEslintrc: true,
    warnFileIgnored: true,
    env: {
      'browser': true,
      'es6': true,
      'node': true,
      'angular': true
    }
  }))
  .pipe(eslint.format());
});

gulp.task('lint:5', () => {
  return gulp.src(files5)
  .pipe(eslint( {
    useEslintrc: true,
    warnFileIgnored: true,
    env: {
      'browser': true,
      'es5': true,
      'angular': true
    }
  }))
  .pipe(eslint.format());
});

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
.pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  gulp.src('app/**/*.html')
.pipe(gulp.dest('./build'));
});

gulp.task('build:dev', ['lint:6', 'lint:5', 'webpack:dev', 'static:dev']);
gulp.task('default', ['build:dev']);
