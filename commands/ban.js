module.exports = {
    name: 'ban',
    description: 'Bans a user',
    execute(client, message, args, Discord, guild) {
        if(!message.member.roles.cache.has('804589156692262913')) {
            message.channel.send('Sorry, you cant use that')
        } else {
            if(message.content === '%ban sim') {
                //message channel
                message.channel.send(`Ban Simulated`)
                //audit
                const auditChannel = client.channels.cache.find(channel => channel.id === '818584862172774420')
                const embedForBanTest = new Discord.MessageEmbed()
                .setTitle(`${message.author.username} Simulated Ban`)
                .addField(`Banned By:`, `${message.author.username}`)
                .addField(`Reason:`, `sim`)
                .setTimestamp()
                auditChannel.send(embedForBanTest)
                message.react('820095873014956053')
            } else {
                if(!message.mentions.members.first()) {
                    message.channel.send('Sorry i cant find that user')
                } else {
                    const reason = message.content.replace(`%ban ${args[0]} `, ``)
                    const memeberToBan = message.mentions.members.first()
                    if(memeberToBan.bannable) {
                        memeberToBan.ban()
                        //message user
                        try {
                            const embedForMessageUser = new Discord.MessageEmbed()
                            .setTitle(`You were Banned`)
                            .addField(`Reason:`, `${reason}`)
                            .setTimestamp()
                            memeberToBan.send(embedForMessageUser)
                        } catch(error) {
                            if(error) {
                                message.channel.send('Sorry, i couldnt message that user, but they were still banned')   
                            }
                        }
                        //message channel
                        message.channel.send(`${memeberToBan.displayName} was banned `)
                        message.react('820095873014956053')
                        //audit
                        const auditChannel = client.channels.cache.find(channel => channel.id === '818584862172774420')
                        const embedForBan = new Discord.MessageEmbed()
                        .setTitle(`${memeberToBan.displayName} Banned`)
                        .addField(`Banned By:`, `${message.author.username}`)
                        .addField(`Reason:`, `${reason}`)
                        .setTimestamp()
                        auditChannel.send(embedForBan)
                    } else {
                        message.channel.send('Sorry, i cant ban him')
                    }
                }
                
            }
        }
    }
}