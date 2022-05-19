// @ts-nocheck
const mongoose = require('mongoose')

const ShareSchema = mongoose.Schema({

    _id: {
        type: String,
        default: "default",
        required: true,
    },
    price: {
        type: Number,
        default: 100000,
        required: true,
    },
    yesterdayshare: {
        type: Number,
        default: 100000,
        required: true,
    },
    
})
module.exports = mongoose.model('Shares', ShareSchema)