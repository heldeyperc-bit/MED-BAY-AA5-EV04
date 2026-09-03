const express = require("express");
const authRoutes = require("./src/routes/authRoutes");
const pacienteRoutes = require("./src/routes/pacienteRoutes");
const medicoRoutes = require("./src/routes/medicoRoutes");
const citaRoutes = require("./src/routes/citaRoutes");

const app = express();
const PORT = 3000;

// Permite recibir informacion en formato JSON.
app.use(express.json());

// Ruta inicial de prueba.
app.get("/", (req, res) => {
  res.json({
    mensaje: "API MED-BAY funcionando correctamente.",
  });
});

// Rutas de autenticacion.
app.use("/api", authRoutes);

// Rutas de pacientes.
app.use("/api", pacienteRoutes);

// Rutas de medicos.
app.use("/api", medicoRoutes);

// Rutas de citas.
app.use("/api", citaRoutes);

// Inicia el servidor.
app.listen(PORT, () => {
  console.log(`Servidor MED-BAY activo en http://localhost:${PORT}`);
});
