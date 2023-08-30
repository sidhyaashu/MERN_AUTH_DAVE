const express = require("express")
const router = express.Router()
const getUser = require("../controllers/userController.js")

router.get("/", getUser.userController);

module.exports = router;