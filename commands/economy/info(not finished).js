const itemSchema = require('../../schemas/ItemSchema')
const { prefix } = require('../../config.json')
const mongo = require("../../mongo")

module.exports = {
    commands: ['info'],
    expectedArgs: '(NFT)',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, args, Discord, client) => {
        const user = message.member.user
        await mongo().then(async (mongoose) => {
            try {
                const itemResult = await itemSchema.findOne({ _id: args[0] })
                if(!itemResult) {
                    return message.channel.send("I cannot find that NFT")
                }
                const embedForItems = new Discord.MessageEmbed()
                .setAuthor(`${message.member.displayName} | Houses`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .setColor("BLACK")
            } finally {
                mongoose.connection.close()

            }
        })
    }
}