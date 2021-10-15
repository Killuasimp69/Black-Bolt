let coolDownNormal = new Set()
let cdNSecs = 3
let coolDownBooster = new Set()
let cdBSecs = 1

module.exports = {
    commands: ['ppsize'],
    callback: (message, args, Discord, client) => {
        const user = message.member.user
        if (message.member.roles.cache.has('808120014690844713') || message.member.roles.cache.has('838677417659727928') || message.member.roles.cache.has('838677789413736509')) {
            if (coolDownBooster.has(message.author.id)) {
                return message.channel.send("You must wait 1 more second")
            } else {
                const ppsizes = ["=", "==", "===", "====", "=====", "======", "======="]
                const pprandom = Math.floor(Math.random() * (ppsizes.length))
                const embedForPPSize = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName} | PP Size`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setDescription(`8${ppsizes[pprandom]}D`)
                    .setColor("RANDOM")
                message.channel.send(embedForPPSize)

                coolDownBooster.add(message.author.id)
                setTimeout(() => {
                    coolDownBooster.delete(message.author.id)
                }, cdBSecs * 1000)
            }
        } else {
            if (coolDownNormal.has(message.author.id)) {
                return message.channel.send("Please wait 3 more seconds")
            } else {
                const ppsizes = ["=", "==", "===", "====", "=====", "======", "======="]
                const pprandom = Math.floor(Math.random() * (ppsizes.length))
                const embedForPPSize = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName} | PP Size`)
                    .setDescription(`8${ppsizes[pprandom]}D`)
                    .setColor("RANDOM")
                message.channel.send(embedForPPSize)

                coolDownNormal.add(message.author.id)
                setTimeout(() => {
                    coolDownNormal.delete(message.author.id)
                }, cdNSecs * 1000)
            }
        }
    }
}