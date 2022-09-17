const {Schema, model} = require('mongoose');

const CompanySchema = Schema({
	name : {
		type : String,
		required : [true, 'El nombre es obligatorio'],
		unique : true
	},
	cuit : {
		type : String,
		required : [true, 'El cuit es obligatorio'],
		unique : true
	},
	inscription : {
		type : Schema.Types.ObjectId,
		ref : 'Inscription',
		required : false,
		//required : [true, 'El tipo de inscripción es obligatoria'],
	},
	documentType : {
		type : String,
		required : false,
		//required : [true, 'El tipo de documento es obligatorio'],
	},
	status : {
		type : String,
		default : true,
		required : false,
		//required : [true, 'El estado es obligatorio']
	},
	user : [
		{
			type : Schema.Types.ObjectId,
			ref : 'User',
			required : false
		}
	],
	afipData: {
		type: Schema.Types.Array,
		required: false
	},
	precepIIBB: {
		type: Schema.Types.Boolean,
		required: false,
		default: false
	},
	precepIVA: {
		type: Schema.Types.Boolean,
		required: false,
		default: false
	},
	retIIBB: {
		type: Schema.Types.Boolean,
		required: false,
		default: false
	},
	retIVA: {
		type: Schema.Types.Boolean,
		required: false,
		default: false
	},
	retGCIA: {
		type: Schema.Types.Boolean,
		required: false,
		default: false
	},
	retSUSS: {
		type: Schema.Types.Boolean,
		required: false,
		default: false
	},
	activityInit: {
		type: Schema.Types.Date,
		required: false,
		default: null
	},
	convIIBB: {
		type: Schema.Types.String,
		required: false,
		default: null
	},
	ptoVtaFe: {
		type: Schema.Types.String,
		required: false,
		default: null
	},
	ptoVtaFeExt: {
		type: Schema.Types.String,
		required: false,
		default: null
	},
	ptoVtaFDCE: {
		type: Schema.Types.String,
		required: false,
		default: null
	},
	ptoVtaFDCEExt: {
		type: Schema.Types.String,
		required: false,
		default: null
	},
	ptoVtaRemito: {
		type: Schema.Types.String,
		required: false,
		default: null
	},
	ptoVtaRemitoExt: {
		type: Schema.Types.String,
		required: false,
		default: null
	},
	ptoVtaRecibo: {
		type: Schema.Types.String,
		required: false,
		default: null
	},
	products: [
		{ 
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required : false
		}
	],
	createdat : { type : Date, default: Date.now }
});

module.exports = model('Company', CompanySchema);