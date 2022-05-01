module.exports = {
    commands: ['avatar', 'av'],
    expectedArgs: '(user)',
    callback: (message, args, Discord) => {
        const user = message.mentions.members.first() || message.member
        const embedForAv1 = new Discord.MessageEmbed()
            .setTitle(user.displayName)
            .setImage(user.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTimestamp()
            .setColor('#050200')
        message.channel.send(embedForAv1)
    }
}