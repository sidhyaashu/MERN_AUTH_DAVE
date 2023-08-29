const express = require('express')
const router = express.Router()
const loginControllers = require('../controllers/authControllers')

router.post('/',loginControllers.handleLogin)


module.exports = router