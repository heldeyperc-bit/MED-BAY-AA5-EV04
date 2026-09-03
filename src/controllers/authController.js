const bcrypt = require("bcryptjs");
const usuarios = require("../data/usuarios");

// Servicio para registrar nuevos usuarios.
const registrarUsuario = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    // Valida que los campos obligatorios hayan sido enviados.
    if (!usuario || !contrasena) {
      return res.status(400).json({
        mensaje: "Usuario y contraseña son obligatorios.",
      });
    }

    // Valida la longitud mínima del nombre de usuario.
    if (usuario.trim().length < 4) {
      return res.status(400).json({
        mensaje: "El usuario debe tener mínimo 4 caracteres.",
      });
    }

    // Valida la longitud mínima de la contraseña.
    if (contrasena.length < 6) {
      return res.status(400).json({
        mensaje: "La contraseña debe tener mínimo 6 caracteres.",
      });
    }

    // Comprueba que el usuario no esté registrado previamente.
    const usuarioExistente = usuarios.find(
      (item) => item.usuario === usuario.trim(),
    );

    if (usuarioExistente) {
      return res.status(409).json({
        mensaje: "El usuario ya se encuentra registrado.",
      });
    }

    // Protege la contraseña antes de almacenarla.
    const contrasenaProtegida = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = {
      id: Date.now(),
      usuario: usuario.trim(),
      contrasena: contrasenaProtegida,
    };

    usuarios.push(nuevoUsuario);

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente.",
      usuario: {
        id: nuevoUsuario.id,
        usuario: nuevoUsuario.usuario,
      },
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor.",
    });
  }
};

// Servicio para autenticar usuarios registrados.
const iniciarSesion = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    // Valida que usuario y contraseña hayan sido enviados.
    if (!usuario || !contrasena) {
      return res.status(400).json({
        mensaje: "Usuario y contraseña son obligatorios.",
      });
    }

    // Busca el usuario registrado.
    const usuarioEncontrado = usuarios.find(
      (item) => item.usuario === usuario.trim(),
    );

    // Si el usuario no existe, la autenticación falla.
    if (!usuarioEncontrado) {
      return res.status(401).json({
        mensaje: "Error en la autenticación.",
      });
    }

    // Compara la contraseña recibida con la contraseña protegida.
    const contrasenaCorrecta = await bcrypt.compare(
      contrasena,
      usuarioEncontrado.contrasena,
    );

    if (!contrasenaCorrecta) {
      return res.status(401).json({
        mensaje: "Error en la autenticación.",
      });
    }

    // Respuesta cuando las credenciales son correctas.
    return res.status(200).json({
      mensaje: "Autenticación satisfactoria.",
      usuario: {
        id: usuarioEncontrado.id,
        usuario: usuarioEncontrado.usuario,
      },
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno del servidor.",
    });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion,
};