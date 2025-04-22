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
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        date_to: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }
    },{
        timestamps: true,
        updatedAt: false
    }
)

Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, { foreignKey: "user_id", onDelete: "CASCADE"});
    Reservation.belongsTo(models.Machine, { foreignKey: "machine_id", onDelete: "CASCADE" });
};

module.exports = Reservation;