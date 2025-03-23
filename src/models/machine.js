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

Machine.associate = (models) => {
    Machine.belongsTo(models.MachineType, { foreignKey: "type_id" })
    Machine.hasMany(models.Reservation, { foreignKey: "machine_id", onDelete: "CASCADE" });
};

module.exports = Machine;