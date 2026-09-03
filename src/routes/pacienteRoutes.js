const express = require("express");
const router = express.Router();

const {
  listarPacientes,
  obtenerPaciente,
  registrarPaciente,
  actualizarPaciente,
  eliminarPaciente,
} = require("../controllers/pacienteController");

router.get("/pacientes", listarPacientes);
router.get("/pacientes/:id", obtenerPaciente);
router.post("/pacientes", registrarPaciente);
router.put("/pacientes/:id", actualizarPaciente);
router.delete("/pacientes/:id", eliminarPaciente);

module.exports = router;
