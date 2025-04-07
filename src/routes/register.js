const express = require('express');
const {validationResult } = require('express-validator');
const router = express.Router();

const registerController = require('../controllers/registerController');
const validator = require("../validators/registerValidator");

router.post('/', validator, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('register', {title: "register", errors: errors.array()});
        }
        await registerController.register(req, res);
    });

router.get('/', (req, res, next) => {
    res.render('register', {title: "register"});
})

module.exports = router;