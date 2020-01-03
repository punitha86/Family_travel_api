const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20');
const keys = require('./keys.js');
const User = require('../models/user.js');
const LocalStrategy = require('passport-local').Strategy;

///serializing the cookie
passport.serializeUser((user,done)=>{
  console.log('=== serialize ... called ===');
  console.log(user) // the whole raw user object!
	console.log('---------')
	done(null, { _id: user._id })
  // done(null, user.id);
});

//desrialize the cookie
passport.deserializeUser((id,done)=>{
  console.log('DEserialize ... called')
User.findOne(
  { _id: id },
  'firstName lastName photos local.username',
  (err, user) => {
    console.log('======= DESERILAIZE USER CALLED ======')
    console.log(user)
    console.log('--------------')
    done(null, user)
  }
)
  // User.findById(id).then((user) => {
  //   done(null, user);
  // });
});


passport.use (new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		User.findOne({ 'local.username': username }, (err, userMatch) => {
			if (err) {
				return done(err)
			}
			if (!userMatch) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!userMatch.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, userMatch)
		})
	}
))




passport.use(new GoogleStratergy({
  //options for GoogleStratergy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  //check if user already exists in database
//   User.findOne({
//     googleId: profile.id
//   }).then((currentUser) => {
//     if (currentUser) {
//       //the user is alredy there
//       console.log('user is:', currentUser);
//       done(null, currentUser);
//     } else {
//       //we create a new user
//       new User({
//         username: profile.displayName,
//         googleId: profile.id,
//         googleImg:profile._json.picture
//       }).save().then((newUser) => {
//         console.log('new user created', newUser);
//         done(null, newUser);
//       })
//     }
//   })
//   //pass port call back function
//   console.log('passport callback function');
//   console.log(profile);
//   console.log(accessToken);
//
//
// }
// testing
		console.log('===== GOOGLE PROFILE =======')
		console.log(profile)
		console.log('======== END ===========')
		// code
		const { id, name, photos } = profile
		User.findOne({ 'google.googleId': id }, (err, userMatch) => {
			// handle errors here:
			if (err) {
				console.log('Error!! trying to find user with googleId')
				console.log(err)
				return done(null, false)
			}
			// if there is already someone with that googleId
			if (userMatch) {
				return done(null, userMatch)
			} else {
				// if no user in our db, create a new user with that googleId
				console.log('====== PRE SAVE =======')
				console.log(id)
				console.log(profile)
				console.log('====== post save ....')
				const newGoogleUser = new User({
					'google.googleId': id,
					firstName: name.givenName,
					lastName: name.familyName,
					photos: photos
				})
				// save this user
				newGoogleUser.save((err, savedUser) => {
					if (err) {
						console.log('Error!! saving the new google user')
						console.log(err)
						return done(null, false)
					} else {
            console.log('saving the new google user')
						return done(null, savedUser)
					}
				}) // closes newGoogleUser.save
			}
		}) // closes User.findONe
	}

))
