let coolDownNormal = new Set()
let cooldownBoostert = 1
let cooldownBooster = new Set()
let cooldownNormalt = 3
const gottem = require('djs-meme');

module.exports = {
    commands: ['meme'],
    expectedArgs: '<num1>',
    callback: async (message, args, Discord, client) => {
        const user = message.member.user
        if (message.member.roles.cache.has('808120014690844713') || message.member.roles.cache.has('838677417659727928') || message.member.roles.cache.has('838677789413736509')) {
            if (cooldownBooster.has(message.author.id)) {
                return message.channel.send("Please wait 1 more second")
            } else {

                const Meme = await gottem.meme();
                message.channel.send(Meme)

                cooldownBooster.add(message.author.id)
                setTimeout(() => {
                    cooldownBooster.delete(message.author.id)
                }, cooldownBoostert * 1000)
            }
        } else {
            if (coolDownNormal.has(message.author.id)) {
                return message.channel.send("Please wait 3 more seconds")
            } else {

                const Meme = await gottem.meme();
                message.channel.send(Meme)

                coolDownNormal.add(message.author.id)
                setTimeout(() => {
                    coolDownNormal.delete(message.author.id)
                }, cooldownNormalt * 1000)
            }
        }
    }
}