const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    _id: {
        type: String,
        required: true,
    },
    money: {
        type: String,
        required: true,
    },
    warns: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('User', userSchema)