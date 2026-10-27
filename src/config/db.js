const mongoose = require('mongoose');

const conectarBD = async () => {
    try {
        const urlBD = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/technivision';
        await mongoose.connect(urlBD);
        console.log('📦 Conexión exitosa a MongoDB (Persistente)');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
};

module.exports = conectarBD;