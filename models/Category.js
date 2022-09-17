const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
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
	user : {
		type : Schema.Types.ObjectId,
		ref : 'User',
		required : true
	},
	products: [
		{ 
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required : false
		}
	],
	company: {
		type: Schema.Types.ObjectId,
		ref: 'Company',
		required: true,
		default: null
	},
	createdat : { type : Date, default: Date.now }
});

module.exports = model('Category', CategorySchema);