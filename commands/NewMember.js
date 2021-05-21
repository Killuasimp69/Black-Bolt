const Canvas = require('canvas')
module.exports = {
    name: 'newmember',
    description: 'Gives a new member meme',
    async execute(client, message, args, Discord, guild) {
        if(message.mentions.members.first()) {
            const personToMember = message.mentions.users.first()
            const canvas = Canvas.createCanvas(840, 650)
            const ctx = canvas.getContext('2d');
            const backround = await Canvas.loadImage('./images/new-member.jpg')
            ctx.drawImage(backround, 0, 0, canvas.width, canvas.height);
            //
            const avatar = await Canvas.loadImage(personToMember.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 78, 360, 250, 255);
            ctx.font = '60px sans-serif';
	        ctx.fillStyle = 'BLACK';
            ctx.fillText('New member', canvas.width / 24, canvas.height / 4);
            //
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Image.jpg')
            message.channel.send(attachment) 
        } else {
            const canvas = Canvas.createCanvas(840, 650)
            const ctx = canvas.getContext('2d');
            const backround = await Canvas.loadImage('./images/new-member.jpg')
            ctx.drawImage(backround, 0, 0, canvas.width, canvas.height);
            const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 78, 360, 250, 255);
            ctx.font = '60px sans-serif';
	        ctx.fillStyle = 'BLACK';
            ctx.fillText('New member', canvas.width / 24, canvas.height / 4);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Image.jpg')
            message.channel.send(attachment)   
        }
    }
}