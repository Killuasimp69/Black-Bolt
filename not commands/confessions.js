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

                let serverConfessions

                if (!serverResult || !serverResult.confessions) {
                    serverConfessions = "1"
                } else {
                    serverConfessions = parseFloat(serverConfessions) + 1
                }

                await ServersSchema.findOneAndUpdate(
                    {
                        _id: "804323987106168842",
                    },
                    {
                        confessions: serverConfessions,
                    },
                    {
                        upsert: true,
                    }
                );

                const embedForConfessions = new Discord.MessageEmbed()
                .setTitle(`Confession ${serverConfessions}`)
                .setColor("RED")
                .setDescription(message.content)
                .setTimestamp()

                channel.send(embedForConfessions)

                return message.channel.send("Your confession has been sent to the <#897945427687636993> channel.")
                    .then((m) => {
                        setTimeout(() => {
                            m.delete()
                        }, 5000);
                    })

            } finally {
                mongoose.connection.close()
            }
        })
    })
}

