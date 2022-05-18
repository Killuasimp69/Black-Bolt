// @ts-nocheck
const mongoose = require('mongoose')

const CommandSchema = mongoose.Schema({

    _id: {
        type: String,
        required: true,
    },
    enabled: {
        type : String,
        required: true,
    },
})

module.exports = mongoose.model('Commands', CommandSchema)