var angular = require('angular');
require('angular-mocks');

describe('mugs controller', function() {
  var $controller;
  beforeEach(angular.mock.module('mvApp'));
  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var mugsctrl = $controller('MugsController');
    expect(typeof mugsctrl).toBe('object');
    expect(typeof mugsctrl.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var $httpBackend;
    var mugsctrl;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      mugsctrl = $controller('MugsController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve mugs', function() {
      $httpBackend.expectGET('http://localhost:4000/api/mugs').respond(200, [{ place: 'test place' }]);
      mugsctrl.getAll();
      $httpBackend.flush();
      expect(mugsctrl.mugs.length).toBe(1);
      expect(mugsctrl.mugs[0].place).toBe('test place');
    });

    it('should create a mug', function() {
      $httpBackend.expectPOST('http://localhost:4000/api/mugs',
      { place: 'La Jolla' }).respond(200,
           { place: 'some place' });
      expect(mugsctrl.mugs.length).toBe(0);
      mugsctrl.newMug = { place: 'La Jolla' };
      mugsctrl.createMug();
      $httpBackend.flush();
      expect(mugsctrl.mugs[0].place).toBe('some place');
      expect(mugsctrl.newMug).toBe(null);
    });

    it('should update a mug', function() {
      $httpBackend.expectPUT('http://localhost:4000/api/mugs/1', {
        place: 'change mugs!',
        editing: true, _id: 1 }).respond(200);
      mugsctrl.mugs = [{
        place: 'test place',
        editing: true, _id: 1 }];
      mugsctrl.mugs[0].place = 'change mugs!';
      mugsctrl.updateMug(mugsctrl.mugs[0]);
      $httpBackend.flush();
      expect(mugsctrl.mugs[0].editing).toBe(false);
    });

    it('should remove mug', function() {
      $httpBackend.expectDELETE('http://localhost:4000/api/mugs/1').respond(200);
      mugsctrl.mugs = [{ place: 'La Jolla', _id: 1 }];
      mugsctrl.removeMug(mugsctrl.mugs[0]);
      $httpBackend.flush();
      expect(mugsctrl.mugs.length).toBe(0);
    });
  });

});
