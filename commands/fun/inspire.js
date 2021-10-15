const inspire = require('inspirational-quotes')
let coolDownNormal = new Set()
let cdNSecs = 3
let coolDownBooster = new Set()
let cdBSecs = 1

module.exports = {
    commands: ['inspire', 'quote'],
    expectedArgs: '<num1>',
    callback: (message, args, Discord, client) => {
        const user = message.member.user
        if(message.member.roles.cache.has('808120014690844713') || message.member.roles.cache.has('838677417659727928') || message.member.roles.cache.has('838677789413736509')) {
            if(coolDownBooster.has(message.author.id)) {
                return message.channel.send("Please wait 1 more second")
            } else {

                //Booster

                const quote = inspire.getRandomQuote()
                const randomQuotes = new Discord.MessageEmbed()
                .setAuthor(`${message.member.displayName} | Quote`, user.displayAvatarURL({ format: 'jpg', dynamic : true }))
                .setDescription(quote)
                .setColor("RANDOM")
                message.channel.send(randomQuotes)

                coolDownBooster.add(message.author.id)
                setTimeout(() => {
                    coolDownBooster.delete(message.author.id)
                }, cdBSecs * 1000)
            }
        } else {
            if(coolDownNormal.has(message.author.id)) {
                return message.channel.send("Please wait 3 more seconds")
            } else {
                const quote = inspire.getRandomQuote()

                const randomQuotes = new Discord.MessageEmbed()
                .setAuthor(`${message.member.displayName}`, user.displayAvatarURL({ format: 'jpg', dynamic : true }))
                .setTitle("Random Quote")
                .setDescription(quote)
                .setColor("RANDOM")
                message.channel.send(randomQuotes)

                coolDownNormal.add(message.author.id)
                setTimeout(() => {
                    coolDownNormal.delete(message.author.id)
                }, cdNSecs * 1000)
            }
        }
    }
}