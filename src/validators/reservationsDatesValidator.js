const { body } = require('express-validator');

const reservationValidator = [
    body('date_from')
        .isISO8601()
        .withMessage('Nieprawidłowy format daty początkowej.')
        .toDate(),

    body('date_to')
        .isISO8601()
        .withMessage('Nieprawidłowy format daty końcowej.')
        .toDate(),

    body('date_from').custom((value, { req }) => {
        const dateFrom = new Date(value);
        const dateTo = new Date(req.body.date_to);

        if (dateFrom > dateTo) {
            throw new Error('Data początkowa musi być wcześniejsza lub równa dacie końcowej.');
        }

        return true;
    }),
    body('date_to').custom((value, {req}) => {
        const today = new Date();
        const dateTo = new Date(value);

        const timeDiff = dateTo - today;

        const diffInDays = timeDiff / (1000 * 3600 * 24);

        if (diffInDays > 92) {
            throw new Error('Nie można rezerować na więcej niż 3 miesiące do prozdu.');
        }

        return true;
    })
];


module.exports = reservationValidator;