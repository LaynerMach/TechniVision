const Tarea = require('../models/Tarea');

// Crear una nueva tarea
exports.crearTarea = async (req, res) => {
    try {
        const { titulo, descripcion, prioridad, estado } = req.body;
        
        const nuevaTarea = new Tarea({
            titulo,
            descripcion,
            prioridad,
            estado,
            empleado: req.usuario ? req.usuario.id : null // Si usas middleware de auth
        });

        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// Obtener todas las tareas
exports.obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find().populate('empleado', 'nombre cargo');
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Eliminar una tarea por ID
exports.eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tareaEliminada = await Tarea.findByIdAndDelete(id);

        if (!tareaEliminada) {
            return res.status(404).json({ status: 'error', message: 'Tarea no encontrada' });
        }

        res.status(200).json({ status: 'success', message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};