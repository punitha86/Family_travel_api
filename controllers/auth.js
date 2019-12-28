
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login',(req,res) => {
  res.send('login');
})

router.get('/logout',(req,res) => {
  res.send('logout');
})
router.get('/google',(req,res) => {
  res.send('login with google');
})


module.exports = router;
