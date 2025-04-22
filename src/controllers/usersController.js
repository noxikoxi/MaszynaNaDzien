const db = require('../models');
const bcrypt = require("bcrypt");

const createUser = async(req, res) => {
    try{
        const {email, password, given_name, surname, phone, address, is_admin} = req.body;

        const existingUser = await db.User.findOne({
            where: { email }
        });
        if (existingUser){
            return res.render('adminCreateUser', {title: "Dodaj Użytkownika", errors: [
                    {
                        msg: "Użytkownik o takim adresie email już istnieje"
                    }
                ]});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.User.create({email, password_hash: hashedPassword, given_name, surname, phone, address, is_admin});
        res.redirect("/admin/users");
    }catch (error){
        res.render('error', { message: error.message, status: 500 });
    }
}

const getAllUsers = async (req, res, sortOption) => {
    try {
        const users = await db.User.findAll();

        switch (sortOption){
            case "byEmail":
                users.sort((a, b) => a.email.localeCompare(b.email));
                break;
            case "bySurname":
                users.sort((a, b) =>
                {
                    if (!a.surname && !b.surname) {
                        return 0; // Remis
                    }
                    if (!a.surname) {
                        return 1;
                    }
                    if (!b.surname) {
                        return -1;
                    }
                    a.surname.localeCompare(b.surname)
                });
                break;
            case "byDate":
                users.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            default:
                break;
        }

        res.render('users', {title: "Użytkownicy", users});
    }catch (error){
        res.render('error', { message: error.message, status: 500 });
    }
}

const getUserInfo = async (req, res, errors) => {
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
            title: "Profil",
            errors: errors ? errors : null
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
            return res.render('error', { message: "User with selected id not found", status: 404 });
        }

        await db.User.destroy({
            where: { id: userId }
        });

        res.redirect("/admin/users");
    }catch (error){
        res.render('error', { message: error.message, status: 500 });
    }
}

const updateUserInfo = async (req, res) => {
    try{
        const userId = req.params.userId;
        const { given_name, surname, phone, address} = req.body;

        console.log(req.body);

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

module.exports = {getAllUsers, deleteUser, getUserInfo, updateUserInfo, createUser};
