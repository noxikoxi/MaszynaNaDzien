const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

const MachineType = sequelize.define(
    'MachineType',
    {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
    )

module.exports = MachineType;