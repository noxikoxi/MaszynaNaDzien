var express = require('express');
var router = express.Router();

const machineTypeService = require("../services/machineTypeService");
const machineService = require("../services/machineService");

router.get('/', async function(req, res, next) {
    const sortOption = req.query.sortOption;
    await machineService.getAll(req, res, sortOption);
});

router.delete('/:machineId', machineService.deleteMachine);

router.post('/', machineService.create);

// Typy sprzętu
router.get('/type', machineTypeService.getAll);

router.post('/type', machineTypeService.create);

router.delete('/type/:machineTypeId', machineTypeService.deleteType);

module.exports = router;