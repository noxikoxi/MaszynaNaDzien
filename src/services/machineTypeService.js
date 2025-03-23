const db = require('../models');

const create = async (req, res) => {
    try {
        let { type } = req.body;
        type = type.toLowerCase();

        const existingType = await db.MachineType.findOne({ where: { type } });

        if (existingType){
            return res.status(400).json({message: "Type already exists"});
        }

        const newType = await db.MachineType.create({ type});
        return res.status(201).json({ message: 'MachineType created', newType });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const existingTypes = await db.MachineType.findAll();

        return res.status(200).json(existingTypes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteType = async (req, res) => {
    try {
        const machineTypeId = req.params.machineTypeId;
        const existingType = await db.MachineType.findOne({ where: { id: machineTypeId } });
        if(!existingType){
            return res.status(404).json({message: "Type with selected id not found"});
        }
        await db.MachineType.destroy({
            where: { id: machineTypeId }
        });

        return res.status(200).json({message: "Succesfully deleted machineType"});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {create, getAll, deleteType};