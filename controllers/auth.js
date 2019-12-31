
const express = require('express');
const router = express.Router();
const passport = require('passport');
const cors = require('cors');
const User = require('../models/user.js');


router.use('*', function(req, res, next) {
res.header("Access-Control-Allow-Origin", "http://localhost:3000");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.header('Access-Control-Allow-Headers', 'Content-Type');
res.header('Access-Control-Allow-Credentials', true);
next();
});

//enable pre-flight
router.options('*', cors());

router.options("/google", cors());
router.get('/login',(req,res,next) => {
  console.log('login');
  res.json("login");
})
router.post('/login',(req,res,next) => {
  console.log('post login');
  res.json(res.data);
})

router.get('/logout',(req,res,next) => {
  res.send('logout');
})

router.get('/google',passport.authenticate('google'/*telling it to say which stratergy to use*/,{
scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  res.send('you reached call back uri');
})
module.exports = router;
