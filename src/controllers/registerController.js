const db = require("../models");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
    try {
        const {email, password} = req.body;

        const existingUser = await db.User.findOne({
            where: { email }
        });
        if (existingUser){
            return res.render('register', {title: "register", errors: [
                    {
                        msg: "Użytkownik o takim adresie email już istnieje"
                    }
                ]});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.User.create({email, password_hash: hashedPassword});
        res.redirect(`/users/${user.id}`);
    } catch (error) {
        res.render('error', { message: error.message, status: 500 });
    }
};

module.exports = {register}