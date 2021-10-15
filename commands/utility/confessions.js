const mongo = require('../../mongo')
const serverSchema = require('../../schemas/Servers')
const conSchema = require('../../schemas/Servers')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['confession'],
    expectedArgs: '(confess channel) (confessions channel)',
    callback: async (message, args, Discord, client) => {
        const user = message.member.user

        if(!message.member.hasPermission(`KICK_MEMBERS`)) {
            return message.channel.send("Sorry, you must have \"KICK_MEMBERS\" permissions")
        }

        if (!message.mentions.channels.first()) {
            return message.channel.send("Please specify a channel to set")
        }

        if (!args[0].startsWith("<#")) {
            return message.channel.send("You must specify a confess here channel")
        }

        if (!args[0].startsWith("<#")) {
            return message.channel.send("You must specify a confession channel")
        }

        await mongo().then(async (mongoose) => {
            try {

                const serverResult = await serverSchema.findOne({ _id: message.guild.id })

                //templates

                const embedForConfessions = new Discord.MessageEmbed()
                    .setAuthor(message.member.displayName, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setTitle("Confessions Set")
                    .setDescription(`The confess here channel has been set to **${args[0]}** and the confessions channel has been set to **${args[1]}**`)
                    .setColor("BLACK")

                const embedForConfessHereChannel = new Discord.MessageEmbed()
                    .setTitle("Confession Information")
                    .setDescription(`All confessions are anonymous.
                    Follow the rules below in order to keep it clean.
                    
                    **Confession Rules**
                    ⇝ Do not send random or pointless messages.
                    ⇝ Do not harass others, no matter who it is.
                    ⇝ Keep Discord's ToS in mind while confessing.
                    
                    **Send your deepest and darkest confessions below...**`)
                    .setColor("BLACK")
                    .setThumbnail("https://cdn.discordapp.com/attachments/591808997259214858/608009655251107882/candle.gif")
                    .setFooter("All confessions are anonymous")

                //database

                if (!serverResult || !serverResult.confessHereChannel || !serverResult.confessionChannel) {

                    await serverSchema.findOneAndUpdate({
                        _id: message.guild.id
                    }, {
                        confessHereChannel: args[0]
                    }, {
                        upsert: true
                    })

                    await serverSchema.findOneAndUpdate({
                        _id: message.guild.id
                    }, {
                        confessionChannel: args[1]
                    }, {
                        upsert: true
                    })

                    message.mentions.channels.first().send(embedForConfessHereChannel)
                    return message.channel.send(embedForConfessions)
                }

                await serverSchema.findOneAndUpdate({
                    _id: message.guild.id
                }, {
                    confessHereChannel: args[0]
                }, {
                    upsert: true
                })

                await serverSchema.findOneAndUpdate({
                    _id: message.guild.id
                }, {
                    confessionChannel: args[1]
                }, {
                    upsert: true
                })

                message.mentions.channels.first().send(embedForConfessHereChannel)
                message.channel.send(embedForConfessions)

            } finally {
                mongoose.connection.close()
            }
        })

    }
}