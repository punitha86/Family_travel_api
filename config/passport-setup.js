const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20');
const keys = require('./keys.js');

passport.use(new GoogleStratergy({
  //options for GoogleStratergy
   callbackURL: '/auth/google/redirect',
   clientID:keys.google.clientID,
   clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done) => {
  //pass port call back function
  console.log('passport callback function');
  console.log(profile);
})
)
