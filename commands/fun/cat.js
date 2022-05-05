var randomCat = require('random-cat');
let coolDownNormal = new Set()
let cdNSecs = 3
let coolDownBooster = new Set()
let cdBSecs = 1
const mongo = require('../../mongo')
const userSchema = require('../../schemas/userSchema')

module.exports = {
    commands: ['cat', 'pussy'],
    expectedArgs: '<num1>',
    callback: async (message, args, Discord, client) => {
        await mongo().then(async (mongoose) => {
            try {
                const msg = await message.channel.send("Generating...")
                const user = message.member

                var url = randomCat.get();

                //template

                if (message.member.roles.cache.has('808120014690844713') || message.member.roles.cache.has('838677417659727928') || message.member.roles.cache.has('838677789413736509')) {
                    if (coolDownBooster.has(message.author.id)) {
                        msg.delete()
                        return message.channel.send("Please wait 1 more second")
                    } else {

                        const embedForCats = new Discord.MessageEmbed()
                            .setAuthor(`${user.displayName} | Cat`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setImage(url)
                            .setColor("RANDOM")
                            .setTimestamp()

                        message.channel.send(embedForCats)
                            .then(msg.delete())

                        coolDownBooster.add(message.author.id)
                        setTimeout(() => {
                            coolDownBooster.delete(message.author.id)
                        }, cdBSecs * 1000)
                    }
                } else {
                    if (coolDownNormal.has(message.author.id)) {
                        return message.channel.send("Please wait 3 more seconds")
                    } else {

                        const embedForCats = new Discord.MessageEmbed()
                            .setAuthor(`${user.displayName} | Cat`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setImage(url)
                            .setColor("RANDOM")
                            .setTimestamp()

                        message.channel.send(embedForCats)
                            .then(msg.delete())

                        coolDownNormal.add(message.author.id)
                        setTimeout(() => {
                            coolDownNormal.delete(message.author.id)
                        }, cdNSecs * 1000)
                    }
                }

            } finally {
                mongoose.connection.close()
            }
        })
    }
}