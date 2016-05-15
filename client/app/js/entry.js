
require('../css/style.css');
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
