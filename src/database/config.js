const { Sequelize } = require('sequelize');

// Connecting to a database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/database1.db'
});

module.exports = sequelize;