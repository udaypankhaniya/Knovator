const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user/users-public-controller.js");
const usersValidator = require("../controllers/user/user-validator.js");
const { validate } = require("../helper/index.js")

const bodyParser = require('body-parser');

router.post("/usersRegister", validate(usersValidator.usersRegister), usersController.usersRegister);

router.post("/usersLogin", validate(usersValidator.usersLogin), usersController.usersLogin);


module.exports = router;