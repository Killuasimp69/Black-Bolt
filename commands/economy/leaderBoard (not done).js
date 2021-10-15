const mongo = require('../../mongo')
const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['Leaderboard', 'lb'],
    callback: (message, args, Discord, client) => {
        message.channel.send("Coming Soon")
    }
}