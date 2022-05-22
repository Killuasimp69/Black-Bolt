const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')
const mongo = require("../../mongo")

module.exports = {
    commands: ['give', 'transfer'],
    expectedArgs: '(user) (amount)',
    minArgs: 2,
    maxArgs: 2,
    economyCheck: "true",
    callback: async (message, args, Discord, client) => {
        if (message.guild === null) {
            console.log("returning")
            return
        }
        if (!message.mentions.members.first()) return message.channel.send('Please say who you would like to send money too')

        if (args[1].startsWith("<@")) return message.channel.send("Please @ the user first")

        if (isNaN(args[1])) return message.channel.send("Please specify a number not a letter")

        if (args[1] < 6) return message.channel.send("The amount has to be higher than 5 BBC")

        if (args[1].startsWith("0")) {
            return message.channel.send("You cannot transfur that amount.")
        }

        if (message.author.id == message.mentions.members.first().id) {
            return message.channel.send("You cannot give money to yourself.")
        }

        const user = message.mentions.members.first()
        await mongo().then(async (mongoose) => {
            try {

                const userResult = await userSchema.findOne({ _id: user.user })
                const senderResult = await userSchema.findOne({ _id: message.member.user })

                if (parseFloat(senderResult.money) == parseFloat[args[1]]) {
                    return message.channel.send("You cannot give all your money to somone.")
                }

                //newuser
                if (!userResult || !userResult.money || !senderResult || !senderResult.money) {
                    if (!userResult || !userResult.money) {
                        const newuserMoney1 = parseFloat("1000") + parseFloat(args[1])
                        await userSchema.findOneAndUpdate({
                            _id: user.user
                        }, {
                            money: newuserMoney1
                        }, {
                            upsert: true
                        })
                    }

                    if (!senderResult || !senderResult.money) {
                        if (parseFloat(args[1]) >= 1000) {
                            return message.channel.send("You dont have enough money.")
                        }
                        const newuserMoney = parseFloat("1000") - parseFloat(args[1])
                        await userSchema.findOneAndUpdate({
                            _id: message.member.user
                        }, {
                            money: newuserMoney
                        }, {
                            upsert: true
                        })
                    }
                    const newuserMoney1 = parseFloat("1000") + parseFloat(args[1])
                    return message.channel.send(`You gave ${args[1]} BBC to ${args[0]}. They now have ${newuserMoney1} BBC`)
                }

                if (parseFloat(senderResult.money) == parseFloat[args]) {
                    return message.channel.send("You cannot give all your money to someone.")

                }

                if (senderResult.money < parseFloat(args[1])) return message.channel.send('You dont have enough BBC')

                //original user
                const money = parseFloat(userResult.money) + parseFloat(args[1])
                const senderMoney = parseFloat(senderResult.money) - parseFloat(args[1])
                await userSchema.findOneAndUpdate({
                    _id: user.user
                }, {
                    money: money
                }, {
                    upsert: true
                })

                await userSchema.findOneAndUpdate({
                    _id: message.member.user
                }, {
                    money: senderMoney
                }, {
                    upsert: true
                })

                message.channel.send(`You gave ${args[1]} BBC to ${args[0]}. They now have ${money} BBC`)

            } finally {
                mongoose.connection.close()
            }
        })
    }
}
