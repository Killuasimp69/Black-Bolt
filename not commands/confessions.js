const Discord = require('discord.js')
const mongo = require('../mongo')
const ServersSchema = require('../schemas/Servers')
const ConfessionSchema = require('../schemas/confessionsSchema')
const { confessions } = require('../config.json')

module.exports = (client) => {

    client.on('message', async message => {
        setTimeout(async () => {
            await mongo().then(async (mongoose) => {
                try {

                    const serverResult = await ServersSchema.findOne({ _id: message.guild.id })

                    if (message.author.id == '783789982300373053' || message.author.id == '804610350128955392') return

                    //checks

                    if (!serverResult || !serverResult.confessHereChannel) {
                        return
                    }

                    if (serverResult.confessHereChannel != `<#${message.channel.id}>`) {
                        return
                    }

                    if (serverResult.confessionsTrueFalse == 'false') {
                        message.delete()
                        return message.channel.send("Sorry but the owner of this server has turned confessions off")
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

                        const channeltofindidfirst = serverResult.confessionChannel.replace(`<#`, ``)
                        const channeltofindidreal = channeltofindidfirst.replace(`>`, ``)
                        const channel = client.channels.cache.find(channel => channel.id === channeltofindidreal)

                        channel.send(embedForConfessions)

                        return message.channel.send(`Thanks, your confession has been sent to the ${serverResult.confessionChannel} channel`)
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

                    const channeltofindidfirst = serverResult.confessionChannel.replace(`<#`, ``)
                    const channeltofindidreal = channeltofindidfirst.replace(`>`, ``)
                    const channel = client.channels.cache.find(channel => channel.id === channeltofindidreal)

                    channel.send(embedForConfessions)

                    message.channel.send(`Thanks, your confession has been sent to the ${serverResult.confessionChannel} channel`)
                        .then((m) => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000);
                        })


                    //confession logging
                    if(message.guild.id == '804323987106168842') {
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
        }, 1000)
    })
}

