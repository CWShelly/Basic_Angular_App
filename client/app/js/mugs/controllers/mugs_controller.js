var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('MugsController', ['mvResource', 'mvCountTracker', function(Resource, mvCountTracker) {
    this.mugs = [];
    this.errors = [];
    this.service = mvCountTracker;
    this.serviceAddCount = mvCountTracker.addCount.bind(mvCountTracker);
    this.serviceMinusCount = mvCountTracker.minusCount.bind(mvCountTracker);
    this.count = 0;
    var remote = new Resource(this.mugs, this.errors, baseUrl + '/api/mugs', { errMessages: { getAll: 'custome error message' } });
    this.getAll = remote.getAll.bind(remote);
    this.createMug = function() {
      remote.create(this.newMug)
        .then(() => {
          this.newMug = null;
        })
        .then(() => {
          this.serviceAddCount();
        });
    }.bind(this);
    this.updateMug = function(mug) {
      remote.update(mug)
      .then(() => {
        mug.editing = false;
      });
    };
    this.removeMug = remote.remove.bind(remote);
  }]);
};
