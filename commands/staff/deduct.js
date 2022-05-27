const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['deduct', 'remove'],
    expectedArgs: '(amount) (member)',
    minArgs: 2,
    maxArgs: 2,
    callback: async (message, args, Discord, client, mongo) => {
        const user = message.mentions.members.first()
        await mongo().then(async (mongoose) => {
            try {
                if (!message.member.roles.cache.has('838679476774371408')) {
                    return message.channel.send("You cannot use that")
                }

                if (!message.mentions.members.first()) {
                    return message.channel.send("You must select someone to add.")
                }

                if (isNaN(args[0])) {
                    return message.channel.send("Please specify a number")
                }

                const userResult = await userSchema.findOne({ _id: user.user })

                if (!userResult || !userResult.money) {
                    await userSchema.findOneAndUpdate({
                        _id: user.user
                    }, {
                        money: "0"
                    }, {
                        upsert: true
                    })
                    const embedForDeduct = new Discord.MessageEmbed()
                        .setAuthor(`${user.displayName} | Deduct`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setDescription("That user did not exist in the database so I set there money to \"0\"")
                        .setColor("BLACK")
                    return message.channel.send(embedForDeduct)
                }

                await userSchema.findOneAndUpdate({
                    _id: user.user
                }, {
                    money: parseFloat(userResult.money) - parseFloat(args[0])
                }, {
                    upsert: true
                })
                const embedForDeduct = new Discord.MessageEmbed()
                    .setAuthor(`${user.displayName} | Deduct`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .addFields({
                        name: "Amount Removed",
                        value: args[0]
                    }, {
                        name: "New Amount",
                        value: parseFloat(userResult.money) - parseFloat(args[0])
                    }, {
                        name : "User Removed From",
                        value: user.displayName
                    })
                    .setColor("BLACK")
                return message.channel.send(embedForDeduct)

            } finally {
                mongoose.connection.close()

            }
        })
    }
}
