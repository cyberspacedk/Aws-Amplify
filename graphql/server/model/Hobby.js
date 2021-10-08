const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hobbySchema = new Schema({
  title: String,
  description: String,
  userId: Number
});

module.exports = mongoose.model('Hobby', hobbySchema);