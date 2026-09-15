const Usuario = require('../models/Usuario');

// Registrar Usuario
exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'El correo ya existe' });

    const nuevoUsuario = new Usuario({ nombre, email, password });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar', error: error.message });
  }
};

// Iniciar Sesión (Login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email, password });
    if (!usuario) return res.status(400).json({ mensaje: 'Credenciales incorrectas' });

    res.json({ mensaje: 'Inicio de sesión exitoso', usuario: { nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};