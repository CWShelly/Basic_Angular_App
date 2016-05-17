
const angular = require('angular');
const mvApp = angular.module('mvApp', []);
const baseUrl = 'http://localhost:4000';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

mvApp.controller('MugsController', ['$http', function($http) {
  this.mugs = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/mugs')
    .then((res) => {
      this.mugs = res.data;
    }, handleError.bind(this));
  };


  this.createMug = () => {
    $http.post(baseUrl + '/api/mugs', this.newMug)
    .then((res) => {
      this.mugs.push(res.data);
      this.newMug = null;
    }, handleError.bind(this));
  };

  this.updateMug = (mug) => {
    $http.put(baseUrl + '/api/mugs/' + mug._id, mug)
    .then(() => {
      mug.editing = false;
    }, handleError.bind(this));
  };

  this.removeMug = (mug) => {
    $http.delete(baseUrl + '/api/mugs/' + mug._id)
    .then(() => {
      this.mugs.splice(this.mugs.indexOf(mug), 1);
    }, handleError.bind(this));
  };

}]);

mvApp.controller('VinylController', ['$http', function($http) {
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
