
const express = require('express');
const app = express();
const PORT = 4000;
const mugRouter = require(__dirname + '/routes/mugsRouter');
const vinylRouter = require(__dirname + '/routes/vinylRouter');
const mongoose = require('mongoose');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  next();
});
app.use('/api', mugRouter);
app.use('/api', vinylRouter);

app.listen(PORT, () => {
  console.log('server up on ' + PORT);
});

module.exports = exports = function(port, mongooseConnect, cb) {
  mongoose.connect(mongooseConnect);
  return app.listen(port, cb);
};
