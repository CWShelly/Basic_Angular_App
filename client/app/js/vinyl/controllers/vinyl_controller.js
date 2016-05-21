
var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('VinylController', ['$http', function($http) {
    this.vinyl = [];
    this.getAll = () => {
      $http.get(baseUrl + '/api/vinyl')
    .then((res) => {
      this.vinyl = res.data;
    }, handleError.bind(this));
    };

    this.createVinyl = () => {
      $http.post(baseUrl + '/api/vinyl', this.newVinyl)
    .then((res) => {
      this.vinyl.push(res.data);
      this.newVinyl = null;
    }, handleError.bind(this));
    };

    this.updateVinyl = (vinyl) => {
      $http.put(baseUrl + '/api/vinyl/' + vinyl._id, vinyl)
    .then(() => {
      vinyl.editing = false;
    }, handleError.bind(this));
    };

    this.removeVinyl = (vinyl) => {
      $http.delete(baseUrl + '/api/vinyl/' + vinyl._id)
    .then(() => {
      this.vinyl.splice(this.vinyl.indexOf(vinyl), 1);
    }, handleError.bind(this));
    };

  }]);
};
