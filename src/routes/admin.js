var express = require('express');
var router = express.Router();

const userController = require("../controllers/usersController");
const machineController = require("../controllers/machineController");
const isAdmin = require("../middlewares/authAdmin");
const emailPasswordValidator = require("../validators/registerValidator");
const userProfileValidator = require("../validators/userProfileValidator");
const {validationResult} = require("express-validator");
const machineService = require("../controllers/machineController");
const machineTypeService = require("../controllers/machineTypeController");
const machineTypeController = require("../controllers/machineTypeController");
router.get('/users', isAdmin, (req, res) => {
    const sortOption = req.query.sortOption;
    return userController.getAllUsers(req, res, sortOption);
});

router.get('/users/create', isAdmin, (req, res) => {
    return res.render("adminUserCreate", {title: "Dodaj Użytkownika"})
});

router.post('/users/create', isAdmin, emailPasswordValidator, userProfileValidator, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("adminUserCreate", {errors: errors.array()});
    }
    return userController.createUser(req, res);
});

router.get('/users/delete/:userId', isAdmin,  userController.deleteUser);

router.get('/machines', isAdmin, (req, res) => {
    const sortOption = req.query.sortOption;
    return machineController.getAll(req, res, sortOption, true);
});

router.get('/machines/create', isAdmin, (req, res) => {
    return machineTypeController.getAll(req, res, []);
});

router.get('/machines/delete/:machineId', isAdmin, machineService.deleteMachine);

router.get('/machines/edit/:machineId', isAdmin, machineService.getMachineWithTypes);

router.post('/machines/edit/:machineId', isAdmin, machineService.updateMachine);

router.post('/machines/create', isAdmin,  machineService.create);

router.post('/type/create', isAdmin, machineTypeService.create);

router.get('/type/delete/:machineTypeId', isAdmin, machineTypeService.deleteType);


module.exports = router;