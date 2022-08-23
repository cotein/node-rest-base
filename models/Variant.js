const {Schema, model} = require('mongoose');

const VariantSchema = Schema({

	variant : {
		type : String,
		required : [true, 'La variante es obligatoria'],
		unique : true
	},
	status : {
		type : String,
		default : true,
		required : [true, 'El estado es obligatorio']
	},
	user : {
		type : Schema.Types.ObjectId,
		ref : 'User',
		required : true
	},
	products:   [
		{ 
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required : false
		}
	],
	sku: {
		type: String,
		required: false,
		default: ''
	},
	createdat : { type : Date, default: Date.now }
});

module.exports = model('Variant', VariantSchema);