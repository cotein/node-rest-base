const {Schema, model} = require('mongoose');

const RoleSchema = Schema({

	role : {
		type : String,
		required : [true, 'El rol es obligatorio']
	},
	createdat : { type : Date, default: Date.now }
});

module.exports = model('Role', RoleSchema);