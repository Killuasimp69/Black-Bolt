const { version } = require('../../package.json')

module.exports = {
    commands: 'botinfo',
    expectedArgs: '<num1>',
    callback: (message, args, Discord) => {
        const user = message.member.user

        const embedForBotInfo = new Discord.MessageEmbed()
            .setAuthor('Bot Info', user.displayAvatarURL({ format: 'jpg', dynamic: true }))
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
                value: `<@555991737072615424>`
            })
            .setColor('BLACK') 
        message.channel.send(embedForBotInfo)
    }
}