const db = require("../models");
const {compare} = require("bcrypt");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.User.findOne({
            where: { email }
        });

        if (!user || !(await compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {login}