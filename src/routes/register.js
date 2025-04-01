var express = require('express');
var router = express.Router();

const registerController = require('../controllers/registerController');

router.post('/', registerController.register);

router.get('/', (req, res, next) => {
    res.render('register', {title: "register"});
})

module.exports = router;