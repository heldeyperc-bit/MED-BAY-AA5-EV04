const medicos = require("../data/medicos");

// GET /api/medicos
const listarMedicos = (req, res) => {
  res.status(200).json(medicos);
};

// GET /api/medicos/:id
const obtenerMedico = (req, res) => {
  const id = Number(req.params.id);
  const medico = medicos.find((m) => m.id === id);

  if (!medico) {
    return res.status(404).json({
      mensaje: "Medico no encontrado.",
    });
  }

  res.status(200).json(medico);
};

// POST /api/medicos
const registrarMedico = (req, res) => {
  const {
    nombre,
    apellido,
    documento,
    especialidad,
    telefono,
    correo,
  } = req.body;

  if (
    !nombre ||
    !apellido ||
    !documento ||
    !especialidad ||
    !telefono ||
    !correo
  ) {
    return res.status(400).json({
      mensaje: "Todos los campos del medico son obligatorios.",
    });
  }

  const documentoExiste = medicos.some(
    (m) => m.documento === String(documento)
  );

  if (documentoExiste) {
    return res.status(409).json({
      mensaje: "Ya existe un medico con ese documento.",
    });
  }

  const nuevoId =
    medicos.length === 0
      ? 1
      : Math.max(...medicos.map((m) => m.id)) + 1;

  const nuevoMedico = {
    id: nuevoId,
    nombre,
    apellido,
    documento: String(documento),
    especialidad,
    telefono,
    correo,
  };

  medicos.push(nuevoMedico);

  res.status(201).json({
    mensaje: "Medico registrado correctamente.",
    medico: nuevoMedico,
  });
};

// PUT /api/medicos/:id
const actualizarMedico = (req, res) => {
  const id = Number(req.params.id);
  const medico = medicos.find((m) => m.id === id);

  if (!medico) {
    return res.status(404).json({
      mensaje: "Medico no encontrado.",
    });
  }

  const {
    nombre,
    apellido,
    documento,
    especialidad,
    telefono,
    correo,
  } = req.body;

  if (
    !nombre ||
    !apellido ||
    !documento ||
    !especialidad ||
    !telefono ||
    !correo
  ) {
    return res.status(400).json({
      mensaje: "Todos los campos del medico son obligatorios.",
    });
  }

  const documentoExiste = medicos.some(
    (m) => m.documento === String(documento) && m.id !== id
  );

  if (documentoExiste) {
    return res.status(409).json({
      mensaje: "Ya existe otro medico con ese documento.",
    });
  }

  medico.nombre = nombre;
  medico.apellido = apellido;
  medico.documento = String(documento);
  medico.especialidad = especialidad;
  medico.telefono = telefono;
  medico.correo = correo;

  res.status(200).json({
    mensaje: "Medico actualizado correctamente.",
    medico,
  });
};

// DELETE /api/medicos/:id
const eliminarMedico = (req, res) => {
  const id = Number(req.params.id);
  const indice = medicos.findIndex((m) => m.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Medico no encontrado.",
    });
  }

  const medicoEliminado = medicos.splice(indice, 1)[0];

  res.status(200).json({
    mensaje: "Medico eliminado correctamente.",
    medico: medicoEliminado,
  });
};

module.exports = {
  listarMedicos,
  obtenerMedico,
  registrarMedico,
  actualizarMedico,
  eliminarMedico,
};
