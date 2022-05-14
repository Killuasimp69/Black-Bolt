const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')
const mongo = require("../../mongo")

module.exports = {
    commands: ['lb', 'leaderbored', 'leaderboard'],
    expectedArgs: '',
    minArgs: 0,
    callback: async (message, args, Discord, client) => {
        if(message.guild === null) {
            console.log("returning")
            return
        }
        await mongo().then(async (mongoose) => {
            try {

                const user = message.member.user
                const results = await userSchema.find().sort({ "money" : -1 })

                const embedForLeaderBoard = new Discord.MessageEmbed()
                .setAuthor(`${message.member.displayName} | Leader Board`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .addFields({
                    name: `🏅 1st`,
                    value: `> 💵 **${results[0].money} BBC** | ${results[0]._id}`,
                    inline: true
                }, {
                    name: results[0].levelbadge,
                    value: `**Level | ${results[0].level}**`,
                    inline: true
                }, {
                    name: "\u200b",
                    value: "\u200b"
                }, {
                    name: `🥈 2nd`,
                    value: `> 💵 **${results[1].money} BBC** | ${results[1]._id}`,
                    inline: true
                }, {
                    name: results[1].levelbadge,
                    value: `**Level | ${results[1].level}**`,
                    inline: true
                }, {
                    name: "\u200b",
                    value: "\u200b"
                },  {
                    name: `🥉 3rd`,
                    value: `> 💵 **${results[2].money} BBC** | ${results[2]._id}`,
                    inline: true
                }, {
                    name: results[2].levelbadge,
                    value: `**Level | ${results[2].level}**`,
                    inline: true
                }, {
                    name: "\u200b",
                    value: "\u200b"
                },  {
                    name: `4th`,
                    value: `> 💵 **${results[3].money} BBC** | ${results[3]._id}`,
                    inline: true
                }, {
                    name: results[3].levelbadge,
                    value: `**Level | ${results[3].level}**`,
                    inline: true
                }, {
                    name: "\u200b",
                    value: "\u200b"
                },   {
                    name: `5th`,
                    value: `> 💵 **${results[4].money} BBC** | ${results[4]._id}`,
                    inline: true
                }, {
                    name: results[4].levelbadge,
                    value: `**Level | ${results[4].level}**`,
                    inline: true
                }, {
                    name: "\u200b",
                    value: "\u200b"
                },   {
                    name: `6th`,
                    value: `> 💵 **${results[5].money} BBC** | ${results[5]._id}`,
                    inline: true
                }, {
                    name: results[5].levelbadge,
                    value: `**Level | ${results[5].level}**`,
                    inline: true
                }, {
                    name: "\u200b",
                    value: "\u200b"
                },   {
                    name: `7th`,
                    value: `> 💵 **${results[6].money} BBC** | ${results[6]._id}`,
                    inline: true
                }, {
                    name: results[6].levelbadge,
                    value: `**Level | ${results[6].level}**`,
                    inline: true
                }, {
                    name: "\u200b",
                    value: "\u200b"
                },   {
                    name: `8th`,
                    value: `> 💵 **${results[7].money} BBC** | ${results[7]._id}`,
                    inline: true
                }, {
                    name: results[7].levelbadge,
                    value: `**Level | ${results[7].level}**`,
                    inline: true
                }, {
                    name: "\u200b",
                    value: "\u200b"
                },   {
                    name: `9th`,
                    value: `> 💵 **${results[8].money} BBC** | ${results[8]._id}`,
                    inline: true
                }, {
                    name: results[8].levelbadge,
                    value: `**Level | ${results[8].level}**`,
                    inline: true
                }, {
                    name: "\u200b",
                    value: "\u200b"
                }, {
                    name: `10th`,
                    value: `> 💵 **${results[9].money} BBC** | ${results[9]._id}`,
                    inline: true
                }, {
                    name: results[9].levelbadge,
                    value: `**Level | ${results[9].level}**`,
                    inline: true
                }, )
                .setColor("BLACK")
                message.channel.send(embedForLeaderBoard)

            } finally {
                mongoose.connection.close()
            }
        })
    }
}