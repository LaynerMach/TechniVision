const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'] 
    },
    cargo: { 
        type: String, 
        required: [true, 'El cargo es obligatorio'] 
    },
    email: { 
        type: String, 
        required: [true, 'El email es obligatorio'], 
        unique: true 
    },
    activo: { 
        type: Boolean, 
        default: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Empleado', EmpleadoSchema);