const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        res.locals.isAdmin = req.session.isAdmin;
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = isAuthenticated