var express = require('express');
var router = express.Router();

var reservationsService = require('../controllers/reservationsController');

router.get('/', function(req, res, next) {
    const sortOption = req.query.sortOption;
    reservationsService.getAll(req, res, sortOption);
});

router.get('/user/:userId', function(req, res, next) {
    const sortOption = req.query.sortOption;
    reservationsService.getUserReservations(req, res, sortOption);
});

router.post('/:userId/:machineId', reservationsService.create);

router.get('/:machineId', reservationsService.getMachineWithReservations);

router.delete('/:reservationId', reservationsService.deleteReservation);


module.exports = router;