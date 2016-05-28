var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('MugsController', ['mvResource', function(Resource) {
    this.mugs = [];
    this.errors = [];
    var remote = new Resource(this.mugs, this.errors, baseUrl + '/api/mugs', { errMessages: { getAll: 'custome error message' } });
    this.getAll = remote.getAll.bind(remote);
    this.createMug = function() {
      remote.create(this.newMug)
        .then(() => {
          this.newMug = null;
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
