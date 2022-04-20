const mongoose = require('mongoose')

const warnsSchema = mongoose.Schema({

    _id: {
        type: String,
        required: true,
    },
    __v: {
        type: String,
        required: true,
    },
    warnNum: {
        type: String,
        required: true,
    },
    mod: {
        type: String,
        required: true,
    },
    warneduser: {
        type: String,
        required: true,
    },
    warneduserID: {
        type: String,
        required: true,
    },
    warning: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Warns', warnsSchema)