describe('The basic angular app', function() {
  it('should output the input', function() {
    browser.get('http://localhost:5000/');
    element(by.model('text1')).sendKeys('salmons');
    expect(element(by.binding('text1')).getText()).
    toEqual('salmons');

  });
});
