const express = require('express');
const router = express.Router();

const userController = require("../controllers/usersController");
const isAuthenticated = require("../middlewares/auth");
const validator = require("../validators/userProfileValidator");
const {validationResult} = require("express-validator");

router.get('/:userId', isAuthenticated, (req, res) => {
  return userController.getUserInfo(req, res, []);
});

router.post('/:userId', isAuthenticated, validator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return userController.getUserInfo(req, res, errors.array());
  }
  return userController.updateUserInfo(req, res);
});

module.exports = router;
