const { body } = require('express-validator');

const profileValidator = [
    body('given_name')
        .optional({checkFalsy: true, nullable: true})
        .isString().withMessage('Imię musi być tekstem')
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Imię musi mieć od 2 do 50 znaków.'),

    body('surname')
        .optional({checkFalsy: true, nullable: true})
        .isString().withMessage('Nazwisko musi być tekstem')
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Nazwisko musi mieć od 2 do 50 znaków.'),

    body('phone')
        .optional({checkFalsy: true, nullable: true})
        .trim()
        .matches(/^\d{9}$/)
        .withMessage('Numer telefonu musi składać się z dokładnie 9 cyfr.'),

    body('addresss')
        .optional({checkFalsy: true, nullable: true})
        .trim()
        .isString().withMessage("Adres musi być tekstem.")
];

module.exports = profileValidator;