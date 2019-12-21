const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  names:[String],
    links:  [String],
    tickets:  [String],
    date_of_visit: String

});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
