var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SignInController', ['$http', '$location', 'mvHandleError', 'mvAuth', function($http, $location, handleError, auth) {
    this.buttonText = 'Sign in to existing user';
    this.errors = [];
    this.authenticate = function(user) {
      $http({
        method: 'GET',
        url: baseUrl + '/api/signin',
        headers: {
          'Authorization': 'Basic ' + window.btoa(user.username + ':' + user.password)
        }
      })
          .then((res) => {
            auth.saveToken(res.data.token);
            auth.getUsername();
            // $location.path('/mugs' && '/vinyl');
            $location.path('/mugs');
          }, handleError(this.errors, 'could not sign into user'));
    };
  }]);
};
