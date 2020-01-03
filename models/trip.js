const mongoose = require('mongoose');
const Todo = require('./todo.js');
const Place = require('./place.js');
const Pack = require('./pack.js');

const tripSchema = new mongoose.Schema({
    name:  { type: String, required: true},
    date:  { type: String},
    length_of_stay: {type : Number},
    things_to_do :[Todo.schema],
    user_id: {type: String},
    things_to_pack :[Pack.schema],
    places_to_visit :[Place.schema]

});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
