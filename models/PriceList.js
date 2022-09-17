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
	company: {
		type: Schema.Types.ObjectId,
		ref: 'Company',
		required: true,
		default: null
	},
	createdat : { type : Date, default: Date.now }
});

module.exports = model('PriceList', PriceListSchema);