const db = require('../models');

const getAll = async (req, res, sortOption) => {
    try {
        const machines = await db.Machine.findAll({
            include: {
                model: db.MachineType,
                attributes: ['type']
            }
        });

        switch (sortOption){
            case "byName":
                machines.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "byType":
                machines.sort((a, b) => a.type.localeCompare(b.type));
                break;
        }

        return res.status(200).json({ machines});
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
}

const create = async (req, res) => {
    try{
        const { name, description, type_id} = req.body;

        const newMachine = await db.Machine.create({ name, description, type_id});
        return res.status(201).json({ message: 'Machine created', newMachine });
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
}

const deleteMachine = async (req, res) => {
    try{
        const machineId = req.params.machineId;

        const existingMachine = await db.Machine.findOne({ where: { id: machineId } });

        if(!existingMachine){
            return res.status(404).json({message: "Machine with selected id not found"});
        }

        await db.Machine.destroy({
            where: { id: machineId }
        });

        return res.status(200).json({message: "Successfully deleted machine"});
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {getAll, create, deleteMachine};