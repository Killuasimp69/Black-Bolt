const Canvas = require("canvas")
const userSchema = require("../../schemas/userSchema")

module.exports = {
    commands: ['worsethanhitler', 'WTH'],
    expectedArgs: '',
    minArgs: 0,
    maxArgs: 1,
    callback: async (message, args, Discord, client, mongo) => {
        const user = message.mentions.members.first() || message.member
        const canvas = Canvas.createCanvas(700, 450)
        const ctx = canvas.getContext('2d')
        const img = await Canvas.loadImage("https://i.redd.it/bennhv5jhw351.jpg")
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const av = await Canvas.loadImage(user.user.displayAvatarURL({ format: 'jpg', dynamic : true }))
        ctx.drawImage(av, 70, 45, 200, 195)

        const atch = new Discord.MessageAttachment(canvas.toBuffer(), 'thisone.jpg')

        message.channel.send(atch)
    }
}