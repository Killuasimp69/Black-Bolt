const awnsers = ['yes', 'no', 'of course', 'definatly not', 'obviously', 'maybe', 'nobody knows', 'UMM YEAH']
let coolDownNormal = new Set()
let cdNSecs = 3
let coolDownBooster = new Set()
let cdBSecs = 1

module.exports = {
    commands: ['8ball'],
    permissionError: "You need more permissions",
    minArgs: 1,
    callback: (message, args, Discord, client) => {
        const randomAwnsers = Math.floor(Math.random() * (awnsers.length))
        const user = message.member.user
        if (message.member.roles.cache.has('808120014690844713') || message.member.roles.cache.has('838677417659727928') || message.member.roles.cache.has('838677789413736509')) {
            if (coolDownBooster.has(message.author.id)) {
                return message.channel.send("Please wait 1 more second")
            } else {
                const embedFor8Ball = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName} | 8Ball`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setDescription(`
                    Thy sacred 8 ball says...
                    **${awnsers[randomAwnsers]}**`)
                    .setThumbnail("https://cdn.discordapp.com/attachments/841197505001685002/860070840736153600/8_ball.jpg")
                    .setColor("#5f0387")
                message.channel.send(embedFor8Ball)

                coolDownBooster.add(message.author.id)
                setTimeout(() => {
                    coolDownBooster.delete(message.author.id)
                }, cdBSecs * 1000)
            }
        } else { 
            if (coolDownNormal.has(message.author.id)) {
                return message.channel.send("Please wait 3 more seconds")
            } else {
                const embedFor8Ball = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName} | 8Ball`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setDescription(`
                    Thy sacred 8 ball says...
                    **${awnsers[randomAwnsers]}**`)
                    .setThumbnail("https://cdn.discordapp.com/attachments/841197505001685002/860070840736153600/8_ball.jpg")
                    .setColor("#5f0387")
                message.channel.send(embedFor8Ball)

                coolDownNormal.add(message.author.id)
                setTimeout(() => {
                    coolDownNormal.delete(message.author.id)
                }, cdNSecs * 1000)
            }
        }
    }
}