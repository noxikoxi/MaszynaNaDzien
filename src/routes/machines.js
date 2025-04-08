var express = require('express');
var router = express.Router();

const machineTypeService = require("../controllers/machineTypeController");
const machineService = require("../controllers/machineController");

router.get('/', async function(req, res, next) {
    const sort = req.query.sortOption;
    machineService.getAll(req, res, sort);
});
module.exports = router;