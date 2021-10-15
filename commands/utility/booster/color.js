module.exports = {
    commands: ['color'],
    callback: (message, args, Discord, client) => {
        const user = message.member
        if(message.guild.id != '804323987106168842') {
            return message.channel.send("Sorry but that command only works in Meme Arcade")
        } else {
            if(message.author.id != "555991737072615424" && !message.member.roles.cache.has('808120014690844713')) {
                return message.channel.send("Sorry but your not a booster. If you would like to use this command, boost our server")
            } else {
                const Color = user.displayColor
                const embedForColor = new Discord.MessageEmbed()
                .setAuthor(`${user.displayName} | Color`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .setDescription(`**${Color}** is your Discord color code`)
                .setColor(Color)
                message.channel.send(embedForColor)
            }
        }
    }
}