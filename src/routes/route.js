const express = require('express')
const router = express.Router()
const checkAuthenticated = require('../../middlewares/checkAuth')

const routeController = require('../controllers/route')

router.route('')
.get(checkAuthenticated, routeController.showRoutes)
.put(checkAuthenticated, routeController.addRoute)

module.exports = router;
