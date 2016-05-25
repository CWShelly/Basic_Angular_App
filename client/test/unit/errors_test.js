var angular = require('angular');

describe('mvHandleError service', function() {
  var mvHandleError;
  beforeEach(angular.mock.module('mvApp'));

  it('should return a function', angular.mock.inject(function(mvHandleError) {
    expect(typeof mvHandleError).toBe('function');
  }));

  it('should add an error to the errors array', angular.mock.inject(function(mvHandleError) {
    var testArr = [];
    mvHandleError(testArr, 'test message')();
    expect(testArr.length).toBe(1);
    expect(testArr[0] instanceof Error).toBe(true);
    expect(testArr[0].message).toBe('test message');
  }));
});
