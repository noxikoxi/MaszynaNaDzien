var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/', loginController.login);

router.get('/', (req, res, next) => {
    res.render('login', {title: "login"});
})

router.delete('/logout', function(req, res, next) {
    res.send(req.params);
});

module.exports = router;