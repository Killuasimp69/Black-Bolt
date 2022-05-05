module.exports = {
    commands: ['kill'],
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
                    return message.channel.send("Please specify somone to hug")
                }

                const targetUser = message.mentions.members.first()
                const user = message.member

                const embedForKill = new Discord.MessageEmbed()
                    .setDescription(`
                <@${user.id}>
                
                ***KILLS***
                
                <@${targetUser.id}>`)
                    .setThumbnail("https://cdn.discordapp.com/attachments/841197505001685002/860054351552315402/teletubby.gif")
                    .setColor("RED")
                    .setFooter(`They were painfully slaughterd and killed`)
                message.channel.send(embedForKill)
            }
        }
    }
}