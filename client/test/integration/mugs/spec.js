describe('all the mugs', function() {
  it('should create a mug', function() {
    browser.get('http://localhost:5000');
    element(by.model('mug.place')).sendKeys('test place');
    element(by.model('mug.city')).sendKeys('test city');
    element(by.model('mug.drinkPref')).sendKeys('test drink');
    element(by.buttonText('Create Mug!')).click();
    element.all(by.repeater('MugsController as mugsctrl')).getText(function(text) {
      expect(text).toEqual('Got this mug at test place in test city. I fill it with test drink');
    });
  });

  it('should create a vinyl', function() {
    element(by.model('vinyl.album')).sendKeys('test album');
    element(by.model('vinyl.artist')).sendKeys('test artist');
    element(by.model('vinyl.purchasedAt')).sendKeys('test store');
    element(by.buttonText('Create Vinyl!')).click();
    element.all(by.repeater('VinylController as vinylctrl')).getText(function(text) {
      expect(text).toEqual('Picked up test album by test artist at test store');
    });
  });

});
