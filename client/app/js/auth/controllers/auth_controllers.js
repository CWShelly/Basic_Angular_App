module.exports = function(app) {
  app.controller('AuthController', ['mvAuth', 'mvHandleError', '$location', function(auth, handleError, $location) {
    this.username = '';
    this.errors = [];
    this.getUsername = function() {
      auth.getUsername()
      .then((currentUser) => {
        this.username = currentUser;
      }, handleError(this.errors, 'could not get username'));
    }.bind(this);

    this.logout = function() {
      auth.removeToken();
      this.username = '';
      $location.path('/signin');
    }.bind(this);
  }]);
};
