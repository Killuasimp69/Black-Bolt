const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({

    _id: {
        type: String,
        required: true,
    },
    Items: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('Items', ItemSchema)