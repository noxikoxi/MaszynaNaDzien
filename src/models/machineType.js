const {DataTypes  } = require('sequelize');

const sequelize = require("../database/config");

const MachineType = sequelize.define(
    'MachineType',
    {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        timestamps: false,
    }
)

MachineType.associate = (models) => {
    MachineType.hasMany(models.Machine, { foreignKey: "type_id" });
};

module.exports = MachineType;