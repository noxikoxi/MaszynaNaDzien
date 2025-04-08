const checkLoggedIn = (req, res, next) => {
    res.locals.isLoggedIn = !!(req.session && req.session.userId);
    res.locals.userId = req.session ? req.session.userId : null;
    res.locals.isAdmin = req.session.isAdmin ? req.session.isAdmin : false;
    next();
};

module.exports = checkLoggedIn;