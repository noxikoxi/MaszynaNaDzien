const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const validator = require("../validators/loginValidator");
const {validationResult} = require("express-validator");

router.post('/', validator , async (req, res) => {
    let errors = validationResult(req);
    if (req.body.email !== "admin" && !errors.isEmpty()) {
        return res.render('login', {title: "login", errors: errors.array()});
    }
    await loginController.login(req, res);
});

router.get('/', loginController.checkLogin);

router.get('/logout', loginController.logout);

module.exports = router;