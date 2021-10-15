module.exports = {
    commands: ['avatar', 'av'],
    expectedArgs: '<num1>',
    callback: (message, args, Discord) => {
        if (message.mentions.members.first()) {
            const membertocheck = message.mentions.users.first()
            const embedForAv1 = new Discord.MessageEmbed()
                .setTitle(membertocheck.displayName)
                .setImage(membertocheck.displayAvatarURL({ size: 1024, dynamic: true }))
                .setTimestamp()
                .setColor('#050200')
            message.channel.send(embedForAv1)
        } else {
            const embedForAv = new Discord.MessageEmbed()
                .setTitle(message.member.displayName)
                .setImage(message.author.displayAvatarURL({ size: 1024, dynamic: true }))
                .setTimestamp()
                .setColor('#050200')
            message.channel.send(embedForAv)
        }
    }
}