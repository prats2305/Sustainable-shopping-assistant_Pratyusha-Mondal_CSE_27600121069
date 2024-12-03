const mongoose = require('mongoose');

const impactSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // Reference to a User schema (if needed)
  totalPurchases: Number,
  co2Saved: Number,
});

const Impact = mongoose.model('Impact', impactSchema);
module.exports = Impact;
