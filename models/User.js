const {Schema, model} = require('mongoose');

const UserSchema = Schema({

	name : {
		type : String,
		required : [true, 'El nombre es requerido'],
	},
	email : {
		type : String,
		required : [true, 'El email es requerido'],
		unique : true
	},
	password : {
		type : String,
		required : [true, 'La contraseña es requerida'],
	},
	role : {
		type : String,
		required : true
	},
	status : {
		type : Boolean,
		default : true
	},
	img : {
		type : String,
		default : ''
	},
	google : {
		type : Boolean,
		default : true
	},
});

UserSchema.methods.toJSON = function(){
	const {__v, password, _id, ...user} = this.toObject();
	user.uid = _id;
	return user;
};

module.exports = model('User', UserSchema);