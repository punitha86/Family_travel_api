const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20');
const keys = require('./keys.js');

passport.use(new GoogleStratergy({
  //options for GoogleStratergy
clientID:keys.google.clientID,
clientSecret:keys.google.clientSecret
},() => {
  //pass port call back function
})
)
