const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const conectarBD = async () => {
    try {
        const mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        
        await mongoose.connect(uri);
        console.log('✅ Conexión exitosa a la base de datos MongoDB (En Memoria)');
    } catch (error) {
        console.error('❌ Error de conexión a la BD:', error.message);
        process.exit(1);
    }
};

module.exports = conectarBD;