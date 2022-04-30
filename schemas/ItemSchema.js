const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({

    _id: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    worth: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }, 
    type: {
        type: String,
        required: true,
    }, 
    image: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('Items', ItemSchema)