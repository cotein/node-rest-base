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
        required : [true, 'LA contraseña es requerida'],
    },
    img : {
        type : String,
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
    },
    google : {
        type : Boolean,
        default : true
    },
});

module.exports = model('user', UserSchema);