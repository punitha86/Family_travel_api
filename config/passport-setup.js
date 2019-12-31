const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20');
const keys = require('./keys.js');
const User = require('../models/user.js');
passport.use(new GoogleStratergy({
  //options for GoogleStratergy
   callbackURL: '/auth/google/redirect',
   clientID:keys.google.clientID,
   clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done) => {
//check if user already exists in // DEBUG:
 User.findOne({googleId:profile.id}).then((currentUser) => {
   if(currentUser){
     //the user is alredy there
     console.log('user is:',currentUser);
   }else{
     //we create a new user
     new User({
       username:profile.displayName,
       googleId:profile.id
     }).save().then((newUser)=>{
       console.log('new user created',newUser);
     })
   }

 })


  //pass port call back function
  console.log('passport callback function');
  console.log(profile);


})
)
