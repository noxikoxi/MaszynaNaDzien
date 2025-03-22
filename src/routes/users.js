var express = require('express');
var router = express.Router();

const userService = require("../services/usersService");

/* GET users listing. */
router.get('/', function(req, res, next) {
  const sortOption = req.query.sort;
  res.render('users', {title: "users", sortOption});
});

router.post('/register', userService.register);

router.post('/login', function(req, res, next) {
  res.send(req.params);
});

router.delete('/logout', function(req, res, next) {
  res.send(req.params);
});

// specific user routes
router.delete('/:userID', function(req, res, next) {
  res.send(req.params);
});

router.get('/:userID', function(req, res, next) {
  res.send(req.params);
});

router.put('/:userID', function(req, res, next) {
  res.send(req.params);
});

module.exports = router;
