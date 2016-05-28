var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('VinylController', ['mvResource', function(Resource) {
    this.vinyl = [];
    this.errors = [];
    var remote = new Resource(this.vinyl, this.errors, baseUrl + '/api/vinyl', { errMessages: { getAll: 'custome error message' } });
    this.getAll = remote.getAll.bind(remote);
    this.createVinyl = function() {
      remote.create(this.newVinyl)
        .then(() => {
          this.newVinyl = null;
        });
    }.bind(this);
    this.updateVinyl = function(vinyl) {
      remote.update(vinyl)
      .then(() => {
        vinyl.editing = false;
      });
    };
    this.removeVinyl = remote.remove.bind(remote);
  }]);
};
