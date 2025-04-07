const express = require('express');
const router = express.Router();

const reservationsController = require('../controllers/reservationsController');
const validator = require("../validators/reservationsDatesValidator");
const {validationResult} = require("express-validator");

router.get('/', reservationsController.getAll);

router.get('/user', async(req, res) => {
    await reservationsController.getUserReservations(req, res);
});

router.post('/:machineId', validator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return reservationsController.getUserReservations(req, res, errors.array());
    }
    return reservationsController.create(req, res);
});

router.get('/:machineId', reservationsController.getMachineWithReservations);

router.get('/delete/:reservationId', reservationsController.deleteReservation);


module.exports = router;