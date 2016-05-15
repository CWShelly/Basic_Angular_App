const express = require('express');
const app = express();
const PORT = 4000;
const mugsRouter = require(__dirname + '/routes/mugsRouter');
const vinylRouter = require(__dirname + '/routes/vinylRouter');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mugsAndVinyl');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  next();
});

app.use('/api', mugsRouter);
app.use('/api', vinylRouter);

app.listen(PORT, () => {
  console.log('server-side server up on ' + PORT);
});
