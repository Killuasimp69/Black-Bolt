const mongo = require('../../../mongo')
const userSchema = require('../../../schemas/userSchema')
let cdSecs = 60
let cooldown = new Set()
const stealAmounts = [4000, 847, 999, 1352, 3957, 2102, 459, 792, 578, 194]

module.exports = {
    commands: ['steal'],
    expectedArgs: '(user)',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, args, Discord, client) => {
        if(message.guild === null) {
            return
        }
        if (message.guild.id != '804323987106168842') {
            return message.channel.send("Sorry but this command only works in Meme Arcade")
        } else {
            const user = message.member.user
            if (!message.member.roles.cache.has('970499864297353236')) {
                return message.channel.send("Sorry but your not level 2.")
            } else {
                if (!message.mentions.members.first()) {
                    return message.channel.send("Sorry but you need to specify someone to steal from")
                }

                await mongo().then(async (mongoose) => {
                    try {

                        //money randomizers

                        const randomStealAmounts = Math.floor(Math.random() * (stealAmounts.length))
                        const stealReasons = [`You hacked into ${args[0]}'s bank and stole ${stealAmounts[randomStealAmounts]} BBC`, `You broke into ${args[0]}'s strip club and stole ${stealAmounts[randomStealAmounts]} BBC`, `You caught ${args[0]} having naughty time and they gave you ${stealAmounts[randomStealAmounts]} BBC to keep quiet`, `You banned ${args[0]} from your Discord server, they payed you ${stealAmounts[randomStealAmounts]} BBC to let them back in`]
                        const randomStealReasons = Math.floor(Math.random() * (stealReasons.length))

                        const userResult = await userSchema.findOne({ _id: user })
                        const targetResult = await userSchema.findOne({ _id: message.mentions.members.first().user })

                        if (message.author.id == message.mentions.members.first().id) {
                            return message.channel.send("You cannot steal from yourself")
                        }

                        //template

                        const embedForSteal = new Discord.MessageEmbed()
                            .setAuthor(message.member.displayName, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setTitle("Steal")
                            .setDescription(stealReasons[randomStealReasons])
                            .setFooter(`Booster only command`)
                            .setColor("BLACK")

                        //database / messages

                        if (cooldown.has(message.author.id)) {
                            return message.channel.send('You must wait 1 minute inbetween stealing')
                        } else {

                            if (!targetResult || !targetResult.money) {
                                //no target result
                                if (!userResult || !userResult.money) {
                                    //no user result
                                    if (parseFloat("1000") < parseFloat(stealAmounts[randomStealAmounts])) {
                                        //target does not have enough money
                                        const allMoney = parseFloat("1000")
                                        const stealerNewMoney = parseFloat("1000") + parseFloat(allMoney)

                                        await userSchema.findOneAndUpdate({
                                            _id: message.mentions.members.first().user
                                        }, {
                                            money: '0'
                                        }, {
                                            upsert: true
                                        })

                                        await userSchema.findOneAndUpdate({
                                            _id: user
                                        }, {
                                            money: stealerNewMoney
                                        }, {
                                            upsert: true
                                        })

                                        embedForSteal.setDescription(`You hacked into ${args[0]}'s bank and stole ${allMoney} BBC`)
                                        cooldown.add(message.author.id)
                                        setTimeout(() => {
                                            cooldown.delete(message.author.id)
                                        }, cdSecs * 1000)
                                        return message.channel.send(embedForSteal)

                                    } else {
                                        // no target result
                                        //no user result
                                        //target has enough money

                                        const newTargetMoney = parseFloat("1000") - parseFloat(stealAmounts[randomStealAmounts])
                                        const StealerNewMoney = parseFloat("1000") + parseFloat(stealAmounts[randomStealAmounts])

                                        await userSchema.findOneAndUpdate({
                                            _id: message.mentions.members.first().user
                                        }, {
                                            money: newTargetMoney
                                        }, {
                                            upsert: true
                                        })

                                        await userSchema.findOneAndUpdate({
                                            _id: user
                                        }, {
                                            money: StealerNewMoney
                                        }, {
                                            upsert: true
                                        })

                                        cooldown.add(message.author.id)
                                        setTimeout(() => {
                                            cooldown.delete(message.author.id)
                                        }, cdSecs * 1000)
                                        return message.channel.send(embedForSteal)
                                    }
                                } else {
                                    //no target result
                                    //yes user result
                                    if (parseFloat("1000") < parseFloat(stealAmounts[randomStealAmounts])) {
                                        //target does not have enough money

                                        const allMoney = parseFloat("1000")
                                        const stealerNewMoney = parseFloat(userResult.money) + parseFloat(allMoney)

                                        await userSchema.findOneAndUpdate({
                                            _id: message.mentions.members.first().user
                                        }, {
                                            money: '0'
                                        }, {
                                            upsert: true
                                        })

                                        await userSchema.findOneAndUpdate({
                                            _id: user
                                        }, {
                                            money: stealerNewMoney
                                        }, {
                                            upsert: true
                                        })

                                        embedForSteal.setDescription(`You hacked into ${args[0]}'s bank and stole ${allMoney} BBC`)
                                        cooldown.add(message.author.id)
                                        setTimeout(() => {
                                            cooldown.delete(message.author.id)
                                        }, cdSecs * 1000)
                                        return message.channel.send(embedForSteal)

                                    } else {
                                        //no target result
                                        //yes user result
                                        //target has enough money

                                        const newUserMoney = parseFloat("1000") - parseFloat(stealAmounts[randomStealAmounts])
                                        const StealerNewMoney = parseFloat(userResult.money) + parseFloat(stealAmounts[randomStealAmounts])
                                        await userSchema.findOneAndUpdate({
                                            _id: message.mentions.members.first().user
                                        }, {
                                            money: newUserMoney
                                        }, {
                                            upsert: true
                                        })
                                        await userSchema.findOneAndUpdate({
                                            _id: user
                                        }, {
                                            money: StealerNewMoney
                                        }, {
                                            upsert: true
                                        })

                                        cooldown.add(message.author.id)
                                        setTimeout(() => {
                                            cooldown.delete(message.author.id)
                                        }, cdSecs * 1000)
                                        return message.channel.send(embedForSteal)
                                    }
                                }
                            } else {
                                //yes target result
                                if (!userResult || !userResult.money) {
                                    //no user result
                                    if (parseFloat(targetResult.money) < stealAmounts[randomStealAmounts]) {
                                        //target does not have enough money
                                        const newUserNewMoney = parseFloat("1000") + parseFloat(targetResult.money)
                                        const TargetNewMoney = parseFloat("0")

                                        await userSchema.findOneAndUpdate({
                                            _id: message.mentions.members.first().user
                                        }, {
                                            money: TargetNewMoney
                                        }, {
                                            upsert: true
                                        })

                                        await userSchema.findOneAndUpdate({
                                            _id: user
                                        }, {
                                            money: newUserNewMoney
                                        }, {
                                            upsert: true
                                        })

                                        embedForSteal.setDescription(`You hacked into ${args[0]}'s bank and stole ${targetResult.money} BBC`)
                                        cooldown.add(message.author.id)
                                        setTimeout(() => {
                                            cooldown.delete(message.author.id)
                                        }, cdSecs * 1000)
                                        return message.channel.send(embedForSteal)
                                    } else {
                                        //yes target result
                                        //no user result
                                        //target has enough money 
                                        const newUserNewMoney = parseFloat("1000") + parseFloat(stealAmounts[randomStealAmounts])
                                        const targetNewMoney = parseFloat(targetResult.money) - parseFloat(stealAmounts[randomStealAmounts])

                                        await userSchema.findOneAndUpdate({
                                            _id: message.mentions.members.first().user
                                        }, {
                                            money: targetNewMoney
                                        }, {
                                            upsert: true
                                        })

                                        await userSchema.findOneAndUpdate({
                                            _id: user
                                        }, {
                                            money: newUserNewMoney
                                        }, {
                                            upsert: true
                                        })

                                        cooldown.add(message.author.id)
                                        setTimeout(() => {
                                            cooldown.delete(message.author.id)
                                        }, cdSecs * 1000)
                                        return message.channel.send(embedForSteal)
                                    }
                                } else {
                                    //yes target result
                                    //yes user result
                                    if (parseFloat(targetResult.money) < stealAmounts[randomStealAmounts]) {
                                        //target does not have eough money
                                        const userNewMoney = parseFloat(userResult.money) + parseFloat(targetResult.money)
                                        const targetNewMoney = parseFloat("0")

                                        await userSchema.findOneAndUpdate({
                                            _id: message.mentions.members.first().user
                                        }, {
                                            money: targetNewMoney
                                        }, {
                                            upsert: true
                                        })

                                        await userSchema.findOneAndUpdate({
                                            _id: user
                                        }, {
                                            money: userNewMoney
                                        }, {
                                            upsert: true
                                        })

                                        embedForSteal.setDescription(`You hacked into ${args[0]}'s bank and stole ${targetResult.money} BBC`)
                                        cooldown.add(message.author.id)
                                        setTimeout(() => {
                                            cooldown.delete(message.author.id)
                                        }, cdSecs * 1000)
                                        return message.channel.send(embedForSteal)
                                    } else {
                                        //yes target result
                                        //yes user result
                                        //target has enough money
                                        const targetNewMoney = parseFloat(targetResult.money) - parseFloat(stealAmounts[randomStealAmounts])
                                        const userNewMoney = parseFloat(userResult.money) + parseFloat(stealAmounts[randomStealAmounts])

                                        await userSchema.findOneAndUpdate({
                                            _id: message.mentions.members.first().user
                                        }, {
                                            money: targetNewMoney
                                        }, {
                                            upsert: true
                                        })

                                        await userSchema.findOneAndUpdate({
                                            _id: user
                                        }, {
                                            money: userNewMoney
                                        }, {
                                            upsert: true
                                        })

                                        cooldown.add(message.author.id)
                                        setTimeout(() => {
                                            cooldown.delete(message.author.id)
                                        }, cdSecs * 1000)
                                        return message.channel.send(embedForSteal)
                                    }
                                }
                            }
                        }

                    } finally {
                        mongoose.connection.close() 
                    }
                })
            }
        }
    }
} 
