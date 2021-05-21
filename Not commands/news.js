const Discord = require('discord.js')
const { prefix } = require('../config.json')

module.exports = (client) => {
    
    client.on('message', message=>{
        if(message.channel.id === '804597415209598997') {
            if(message.author.id != '804610350128955392') {
                message.delete()
                message.channel.send(message.content)
            }
        }  
    
    })

}

