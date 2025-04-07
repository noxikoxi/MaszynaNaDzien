const { body } = require('express-validator');

const registerValidator = [
    body('email').isEmail().withMessage('Nieprawidłowy email'),
    body('password').isLength({ min: 6 }).withMessage('Hasło musi mieć przynajmniej 6 znaków')
];

module.exports = registerValidator;