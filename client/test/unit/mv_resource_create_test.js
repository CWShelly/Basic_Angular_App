var angular = require('angular');
describe('mvResourceCreate', function() {
  var mvResource;
  beforeEach(angular.mock.module('mvApp'));
  it('should return a function', angular.mock.inject(function(mvResource) {
    expect(typeof mvResource).toBe('function');
  }));

  it('should add to the mugs test array', angular.mock.inject(function(mvResource, $httpBackend) {
    $httpBackend.expectPOST('localhost:5000/api/mugs', { place: 'test place' }).respond(200, { place: 'another test', _id:0 });
    var baseUrl = 'localhost:5000/api/mugs';
    var testArray = [];
    var errorTest = [];
    var testRemote = new mvResource(testArray, errorTest, baseUrl);
    testRemote.create({ place: 'test place' });
    $httpBackend.flush();
    var baseUrl = 'localhost:5000';
    expect(testArray.length).toBe(1);
    expect(testArray[0].place).toBe('another test');
  }));

  it('should add to the vinyl test array', angular.mock.inject(function(mvResource, $httpBackend) {
    $httpBackend.expectPOST('localhost:5000/api/vinyl', { album: 'test album' }).respond(200, { album: 'another test', _id:0 });
    var baseUrl = 'localhost:5000/api/vinyl';
    var testArray = [];
    var errorTest = [];
    var testRemote = new mvResource(testArray, errorTest, baseUrl);
    testRemote.create({ album: 'test album' });
    $httpBackend.flush();
    var baseUrl = 'localhost:5000';
    expect(testArray.length).toBe(1);
    expect(testArray[0].album).toBe('another test');
  }));



// //

});
