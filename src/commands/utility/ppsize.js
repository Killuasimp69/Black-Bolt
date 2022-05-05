const { SlashCommandFuilder, SlashCommandBuilder } = require("@discordjs/builders")
let coolDownNormal = new Set()
let cdNSecs = 3
let coolDownBooster = new Set()
let cdBSecs = 1

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ppsize')
        .setDescription("Gives your ppsize."),
    async execute(interaction) {
        const user = interaction.user
        if (interaction.member.roles.cache.has('838596018856919040')) {
            if (coolDownBooster.has(message.author.id)) {
                return await interaction.reply("Please wait 1 more second")
            } else {
                const ppsizes = ["=", "==", "===", "====", "=====", "======", "======="]
                const pprandom = Math.floor(Math.random() * (ppsizes.length))
                const embedForPPSize = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName} | PP Size`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setDescription(`8${ppsizes[pprandom]}D`)
                    .setColor("RANDOM")
                await interaction.reply(embedForPPSize)

                coolDownBooster.add(message.author.id)
                setTimeout(() => {
                    coolDownBooster.delete(message.author.id)
                }, cdBSecs * 1000)
            }
        } else {
            if (coolDownNormal.has(message.author.id)) {
                return await interaction.reply("Please wait 3 more second")
            } else {
                const ppsizes = ["=", "==", "===", "====", "=====", "======", "======="]
                const pprandom = Math.floor(Math.random() * (ppsizes.length))
                const embedForPPSize = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName} | PP Size`)
                    .setDescription(`8${ppsizes[pprandom]}D`)
                    .setColor("RANDOM")
                await interaction.reply(embedForPPSize)

                coolDownNormal.add(message.author.id)
                setTimeout(() => {
                    coolDownNormal.delete(message.author.id)
                }, cdNSecs * 1000)
            }
        }
    }
}