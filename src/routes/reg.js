const express = require('express')
const router = express.Router()


const regController = require('../controllers/reg')

router.route('')
.get(regController.register)
.post(regController.createUser, regController.regAuth)

module.exports = router;
