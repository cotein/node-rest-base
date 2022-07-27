const {Schema, model} = require('mongoose');

const CategorySchema = Schema({

    name : {
        type : String,
        required : [true, 'El nombre es obligatorio']
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
    }
})

module.exports = model('Category', CategorySchema);