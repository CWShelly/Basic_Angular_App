var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('VinylController', ['mvResource', 'mvCountTracker', function(Resource, mvCountTracker) {
    this.vinyl = [];
    this.errors = [];
    this.service = mvCountTracker;
    this.serviceAddCount = mvCountTracker.addCount.bind(mvCountTracker);
    this.serviceMinusCount = mvCountTracker.minusCount.bind(mvCountTracker);
    this.count = 0;
    this.addCount = function() {
      this.count ++;
    };
    var remote = new Resource(this.vinyl, this.errors, baseUrl + '/api/vinyl', { errMessages: { getAll: 'custome error message' } });
    this.getAll = remote.getAll.bind(remote);
    this.createVinyl = function() {
      remote.create(this.newVinyl)
        .then(() => {
          this.newVinyl = null;
        })
        .then(() => {
          this.serviceAddCount();
        });
    }.bind(this);
    this.updateVinyl = function(vinyl) {
      remote.update(vinyl)
      .then(() => {
        vinyl.editing = false;
      });
    };
    this.removeVinyl = remote.remove.bind(remote);
    this.getAll();
  }]);
};
