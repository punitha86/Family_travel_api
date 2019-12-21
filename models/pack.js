const mongoose = require('mongoose');

const packSchema = new mongoose.Schema({
    name:String,
    completed: String,
    category: String

});

const Pack = mongoose.model('Pack', packSchema);

module.exports = Pack;
