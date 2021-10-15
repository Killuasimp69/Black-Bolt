const { prefix } = require('../../config.json')

module.exports = {
    commands: ['kick'],
    expectedArgs: '(member) (reason)',
    permissionError: "You do not have the required permissions to execute this command",
    minArgs: 1,
    permissions: ['KICK_MEMBERS'],
    callback: (message, args, Discord, client) => {
        if (!message.member.hasPermission(`KICK_MEMBERS`)) {
            return
        } else {
            if (!message.mentions.members.first()) {
                message.channel.send('Sorry i cant find that user')
            } else {
                const memeberToKick = message.mentions.members.first()
                if (memeberToKick.kickable) {
                    const reasonn = message.content.replace(`${prefix}kick ${args[0]} `, ``)
                    const LogReason = `${message.author.tag}. Reason: ${reasonn}`
                    const user = message.mentions.members.first().user
                    //message templates

                    const embedForKickUser = new Discord.MessageEmbed()
                        .setAuthor(`${memeberToKick.displayName} was kicked`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setDescription(`${reasonn}`)
                        .setColor('BLACK')

                    const embedForMessageUser = new Discord.MessageEmbed()
                        .setTitle(`You were Kicked`)
                        .setDescription(`Reason:`, `${reasonn}`)
                        .setTimestamp()

                    //kick

                    if (reasonn == `${prefix}kick ${args[0]} ` || reasonn == `${prefix}kick ${args[0]}`) {
                        memeberToKick.kick(`${message.author.tag}. Reason: No Reason Provided`)
                        embedForKickUser.setDescription(`No Reason Provided`)
                        embedForMessageUser.setDescription(`No Reason Provided`)
                    } else {
                        memeberToKick.kick(LogReason)
                    }

                    //message user

                    memeberToKick.send(embedForMessageUser)
                        .catch((err) => {
                            embedForKickUser.setFooter("Could not message user")
                        })
                    //message channel

                    message.channel.send(embedForKickUser)
                } else {
                    return message.channel.send("I cant kick them")
                }

            }
        }
    }
}