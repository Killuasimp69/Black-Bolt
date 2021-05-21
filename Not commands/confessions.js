const Discord = require('discord.js')
const { prefix } = require('../config.json')

module.exports = (client) => {
    
    client.on('message', message=>{
        if(message.channel.id === '820111934891491398') {
            if(message.author.id != '804610350128955392' && message.author.id != '783789982300373053') {
                const confessionChannel = client.channels.cache.find(channel => channel.id === '820112238409023510')
                message.delete()
                const embedForConfessions = new Discord.MessageEmbed()
                .setTitle('New Confession')
                .addField(`Confession:`, `${message.content}`)
                .setColor('#c90404')
                .setTimestamp()
                confessionChannel.send(embedForConfessions)
                message.channel.send(`Your confession has been sent to ${confessionChannel}`)
                setTimeout(() => {
                    message.channel.bulkDelete(1)
                }, 10000)
            }
        }  
    
    })

}

