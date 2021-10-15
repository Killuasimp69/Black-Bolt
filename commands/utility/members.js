module.exports = {
    commands: ['members'],
    expectedArgs: '<num1>',
    callback: (message, args, Discord, client) => {
        message.channel.send(`The current member count is **${message.guild.memberCount}**`)
    }
}