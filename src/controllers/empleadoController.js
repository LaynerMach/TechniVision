const Empleado = require('../models/Empleado');

exports.crearEmpleado = async (req, res) => {
    try {
        const nuevoEmpleado = new Empleado(req.body);
        await nuevoEmpleado.save();
        res.status(201).json({ status: 'success', data: nuevoEmpleado });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

exports.obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.status(200).json({ status: 'success', data: empleados });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};