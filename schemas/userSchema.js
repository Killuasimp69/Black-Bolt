// @ts-nocheck
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    _id: {
        type: String,
        required: true,
    },
    money: {
        type: Number,
        required: true,
    },
    warns: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        default: 0,
        required: true,
    },
    levelbadge: {
        type: String,
        default: "",
        required: true,
    },
    houses: {
        type: String,
        required: true,
    },
    blacklisted: {
        type: String,
        default: "false",
        required: true,
    },
    econverified: {
        type: String,
        default: "false",
        required: true,
    }
})

module.exports = mongoose.model('User', userSchema)