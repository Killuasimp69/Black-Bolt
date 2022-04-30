const { prefix } = require('../../config.json')

module.exports = {
    commands: ['level'],
    expectedArgs: '<num1>',
    callback: (message, args, Discord) => {
        message.channel.send(`You can find your level with the \`\`${prefix}userinfo\`\` command.`)
    }
}