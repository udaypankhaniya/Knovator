const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user/users-controller.js");



const { configurePassportMiddleware } = require("../middleware/index.js")

router.use(configurePassportMiddleware)
router.get("/dashboard", usersController.dashboard);



module.exports = router;