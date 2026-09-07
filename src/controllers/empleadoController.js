const Empleado = require('../models/empleado');

// Obtener todos los empleados (GET)
exports.obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los empleados', error: error.message });
    }
};

// Crear un empleado (POST)
exports.crearEmpleado = async (req, res) => {
    try {   
        const nuevoEmpleado = new Empleado(req.body);
        await nuevoEmpleado.save();
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el empleado', error: error.message });
    }
};

// Actualizar un empleado por ID (PUT)
exports.actualizarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const empleadoActualizado = await Empleado.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true 
        });

        if (!empleadoActualizado) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        res.status(200).json(empleadoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el empleado', error: error.message });
    }
};

// Eliminar un empleado por ID (DELETE)
exports.eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const empleadoEliminado = await Empleado.findByIdAndDelete(id);

        if (!empleadoEliminado) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        res.status(200).json({ mensaje: 'Empleado eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el empleado', error: error.message });
    }
};