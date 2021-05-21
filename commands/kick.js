module.exports = {
    name: 'kick',
    description: 'Kicks a user',
    async execute(client, message, args, Discord) {
        if(!message.member.roles.cache.has('804589156692262913')) {
            message.channel.send('Sorry, you cant use that')
        } else {
            if(message.content === '%kick sim') {
                //message channel
                message.channel.send(`Kick Simulated`)
                //audit
                const auditChannel = client.channels.cache.find(channel => channel.id === '818584862172774420')
                const embedForKick = new Discord.MessageEmbed()
                .setTitle(`${message.author.username} Simulated Kick`)
                .addField(`Kicked By:`, `${message.author.username}`)
                .addField(`Reason:`, `sim`)
                .setTimestamp()
                auditChannel.send(embedForKick)
            } else {
                if(!message.mentions.members.first()) {
                    message.channel.send('Sorry i cant find that user')
                } else {
                    const memeberToKick = message.mentions.members.first()
                    if(memeberToKick.kickable) {
                        const reason = message.content.replace(`%kick ${args[0]} `, ``)
                        memeberToKick.kick()
                        //message user
                        try {
                            const embedForMessageUser = new Discord.MessageEmbed()
                            .setTitle(`You were Kicked`)
                            .addField(`Reason:`, `${reason}`)
                            .setTimestamp()
                        memeberToKick.send(embedForMessageUser)
                        } catch(error) {
                            if(error) {
                                message.channel.send('Sorry, i couldnt message that user, but they were still kicked')   
                            }
                        }
                        //message channel
                        message.channel.send(`${memeberToKick.displayName} was kicked`)
                        //audit
                        const auditChannel = client.channels.cache.find(channel => channel.id === '818584862172774420')
                        const embedForKick = new Discord.MessageEmbed()
                        .setTitle(`${memeberToKick.displayName} Kicked`)
                        .addField(`Kicked By:`, `${message.author.username}`)
                        .addField(`Reason:`, `${reason}`)
                        .setTimestamp()
                        auditChannel.send(embedForKick)
                    }
                    
                }
            }
        }
            
    }
}