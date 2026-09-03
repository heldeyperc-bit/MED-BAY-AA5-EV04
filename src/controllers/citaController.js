const citas = require("../data/citas");
const pacientes = require("../data/pacientes");
const medicos = require("../data/medicos");

// GET /api/citas
const listarCitas = (req, res) => {
  res.status(200).json(citas);
};

// GET /api/citas/:id
const obtenerCita = (req, res) => {
  const id = Number(req.params.id);
  const cita = citas.find((c) => c.id === id);

  if (!cita) {
    return res.status(404).json({
      mensaje: "Cita no encontrada.",
    });
  }

  res.status(200).json(cita);
};

// POST /api/citas
const registrarCita = (req, res) => {
  const {
    pacienteId,
    medicoId,
    fecha,
    hora,
    motivo,
    estado,
  } = req.body;

  if (
    pacienteId === undefined ||
    medicoId === undefined ||
    !fecha ||
    !hora ||
    !motivo
  ) {
    return res.status(400).json({
      mensaje: "Paciente, medico, fecha, hora y motivo son obligatorios.",
    });
  }

  const idPaciente = Number(pacienteId);
  const idMedico = Number(medicoId);

  const pacienteExiste = pacientes.some((p) => p.id === idPaciente);

  if (!pacienteExiste) {
    return res.status(404).json({
      mensaje: "El paciente indicado no existe.",
    });
  }

  const medicoExiste = medicos.some((m) => m.id === idMedico);

  if (!medicoExiste) {
    return res.status(404).json({
      mensaje: "El medico indicado no existe.",
    });
  }

  const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;

  if (!formatoFecha.test(fecha)) {
    return res.status(400).json({
      mensaje: "La fecha debe tener el formato AAAA-MM-DD.",
    });
  }

  const formatoHora = /^([01]\d|2[0-3]):[0-5]\d$/;

  if (!formatoHora.test(hora)) {
    return res.status(400).json({
      mensaje: "La hora debe tener el formato HH:MM.",
    });
  }

  const citaOcupada = citas.some(
    (c) =>
      c.medicoId === idMedico &&
      c.fecha === fecha &&
      c.hora === hora
  );

  if (citaOcupada) {
    return res.status(409).json({
      mensaje: "El medico ya tiene una cita programada en esa fecha y hora.",
    });
  }

  const nuevoId =
    citas.length === 0
      ? 1
      : Math.max(...citas.map((c) => c.id)) + 1;

  const nuevaCita = {
    id: nuevoId,
    pacienteId: idPaciente,
    medicoId: idMedico,
    fecha,
    hora,
    motivo,
    estado: estado || "Programada",
  };

  citas.push(nuevaCita);

  res.status(201).json({
    mensaje: "Cita registrada correctamente.",
    cita: nuevaCita,
  });
};

// PUT /api/citas/:id
const actualizarCita = (req, res) => {
  const id = Number(req.params.id);
  const cita = citas.find((c) => c.id === id);

  if (!cita) {
    return res.status(404).json({
      mensaje: "Cita no encontrada.",
    });
  }

  const {
    pacienteId,
    medicoId,
    fecha,
    hora,
    motivo,
    estado,
  } = req.body;

  if (
    pacienteId === undefined ||
    medicoId === undefined ||
    !fecha ||
    !hora ||
    !motivo ||
    !estado
  ) {
    return res.status(400).json({
      mensaje: "Todos los campos de la cita son obligatorios.",
    });
  }

  const idPaciente = Number(pacienteId);
  const idMedico = Number(medicoId);

  if (!pacientes.some((p) => p.id === idPaciente)) {
    return res.status(404).json({
      mensaje: "El paciente indicado no existe.",
    });
  }

  if (!medicos.some((m) => m.id === idMedico)) {
    return res.status(404).json({
      mensaje: "El medico indicado no existe.",
    });
  }

  const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;
  const formatoHora = /^([01]\d|2[0-3]):[0-5]\d$/;

  if (!formatoFecha.test(fecha)) {
    return res.status(400).json({
      mensaje: "La fecha debe tener el formato AAAA-MM-DD.",
    });
  }

  if (!formatoHora.test(hora)) {
    return res.status(400).json({
      mensaje: "La hora debe tener el formato HH:MM.",
    });
  }

  const citaOcupada = citas.some(
    (c) =>
      c.id !== id &&
      c.medicoId === idMedico &&
      c.fecha === fecha &&
      c.hora === hora
  );

  if (citaOcupada) {
    return res.status(409).json({
      mensaje: "El medico ya tiene otra cita en esa fecha y hora.",
    });
  }

  cita.pacienteId = idPaciente;
  cita.medicoId = idMedico;
  cita.fecha = fecha;
  cita.hora = hora;
  cita.motivo = motivo;
  cita.estado = estado;

  res.status(200).json({
    mensaje: "Cita actualizada correctamente.",
    cita,
  });
};

// DELETE /api/citas/:id
const eliminarCita = (req, res) => {
  const id = Number(req.params.id);
  const indice = citas.findIndex((c) => c.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Cita no encontrada.",
    });
  }

  const citaEliminada = citas.splice(indice, 1)[0];

  res.status(200).json({
    mensaje: "Cita eliminada correctamente.",
    cita: citaEliminada,
  });
};

module.exports = {
  listarCitas,
  obtenerCita,
  registrarCita,
  actualizarCita,
  eliminarCita,
};
