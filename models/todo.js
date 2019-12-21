const mongoose = require('mongoose');
const trip=require('./trip.js');

const todoSchema = new mongoose.Schema({
    description:  { type: String, required: true },
    date_remind:  { type: String},
    completed: {type : Boolean},
    _trip: { type: mongoose.Schema.Types.ObjectId , ref:'trip'}

});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
