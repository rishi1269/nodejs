const mongoose = require('mongoose')

const productschema = mongoose.Schema({
    
    name:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
        default: 0
    },
    price:{
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    }
},
{
    timestamps: true
})

const productmodel = mongoose.model('product', productschema )

module.exports = productmodel;