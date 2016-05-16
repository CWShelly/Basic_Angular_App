describe('all the mugs', function() {
  it('should create a mug', function() {
    browser.get('http://localhost:5000');
    element(by.model('vinylctrl.newVinyl.album')).sendKeys('test album');
    element(by.model('vinylctrl.newVinyl.artist')).sendKeys('test artist');
    element(by.model('vinylctrl.newVinyl.purchasedAt')).sendKeys('test store');
    element(by.buttonText('Create Vinyl')).click();
    element.all(by.repeater('VinylController as vinylctrl')).getText(function(text) {
      expect(text).toEqual('test album by test artist was purchased at test store');
    });
  });
});
