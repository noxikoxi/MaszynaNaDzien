var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send(req.params);
});

router.get('/:sort', function(req, res, next) {
    res.send(req.params);
});

module.exports = router;