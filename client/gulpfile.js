const gulp = require('gulp');
const protractor = require('gulp-protractor').protractor;
const cp = require('child_process');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const mongoUri = 'mongodb://localhost/test_mvserver';
var children = [];

var serverFiles = ['../server.js', '../lib/**/*.js', '../test/**/*.js'];
var clientFiles = ['app/**/*.js', 'server.js', 'gulpfile.js', 'test/**/*.js'];

gulp.task('lint:server', () => {
  return gulp.src(serverFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});
gulp.task('lint:client', () => {
  return gulp.src(clientFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
.pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./build'));

});

gulp.task('css:dev', () => {
  gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('webpack:mugstest', () => {
  gulp.src('test/unit/mugs/test_entry.js')
  .pipe(webpack(require('./webpack.config.js')
  ))
  .pipe(gulp.dest('./karma_bundles/mugs'));
});

gulp.task('webpack:vinyltest', () => {
  gulp.src('test/unit/vinyl/test_entry.js')
  .pipe(webpack(require('./webpack.config.js')
  ))
  .pipe(gulp.dest('./karma_bundles/vinyl'));
});

gulp.task('startservers:test', () => {
  children.push(cp.fork('server.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('../server/server', [], { env: { MONGO_URI: mongoUri } }));
});

gulp.task('protractor:e2etest', () => {
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


gulp.task('static:dev', () => {
  gulp.src('app/**/*.html')
.pipe(gulp.dest('./build'));

});

gulp.task('lint:files', ['lint:client', 'lint:server']);

gulp.task('protractor:tests', ['startservers:test', 'protractor:e2etest']);


gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);

gulp.task('default', ['build:dev']);
