const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

/* Recuperacion Password */
router.post("/forgotPassword", UserController.forgotPassword);
router.patch("/resetPassword/:token", UserController.resetPassword);

/* Rutas Basicas del CRUD */
router.post("/new", UserController.createUser);
router.get("", authenticate, UserController.findAllUsers);
router.get("/:id", authenticate, UserController.findUserById);
router.patch("/:id", authenticate, UserController.updateUser);
router.delete("/:id", authenticate, UserController.deleteUser);

/* Cookie */
router.get("/cookie", authenticate, UserController.cookie);

module.exports = router;