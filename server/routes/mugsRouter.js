const Router = require('express').Router;
const Mug = require(__dirname + '/../models/mug');
const jsonParser = require('body-parser').json();
const eH = require(__dirname + '/../lib/error_handler.js');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
var mugRouter = module.exports = Router();


mugRouter.post('/mugs', jwtAuth, jsonParser, (req, res) => {
  var newMug = new Mug(req.body);
  newMug.collectorId = req.user._id;
  newMug.save((err, data) => {
    if (err) return eH(err, res);
    res.status(200).json(data);
  });
});

mugRouter.get('/mugs', jwtAuth, (req, res) => {
  // console.log(collectorId);

  Mug.find({ collectorId: req.user._id }, (err, data) => {
    if (err) return eH(err, res);
    if (err)console.log(err);

    res.status(200).json(data);
  });
});


mugRouter.put('/mugs/:id', jwtAuth, jsonParser, (req, res) => {
  var mugData = req.body;
  delete mugData._id;
  Mug.update({ _id: req.params.id }, mugData, (err) => {
    if (err) return eH(err, res);
    res.status(200).json({ msg: 'Mugs updated' });
  });
});

mugRouter.delete('/mugs/:id', (req, res) => {
  Mug.remove({ _id: req.params.id }, (err) => {
    if (err) return eH(err, res);
    res.status(200).json({ msg: 'Mugs record deleted' });
  });
});
