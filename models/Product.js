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
            required : true 
        }
    ],

})

module.exports = model('Product', ProductSchema);