const { body } = require('express-validator');

const loginValidator = [
    body('email').isEmail().withMessage('Nieprawidłowy email')
];

module.exports = loginValidator;