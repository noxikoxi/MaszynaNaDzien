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

        const existingUser = await db.User.findOne({ where: { id: userId } });
        if(!existingUser){
            return res.status(200).json({message: "User with selected id not found"});
        }

        const userObject = existingUser.toJSON();

        delete userObject.password;

        return res.status(200).json(userObject);
    }catch (error){
        return res.status(500).json({ error: error.message });
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
        return res.status(500).json({ error: error.message });
    }
}

const updateUserInfo = async (req, res) => {
    try{
        const userId = req.params.userId;
        const { name, surname, phone, location} = req.body;

        const existingUser = await db.User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password']}
        });

        if(!existingUser){
            return res.status(404).json({message: "User with selected id not found"});
        }

        await db.User.update(
            { name, surname, phone, location},
            { where: { id: userId } }
        );

        const updatedUser = await db.User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password'] }
        });

        return res.status(200).json(updatedUser);
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {getAllUser, deleteUser, getUserInfo, updateUserInfo};
