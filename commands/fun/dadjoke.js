const { getdadjoke } = require('get-dadjoke');
let coolDownNormal = new Set()
let cdNSecs = 3
let coolDownBooster = new Set()
let cdBSecs = 1


module.exports = {
    commands: ['dadjoke'],
    callback: async (message, args, Discord, client) => {
        const user = message.member.user
        if (message.member.roles.cache.has('808120014690844713') || message.member.roles.cache.has('838677417659727928') || message.member.roles.cache.has('838677789413736509')) {
            if (coolDownBooster.has(message.author.id)) {
                return message.channel.send("Please wait 1 more second")
            } else {
                const joke = await getdadjoke()
                const embedForDadJoke = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName} | Dad Joke`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setDescription(joke)
                    .setColor("RANDOM")
                message.channel.send(embedForDadJoke)

                coolDownBooster.add(message.author.id)
                setTimeout(() => {
                    coolDownBooster.delete(message.author.id)
                }, cdBSecs * 1000)
            }
        } else {
            if (coolDownNormal.has(message.author.id)) {
                return message.channel.send("Please wait 3 more seconds")
            } else {
                const joke = await getdadjoke()
                const embedForDadJoke = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName} | Dad Joke`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setDescription(joke)
                    .setColor("RANDOM")
                message.channel.send(embedForDadJoke)

                coolDownNormal.add(message.author.id)
                setTimeout(() => {
                    coolDownNormal.delete(message.author.id)
                }, cdNSecs * 1000)
            }
        }
    }
}