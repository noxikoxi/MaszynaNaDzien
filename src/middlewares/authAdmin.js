const isAdmin = (req, res, next) => {
    if (req.session && req.session.userId && req.session.isAdmin) {
        res.locals.isAdmin = req.session.isAdmin;
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = isAdmin