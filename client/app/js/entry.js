
const angular = require('angular');
const mvApp = angular.module('mvApp', []);
// const baseUrl = 'http://localhost:4000';

require('./mugs')(mvApp);
require('./vinyl')(mvApp);
