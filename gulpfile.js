const gulp = require('gulp');
const express = require('express');
const http = require('http');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const gp = require('gulp-protractor');
const webdriver_standalone = require('gulp-protractor').webdriver_standalone;

const server = http.createServer(express().use(express.static(__dirname + '/build/')));

const app = express();
app.listen(5000, () => console.log('up on 5000 from gulp'));

var files5 = [
  'gulpfile.js',
  'server.js'
];
var files6 = ['app/js/*.js',
  'gulpfile.js',
  'server.js'
];

gulp.task('webdriver_standalone', webdriver_standalone);

gulp.task('e2e_test', function(done) {
  gulp.src(['test/integration/**/*.js'], { read: false })
  .pipe(gp.protractor({
    configFile: './test/integration/config.js',
    args: ['--baseUrl', 'http://localhost:5000/build/index.html']
  })).on('error', function(err) {
    server.close();
    console.log(err);
    done();
  })
  .on('end', function() {
    server.close();
    done();
  });
});


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

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'lint:6', 'lint:5', 'webdriver_standalone', 'e2e_test' ]);
// gulp.task('e2e_test');

gulp.task('default', ['build:dev']);
