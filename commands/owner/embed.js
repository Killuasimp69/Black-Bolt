const { prefix } = require('../../config.json')

module.exports = {
    commands: ['embed'],
    expectedArgs: '(words)',
    minArgs: 2,
    callback: (message, args, Discord, client) => {
        if (!message.member.roles.cache.has('813609842773852160')) {
            message.channel.send('Sorry, you cant use that command')
        } else {
            if (args[0].toLowerCase() == "blue" || args[0].toLowerCase() == "red") {
                message.delete()
                const content = message.content.replace(`${prefix}embed ${args[0]}`, ``)
                const embedForEmbed = new Discord.MessageEmbed()
                    .setTitle(args[0])
                    .setDescription(content)
                    .setColor(args[0].toUpperCase())
                message.channel.send(embedForEmbed)
            } else {
                message.delete()
                const content = message.content.replace(`${prefix}embed ${args[0]}`, ``)
                const embedForEmbed = new Discord.MessageEmbed()
                    .setTitle(args[0])
                    .setDescription(content)
                    .setColor('BLACK')
                message.channel.send(embedForEmbed)
            }
        }
    }
}