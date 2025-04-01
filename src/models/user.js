const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

const User = sequelize.define(
    'User',
    {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        given_name: {
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
            validate: {
                isEmail: true
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        timestamps: true,
        updatedAt: false
    }
)

User.associate = (models) => {
    User.hasMany(models.Reservation, { foreignKey: "user_id", onDelete: "CASCADE" });
};

module.exports = User;
