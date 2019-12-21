const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;

app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT;

const MONGODB_URI = 'mongodb://localhost:27017/family_travel';


const tripsController = require('./controllers/trips.js');
app.use('/trips' , tripsController);

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}, () => {
	console.log('connected to mongoose');
});

db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('error', (error) => console.log(error.message));
db.on('disconnected', () => console.log('mongo disconnected'));

app.listen(3000, () => console.log('Listening...'));
