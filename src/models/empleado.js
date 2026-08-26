const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    cargo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Empleado', EmpleadoSchema);