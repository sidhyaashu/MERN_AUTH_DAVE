const express = require('express')
const router = express.Router()
const LogoutControllers = require('../controllers/LogoutControllers')

router.get('/',LogoutControllers.handleLogout)


module.exports = router