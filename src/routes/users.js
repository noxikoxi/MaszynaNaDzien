const express = require('express');
const router = express.Router();

const userController = require("../controllers/usersController");
const isAuthenticated = require("../middlewares/auth");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const sortOption = req.query.sortOption;
  await userController.getAllUser(req, res, sortOption);
});

// specific user routes
router.post('/delete/:userId', userController.deleteUser);

router.get('/:userId', isAuthenticated, userController.getUserInfo);

router.post('/:userId', userController.updateUserInfo);

module.exports = router;
