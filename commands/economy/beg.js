const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')
let coolDownNormal = new Set()
let cdNSecs = 300
let coolDownBooster = new Set()
let cdBSecs = 60

const RandomBegAmts = [253, 673, 519, 407, 696, 333, 243, 871]

module.exports = {
    commands: ['beg'],
    permissionError: "You need more permissions",
    maxArgs: 0,
    callback: async (message, args, Discord, client, mongo) => {
        const user = message.mentions.members.first() || message.member
        const randomJAmts = Math.floor(Math.random() * (RandomBegAmts.length))
        await mongo().then(async (mongoose) => {
            try {
                const userResult = await userSchema.findOne({ _id: user.user })
                if (message.member.roles.cache.has('808120014690844713')) {
                    if (coolDownBooster.has(message.author.id)) {
                        return message.channel.send("Please wait 1 minute")
                    } else {

                        //templates

                        const embedForBeg = new Discord.MessageEmbed()
                            .setAuthor(message.member.displayName, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setTimestamp()
                            .setColor("BLACK")

                        //database

                        if (!userResult || !userResult.money) {
                            const newuseramt = parseFloat("1000") + parseFloat(RandomBegAmts[randomJAmts])
                            await userSchema.findOneAndUpdate({
                                _id: user.user
                            }, {
                                money: newuseramt
                            }, {
                                upsert: true
                            })

                            embedForBeg.setTitle(`You made ${RandomBegAmts[randomJAmts]}`)
                            embedForBeg.setDescription(`Jesus, fine. Here is ${RandomBegAmts[randomJAmts]} BBC`)
                            return message.channel.send(embedForBeg)
                        }

                        if (parseFloat(userResult.money) >= parseFloat("1000")) {
                            return message.channel.send("You already have enough BBC")
                        }

                        const newmoney = parseFloat(userResult.money) + parseFloat(RandomBegAmts[randomJAmts])

                        await userSchema.findOneAndUpdate({
                            _id: user.user
                        }, {
                            money: newmoney
                        }, {
                            upsert: true
                        })

                        embedForBeg.setTitle(`You made ${RandomBegAmts[randomJAmts]}`)
                        embedForBeg.setDescription(`Jesus, fine. Here is ${RandomBegAmts[randomJAmts]} BBC`)
                        message.channel.send(embedForBeg)

                        coolDownBooster.add(message.author.id)
                        setTimeout(() => {
                            coolDownBooster.delete(message.author.id)
                        }, cdBSecs * 1000)
                    }
                } else {
                    if (coolDownNormal.has(message.author.id)) {
                        return message.channel.send("please wait 5 minutes")
                    } else {

                        //templates

                        const embedForBeg = new Discord.MessageEmbed()
                            .setAuthor(message.member.displayName, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setTimestamp()
                            .setColor("BLACK")

                        //database

                        if (!userResult || !userResult.money) {
                            const newuseramt = parseFloat("1000") + parseFloat(RandomBegAmts[randomJAmts])
                            await userSchema.findOneAndUpdate({
                                _id: user.user
                            }, {
                                money: newuseramt
                            }, {
                                upsert: true
                            })

                            embedForBeg.setTitle(`You made ${RandomBegAmts[randomJAmts]}`)
                            embedForBeg.setDescription(`Jesus, fine. Here is ${RandomBegAmts[randomJAmts]} BBC`)
                            return message.channel.send(embedForBeg)
                        }

                        if (parseFloat(userResult.money) >= parseFloat("1000")) {
                            return message.channel.send("You already have enough BBC")
                        }

                        const newmoney = parseFloat(userResult.money) + parseFloat(RandomBegAmts[randomJAmts])

                        await userSchema.findOneAndUpdate({
                            _id: user.user
                        }, {
                            money: newmoney
                        }, {
                            upsert: true
                        })

                        embedForBeg.setTitle(`You made ${RandomBegAmts[randomJAmts]}`)
                        embedForBeg.setDescription(`Jesus, fine. Here is ${RandomBegAmts[randomJAmts]} BBC`)
                        message.channel.send(embedForBeg)

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