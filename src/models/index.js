const sequelize = require('../database/config');
const User = require('./user');
const MachineType = require('./machineType');
const Machine = require('./machine');
const Reservation = require('./reservation');

const db = {
    sequelize,
    User,
    Machine,
    MachineType,
    Reservation
};


Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Synchronization
sequelize.sync({ alter: false }).then(async () => {
    console.log('Database & tables created!');
});

module.exports = db;
