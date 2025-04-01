const db = require('../models');

const getAll = async (req, res, sortOption) => {
    try {
        const machines = await db.Machine.findAll({
            include: {
                model: db.MachineType,
                attributes: ['type']
            }
        });

        const formattedMachines = machines.map(machine => ({
            id: machine.id,
            name: machine.name,
            description: machine.description,
            type: machine.MachineType ? machine.MachineType.type : null
        }));

        switch (sortOption){
            case "byName":
                formattedMachines.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "byType":
                formattedMachines.sort((a, b) => a.type.localeCompare(b.type));
                break;
        }

        res.render('machines', {
            title: "Maszyny",
            nav: {
                users: false,
                reservations: true,
                machines: true,
                user: false
            },
            machines: formattedMachines
        })
    }catch (error){
        res.render('error', { message: error.message, status: 500 });
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