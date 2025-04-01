const checkLoggedIn = (req, res, next) => {
    res.locals.isLoggedIn = !!(req.session && req.session.userId);
    res.locals.userId = req.session ? req.session.userId : null;
    next();
};

module.exports = checkLoggedIn;