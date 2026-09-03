const express = require("express");
const router = express.Router();

const {
  listarCitas,
  obtenerCita,
  registrarCita,
  actualizarCita,
  eliminarCita,
} = require("../controllers/citaController");

router.get("/citas", listarCitas);
router.get("/citas/:id", obtenerCita);
router.post("/citas", registrarCita);
router.put("/citas/:id", actualizarCita);
router.delete("/citas/:id", eliminarCita);

module.exports = router;
