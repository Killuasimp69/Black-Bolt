module.exports = {
    commands: ['version'],
    expectedArgs: '<num1>',
    callback: (message, args, Discord, client) => {
        const { version } = require('../../package.json')
        message.channel.send(`The current version of me is **${version}**`)
    }
}