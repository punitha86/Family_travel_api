
const express = require('express');
const router = express.Router();
const passport = require('passport');
const cors = require('cors');
const User = require('../models/user.js');
const CLIENT_URL="https://familytravelreact.herokuapp.com";
//const CLIENT_URL="http://localhost:3000";
let val;
router.use('*', function(req, res, next) {
res.header("Access-Control-Allow-Origin", CLIENT_URL);
res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.header('Access-Control-Allow-Headers', 'Content-Type');
res.header('Access-Control-Allow-Credentials', true);
next();
});

//enable pre-flight
router.options(CLIENT_URL, cors());
router.options("/google", cors());

router.get('/login',(req,res,next) => {
  console.log('login');
  res.json("login");
})

router.get('/logout',(req,res,next) => {
  res.send('logout');
})

router.get('/google',passport.authenticate('google'/*telling passport to say which stratergy to use*/,{
scope:['profile']
}));

//redirect URL
router.get(
          '/google/redirect',
          (req, res, next) => {
        		console.log(`req.user: ${req.user}`)
        		console.log('======= /auth/google/redirect was called! =====')
        		next()
        	},
          passport.authenticate('google',
            {
            successRedirect:CLIENT_URL,
            failureRedirect:CLIENT_URL+'/login'}
          )
         ,(req,res)=>{
  //res.send(req.user);
 //res.user=req.session.passport.user;
 console.log('session object',req.session,'session object');
val=req.session.passport.user;
console.log('response sent to react application',res.req.user);
// res.redirect(CLIENT_URL);
  //res.json(req.user);
}
)

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== reaching this /user path!!======')
	console.log(req._passport);
	if (req.user) {
		return res.json({ user: req.user })
    //return res.redirect(CLIENT_URL);
	} else {
		return res.json({ user: null })
	}
})

router.post(
	'/login',
	(req, res, next) => {
		console.log(req.body)
		console.log('=====inside post /login===========')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user))
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser })
	}
)


router.post('/signup', (req, res) => {
	const { username, password } = req.body
	// ADD VALIDATION
	User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'local.username': username,
			'local.password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})



router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy();
		res.clearCookie('connect.sid');
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})


module.exports = router;
