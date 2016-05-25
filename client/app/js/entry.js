
const angular = require('angular');
const mvApp = angular.module('mvApp', []);
// const baseUrl = 'http://localhost:4000';
require('./services')(mvApp);
require('./mugs')(mvApp);
require('./vinyl')(mvApp);
