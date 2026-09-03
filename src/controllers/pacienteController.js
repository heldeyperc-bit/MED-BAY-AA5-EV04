const pacientes = require("../data/pacientes");

// GET /api/pacientes
const listarPacientes = (req, res) => {
  res.status(200).json(pacientes);
};

// GET /api/pacientes/:id
const obtenerPaciente = (req, res) => {
  const id = Number(req.params.id);
  const paciente = pacientes.find((p) => p.id === id);

  if (!paciente) {
    return res.status(404).json({
      mensaje: "Paciente no encontrado.",
    });
  }

  res.status(200).json(paciente);
};

// POST /api/pacientes
const registrarPaciente = (req, res) => {
  const {
    nombre,
    apellido,
    documento,
    edad,
    genero,
    telefono,
    correo,
    direccion,
  } = req.body;

  if (
    !nombre ||
    !apellido ||
    !documento ||
    edad === undefined ||
    !genero ||
    !telefono ||
    !correo ||
    !direccion
  ) {
    return res.status(400).json({
      mensaje: "Todos los campos del paciente son obligatorios.",
    });
  }

  if (!Number.isInteger(Number(edad)) || Number(edad) <= 0) {
    return res.status(400).json({
      mensaje: "La edad debe ser un numero entero mayor que cero.",
    });
  }

  const documentoExiste = pacientes.some(
    (p) => p.documento === String(documento)
  );

  if (documentoExiste) {
    return res.status(409).json({
      mensaje: "Ya existe un paciente con ese documento.",
    });
  }

  const nuevoId =
    pacientes.length === 0
      ? 1
      : Math.max(...pacientes.map((p) => p.id)) + 1;

  const nuevoPaciente = {
    id: nuevoId,
    nombre,
    apellido,
    documento: String(documento),
    edad: Number(edad),
    genero,
    telefono,
    correo,
    direccion,
  };

  pacientes.push(nuevoPaciente);

  res.status(201).json({
    mensaje: "Paciente registrado correctamente.",
    paciente: nuevoPaciente,
  });
};

// PUT /api/pacientes/:id
const actualizarPaciente = (req, res) => {
  const id = Number(req.params.id);
  const paciente = pacientes.find((p) => p.id === id);

  if (!paciente) {
    return res.status(404).json({
      mensaje: "Paciente no encontrado.",
    });
  }

  const {
    nombre,
    apellido,
    documento,
    edad,
    genero,
    telefono,
    correo,
    direccion,
  } = req.body;

  if (
    !nombre ||
    !apellido ||
    !documento ||
    edad === undefined ||
    !genero ||
    !telefono ||
    !correo ||
    !direccion
  ) {
    return res.status(400).json({
      mensaje: "Todos los campos del paciente son obligatorios.",
    });
  }

  if (!Number.isInteger(Number(edad)) || Number(edad) <= 0) {
    return res.status(400).json({
      mensaje: "La edad debe ser un numero entero mayor que cero.",
    });
  }

  const documentoExiste = pacientes.some(
    (p) => p.documento === String(documento) && p.id !== id
  );

  if (documentoExiste) {
    return res.status(409).json({
      mensaje: "Ya existe otro paciente con ese documento.",
    });
  }

  paciente.nombre = nombre;
  paciente.apellido = apellido;
  paciente.documento = String(documento);
  paciente.edad = Number(edad);
  paciente.genero = genero;
  paciente.telefono = telefono;
  paciente.correo = correo;
  paciente.direccion = direccion;

  res.status(200).json({
    mensaje: "Paciente actualizado correctamente.",
    paciente,
  });
};

// DELETE /api/pacientes/:id
const eliminarPaciente = (req, res) => {
  const id = Number(req.params.id);
  const indice = pacientes.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Paciente no encontrado.",
    });
  }

  const pacienteEliminado = pacientes.splice(indice, 1)[0];

  res.status(200).json({
    mensaje: "Paciente eliminado correctamente.",
    paciente: pacienteEliminado,
  });
};

module.exports = {
  listarPacientes,
  obtenerPaciente,
  registrarPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
