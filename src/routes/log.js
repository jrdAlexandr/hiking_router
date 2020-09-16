const express = require('express')
const router = express.Router()
const logController = require('../controllers/log')

router.route('')
.get(logController.login)
.post(logController.logAuth)

module.exports = router;
