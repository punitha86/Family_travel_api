
const express = require('express');
const router = express.Router();
const passport = require('passport');
const cors = require('cors');

router.use('*', function(req, res, next) {
//replace localhost:8080 to the ip address:port of your server
res.header("Access-Control-Allow-Origin", "http://localhost:3000");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.header('Access-Control-Allow-Headers', 'Content-Type');
res.header('Access-Control-Allow-Credentials', true);
next();
});

//enable pre-flight
router.options('*', cors());
// const cors = require('cors');
// router.use(cors(
// {origin:"http://localhost:3000",
//     credentials:true,
//     allowHeaders:"Content-Type"
// }
// ));
// // IP's allowed all access this server
// let whitelist = ['http://localhost:3000', 'http://localhost:4500'];
//
// let corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };
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

router.get('/google',cors(),passport.authenticate('google'/*telling it to say which stratergy to use*/,{
scope:['profile']
}));



router.get('/google/redirect',(req,res)=>{
  res.send('you reached call back uri');
})
module.exports = router;
