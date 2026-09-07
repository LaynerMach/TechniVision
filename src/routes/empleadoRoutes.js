const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

// Rutas para /api/empleados
router.get('/', empleadoController.obtenerEmpleados);
router.post('/', empleadoController.crearEmpleado);
router.put('/:id', empleadoController.actualizarEmpleado);
router.delete('/:id', empleadoController.eliminarEmpleado);

module.exports = router;