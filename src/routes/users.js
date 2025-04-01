var express = require('express');
var router = express.Router();

const userService = require("../controllers/usersController");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const sortOption = req.query.sortOption;
  await userService.getAllUser(req, res, sortOption);
});

// specific user routes
router.delete('/:userId', userService.deleteUser);

router.get('/:userId', userService.getUserInfo);

router.put('/:userId', userService.updateUserInfo);

module.exports = router;
