var angular = require('angular');

describe('mv count tracker service', function() {
  var mvCountTracker;
  var mvResource;
  beforeEach(angular.mock.module('mvApp'));


  it('should return an object', angular.mock.inject(function(mvCountTracker) {
    expect(typeof mvCountTracker).toBe('object');
  }));
  //
  it('should add to the counter from the mugside', angular.mock.inject(function(mvResource, mvCountTracker, $httpBackend) {
    $httpBackend.expectPOST('localhost:5000/api/mugs', { place: 'test place' }).respond(200, { place: 'another test', _id:0 });
    var baseUrl = 'localhost:5000/api/mugs';
    var testArray = [];
    var errorTest = [];
    var mvCountTracker;
    mvCountTracker.count = 0;

    var testRemote = new mvResource(testArray, errorTest, baseUrl);
    testRemote.create({ place: 'test place' });
    mvCountTracker.addCount();
    $httpBackend.flush();
    var baseUrl = 'localhost:5000';
    expect(testArray.length).toBe(1);
    expect(testArray[0].place).toBe('another test');
    expect(mvCountTracker.count).toBe(1);
  }));

  // /

  it('should add to the counter from the vinylside', angular.mock.inject(function(mvResource, mvCountTracker, $httpBackend) {
    $httpBackend.expectPOST('localhost:5000/api/vinyl', { album: 'test album' }).respond(200, { album: 'another test', _id:0 });
    var baseUrl = 'localhost:5000/api/vinyl';
    var testArray = [];
    var errorTest = [];
    var mvCountTracker;
    mvCountTracker.count = 0;

    var testRemote = new mvResource(testArray, errorTest, baseUrl);
    testRemote.create({ album: 'test album' });
    mvCountTracker.addCount();
    $httpBackend.flush();
    var baseUrl = 'localhost:5000';
    expect(testArray.length).toBe(1);
    expect(testArray[0].album).toBe('another test');
    expect(mvCountTracker.count).toBe(1);
  }));

});
