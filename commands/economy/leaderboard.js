const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')
const mongo = require("../../mongo")

module.exports = {
    commands: ['lb', 'leaderbored', 'leaderboard'],
    expectedArgs: '',
    minArgs: 0,
    economyCheck: "true",
    callback: async (message, args, Discord, client) => {
        await mongo().then(async (mongoose) => {
            try {

                const user = message.member.user
                const results = await userSchema.find().sort({ "money" : -1 })

                const embedForLeaderBoard = new Discord.MessageEmbed()
                .setAuthor(`${message.member.displayName} | Leader Board`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .addFields({
                    name: `🏅 1st | ${results[0].levelbadge}`,
                    value: `> 💵 **${results[0].money} BBC** | ${results[0]._id} | ${results[0].levelbadge}`
                }, {
                    name: `🥈 2nd | ${results[1].levelbadge}`,
                    value: `> 💵 **${results[1].money} BBC** | ${results[1]._id} | ${results[1].levelbadge}`
                }, {
                    name: `🥉 3rd | ${results[2].levelbadge}`,
                    value: `> 💵 **${results[2].money} BBC** | ${results[2]._id} | ${results[2].levelbadge}`
                }, {
                    name: `4th | ${results[3].levelbadge}`,
                    value: `> 💵 **${results[3].money} BBC** | ${results[3]._id} | ${results[3].levelbadge}`
                }, {
                    name: `5th | ${results[4].levelbadge}`,
                    value: `> 💵 **${results[4].money} BBC** | ${results[4]._id} | ${results[4].levelbadge}`
                }, {
                    name: `6th | ${results[5].levelbadge}`,
                    value: `> 💵 **${results[5].money} BBC** | ${results[5]._id} | ${results[5].levelbadge}`
                }, {
                    name: `7th | ${results[6].levelbadge}`,
                    value: `> 💵 **${results[6].money} BBC** | ${results[6]._id} | ${results[6].levelbadge}`
                }, {
                    name: `8th | ${results[7].levelbadge}`,
                    value: `> 💵 **${results[7].money} BBC** | ${results[7]._id} | ${results[7].levelbadge}`
                }, {
                    name: `9th | ${results[8].levelbadge}`,
                    value: `> 💵 **${results[8].money} BBC** | ${results[8]._id} | ${results[8].levelbadge}`
                }, {
                    name: `10th | ${results[9].levelbadge}`,
                    value: `> 💵 **${results[9].money} BBC** | ${results[9]._id} | ${results[9].levelbadge}`
                })
                .setColor("BLACK")
                message.channel.send(embedForLeaderBoard)

            } finally {
                mongoose.connection.close()
            }
        })
    }
}