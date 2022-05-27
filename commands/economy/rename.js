const itemSchema = require('../../schemas/ItemSchema')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['rename'],
    expectedArgs: '(NFT) (name) ',
    minArgs: 2,
    maxArgs: 8,
    economyCheck: "true",
    callback: async (message, args, Discord, client, mongo) => {
        await mongo().then(async (mongoose) => {
            try {
                const user = message.member.user
                if(isNaN(args[0])) {
                    return message.channel.send("Please specify a valid NFT ID.")
                }
                if(parseFloat(message.content.length) >= 70) {
                    return message.channel.send("That name is too long")
                }
                const itemResult = await itemSchema.findOne({ _id: args[0] })

                if(!itemResult) {
                    return message.channel.send("That NFT cannot be found")
                }

                if(itemResult.owner != `<@${message.author.id}>`) {
                    return message.channel.send("You do not own that house.")
                }

                const nameToSet = message.content.replace(`${prefix}rename ${args[0]} `, ``)

                await itemSchema.findOneAndUpdate(
                    {
                      _id: args[0],
                    },
                    {
                      name: nameToSet,
                    },
                    {
                      upsert: true,
                    }
                  );

                const EmbedForRename = new Discord.MessageEmbed()
                .setAuthor(`${args[0]} | Renamed`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .addFields({
                    name: "Old Name",
                    value: itemResult.name
                }, {
                    name: "New Name",
                    value: nameToSet
                }, {
                    name: "ID",
                    value: args[0]
                })
                .setColor("BLACK")
                .setThumbnail(itemResult.image)
                message.channel.send(EmbedForRename)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}