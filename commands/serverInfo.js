const discord = require('discord.js')
module.exports = {
    name: 'serverinfo',
    description: 'Gives info on the server',
    execute(client, message, args, Discord) {
        const user = message.member.user
        const embedForServerInfo = new discord.MessageEmbed()
        .setAuthor('Sever Info', user.displayAvatarURL({ format: 'jpg', dynamic : true }))
        .addField(`Made:`, `${new Date(message.guild.createdTimestamp).toLocaleDateString()}`)
        .addField(`Members:`, `${message.guild.memberCount}`)
        message.channel.send(embedForServerInfo)
    }
}