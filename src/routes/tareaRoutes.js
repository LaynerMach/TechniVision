const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');

router.post('/', tareaController.crearTarea);
router.get('/', tareaController.obtenerTareas);

module.exports = router;