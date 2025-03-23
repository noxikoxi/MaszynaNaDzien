const sequelize = require('../database/config');
const User = require('./user');
const UserType = require('./userType');
const MachineType = require('./machineType');
const Machine = require('./machine');
const Reservation = require('./reservation');

const db = {
    sequelize,
    User,
    UserType,
    Machine,
    MachineType,
    Reservation
};


Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

async function initializeDefaults() {
    try {
        const userTypesCount = await UserType.count();
        if (userTypesCount === 0) {
            await UserType.bulkCreate([
                { type: 'User' },
                { type: 'Admin' }
            ]);
            console.log('Added default User Types.');
        }
    } catch (error) {
        console.error('Error adding default User Types:', error);
    }
}

// Synchronization
sequelize.sync({ alter: false }).then(async () => {
    console.log('Database & tables created!');
    await initializeDefaults();
});

module.exports = db;
