const angular = require('angular');

describe('resource delete service', function() {
  var mvResource;
  beforeEach(angular.mock.module('mvApp'));

  it('should remove a mug resource', angular.mock.inject(function(mvResource, $httpBackend) {
    $httpBackend.expectDELETE('http://localhost:5000/api/mugs/1').respond(200);
    var mugs = [{ place: 'testy', _id:1 }];
    var baseUrl = 'http://localhost:5000/api/mugs';
    var errors = [];
    var testRes = new mvResource(mugs, errors, baseUrl);
    testRes.remove(mugs[0]);
    $httpBackend.flush();
    expect(mugs.length).toBe(0);
  }));

  it('should remove a vinyl resource', angular.mock.inject(function(mvResource, $httpBackend) {
    $httpBackend.expectDELETE('http://localhost:5000/api/vinyl/1').respond(200);
    var vinyl = [{ album: 'testy', _id:1 }];
    var baseUrl = 'http://localhost:5000/api/vinyl';
    var errors = [];
    var testRes = new mvResource(vinyl, errors, baseUrl);
    testRes.remove(vinyl[0]);
    $httpBackend.flush();
    expect(vinyl.length).toBe(0);
  }));
});
