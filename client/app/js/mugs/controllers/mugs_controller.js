
// var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('MugsController', ['$http', 'mvHandleError', function($http, mvHandleError) {
    this.mugs = [];
    this.errors = [];
    this.getAll = function() {
      $http.get(baseUrl + '/api/mugs')
    .then((res) => {
      this.mugs = res.data;
    }, mvHandleError(this.errors, 'could not get mugs'));
    }.bind(this);

    this.createMug = function() {
      $http.post(baseUrl + '/api/mugs', this.newMug)
    .then((res) => {
      this.mugs.push(res.data);
      this.newMug = null;
    }, mvHandleError(this.errors, 'could not save your mug'));
    }.bind(this);

    this.updateMug = function(mug) {
      $http.put(baseUrl + '/api/mugs/' + mug._id, mug)
    .then(() => {
      mug.editing = false;
    }, mvHandleError(this.errors, 'could not update mug'));
    }.bind(this);

    this.removeMug = function(mug) {
      $http.delete(baseUrl + '/api/mugs/' + mug._id)
    .then(() => {
      this.mugs.splice(this.mugs.indexOf(mug), 1);
    }, mvHandleError(this.errors, 'could not delete mug'));
    }.bind(this);

  }]);
};
