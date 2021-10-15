const mongoose = require('mongoose')

const confessionsSchema = mongoose.Schema({

    _id: {
        type: String,
        required: true,
    },
    Author: {
        type: String,
        required: true,
    },
    Confession: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Confessions', confessionsSchema)