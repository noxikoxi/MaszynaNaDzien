var express = require('express');
var router = express.Router();

var reservationsController = require('../controllers/reservationsController');

router.get('/', reservationsController.getAll);

router.get('/user/:userId', reservationsController.getUserReservations);

router.post('/:userId/:machineId', reservationsController.create);

router.get('/:machineId', reservationsController.getMachineWithReservations);

router.delete('/:reservationId', reservationsController.deleteReservation);


module.exports = router;