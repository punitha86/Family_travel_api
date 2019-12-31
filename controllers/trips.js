const express= require('express');
const router = express.Router();
const Trip= require('../models/trip.js');
const Todo= require('../models/todo.js');

//populating all trips
router.get('/', (req,res) => {
  console.log(req.session.user);
  Trip.find({},(err,all)=>{
    res.json(all);
  })
})

//adding a new trip
router.post('/', (req,res) => {
    Trip.create(req.body,(error,createdTrip) =>{
      if(!error)
      res.json(createdTrip);
      else
      res.json(error);
    })
  }
)

///adding todos
router.post('/user/todo/:id', (req,res) => {
Trip.findById(req.params.id,(err,foundtrip) => {
  foundtrip.things_to_do.push(req.body);
res.json(foundtrip);
});
});

///adding placesto visit
router.post('/user/place/:id', (req,res) => {
Trip.findById(req.params.id,(err,foundtrip) => {
  foundtrip.places_to_visit.push(req.body);
res.json(foundtrip);
});
});

///adding thingstoPack for trip
router.post('/user/pack/:id', (req,res) => {
Trip.findById(req.params.id,(err,foundtrip) => {
  foundtrip.things_to_pack.push(req.body);
res.json(foundtrip);
});
});






module.exports = router;
