
const express = require('express');
const app = express();
const mugRouter = require(__dirname + '/routes/mugsRouter');
const vinylRouter = require(__dirname + '/routes/vinylRouter');
const authRouter = require(__dirname + '/routes/auth_Router');
const mongoose = require('mongoose');


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use('/api', mugRouter);
app.use('/api', vinylRouter);
app.use('/api', authRouter);


module.exports = exports = function(port, mongooseConnect, cb) {
  mongoose.connect(mongooseConnect);
  return app.listen(port, cb);
};
