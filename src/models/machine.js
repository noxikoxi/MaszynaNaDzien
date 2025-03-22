const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

const Machine = sequelize.define(
    'Machine',
    {
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }
    )

module.exports = Machine;