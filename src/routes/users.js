var express = require('express');
var router = express.Router();

const userService = require("../services/usersService");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const sortOption = req.query.sortOption;
  await userService.getAllUser(req, res, sortOption);
});

router.post('/register', userService.register);

router.post('/login', userService.login);

router.delete('/logout', function(req, res, next) {
  res.send(req.params);
});

// specific user routes
router.delete('/:userId', userService.deleteUser);

router.get('/:userId', userService.getUserInfo);

router.put('/:userId', userService.updateUserInfo);

module.exports = router;
