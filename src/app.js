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


// Importar rutas
const empleadoRoutes = require('./routes/empleadoRoutes');
const authRoutes = require('./routes/authRoutes'); // <--- Añadir esta línea

// Usar rutas
app.use('/api/empleados', empleadoRoutes);
app.use('/api/auth', authRoutes); // <--- Añadir esta línea

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});