module.exports = {
    name: 'ping',
    description: 'This is a ping command',
    execute(client, message, args, Discord) {
        const user = message.member.user
        const embedForPing = new Discord.MessageEmbed()
        .setAuthor(`API Latency (ping)`, user.displayAvatarURL({ format: 'jpg', dynamic : true }))
        .setDescription(`API Latency is ${Math.round(client.ws.ping)}ms`)
        message.channel.send(embedForPing)
    }
}