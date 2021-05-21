module.exports = {
    name: 'warn',
    description: 'Warns a user',
    async execute(client, message, args, Discord) {
        if(!message.member.roles.cache.has('804589156692262913')) {
            message.channel.send('Sorry, you cant use that command.')
        } else {
            if(!message.mentions.members.first()) {
                message.channel.send('Sorry, I cant find that user')
            } else {
                if(!args[1]) {
                    message.channel.send('You must provide a reason')
                } else {
                const reason = message.content.replace(`%warn ${args[0]}`, ``)
                const memeberToWarn = message.mentions.members.first()
                //warn
                if(!message.mentions.members.first()) {
                    message.channel.send('Sorry, I cant find that user')
                } else {
                    if(!args[1]) {
                        message.channel.send('You must provide a reason')
                    } else {
                    const reason = message.content.replace(`%warn ${args[0]}`, ``)
                    const memeberToWarn = message.mentions.members.first()
                    //warn
                    try {
                        const EmbedForWarnUser = new Discord.MessageEmbed()
                        .setTitle('You have been warned')
                        .addField(`Reason:`, `${reason}`)
                        .setFooter('Do not do it again')
                        .setTimestamp()
                        memeberToWarn.send(EmbedForWarnUser)
                    } catch(error) {
                        if(error) {
                            message.channel.send('Sorry but i cant message that user, but this still counts as a warning')
                        }
                    }
                    //message chanel
                    message.channel.send(`${memeberToWarn.displayName} has been warned via dms`)
                    //audit
                    const auditChannel = client.channels.cache.find(channel => channel.id === '818584862172774420')
                    const embedForWarn = new Discord.MessageEmbed()
                    .setTitle(`${memeberToWarn.displayName} Warned`)
                    .addField(`Warned By:`, `${message.author.username}`)
                    .addField(`Reason:`, `${reason}`)
                    .setTimestamp()
                    auditChannel.send(embedForWarn)
                    }
                }
              }
        
            }
        }
    }
}