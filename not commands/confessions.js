const Discord = require('discord.js')
const mongo = require('../mongo')
const ServersSchema = require('../schemas/Servers')
const ConfessionSchema = require('../schemas/confessionsSchema')
const { prefix } = require("../config.json")

module.exports = (client) => {
    client.on('message', async message => {
        if (message.channel.id != "853386908376629309") return
        await mongo().then(async (mongoose) => {
            try {

                const channel = client.channels.cache.find(channel => channel.id === "897945427687636993")
                const serverResult = await ServersSchema.findOne({ _id: message.guild.id })

                //checks

                if (message.author.id == '783789982300373053' || message.author.id == '804610350128955392') return
                

                if (message.content.length >= 1023) {
                    message.delete()
                    return message.channel.send("Thats to many words.")
                        .then((m) => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000);
                        })
                }

                //templates

                if (!serverResult.confessions) {
                    await ServersSchema.findOneAndUpdate({
                        _id: message.guild.id
                    }, {
                        confessions: '1'
                    }, {
                        upsert: true
                    })

                    //templates
                    message.delete()

                    const embedForConfessions = new Discord.MessageEmbed()
                        .setTitle(`Confession 1`)
                        .setDescription(`${message.content}`)
                        .setColor('#c90404')
                        .setTimestamp()

                    channel.send(embedForConfessions)

                    return message.channel.send(`Thanks, your confession has been sent to the <#897945427687636993> channel`)
                        .then((m) => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000);
                        })


                }

                //database

                const newConfessionAmount = parseFloat(serverResult.confessions) + parseFloat("1")
                await ServersSchema.findOneAndUpdate({
                    _id: message.guild.id
                }, {
                    confessions: newConfessionAmount
                }, {
                    upsert: true
                })

                const embedForConfessions = new Discord.MessageEmbed()
                    .setTitle(`Confession ${newConfessionAmount}`)
                    .setDescription(`${message.content}`)
                    .setColor('#c90404')
                    .setTimestamp()

                message.delete()

                channel.send(embedForConfessions)

                message.channel.send(`Thanks, your confession has been sent to the <#897945427687636993> channel`)
                    .then((m) => {
                        setTimeout(() => {
                            m.delete()
                        }, 5000);
                    })


                //confession logging
                if (message.guild.id == '804323987106168842') {
                    await ConfessionSchema.findOneAndUpdate({
                        _id: newConfessionAmount
                    }, {
                        Author: message.author.tag
                    }, {
                        upsert: true
                    })
                    await ConfessionSchema.findOneAndUpdate({
                        _id: newConfessionAmount
                    }, {
                        Confession: message.content
                    }, {
                        upsert: true
                    })
                }

            } finally {
                mongoose.connection.close()
            }
        })
    }, 1600)
}

