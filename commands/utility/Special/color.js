module.exports = {
    commands: ['color'],
    callback: (message, args, Discord, client) => {
        const user = message.member
        if(message.guild.id != '804323987106168842') {
            return message.channel.send("Sorry but that command only works in Meme Arcade")
        } else {
            if(!message.member.roles.cache.has('970499864297353236')) {
                return message.channel.send("Sorry but your not level 2.")
            } else {
                const Color = user.displayColor
                const embedForColor = new Discord.MessageEmbed()
                .setAuthor(`${user.displayName} | Color`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .setDescription(`**${Color}** is your Discord colour code`)
                .setColor(Color)
                message.channel.send(embedForColor)
            }
        }
    }
}
