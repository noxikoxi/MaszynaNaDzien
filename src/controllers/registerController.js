const db = require("../models");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
    try {
        const { name, surname, email, password, type_id} = req.body;

        const existingUser = await db.User.findOne({
            where: { email }
        });
        if (existingUser){
            return res.status(400).json({message: "Email already in use"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.User.create({ name, surname, email, password: hashedPassword, type_id});
        return res.status(201).json({ message: 'User created', newUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {register}