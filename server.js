const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passportSetup=require('./config/passport-setup.js')
const db = mongoose.connection;
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const MONGODB_URI = 'mongodb://localhost:27017/family_travel';
const passport = require('passport');
const session = require('express-session');


app.use('*', function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.header('Access-Control-Allow-Headers', 'Content-Type');
res.header('Access-Control-Allow-Credentials', true);
next();
});

//enable pre-flight
app.options('*', cors());
app.use(express.static('public'));
app.use(express.json());

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: "*"}));
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

app.listen(4500, () => console.log('Listening...'));
