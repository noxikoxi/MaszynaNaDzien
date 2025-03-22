const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

const UserType = sequelize.define(
    'UserType',
    {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
    )

module.exports = UserType;