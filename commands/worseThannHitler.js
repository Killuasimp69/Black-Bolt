const Canvas = require('canvas')
module.exports = {
    name: 'worsethanhitler',
    description: 'Gives info on the bot',
    async execute(client, message, args, Discord, guild) {
        if(message.mentions.members.first()) {
            const personToWorse = message.mentions.users.first()
            const canvas = Canvas.createCanvas(840, 650)
            const ctx = canvas.getContext('2d');
            const backround = await Canvas.loadImage('./images/worsethanhitler.jpg')
            ctx.drawImage(backround, 0, 0, canvas.width, canvas.height);
            //
            const avatar = await Canvas.loadImage(personToWorse.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 78, 60, 250, 255);
            //
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'cheeeese.png')
            message.channel.send(attachment) 
        } else {
            const canvas = Canvas.createCanvas(840, 650)
            const ctx = canvas.getContext('2d');
            const backround = await Canvas.loadImage('./images/worsethanhitler.jpg')
            ctx.drawImage(backround, 0, 0, canvas.width, canvas.height);
            const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 78, 60, 250, 255);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'cheeeese.png')
            message.channel.send(attachment)     
        } 
    }
}