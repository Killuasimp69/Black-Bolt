const { prefix } = require('../../config.json')
const mongo = require('../../mongo')
const warnSchema = require('../../schemas/warnSchema')
const confessionSchema = require("../../schemas/confessionsSchema")

module.exports = {
    commands: ['fetch'],
    expectedArgs: '(id)',
    minArgs: 1,
    callback: async (message, args, Discord, client) => {
        await mongo().then(async (mongoose) => {
            try {
                const id = args[0]
                const user = message.member.user
                if (args[0] <= 100000) {

                    //confessions
                    const fetch = await confessionSchema.findOne({ _id: id })
                    if(!fetch || !fetch.Confession) {
                        return message.channel.send("I cant find that confession")
                    }
                    const embedForFetch = new Discord.MessageEmbed()
                    .addFields({
                        name: "Number",
                        value: fetch._id
                    }, {
                        name: "Author",
                        value: fetch.Author
                    },{
                        name: "Confession",
                        value: fetch.Confession
                    })
                    .setColor("BLACK")
                    message.channel.send(embedForFetch)
                } else {

                    //warns
                    const fetch = await warnSchema.findOne({ _id: id })
                    if(!fetch || !fetch.mod) {
                        return message.channel.send("I cant find that warning")
                    }
                    const embedForFetch = new Discord.MessageEmbed()
                        .addFields(
                            {
                                name: "ID",
                                value: id
                            }, {
                            name: "Moderator",
                            value: fetch.mod
                        }, {
                            name: "Warned User",
                            value: fetch.warneduser
                        }, {
                            name: "Warning",
                            value: fetch.warning
                        }, {
                            name: "Time",
                            value: fetch.time
                        })
                        .setColor("BLACK")
                    message.channel.send(embedForFetch)

                }
            } finally {
                mongoose.connection.close()
            }
        })
    }
}