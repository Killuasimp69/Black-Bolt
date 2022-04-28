const mongo = require('../../mongo')
const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['staffhelp', 'shelp', 'scommands', 'staffcommands'],
    expectedArgs: '',
    callback: async (message, args, Discord, client) => {
        const user = message.member.user
        await mongo().then(async (mongoose) => {
            try {
                if(!message.member.roles.cache.has('838596018856919040')) {
                    return message.channel.send("You do not have the correct permissions.")
                }
                const embedForStaffHelp = new Discord.MessageEmbed()
                .setTitle("Staff Commands")
                .addFields({
                    name: "Moderation Commands",
                    value: `• %warn (user) (reason)
                            • %violations (user)
                            • %fetch (confession/warnID/userID) (warnNum [if needed])`
                }, {
                    name: "Other Commands",
                    value: `• %daily`
                })
                .setColor("BLACK")
                .setImage("https://cdn.discordapp.com/attachments/860400894578786344/898482960926408734/funny_mod_image.png")
                message.channel.send(embedForStaffHelp)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}