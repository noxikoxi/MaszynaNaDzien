const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

const User = sequelize.define(
    'User',
    {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }
)

User.associate = (models) => {
    User.belongsTo(models.UserType, { foreignKey: "type_id" });
    User.hasMany(models.Reservation, { foreignKey: "user_id", onDelete: "CASCADE" });
};

module.exports = User;
