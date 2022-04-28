const { prefix } = require('../../config.json')
const userSchema = require('../../schemas/userSchema')
const mongo = require('../../mongo')

module.exports = {
    commands: ['violations'],
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

                //template

                const embedForWarnCheck = new Discord.MessageEmbed()
                    .setAuthor(`${user.displayName}`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setTimestamp()
                    .setColor("BLACK")

                //database

                if (!userResult) {
                    await userSchema.findOneAndUpdate({
                        _id: user.user
                    }, {
                        warns: "0"
                    }, {
                        upsert: true
                    })

                    embedForWarnCheck.setDescription(`This user has **0 warns**`)
                    return message.channel.send(embedForWarnCheck)
                }

                if (!userResult.warns) {
                    await userSchema.findOneAndUpdate({
                        _id: user.user
                    }, {
                        warns: "0"
                    }, {
                        upsert: true
                    })

                    embedForWarnCheck.setDescription(`This user has **0 warns**`)
                    return message.channel.send(embedForWarnCheck)
                }

                const warns = userResult.warns

                embedForWarnCheck.setDescription(`This user has **${warns} warns**`)
                message.channel.send(embedForWarnCheck)

            } finally {
                mongoose.connection.close()
            }
        })
    }
}