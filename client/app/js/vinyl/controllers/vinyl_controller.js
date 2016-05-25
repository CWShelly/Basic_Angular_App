
// var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('VinylController', ['$http', 'mvHandleError', function($http, mvHandleError) {
    this.vinyl = [];
    this.errors = [];
    this.getAll = function() {
      $http.get(baseUrl + '/api/vinyl')
    .then((res) => {
      this.vinyl = res.data;
    }, mvHandleError(this.errors, 'could not get vinyls'));
    }.bind(this);

    this.createVinyl = function() {
      $http.post(baseUrl + '/api/vinyl', this.newVinyl)
    .then((res) => {
      this.vinyl.push(res.data);
      this.newVinyl = null;
    }, mvHandleError(this.errors, 'could not save vinyl'));
    }.bind(this);

    this.updateVinyl = function(vinyl) {
      $http.put(baseUrl + '/api/vinyl/' + vinyl._id, vinyl)
    .then(() => {
      vinyl.editing = false;
    }, mvHandleError(this.errors, 'could not update vinyl'));
    }.bind(this);

    this.removeVinyl = function(vinyl) {
      $http.delete(baseUrl + '/api/vinyl/' + vinyl._id)
    .then(() => {
      this.vinyl.splice(this.vinyl.indexOf(vinyl), 1);
    }, mvHandleError(this.errors, 'could not delete vinyl'));
    }.bind(this);

  }]);
};
