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

                //add levels to leaderboard, in next update. (cant add now as users without levels on leaderboard will cause crashes.)
                const user = message.member.user
                const results = await userSchema.find().sort({ money : -1 }).limit((10))

                const embedForLeaderBoard = new Discord.MessageEmbed()
                .setAuthor(`${message.member.displayName} | Leader Board`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .addFields({
                    name: `🏅 1st`,
                    value: `> 💵 **${results[0].money} BBC** | ${results[0]._id}`
                }, {
                    name: `🥈 2nd`,
                    value: `> 💵 **${results[1].money} BBC** | ${results[1]._id}`
                }, {
                    name: `🥉 3rd`,
                    value: `> 💵 **${results[2].money} BBC** | ${results[2]._id}`
                }, {
                    name: `4th`,
                    value: `> 💵 **${results[3].money} BBC** | ${results[3]._id}`
                }, {
                    name: `5th`,
                    value: `> 💵 **${results[4].money} BBC** | ${results[4]._id}`
                }, {
                    name: `6th`,
                    value: `> 💵 **${results[5].money} BBC** | ${results[5]._id}`
                }, {
                    name: `7th`,
                    value: `> 💵 **${results[6].money} BBC** | ${results[6]._id}`
                }, {
                    name: `8th`,
                    value: `> 💵 **${results[7].money} BBC** | ${results[7]._id}`
                }, {
                    name: `9th`,
                    value: `> 💵 **${results[8].money} BBC** | ${results[8]._id}`
                }, {
                    name: `10th`,
                    value: `> 💵 **${results[9].money} BBC** | ${results[9]._id}`
                })
                .setColor("BLACK")
                message.channel.send(embedForLeaderBoard)

            } finally {
                mongoose.connection.close()

            }
        })
    }
}