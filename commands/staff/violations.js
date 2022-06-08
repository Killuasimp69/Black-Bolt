const { prefix } = require('../../config.json')
const userSchema = require('../../schemas/userSchema')
const mongo = require('../../mongo')
const warnSchema = require('../../schemas/warnSchema')

module.exports = {
    commands: ['violations', 'warns'],
    expectedArgs: '(user)',
    permissionError: "You do not have the required permissions to execute this command",
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, args, Discord, client) => {
        const user = message.mentions.members.first()

        if(!message.member.roles.cache.has('838596018856919040')) {
            return message.channel.send("You do not have the correct permissions.")
        }

        if (!message.mentions.members.first()) {
            return message.channel.send("Please specify a user to check")
        }

        if (!args[0].startsWith("<@")) {
            return message.channel.send("Please specify a user to check")
        }

        await mongo().then(async (mongoose) => {
            try {
                const userResult = await userSchema.findOne({ _id: user.user })
                const results = await warnSchema.find({ warneduserID : user.id})

                //template

                const embedForWarnCheck = new Discord.MessageEmbed()
                    .setTimestamp()
                    .setColor("BLACK")

                if (!userResult || !userResult.warns || !results) {
                    embedForWarnCheck.setDescription(`This user has **0 warns**`)
                    return message.channel.send(embedForWarnCheck)
                }

                if(results[1]) {
                    embedForWarnCheck.addField("Warning 1", `> **${results[0].warning}** | ${results[0]._id}`)
                    embedForWarnCheck.setAuthor(`${user.displayName} | 1 Warning`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                }
                if(results[2]) {
                    embedForWarnCheck.addField("Warning 2", `> **${results[1].warning}** | ${results[1]._id}`)
                    embedForWarnCheck.setAuthor(`${user.displayName} | 2 Warning`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                } 
                if(results[3]) {
                    embedForWarnCheck.addField("Warning 3", `> **${results[2].warning}** | ${results[2]._id}`)
                    embedForWarnCheck.setAuthor(`${user.displayName} | 3 Warning`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                } 
                if(results[4]) {
                    embedForWarnCheck.addField("Warning 4", `> **${results[3].warning}** | ${results[3]._id}`)
                    embedForWarnCheck.setAuthor(`${user.displayName} | 4 Warning`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                } 
                if(results[5]) {
                    embedForWarnCheck.addField("Warning 5", `> **${results[4].warning}** | ${results[4]._id}`)
                    embedForWarnCheck.setAuthor(`${user.displayName} | 5 Warning`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                }

                message.channel.send(embedForWarnCheck)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}