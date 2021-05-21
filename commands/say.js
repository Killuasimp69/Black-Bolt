module.exports = {
    name: 'say',
    description: 'Makes the bot say somthing',
    execute(client, message, args, Discord) {
        if(!message.member.roles.cache.has('804642237173727242')) {
            message.channel.send('Sorry, you cant use that')
        } else {
            const content = message.content.replace("%say", "")
            message.channel.send(content)
        }
    }
}