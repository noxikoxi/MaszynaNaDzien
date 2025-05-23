const db = require('../models');
const {Op} = require("sequelize");

const create = async (req, res) => {
    try {
        const {date_from, date_to} = req.body;
        const machineId = req.params.machineId;
        if (!req.session || !req.session.userId){
            return res.render('error', { message: "No session found", status: 400 });
        }
        const userId = req.session.userId;

        // Check if it's possible to reserve machine
        const overlapping = await db.Reservation.findOne({
            where: {
                machine_id: machineId,
                [Op.and]: [
                    {
                        date_from: { [Op.lte]: req.body.date_to }
                    },
                    {
                        date_to: { [Op.gte]: req.body.date_from }
                    }
                ]
            }
        });

        if (overlapping) {
            return getMachineWithReservations(req, res, [{ msg: 'Maszyna jest już zarezerwowana w tym przedziale czasu.' }])
        }


        await db.Reservation.create({date_from, date_to, user_id: userId, machine_id: machineId});

        return getUserReservations(req, res, []);
    }catch(error){
        res.render('error', { message: error.message, status: 500 });
    }

}

const sortReservations = (reservations, sortOption) => {
    switch (sortOption){
        default:
            reservations.sort((a, b) => {
                const dateA = new Date(a.date_from);
                const dateB = new Date(b.date_from);
                return dateA - dateB;
            });
            break;
        case "byMachineType":
            reservations.sort((a, b) => a.Machine.MachineType.type.localeCompare(b.Machine.MachineType.type));
            break;
        case "byMachineName":
            reservations.sort((a, b) => a.Machine.name.localeCompare(b.Machine.name));
            break;
        case "byUserEmail":
            reservations.sort((a, b) => a.User.email.localeCompare(b.User.email));
            break;
    }

}

const formatReservations = (reservations, user_id, sortOption) => {
    sortReservations(reservations, sortOption);

    return reservations.map(reservation => ({
        id: reservation.id,
        user: user_id ? user_id : (reservation.User.given_name && reservation.User.surname ? `${reservation.User.given_name} ${reservation.User.surname}` : reservation.User.email),
        machineType: reservation.Machine.MachineType.type,
        machine: reservation.Machine.name,
        date_from : reservation.date_from,
        date_to: reservation.date_to
    }));
}

const getAll = async (req, res, sortOption) => {
    try {
        const reservations = await db.Reservation.findAll({
            include: [
                {
                    model: db.User,
                    attributes: ['given_name', 'surname', 'email']
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

        const formattedReservations = formatReservations(reservations, null, sortOption);

        res.render('reservations', {
            title: "Rezerwacje",
            reservations: formattedReservations,
            userView: false
        })
    }catch(error){
        res.render('error', { message: error.message, status: 500 });
    }
}

const getUserReservations = async (req, res, sortOption) => {
    try {
        if (!req.session || !req.session.userId){
            return res.render('error', { message: "No session found", status: 400 });
        }
        const userId = req.session.userId;

        const reservations = await db.Reservation.findAll({
            where: {
                user_id: userId
            },
            include: {
                model: db.Machine,
                attributes: ['name', 'type_id'],
                include: [
                    {
                        model: db.MachineType,
                        attributes: ['type']
                    }
                ]
            }
        });

        if(sortOption === "byUserEmail"){
            sortOption = "byDate";
        }

        const formattedReservations = formatReservations(reservations, userId, sortOption);

        res.render('reservations', {
            title: "Moje Rezerwacje",
            reservations: formattedReservations,
            userView: true
        })
    }catch(error){
        res.render('error', { message: error.message, status: 500 });
    }
}

const getMachineWithReservations = async (req, res, errors) => {
    try {
        const machineId = req.params.machineId;
        const machine = await db.Machine.findOne({
            where: {
                id: machineId
            }
        });
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
        res.render("reserveMachine", {
            title: "Rezerwuj",
            reservations,
            machine,
            errors: errors ? errors : null
        });
    }catch(error){
        res.render('error', { message: error.message, status: 500 });
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
            res.render('error', { message: "Reservation with selected id not found", status: 404 });
        }

        await db.Reservation.destroy({
            where: {
                id: reservationId
            }
        })
        res.redirect("/reservations/user");
    }catch(error){
        res.render('error', { message: error.message, status: 500 });
    }
}

module.exports = {create, getAll, getMachineWithReservations, getUserReservations, deleteReservation};