const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },
    estado: { type: String, enum: ['Pendiente', 'En Proceso', 'Completada'], default: 'Pendiente' },
    empleado: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Tarea', TareaSchema);