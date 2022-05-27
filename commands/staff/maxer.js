const serverSchema = require('../../schemas/Servers')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['maxer', 'max'],
    expectedArgs: '(amount)',
    minArgs: 1,
    maxArgs: 1,
    permissions: ["ADMINISTRATOR"],
    callback: async (message, args, Discord, client, mongo) => {
        const user = message.mentions.members.first()
        if(message.guild.id != "804323987106168842") return
        if(!message.member.roles.cache.has('838679476774371408')) {
            return message.channel.send("You cannot use that")
        }
        await mongo().then(async (mongoose) => {
            try {
                if(isNaN(args[0])) return message.channel.send("Please specify a valid amount.")
                await serverSchema.findOneAndUpdate({
                    _id: message.guild.id
                }, {
                    maxbetamt: args[0] + 1
                }, {
                    upsert: true
                })
                message.channel.send(`The betting amount was set to ${args[0]}`)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}