const Discord = require('discord.js')
const { prefix } = require('../../config.json')

module.exports = (client) => {
    
    client.on('message', message=>{
        
        if(message.content.includes('akward') || message.content.includes('Akward') || message.content.includes('AKWARD')) {
            message.react('819838791001833502')
        }

        if(message.content.includes('cheese')) {
            message.react('🧀')
        }

        })
    

}
