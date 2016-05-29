const angular = require('angular');

describe('mvresource service', function() {
  var $httpBackend;
  var mvResource;
  beforeEach(angular.mock.module('mvApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));
  it('should return a function', angular.mock.inject(function(mvResource) {
    var resource = new mvResource;
    expect(typeof resource.update).toBe('function');
  }));

  it('should have update mug functionality', angular.mock.inject(function(mvResource, $q) {
    var testMug = { place: 'not test', _id: 1 };
    var testArr = [testMug];
    var errorsArr = [];
    var resource = new mvResource(testArr, errorsArr, 'http://localhost:5000/api/mugs');
    $httpBackend.expectPUT('http://localhost:5000/api/mugs/1', testMug).respond(200);
    var result = resource.update(testMug);
    $httpBackend.flush();
    expect(errorsArr.length).toBe(0);
    expect(result instanceof $q).toBe(true);
  }));

  it('should have update vinyl functionality', angular.mock.inject(function(mvResource, $q) {
    var testVinyl = { alubm: 'not test', _id: 1 };
    var testArr = [testVinyl];
    var errorsArr = [];
    var resource = new mvResource(testArr, errorsArr, 'http://localhost:5000/api/vinyl');
    $httpBackend.expectPUT('http://localhost:5000/api/vinyl/1', testVinyl).respond(200);
    var result = resource.update(testVinyl);
    $httpBackend.flush();
    expect(errorsArr.length).toBe(0);
    expect(result instanceof $q).toBe(true);
  }));
});
