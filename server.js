const express = require('express');
const app = express();
const mongoose = require('mongoose');

const db = mongoose.connection;

app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT;

const MONGODB_URI = 'mongodb://localhost:27017/family_travel';


const passport = require('passport');
const session = require('express-session');

app.use(express.static('public'))
app.use(passport.initialize());
app.use(passport.session());

///routes setup/////////////////
////for google authentication
const authController = require('./controllers/auth.js');
app.use('/auth', authController);

const tripsController = require('./controllers/trips.js');
app.use('/trips', tripsController);

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
