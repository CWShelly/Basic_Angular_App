const angular = require('angular');

describe('it should test the services', function() {
  var $httpBackend;
  var mugsctrl;
  beforeEach(angular.mock.module('mvApp'));
  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get the mug resources', angular.mock.inject(function(mvResource) {
    $httpBackend.expectGET('http://localhost:5000/api/mugs').respond(200, [{ place: 'Big Ben' }]);
    var resourceArray = [{}, {}, {}];
    var errorsArray = [];
    var resource = new mvResource(resourceArray, errorsArray, 'http://localhost:5000/api/mugs');
    resource.getAll();
    $httpBackend.flush();
    expect(resourceArray.length).toBe(1);
    expect(resourceArray[0].place).toBe('Big Ben');
  }));
  // /
  it('should get the vinyl resources', angular.mock.inject(function(mvResource) {
    $httpBackend.expectGET('http://localhost:5000/api/vinyl').respond(200, [{ album: 'III' }]);
    var resourceArray = [{}, {}, {}];
    var errorsArray = [];
    var resource = new mvResource(resourceArray, errorsArray, 'http://localhost:5000/api/vinyl');
    resource.getAll();
    $httpBackend.flush();
    expect(resourceArray.length).toBe(1);
    expect(resourceArray[0].album).toBe('III');
  }));
  // /



});
