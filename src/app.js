const express = require('express');
const dotenv = require('dotenv');
const conectarBD = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app = express();

// Conectar a la Base de Datos
conectarBD();

// Middlewares para procesar JSON y servir archivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../'));

// Rutas de la API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/empleados', require('./routes/empleadoRoutes'));
app.use('/api/tareas', require('./routes/tareaRoutes'));

// Puerto del servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});