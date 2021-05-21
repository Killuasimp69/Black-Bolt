module.exports = {
    name: 'coin-flip',
    description: 'Flips a coin',
    execute(client, message, args, Discord, guild) {
        const user = message.member.user
        const cf = Math.floor(Math.random() * 3);
            if(cf === 1) {
                const embedForHeads = new Discord.MessageEmbed()
                .setAuthor('Heads', user.displayAvatarURL({ format: 'jpg', dynamic : true }))
                .setDescription('You flipped a coin and got heads')
                .setTimestamp()
                message.channel.send(embedForHeads)
            } else {
                const embedForTails = new Discord.MessageEmbed()
                .setAuthor('Tails', user.displayAvatarURL({ format: 'jpg', dynamic : true }))
                .setDescription('You flipped a coin and got tails')
                .setTimestamp()
                message.channel.send(embedForTails)
            }
    }
}