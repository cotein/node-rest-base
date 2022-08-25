const {Schema, model} = require('mongoose');

const PriceListSchema = Schema({

	name : {
		type : String,
		required : [true, 'El nombre es obligatorio'],
		unique : true
	},
	status : {
		type : String,
		default : true,
		required : [true, 'El estado es obligatorio']
	},
	createdat : { type : Date, default: Date.now }
});

module.exports = model('PriceList', PriceListSchema);