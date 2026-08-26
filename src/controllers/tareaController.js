const Tarea = require('../models/Tarea');

exports.crearTarea = async (req, res) => {
    try {
        const nuevaTarea = new Tarea(req.body);
        await nuevaTarea.save();
        res.status(201).json({ status: 'success', data: nuevaTarea });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

exports.obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find().populate('empleado', 'nombre cargo');
        res.status(200).json({ status: 'success', data: tareas });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};