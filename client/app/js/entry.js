
const angular = require('angular');
const mvApp = angular.module('mvApp', [require('angular-route')]);
// const baseUrl = 'http://localhost:4000';
require('./services')(mvApp);
require('./mugs')(mvApp);
require('./vinyl')(mvApp);
require('./auth')(mvApp);

mvApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/mugs', {
      templateUrl: 'templates/mugs/views/mugs_view.html',
      controller: 'MugsController',
      controllerAs: 'mugsctrl'
    })
    .when('/vinyl', {
      templateUrl: 'templates/vinyl/views/vinyl_view.html',
      controller: 'VinylController',
      controllerAs: 'vinylctrl'
    })
    .when('/signup', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authctrl'
    })
    .when('/signin', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignInController',
      controllerAs: 'authctrl'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);
