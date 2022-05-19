const shareSchema = require('../../schemas/shareSchema')

module.exports = {
    commands: ['shares'],
    minArgs: 0,
    maxArgs: 0,
    permissions: [],
    requiredRoles: [],
    callback: async (message, args, Discord, client, mongo) => {
        await mongo().then(async (mongoose) => {
            try {
                const shareResult = await shareSchema.findOne({ _id: 'default' })
                if (!shareResult) {
                    await shareSchema.findOneAndUpdate({
                        _id: "default"
                    }, {
                        price: 100000
                    }, {
                        upsert: true
                    })
                    await shareSchema.findOneAndUpdate({
                        _id: "default"
                    }, {
                        yesterdayshare: 100000
                    }, {
                        upsert: true
                    })
                }
                console.log(shareResult)
                let upOrDown
                let amount
                if (shareResult.yesterdayshare >= shareResult.price) {
                    upOrDown = "down"
                    amount = (shareResult.yesterdayshare / shareResult.price) * 100
                }

                if (shareResult.yesterdayshare <= shareResult.price) {
                    upOrDown = "up"
                    amount = (shareResult.price / shareResult.yesterdayshare) * 100
                }

                const user = message.member.user
                const emebdForShares = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName} | Shares`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setColor("BLACK")
                    .setDescription(`The current shares are ${upOrDown} **${amount}%** compared to yesterday.`)
                message.channel.send(emebdForShares)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}