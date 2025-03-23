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

UserType.associate = (models) => {
    UserType.hasMany(models.User, { foreignKey: "type_id" });
};

module.exports = UserType;