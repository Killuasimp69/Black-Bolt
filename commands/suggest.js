module.exports = {
    name: 'suggest',
    description: 'Logs a suggestion',
    execute(client, message, args, Discord, guild) {
        if(!args[0]) return message.channel.send('Please add a suggestion')
        const user = message.member.user
        const channelSuggestion = client.channels.cache.find(channel => channel.id === '804597021008592896')
        const suggestion = message.content.replace("%suggest ", "")
        const embedForSuggestion = new Discord.MessageEmbed()
        .setAuthor('New Suggestion', user.displayAvatarURL({ format: 'jpg', dynamic : true }))
        .setDescription('"' + suggestion + '"')
        .setFooter(`Suggestion by ${message.author.username}`)
        .setColor('BLACK')
        channelSuggestion.send(embedForSuggestion)
        message.channel.send(`Great, your suggestion was sent to ${channelSuggestion}`)
    }
}