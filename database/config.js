const mongoose = require('mongoose');
const {MONGODB_ATLAS, MONGODB_ATLAS_TEST, NODE_ENV} = process.env;

const connectionString = NODE_ENV==='test' 
	? MONGODB_ATLAS_TEST
	: MONGODB_ATLAS;

const dbConnection = async () => {

	try {
        
		await mongoose.connect('mongodb+srv://cotein:311034@miclusterdepruebas.sxz0ijy.mongodb.net/mi_primer_db');

		console.log('Base de datos conectada');

	} catch (error) {
		throw new Error('Error en la conexión a la base de datos');
	}
};

module.exports = {
	dbConnection
};