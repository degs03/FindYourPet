const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

/* Rutas de session */
router.post("/login", UserController.login);
router.delete("/logout", authenticate, UserController.logout);

module.exports = router;