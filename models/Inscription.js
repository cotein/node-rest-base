const {Schema, model} = require('mongoose');

const InscriptionSchema = Schema({

	name : {
		type : String,
		required : [true, 'El nombre es obligatorio']
	},
	createdat : { type : Date, default: Date.now }
});

module.exports = model('Inscription', InscriptionSchema);