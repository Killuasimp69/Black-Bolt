const discord = require('discord.js')
const { version } = require('../package.json')
module.exports = {
    name: 'botinfo',
    description: 'Gives info on the bot',
    execute(client, message, args, Discord, guild, neo) {
        const embedForBotInfo = new discord.MessageEmbed()
        .setAuthor('Bot Info', neo.displayAvatarURL({ format: 'jpg', dynamic : true }))
        .addFields({
            name: "Bot Name:",
            value: "Black Bolt"
        }, {
            name: "Version:",
            value: `${version}`
        }, {
            name: "Script",
            value: "Javascript"
        }, {
            name: "Maker:",
            value: `${neo.tag}`
        })
        .setColor('BLACK')
        message.channel.send(embedForBotInfo)
    }
}