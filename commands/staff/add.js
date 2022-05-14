const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['add'],
    expectedArgs: '(amount) (member)',
    minArgs: 2,
    callback: async (message, args, Discord, client, mongo) => {
        const user = message.mentions.members.first().user
        await mongo().then(async (mongoose) => {
            try {
                if(!message.member.roles.cache.has('838679476774371408')) {
                    return message.channel.send("You cannot use that")
                }

                if(!message.mentions.members.first()){
                    return message.channel.send("You must select someone to add.")
                }

                if(isNaN(args[0])) {
                    return message.content.send("Please specify a number")
                }
                
                if(parseFloat(args[0]) <= 1) {
                    return message.channel.send("You must give more")
                }
                
                const userresult = await userSchema.findOne({ _id: user })

                let newamt = parseFloat(userresult.money) + parseFloat(args[0])

                const embedForAdd = new Discord.MessageEmbed()
                .setAuthor(`${message.mentions.members.first().displayName} | Add`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .setColor("BLACK")
                .addFields({
                    name: "Amount Added",
                    value: args[0]
                }, {
                    name: "New Amount",
                    value: newamt
                }, {
                    name : "User Added Too",
                    value: message.mentions.members.first().displayName
                })
                .setTimestamp()

                if(!userresult) {
                    const newMoney = parseFloat(args[0]) + 1000
                    await userSchema.findOneAndUpdate({
                        _id: user
                    }, {
                        money: newMoney
                    }, {
                        upsert: true
                    })
                } else {
                    await userSchema.findOneAndUpdate({
                        _id: user
                    }, {
                        money: newamt
                    }, {
                        upsert: true
                    })
                }

                message.channel.send(embedForAdd)

            } finally {
                mongoose.connection.close()

            }
        })
    }
}
