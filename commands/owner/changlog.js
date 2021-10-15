const { prefix } = require('../../config.json')

module.exports = {
    commands: ['changelog'],
    expectedArgs: '(server/bot) (title) (words)',
    minArgs: 2,
    callback: (message, args, Discord, client) => {
        if(args[0] != "server" && args[0] != "bot") {
            return message.content.send("Is this for the server or bot")
        }
        if(args[0] == 'server'){
            const desc = message.content.replace(`${prefix}changelog ${args[0]} ${args[1]}`, ``)
            const EmbedForServer = new Discord.MessageEmbed()
            .setTitle(args[1])
            .setDescription(desc)
            .setColor("BLUE")
            message.channel.send(EmbedForServer)
        } else{
            const desc = message.content.replace(`${prefix}changelog ${args[0]} ${args[1]}`, ``)
            const EmbedForServer = new Discord.MessageEmbed()
            .setTitle(args[1])
            .setDescription(desc)
            .setColor("BLACK")
            message.channel.send(EmbedForServer)
        }
    }
}