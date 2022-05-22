module.exports = {
    commands: ['ping'],
    expectedArgs: '<num1> <num2>',
    callback: (message, args, Discord, client) => {
        const user = message.member.user
        const embedForPing = new Discord.MessageEmbed()
            .setAuthor(`API Latency (response time)`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
            .setDescription(`API Latency is ${Math.round(client.ws.ping)}ms`)
            .setColor("BLACK")
        message.channel.send(embedForPing)
    }
}