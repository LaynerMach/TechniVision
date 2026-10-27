const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');

router.post('/', tareaController.crearTarea);
router.get('/', tareaController.obtenerTareas);
router.delete('/:id', tareaController.eliminarTarea); // <-- Añade esta línea

module.exports = router;