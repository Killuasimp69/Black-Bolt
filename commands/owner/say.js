const { prefix } = require('../../config.json')

module.exports = {
    commands: ['say', 'speak'],
    expectedArgs: '(words)',
    minArgs: 1,
    callback: (message, args, Discord, client) => {
        if(message.author.id != "555991737072615424") {
            return message.channel.send('Only gods can use this command')
        } else {
            message.delete()
            const content = message.content.replace(`${prefix}say `, ``)
            message.channel.send(content)
        }
    }
}