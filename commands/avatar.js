module.exports = {
    name: 'avatar',
    description: 'Gets the avatar of the user',
    execute(client, message, args, Discord, guild) {
        if(message.mentions.members.first()) {
            const membertocheck = message.mentions.users.first()
            const embedForAv1 = new Discord.MessageEmbed()
            .setTitle(membertocheck.username)
            .setImage(membertocheck.displayAvatarURL({size: 1024, dynamic : true}))
            .setTimestamp()
            .setColor('#050200')
            message.channel.send(embedForAv1)
        } else {
            const embedForAv = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .setImage(message.author.displayAvatarURL({size: 1024, dynamic : true}))
            .setTimestamp()
            .setColor('#050200')
            message.channel.send(embedForAv)
        }
    }
}