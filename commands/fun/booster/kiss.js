module.exports = {
    commands: ['kiss'],
    expectedArgs: '(user)',
    permissionError: "Sorry but your not a booster. If you would like to use this command, boost our server",
    minArgs: 1,
    maxArgs: 1,
    callback: (message, args, Discord, client) => {
        if (message.guild.id != '804323987106168842') {
            return message.channel.send("Sorry but that command only works in Meme Arcade")
        } else {
            if ( message.author.id != "555991737072615424" && !message.member.roles.cache.has('808120014690844713')) {
                return message.channel.send("Sorry but your not a booster. If you would like to use this command, boost our server")
            } else {
                if (!message.mentions.members.first()) {
                    return message.channel.send("Please specify somone to kiss")
                }

                const targetUser = message.mentions.members.first()
                const user = message.member

                const embedForKiss = new Discord.MessageEmbed()
                    .setDescription(`
                <@${user.id}>
                
                ***KISSES***
                
                <@${targetUser.id}>`)
                    .setThumbnail("https://cdn.discordapp.com/emojis/667880571166261329.gif?v=1")
                    .setColor("#ff47ea")
                    .setFooter(`Damn not gonna lie they look good together`)
                message.channel.send(embedForKiss)
            }
        }
    }
}