const fetch = require('snekfetch')
let coolDownNormal = new Set()
let cdNSecs = 3
let coolDownBooster = new Set()
let cdBSecs = 1

module.exports = {
    commands: ['yomumma', 'yawmumma', 'yourmumma', 'yomama'],
    callback: async (message, args, Discord, client) => {
        const user = message.member.user
        if (message.member.roles.cache.has('808120014690844713') || message.member.roles.cache.has('838677417659727928') || message.member.roles.cache.has('838677789413736509')) {
            if (coolDownBooster.has(message.author.id)) {
                return message.channel.send("Please wait 1 more second")
            } else {
                fetch.get("https://api.apithis.net/yomama.php").then(joke => {
                    const embedForYoMumma = new Discord.MessageEmbed()
                        .setAuthor(`${message.member.displayName} | Yo Mumma`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setDescription(joke.body)
                        .setColor("RANDOM")
                    message.channel.send(embedForYoMumma)

                    coolDownBooster.add(message.author.id)
                    setTimeout(() => {
                        coolDownBooster.delete(message.author.id)
                    }, cdBSecs * 1000)
                })
            }
        } else {
            if (coolDownNormal.has(message.author.id)) {
                return message.channel.send("Please wait 3 more seconds")
            } else {
                fetch.get("https://api.apithis.net/yomama.php").then(joke => {
                    const embedForYoMumma = new Discord.MessageEmbed()
                        .setAuthor(`${message.member.displayName} | Yo Mumma`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setDescription(joke.body)
                        .setColor("RANDOM")
                    message.channel.send(embedForYoMumma)

                    coolDownNormal.add(message.author.id)
                    setTimeout(() => {
                        coolDownNormal.delete(message.author.id)
                    }, cdNSecs * 1000)
                })
            }
        }
    }
}