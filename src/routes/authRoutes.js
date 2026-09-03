const express = require("express");

const {
  registrarUsuario,
  iniciarSesion,
} = require("../controllers/authController");

const router = express.Router();

// Servicio web para registrar usuarios.
router.post("/registro", registrarUsuario);

// Servicio web para iniciar sesión.
router.post("/login", iniciarSesion);

module.exports = router;