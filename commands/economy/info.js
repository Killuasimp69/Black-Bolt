const itemSchema = require('../../schemas/ItemSchema')
const { prefix } = require('../../config.json')
const mongo = require("../../mongo")

module.exports = {
    commands: ['info'],
    expectedArgs: '(NFT)',
    minArgs: 1,
    maxArgs: 1,
    economyCheck: "true",
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
                .setAuthor(`${itemResult.name} | Info`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .setImage(itemResult.image)
                .setColor("BLACK")
                .addFields({
                    name: `House ID`,
                    value: itemResult._id,
                    inline: true
                }, {
                    name: `House Owner:`,
                    value: `<@${itemResult.owner}>`,
                    inline: true
                }, {
                    name: "House Name:",
                    value: itemResult.name,
                    inline: true
                }, {
                    name: "House Value:",
                    value: itemResult.worth + " BBC",
                    inline: true
                }, {
                    name: "House Type:",
                    value: itemResult.type,
                    inline: true
                }, {
                    name: "Family",
                    value: "Coming Soon",
                    inline: true
                })
                message.channel.send(embedForItems)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}