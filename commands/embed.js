module.exports = {
    name: 'embed',
    description: 'Gives the user a embed',
    execute(client, message, args, Discord) {
        if(!message.member.roles.cache.has('804324183122903092')) {
            message.channel.send('Sorry, you cant use that command')
        } else {
            message.delete()
            const content = message.content.replace(`%embed ${args[0]}`, ``)
            const embedForEmbed = new Discord.MessageEmbed()
            .setTitle(args[0])
            .setDescription(content)
            .setColor('BLACK')
            message.channel.send(embedForEmbed)
        }
    }
}