const db = require('../models');

const getAllUser = async (req, res, sortOption) => {
    try {
        const users = await db.User.findAll();

        switch (sortOption){
            case "byName":
                users.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "bySurname":
                users.sort((a, b) => a.surname.localeCompare(b.surname));
                break;
            case "byRegisterTime":
                users.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
        }

        return res.status(200).json({ users});
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
}

const getUserInfo = async (req, res) => {
    try {
        const userId = req.params.userId;

        const existingUser = await db.User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password_hash']}
        });
        if(!existingUser) {
            res.render('error', { message: "User with selected ID not found", status: 404 });
        }

        res.render("profile", {
            user: existingUser,
            title: "Profil"
        });
    }catch (error){
        res.render('error', { message: error.message, status: 500 });
    }
}

const deleteUser = async (req, res) => {
    try{
        const userId = req.params.userId;

        const existingUser = await db.User.findOne({
            where: { id: userId }
        });

        if(!existingUser){
            return res.status(200).json({message: "User with selected id not found"});
        }

        await db.User.destroy({
            where: { id: userId }
        });

        return res.status(200).json({message: "Successfully deleted User"});
    }catch (error){
        res.render('error', { message: error.message, status: 500 });
    }
}

const updateUserInfo = async (req, res) => {
    try{
        const userId = req.params.userId;
        const { given_name, surname, phone, address} = req.body;

        const existingUser = await db.User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password_hash']}
        });

        if(!existingUser){
            res.render('error', { message: "User with selected ID not found", status: 404 });
        }

        await db.User.update(
            { given_name, surname, phone, address},
            { where: { id: userId } }
        );

        const updatedUser = await db.User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password_hash'] }
        });

        res.render("profile", {
            user: updatedUser,
            title: "Profil"
        });
    }catch (error){
        res.render('error', { message: error.message, status: 500 });
    }
}

module.exports = {getAllUser, deleteUser, getUserInfo, updateUserInfo};
