const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

const Reservation = sequelize.define(
    "Reservation",
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        machine_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date_from: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_to: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }
)

module.exports = Reservation;