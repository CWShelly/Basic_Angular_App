const gulp = require('gulp');
const protractor = require('gulp-protractor').protractor;
const cp = require('child_process');
const webpack = require('webpack-stream');
const mongoUri = 'mongodb://localhost/test_mvserver';
var children = [];

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
.pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./build'));

});

gulp.task('startservers:test', () => {
  children.push(cp.fork('server.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('../server/server', [], { env: { MONGO_URI: mongoUri } }));
});

gulp.task('protractor:mugtest', () => {
  gulp.src('test/integration/**/*spec.js')
  .pipe(protractor({
    configFile: 'test/integration/mugs/config.js'
  }))
  .on('end', () => {
    children.forEach((child) => {
      child.kill('SIGTERM');
    });
  });
});


gulp.task('protractor:vinyltest', () => {
  gulp.src('test/integration/vinyl/*spec.js')
  .pipe(protractor({
    configFile: 'test/integration/vinyl/config.js'
  }))
  .on('end', () => {
    children.forEach((child) => {
      child.kill('SIGTERM');
    });
  });
});

gulp.task('static:dev', () => {
  gulp.src('app/**/*.html')
.pipe(gulp.dest('./build'));

});


gulp.task('protractor:tests', ['startservers:test', 'protractor:mugtest', 'protractor:vinyltest']);
gulp.task('build:dev', ['webpack:dev', 'static:dev']);

gulp.task('default', ['build:dev']);
