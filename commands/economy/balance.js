const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['balance', 'bal'],
    expectedArgs: '',
    economyCheck: "true",
    callback: async (message, args, Discord, client, mongo) => {
        if(message.guild === null) {
            return
        }
        const user = message.mentions.members.first() || message.member
        await mongo().then(async (mongoose) => {
            try {

                const userResult = await userSchema.findOne({ _id: user.user })

                //newuser
                if (userResult) { } else {
                    await userSchema.findOneAndUpdate({
                        _id: user.user
                    }, {
                        money: '1000'
                    }, {
                        upsert: true
                    })
                    const embedForBalance = new Discord.MessageEmbed()
                        .setAuthor(`${user.displayName} | Balance`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setDescription(`You have **1000 BBC**, with a total of **1000**.`)
                        .setColor('BLACK')
                    return message.channel.send(embedForBalance)
                }

                if (!userResult.money) {
                    await userSchema.findOneAndUpdate({
                        _id: user.user
                    }, {
                        money: '1000'
                    }, {
                        upsert: true
                    })
                    const embedForBalance = new Discord.MessageEmbed()
                        .setAuthor(`${user.displayName} | Balance`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setDescription(`You have **1000 BBC**, with a total of **1000**.`)
                        .setColor('BLACK')
                    return message.channel.send(embedForBalance)
                }

                const moneyy = parseFloat(userResult.money)

                const embedForBalance = new Discord.MessageEmbed()
                    .setAuthor(`${user.displayName} | Balance`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setDescription(`You have **${moneyy} BBC**, with a total of **${moneyy}**.`)
                    .setColor('BLACK')

                //message
                message.channel.send(embedForBalance)
            } finally {
                mongoose.connection.close()

            }
        })
    }
}