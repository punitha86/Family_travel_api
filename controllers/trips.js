const express= require('express');
const router = express.Router();
const Trip= require('../models/trip.js');
const Todo= require('../models/todo.js');

//populating all trips
router.get('/', (req,res) => {
  Trip.find({},(err,all)=>{
    res.json(all);
  })
})
//populating all trips
router.get('/user/:userid', (req,res) => {
  Trip.find({user_id:req.params.userid},(err,all)=>{
    res.json(all);
  })
})
//populating trip by id
router.get('/:id', function(req, res, next) {
  Trip.findById(req.params.id, function (err, trip) {
    if (err) return next(err);
    res.json(trip);
  });
});

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

///updating trips
router.put('/:id', (req, res) => {
  Trip.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (error, updatedTrip) => {
		console.log('updated trip',updatedTrip);
    res.json(updatedTrip);

  });
});

///deleting trips
router.delete('/:id', (req, res) => {
  console.log('Entered DELETE route for Trips');
  Trip.findByIdAndRemove(req.params.id, (error, deletedTrip) => {
    console.log('Found and deleting trip: ' + deletedTrip);
    //res.json(deletedTrip);
  }).then((tripsAfterDelete) => {
    Trip.find({},(err,all)=>{
      res.json(all);
    })
  })
});


module.exports = router;
