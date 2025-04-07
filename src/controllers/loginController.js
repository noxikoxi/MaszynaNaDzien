const db = require("../models");
const {compare} = require("bcrypt");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.User.findOne({
            where: { email }
        });

        if (!user || !(await compare(password, user.password_hash))) {
            return res.render("login", { errors:[ {msg: 'Nieprawidłowe dane logowania'} ]});
        }

        req.session.userId = user.id;
        req.session.isAdmin = user.is_admin;

        res.redirect(`/users/${user.id}`);
    } catch (error) {
        res.render('error', { message: error.message, status: 500 });
    }
};

const checkLogin = async (req, res) => {
    if (req.session && req.session.userId) {
        res.redirect(`/users/${req.session.userId}`);
    }else{
        res.render('login', {title: "login"});
    }
}

const logout = async (req, res) => {
    delete res.locals.isAdmin;
    req.session.destroy(err => {
        if (err) {
            return res.render('error',{message: "Błąd przy wylogowywaniu"});
        }
        res.redirect('/login');
    });
};

module.exports = {login, checkLogin, logout}