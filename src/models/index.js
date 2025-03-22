const sequelize = require('../database/config');
const User = require('./user');
const UserType = require('./userType');
const MachineType = require('./machineType');
const Machine = require('./machine');
const Reservation = require('./reservations');

const db = {
    sequelize,
    User,
    UserType,
    Machine,
    MachineType,
    Reservation
};

async function initializeDefaults() {
    try {
        const userTypesCount = await UserType.count();
        if (userTypesCount === 0) {
            await UserType.bulkCreate([
                { name: 'User' },
                { name: 'Admin' }
            ]);
            console.log('Dodano domyślne typy użytkowników.');
        }
    } catch (error) {
        console.error('Błąd przy dodawaniu domyślnych typów użytkowników:', error);
    }
}

// Synchronization
sequelize.sync({ alter: true }).then(async () => {
    console.log('Database & tables created!');
    await initializeDefaults();
});

module.exports = db;
