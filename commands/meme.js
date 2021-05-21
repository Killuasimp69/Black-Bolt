let coolDown = new Set()
let cdSecs = 5
const randomPuppy = require('random-puppy')
module.exports = {
    name: 'meme',
    description: 'Gets a random meme',
    async execute(client, message, args, Discord, guild) {
        const user = message.member.user
        if(coolDown.has(message.author.id)) {
            message.channel.send('You need to wait 5 seconds between the meme command')
        } else {
            try{
                const subredits = ["dankmeme", "meme", "memes"]
                const random = subredits[Math.floor(Math.random() * subredits.length)]

                const img = await randomPuppy(random);
                const embedForMeme = new Discord.MessageEmbed()
                .setAuthor(`Random Meme`, user.displayAvatarURL({ format: 'jpg', dynamic : true }))
                .setColor("RANDOM")
                .setImage(img)
                message.channel.send(embedForMeme)
                coolDown.add(message.author.id)
                setTimeout(() => {
                    coolDown.delete(message.author.id)
                }, cdSecs * 1000)
            } catch {
                message.channel.send('There was an error, try again')
            }
        }  
    } 
}