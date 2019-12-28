const express= require('express');
const router = express.Router();
const Trip= require('../models/trip.js');
const Todo= require('../models/todo.js');
router.get('/', (req,res) => {
Trip.findById('5dfc1245d3f59b0fa4bf1125',(err,all)=>{
    res.send(all);
})
})

router.post('/', (req,res) => {

    Trip.create(req.body,(error,createdTrip) =>{
      if(!error)
      res.send(createdTrip);
      else
      res.send(error);
    })
  }
)

///adding todos
router.post('/user/todo/:id', (req,res) => {
Trip.findById(req.params.id,(err,foundtrip) => {
  foundtrip.things_to_do.push(req.body);
res.send(foundtrip);
});
});

///adding placesto visit
router.post('/user/place/:id', (req,res) => {
Trip.findById(req.params.id,(err,foundtrip) => {
  foundtrip.places_to_visit.push(req.body);
res.send(foundtrip);
});
});

///adding thingstoPack for trip
router.post('/user/pack/:id', (req,res) => {
Trip.findById(req.params.id,(err,foundtrip) => {
  foundtrip.things_to_pack.push(req.body);
res.send(foundtrip);
});
});






module.exports = router;
