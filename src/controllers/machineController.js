const db = require('../models');

const getAll = async (req, res, sortOption, isAdmin=false) => {
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
        if(isAdmin){
            res.render('adminMachines', {
                title: "Maszyny",
                machines: formattedMachines
            })

        }else {
            res.render('machines', {
                title: "Maszyny",
                machines: formattedMachines
            })
        }
    }catch (error){
        res.render('error', { message: error.message, status: 500 });
    }
}

const create = async (req, res) => {
    try{
        const { name, description, type_id} = req.body;

        await db.Machine.create({ name, description, type_id});
        res.redirect("/admin/machines");
    }catch (error){
        res.render('error', { message: error.message, status: 500 });
    }
}

const updateMachine = async (req, res) => {
    try{
        const id = req.params.machineId;
        const {name, type_id, description} = req.body;

        const existingMachine = await db.Machine.findOne({
            where: { id: id }
        });

        if(!existingMachine){
            res.render('error', { message: "Machine with selected ID not found", status: 404 });
        }

        const types = await db.MachineType.findAll();

        await db.Machine.update(
            { name, type_id, description},
            { where: { id: id } }
        );

        const updatedMachine = await db.Machine.findOne({
            where: { id: id },
        });

        res.redirect("/admin/machines/edit/" + id);
    }catch (error){
        res.render('error', { message: error.message, status: 500 });
    }
}

const getMachineWithTypes = async (req, res) => {
    try{
        const id = req.params.machineId;
        const machine = await db.Machine.findOne({
            where: { id: id }
        });

        if(!machine){
            res.render('error', { message: "Machine with selected ID not found", status: 404 });
        }

        const types = await db.MachineType.findAll();

        res.render("adminEditMachine", {
            machine: machine,
            types,
            title: "Edycja Maszyny"
        });
    }catch (error){
        res.render('error', { message: error.message, status: 500 });
    }
}


const deleteMachine = async (req, res) => {
    try{
        const machineId = req.params.machineId;

        const existingMachine = await db.Machine.findOne({ where: { id: machineId } });

        if(!existingMachine){
            return res.render('error', { message: "Machine with selected id not found", status: 404 });
        }

        await db.Machine.destroy({
            where: { id: machineId }
        });

        res.redirect("/admin/machines");
    }catch (error){
        res.render('error', { message: error.message, status: 500 });
    }
}


module.exports = {getAll, create, deleteMachine, updateMachine, getMachineWithTypes};