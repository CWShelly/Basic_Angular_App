var angular = require('angular');
require('angular-mocks');

describe('vinyl controller', function() {
  var $controller;
  beforeEach(angular.mock.module('mvApp'));
  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var vinylctrl = $controller('vinylController');
    expect(typeof vinylctrl).toBe('object');
    expect(typeof vinylctrl.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var $httpBackend;
    var vinylctrl;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      vinylctrl = $controller('VinylController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve vinyls', function() {
      $httpBackend.expectGET('http://localhost:4000/api/vinyl').respond(200,
           [{ album: 'test album' }]);
      mugsctrl.getAll();
      $httpBackend.flush();
      expect(vinylctrl.vinyl.length).toBe(1);
      expect(vinylctrl.vinyl[0].album).toBe('test vinyl');
    });

    it('should create a vinyl', function() {
      $httpBackend.expectPOST('http://localhost:4000/api/vinyl',
      { album: 'La Jolla' }).respond(200, { album: 'some album' });
      expect(vinylctrl.mugs.length).toBe(0);
      vinylctrl.newVinyl = { place: 'La Jolla' };
      vinylctrl.createVinyl();
      $httpBackend.flush();
      expect(vinylctrl.mugs[0].album).toBe('some album');
      expect(vinylctrl.newVinyl).toBe(null);
    });

    it('should update a vinyl', function() {
      $httpBackend.expectPUT('http://localhost:4000/api/vinyl/1',
       { place: 'change vinyls!', editing: true, _id: 1 }).respond(200);
      vinylctrl.vinyl = [{ album: 'test album', editing: true, _id: 1 }];
      vinylctrl.vinyl[0].album = 'change vinyls!';
      vinylctrl.updateVinyl(vinylctrl.vinyl[0]);
      $httpBackend.flush();
      expect(vinylctrl.vinyl[0].editing).toBe(false);
    });

    it('should remove vinyl', function() {
      $httpBackend.expectDELETE('http://localhost:4000/api/vinyl/1').respond(200);
      vinylctrl.vinyl = [{ album: 'La Jolla', _id: 1 }];
      vinylctrl.removeVinyl(vinylctrl.vinyl[0]);
      $httpBackend.flush();
      expect(vinylctrl.vinyl.length).toBe(0);
    });
  });

});
