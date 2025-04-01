var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/', loginController.login);

router.get('/', loginController.checkLogin);

router.get('/logout', loginController.logout);

module.exports = router;