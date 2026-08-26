const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conectarBD = require('./config/db');

const app = express();

// Conectar a la base de datos
conectarBD();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/empleados', require('./routes/empleadoRoutes'));
app.use('/api/tareas', require('./routes/tareaRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});