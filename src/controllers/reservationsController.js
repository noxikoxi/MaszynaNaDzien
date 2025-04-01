const db = require('../models');

const create = async (req, res) => {
    try {
        const {date_from, date_to} = req.body;
        const machineId = req.params.machineId;
        const userId = req.params.userId;

        const newReservation = await db.Reservation.create({date_from, date_to, user_id: userId, machine_id: machineId});

        return res.status(201).json({ message: 'Reservation created', newReservation });
    }catch(error){
        return res.status(500).json({ error: error.message });
    }

}

const getAll = async (req, res, sortOption) => {
    try {
        const reservations = await db.Reservation.findAll({
            include: [
                {
                    model: db.User,
                    attributes: ['given_name', 'surname']
                },
                {
                    model: db.Machine,
                    attributes: ['name', 'type_id'],
                    include: [
                        {
                            model: db.MachineType,
                            attributes: ['type']
                        }
                    ]
                }
            ]
        });

        switch (sortOption){
            case "byName":
                reservations.sort((a, b) => a.User.given_name.localeCompare(b.User.given_name));
                break;
            case "byType":
                reservations.sort((a, b) => a.Machine.MachineType.type.localeCompare(b.Machine.MachineType.type));
                break;
        }

        return res.status(200).json({ reservations});
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

const getUserReservations = async (req, res, sortOption) => {
    try {
        const userId = req.params.userId;

        const reservations = await db.Reservation.findAll({
            where: {
                user_id: userId
            },
            include: {
                model: db.Machine,
                attributes: ['given_name', 'type_id'],
                include: [
                    {
                        model: db.MachineType,
                        attributes: ['type']
                    }
                ]
            }
        });

        switch (sortOption){
            case "byName":
                reservations.sort((a, b) => a.User.given_name.localeCompare(b.User.given_name));
                break;
            case "byType":
                reservations.sort((a, b) => a.type.localeCompare(b.type));
                break;
        }

        return res.status(200).json({ reservations});
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

const getMachineWithReservations = async (req, res) => {
    try {
        const machineId = req.params.machineId;
        const reservations = await db.Reservation.findAll({
            where: {
                machine_id : machineId
            },
            include: [
                {
                    model: db.Machine,
                    attributes: ['name', 'description'],
                }
            ]
        });
        return res.status(200).json({ reservations});
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

const deleteReservation = async (req, res) => {
    try {
        const reservationId = req.params.reservationId;

        const existingReservation = await db.Reservation.findOne({
            where: {
                id: reservationId
            }
        })

        if(!existingReservation){
            res.status(404).json({message: "Reservation with selected id not found"})
        }

        await db.Reservation.destroy({
            where: {
                id: reservationId
            }
        })
        return res.status(200).json({message: "Successfully deleted Reservation"});
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {create, getAll, getMachineWithReservations, getUserReservations, deleteReservation};