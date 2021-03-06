const mongoose = require('mongoose');

var mugSchema = new mongoose.Schema({
  place: { type: String, default: 'Algonquin' },
  city: { type: String, default: 'NYC' },
  drinkPref: { type: String, default: 'ouzo' },
  personalCount: { type: Number },
  collectorId: { type: String }
});

module.exports = mongoose.model('Mug', mugSchema);
