const bcrypt = require('bcrypt');
const db = require('../models');
const User = require('../models/user');

const register = async (req, res) => {
    try {
        const { name, surname, email, password, type_id} = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser){
            res.status(400).json({message: "Email already in use"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.User.create({ name, surname, email, password: hashedPassword, type_id});
        res.status(201).json({ message: 'User created', newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {register, login};
