const express = require('express');
const router = express.Router();

const reservationsController = require('../controllers/reservationsController');
const validator = require("../validators/reservationsDatesValidator");
const {validationResult} = require("express-validator");
const isAuthenticated = require("../middlewares/auth");

router.get('/', (req, res) => {
    const sort = req.query.sortOption;
    return reservationsController.getAll(req, res, sort);
});

router.get('/user', isAuthenticated, async(req, res) => {
    const sort = req.query.sortOption;
    return reservationsController.getUserReservations(req, res, sort);
});

router.post('/:machineId', isAuthenticated, validator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return reservationsController.getMachineWithReservations(req, res, errors.array());
    }
    return reservationsController.create(req, res);
});

router.get('/:machineId', isAuthenticated, (req, res) => {
    return reservationsController.getMachineWithReservations(req, res, [])
});

router.get('/delete/:reservationId', isAuthenticated, reservationsController.deleteReservation);


module.exports = router;