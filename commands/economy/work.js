const mongo = require('../../mongo')
const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')
let coolDownNormal = new Set()
let cdNSecs = 300
let coolDownBooster = new Set()
let cdBSecs = 60

const workAmounts = [501, 326, 424, 291, 104, 666, 438]
const workJobs = ["You cleaned the floors and made",
    "You delived 9000 pizzas and made",
    "You made 8734 dollars counterfreight cash witch eaquls to",
    "You were higherd for somones stripper birthday party and made",
    "Your hitman skills were higherd and you made",
    "You changed the HDMI channel on your grandmas tv and made"]

module.exports = {
    commands: ['work'],
    callback: async (message, args, Discord, client) => {
        const user = message.mentions.members.first() || message.member
        await mongo().then(async (mongoose) => {
            try {
                const userResult = await userSchema.findOne({ _id: user.user })
                const randomAmt = Math.floor(Math.random() * (workAmounts.length))
                const randomJobs = Math.floor(Math.random() * (workJobs.length))
                if (message.member.roles.cache.has('808120014690844713')) {
                    if (coolDownBooster.has(message.author.id)) {
                        return message.channel.send("Please wait 1 more minute")
                    } else {

                        //templates

                        const embedForWorkCmd = new Discord.MessageEmbed()
                            .setAuthor(message.member.displayName, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setTitle(`AMOUNT HERE`)
                            .setColor("BLACK")

                        //database
                        if (!userResult || !userResult.money) {
                            const amount = parseFloat("1000") + workAmounts[randomAmt]
                            await userSchema.findOneAndUpdate({
                                _id: user.user
                            }, {
                                money: amount
                            }, {
                                upsert: true
                            })
                            embedForWorkCmd.setTitle(`You made ${workAmounts[randomAmt]} BBC`)
                            embedForWorkCmd.setDescription(`${workJobs[randomJobs]} **${workAmounts[randomAmt]} BBC**`)
                            return message.channel.send(embedForWorkCmd)
                        }

                        if (parseFloat(userResult.money) < parseFloat("1000")) {
                            return message.channel.send("You must have at least 1000 BBC to get a job")
                        }

                        const amountForNormal = parseFloat(userResult.money) + workAmounts[randomAmt]

                        await userSchema.findOneAndUpdate({
                            _id: user.user
                        }, {
                            money: amountForNormal
                        }, {
                            upsert: true
                        })

                        embedForWorkCmd.setTitle(`You made ${workAmounts[randomAmt]} BBC`)
                        embedForWorkCmd.setDescription(`${workJobs[randomJobs]} **${workAmounts[randomAmt]} BBC**`)
                        message.channel.send(embedForWorkCmd)

                        //cooldown
                        coolDownBooster.add(message.author.id)
                        setTimeout(() => {
                            coolDownBooster.delete(message.author.id)
                        }, cdBSecs * 1000)
                    }
                } else {
                    if (coolDownNormal.has(message.author.id)) {
                        return message.channel.send("Please wait 5 more minutes")
                    } else {
                        const userResult = await userSchema.findOne({ _id: user.user })

                        //templates

                        const embedForWorkCmd = new Discord.MessageEmbed()
                            .setAuthor(message.member.displayName, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setTitle(`AMOUNT HERE`)
                            .setColor("BLACK")

                        //database
                        if (!userResult || !userResult.money) {
                            const amount = parseFloat("1000") + workAmounts[randomAmt]
                            await userSchema.findOneAndUpdate({
                                _id: user.user
                            }, {
                                money: amount
                            }, {
                                upsert: true
                            })
                            embedForWorkCmd.setTitle(`You made ${workAmounts[randomAmt]} BBC`)
                            embedForWorkCmd.setDescription(`${workJobs[randomJobs]} **${workAmounts[randomAmt]} BBC**`)
                            return message.channel.send(embedForWorkCmd)
                        }

                        if (parseFloat(userResult.money) < parseFloat("1000")) {
                            return message.channel.send("You must have at least 1000 BBC to get a job")
                        }

                        const amountForNormal = parseFloat(userResult.money) + workAmounts[randomAmt]

                        await userSchema.findOneAndUpdate({
                            _id: user.user
                        }, {
                            money: amountForNormal
                        }, {
                            upsert: true
                        })

                        embedForWorkCmd.setTitle(`You made ${workAmounts[randomAmt]} BBC`)
                        embedForWorkCmd.setDescription(`${workJobs[randomJobs]} **${workAmounts[randomAmt]} BBC**`)
                        message.channel.send(embedForWorkCmd)

                        //cooldown
                        coolDownNormal.add(message.author.id)
                        setTimeout(() => {
                            coolDownNormal.delete(message.author.id)
                        }, cdNSecs * 1000)
                    }
                }
            } finally {
                mongoose.connection.close()

            }
        })
    }
}