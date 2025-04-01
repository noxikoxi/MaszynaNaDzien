var express = require('express');
var router = express.Router();

const machineTypeService = require("../controllers/machineTypeController");
const machineService = require("../controllers/machineController");

router.get('/', async function(req, res, next) {
    const sort = req.query.sort;
    machineService.getAll(req, res, sort);
});

router.delete('/:machineId', machineService.deleteMachine);

router.post('/', machineService.create);

// Typy sprzętu
router.get('/type', machineTypeService.getAll);

router.post('/type', machineTypeService.create);

router.delete('/type/:machineTypeId', machineTypeService.deleteType);

module.exports = router;