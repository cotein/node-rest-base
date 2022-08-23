const {Schema, model} = require('mongoose');

const ProductSchema = Schema({

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
	price : {
		type : Number,
		default : 0
	},
	categories: [
		{ 
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required : [true, 'La categoría es obligatoria'] 
		}
	],
	priceLists: [
		{ 
			type: Schema.Types.ObjectId,
			ref: 'PriceList',
			required : [true, 'Lista de precios es obligatoria'] 
		}
	],
	description : {
		type : String,
		required: false
	},
	available: {
		type: Boolean,
		required: false,
		default: true
	},
	meliId : {
		type: String,
		default: '',
		required: false
	},
	code : {
		type: String,
		default: '',
		required: false
	},
	iva : {
		type: String,
		default: '',
		required: false
	},
	money : {
		type: String,
		default: '',
		required: false
	},
	priority : {
		type: Number,
		default: 10,
		required: false
	},
	publishedHere: {
		type: Boolean,
		required: false,
		default: false
	},
	publishedAtMeli: {
		type: Boolean,
		required: false,
		default: false
	},
	offert: {
		type: Boolean,
		required: false,
		default: false
	},
	createdat : { type : Date, default: Date.now }
});

module.exports = model('Product', ProductSchema);