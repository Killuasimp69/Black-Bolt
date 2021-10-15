const { prefix } = require("../../config.json")

module.exports = {
    commands: ['ban'],
    expectedArgs: '(user) (reason)',
    permissionError: "You do not have the required permissions to execute this command",
    minArgs: 1,
    permissions: ['BAN_MEMBERS'],
    callback: (message, args, Discord, client) => {
        if (!message.member.hasPermission(`BAN_MEMBERS`)) {
            message.channel.send('Sorry, you cant use that')
        } else {
            if (!message.mentions.members.first()) {
                message.channel.send('Sorry i cant find that user')
            } else {
                const reason = message.content.replace(`${prefix}ban ${args[0]} `, ``)
                const logreason = `${message.author.tag}. Reason: ${reason}`
                const memeberToBan = message.mentions.members.first()
                const user = message.mentions.members.first().user
                if (memeberToBan.bannable) {
                    //message channel template

                    const embedForBanUser = new Discord.MessageEmbed()
                        .setAuthor(`${memeberToBan.displayName} was banned`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setDescription(`${reason}`)
                        .setColor('BLACK')

                    //message user

                    const embedForMessageUser = new Discord.MessageEmbed()
                        .setTitle(`You were Banned`)
                        .setDescription(`Reason:`, `${reason}`)
                        .setTimestamp()

                    //ban member
                    if (reason == `${prefix}ban ${args[0]} ` || reason == `${prefix}ban ${args[0]}`) {
                        embedForBanUser.setDescription("Reason not provided")
                        embedForMessageUser.setDescription(`Reason:`, `Not Provided`)
                        memeberToBan.ban({ reason: `${message.author.tag}. Reason: Not Provided` })
                    } else {
                        memeberToBan.ban({ reason: logreason })
                    }

                    //messages
                    message.channel.send(embedForBanUser)

                    memeberToBan.send(embedForMessageUser)
                        .catch((err) => {
                            embedForBanUser.setFooter("Could not message user")
                        })

                } else {
                    message.channel.send('Sorry, i cant ban them')
                }
            }
        }
    }
}