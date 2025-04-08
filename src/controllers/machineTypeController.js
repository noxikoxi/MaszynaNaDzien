const db = require('../models');

const create = async (req, res) => {
    try {
        let { type } = req.body;
        type = type.toLowerCase();

        const existingType = await db.MachineType.findOne({
            where: { type }
        });

        if (existingType){
            return getAll(req, res, [{ msg: 'Typ już istnieje.' }]);
        }

        await db.MachineType.create({ type});

        res.redirect("/admin/machines/create");
    } catch (error) {
        res.render('error', { message: error.message, status: 500 });
    }
};

const getAll = async (req, res, errors) => {
    try {
        const existingTypes = await db.MachineType.findAll();

        res.render("adminMachineCreate", {
            types:existingTypes,
            title: "Dodaj Maszynę",
            errors: errors ? errors : null
        });
    } catch (error) {
        res.render('error', { message: error.message, status: 500 });
    }
};

const deleteType = async (req, res) => {
    try {
        const machineTypeId = req.params.machineTypeId;
        const existingType = await db.MachineType.findOne({ where: { id: machineTypeId } });
        if(!existingType){
            return res.render('error', { message: "Type with selected id not found", status: 404 });
        }
        await db.MachineType.destroy({
            where: { id: machineTypeId }
        });

        res.redirect("/admin/machines/create");
    } catch (error) {
        res.render('error', { message: error.message, status: 500 });
    }
};

module.exports = {create, getAll, deleteType};