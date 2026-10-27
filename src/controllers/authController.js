const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Registrar nuevo usuario
exports.registrar = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        usuario = new Usuario({
            nombre,
            email,
            password: passwordHash
        });

        await usuario.save();
        res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor: ' + error.message });
    }
};

// Iniciar sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        const payload = { usuario: { id: usuario.id, nombre: usuario.nombre } };
        const secret = process.env.JWT_SECRET || 'secreto_para_jwt_technivision';

        jwt.sign(payload, secret, { expiresIn: '8h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, usuario: { nombre: usuario.nombre, email: usuario.email } });
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor: ' + error.message });
    }
};