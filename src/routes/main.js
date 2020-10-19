const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const checkAuthenticated = require('../../middlewares/checkAuth');
const checkRole = require('../../middlewares/checkRole');

router
  .route('')
  .get(checkAuthenticated, mainController.main)
  .delete(checkAuthenticated, checkRole, (req, res) => {
    res.end();
  });

module.exports = router;
