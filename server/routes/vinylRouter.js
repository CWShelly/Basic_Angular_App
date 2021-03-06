const Router = require('express').Router;
const Vinyl = require(__dirname + '/../models/vinyls');
const jsonParser = require('body-parser').json();
const eH = require(__dirname + '/../lib/error_handler.js');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
var vinylRouter = module.exports = Router();

vinylRouter.post('/vinyl', jwtAuth, jsonParser, (req, res) => {
  var newVinyl = new Vinyl(req.body);
  newVinyl.collectorId = req.user._id;
  newVinyl.save((err, data) => {
    if (err) return eH(err, res);
    res.status(200).json(data);
  });
});

vinylRouter.get('/vinyl', jwtAuth, (req, res) => {
  Vinyl.find({ collectorId: req.user._id }, (err, data) => {
    if (err) return eH(err, res);
    res.status(200).json(data);
  });
});


vinylRouter.put('/vinyl/:id', jwtAuth, jsonParser, (req, res) => {
  var vinylData = req.body;
  delete vinylData._id;
  Vinyl.update({ _id: req.params.id }, vinylData, (err) => {
    if (err) return eH(err, res);
    res.status(200).json({ msg: 'Vinyl updated' });
  });
});

vinylRouter.delete('/vinyl/:id', (req, res) => {
  Vinyl.remove({ _id: req.params.id }, (err) => {
    if (err) return eH(err, res);
    res.status(200).json({ msg: 'Vinyl record deleted' });
  });
});

module.exports = exports = vinylRouter;
