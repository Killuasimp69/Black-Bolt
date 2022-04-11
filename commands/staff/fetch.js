const { prefix } = require('../../config.json')
const mongo = require('../../mongo')
const warnSchema = require('../../schemas/warnSchema')
const confessionSchema = require("../../schemas/confessionsSchema")

module.exports = {
    commands: ['fetch'],
    expectedArgs: '(confession/warningID/userID) (warnNum [if needed])',
    minArgs: 1,
    callback: async (message, args, Discord, client) => {
        await mongo().then(async (mongoose) => {
            try {
                const id = args[0]
                const user = message.member.user
                if (args[0].startsWith("$")) {

                    //warnsID
                    const fetch = await warnSchema.findOne({ _id: id })
                    if (!fetch || !fetch.mod) {
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
                        }, {
                            name: "Warn Number",
                            value: fetch.warnNum
                        })
                        .setColor("BLACK")
                    message.channel.send(embedForFetch)

                } else if (args[1]) {

                    //warnNum

                    const fetch = await warnSchema.findOne({ warneduserID: args[0] }, { warnNum: args[1] })
                    if (!fetch) {
                        return message.channel.send("I cant find that warning")
                    }
                    const fetchInfo = await warnSchema.findOne({ _id: fetch._id })
                    const embedForFetch = new Discord.MessageEmbed()
                        .addFields(
                            {
                                name: "ID",
                                value: fetch._id
                            }, {
                            name: "Moderator",
                            value: fetchInfo.mod
                        }, {
                            name: "Warned User",
                            value: fetchInfo.warneduser
                        }, {
                            name: "Warning",
                            value: fetchInfo.warning
                        }, {
                            name: "Time",
                            value: fetchInfo.time
                        }, {
                            name: "Warn Number",
                            value: fetch.warnNum
                        })
                        .setColor("BLACK")
                    message.channel.send(embedForFetch)

                } else {
                    //confessions
                    const fetch = await confessionSchema.findOne({ _id: id })
                    if (!fetch || !fetch.Confession) {
                        return message.channel.send("I cant find that confession")
                    }
                    const embedForFetch = new Discord.MessageEmbed()
                        .addFields({
                            name: "Number",
                            value: fetch._id
                        }, {
                            name: "Author",
                            value: fetch.Author
                        }, {
                            name: "Confession",
                            value: fetch.Confession
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