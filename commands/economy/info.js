const itemSchema = require('../../schemas/ItemSchema')
const { prefix } = require('../../config.json')
const mongo = require("../../mongo")

module.exports = {
    commands: ['info'],
    expectedArgs: '(NFT)',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, args, Discord, client) => {
        if(message.guild === null) {
            console.log("returning")
            return
        }
        const user = message.member.user
        await mongo().then(async (mongoose) => {
            try {
                const itemResult = await itemSchema.findOne({ _id: args[0] })
                if(!itemResult) {
                    return message.channel.send("I cannot find that NFT")
                }
                const embedForItems = new Discord.MessageEmbed()
                .setAuthor(`${message.member.displayName} | Info`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .setColor("BLACK")
                .addFields({
                    name: `House ID`,
                    value: itemResult._id
                }, {
                    name: `House Owner:`,
                    value: `<@${itemResult.owner}>`
                }, {
                    name: "House Name:",
                    value: itemResult.name
                }, {
                    name: "House Value:",
                    value: itemResult.worth + " BBC"
                }, {
                    name: "House Type:",
                    value: itemResult.type
                })
                message.channel.send(embedForItems)
            } finally {
                mongoose.connection.close()

            }
        })
    }
}