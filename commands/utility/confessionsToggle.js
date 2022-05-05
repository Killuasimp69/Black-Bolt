const mongo = require('../../mongo')
const serverSchema = require('../../schemas/Servers')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['cftoggle', 'contoggle', 'confessionstoggle'],
    expectedArgs: '(true/false)',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, args, Discord, client) => {
        if (!message.member.hasPermission(`KICK_MEMBERS`)) {
            return
        }

        if (args[0] != "true" && args[0] != "false") {
            return message.channel.send("You must specify true or false")
        }

        await mongo().then(async (mongoose) => {
            try {

                await serverSchema.findOneAndUpdate({
                    _id: message.guild.id
                }, {
                    confessionsTrueFalse: args[0]
                }, {
                    upsert: true
                })

                message.channel.send(`Confessions have been turned ${args[0]}`)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}