const express = require("express");
const router = express.Router();

const {
  listarMedicos,
  obtenerMedico,
  registrarMedico,
  actualizarMedico,
  eliminarMedico,
} = require("../controllers/medicoController");

router.get("/medicos", listarMedicos);
router.get("/medicos/:id", obtenerMedico);
router.post("/medicos", registrarMedico);
router.put("/medicos/:id", actualizarMedico);
router.delete("/medicos/:id", eliminarMedico);

module.exports = router;
