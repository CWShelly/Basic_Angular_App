describe('all the mugs', function() {
  it('should create a mug', function() {
    browser.get('http://localhost:5000');
    element(by.model('mugsctrl.newMug.place')).sendKeys('test place');
    element(by.model('mugsctrl.newMug.city')).sendKeys('test city');
    element(by.model('mugsctrl.newMug.drinkPref')).sendKeys('test drink');
    element(by.buttonText('Create Mug')).click();
    element.all(by.repeater('MugsController as mugsctrl')).getText(function(text) {
      expect(text).toEqual('Got this mug at test place in test city. I fill it with test drink');
    });
  });
});
