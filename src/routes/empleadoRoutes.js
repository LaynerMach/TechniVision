const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

router.post('/', empleadoController.crearEmpleado);
router.get('/', empleadoController.obtenerEmpleados);

module.exports = router;