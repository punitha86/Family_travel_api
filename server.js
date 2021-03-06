const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passportSetup=require('./config/passport-setup.js')
const db = mongoose.connection;
const cors = require('cors');
const bodyParser = require('body-parser');
//const PORT = 4500;
//require('dotenv').config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/family_travel';
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const keys=require('./config/keys');
const CLIENT_URL="https://familytravelreact.herokuapp.com";

app.all('/*', function(req, res, next) {
res.header("Access-Control-Allow-Origin", CLIENT_URL );
res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.header('Access-Control-Allow-Headers', 'Content-Type');
res.header('Access-Control-Allow-Credentials', true);
next();
});

//enable pre-flight
app.options(CLIENT_URL, cors());
// app.use(express.static('public'));
app.use(express.json());

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(
	session({
		secret: 'testingtheencryption',
		store: new MongoStore({ mongooseConnection: db }),
		resave: false,
		saveUninitialized: false,
		cookie: { httpOnly: false },
		samesite:false
	})
);
app.use(express.static('public'));
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true,origin: CLIENT_URL}));
//initialize passportSetup
app.use(passport.initialize());
app.use(passport.session());




app.get('/', (req, res) => {
	res.send("You are accessing the API");
})
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


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

///Server////
app.listen(PORT, () => console.log('Listening...',PORT));




// if (process.env.NODE_ENV === 'production') {
// 	const path = require('path')
// 	console.log('YOU ARE IN THE PRODUCTION ENV')
// 	app.use('/static', express.static(path.join(__dirname, '../build/static')))
// 	app.get('/', (req, res) => {
// 		res.send("You are accessing the API");
// 		//res.sendFile(path.join(__dirname, '../build/'))
// 	})
// }
