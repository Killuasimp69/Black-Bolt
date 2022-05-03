const mongo = require('../../mongo')
const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['userinfo'],
    expectedArgs: '(user)',
    callback: async (message, args, Discord, client) => {
        if(message.guild === null) {
            return
        }
        await mongo().then(async (mongoose) => {
            try {
                const user = message.mentions.members.first() || message.member
                const userResult = await userSchema.findOne({ _id: user.user })
                const member = message.guild.members.cache.get(user.user.id)

                //template
                let embedForUserInfo = new Discord.MessageEmbed()
                    .setAuthor(`User Info`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setThumbnail(user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setColor("BLACK")

                let level = "false"

                if (!userResult || !userResult.level) {
                    level = 0
                } else if (userResult.level == "1") {
                    level = 1
                    embedForUserInfo
                        .setColor("#644223")
                        .setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812847381057556/bronze-removebg-preview.png")
                } else if (userResult.level == "2") {
                    level = 2
                    embedForUserInfo
                        .setColor("#a7b2b9")
                        .setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812848458993694/silvaa-removebg-preview.png")
                } else if (userResult.level == "3") {
                    level = 3
                    embedForUserInfo
                        .setColor("#f2ba2d")
                        .setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812847628546078/gowld-removebg-preview.png")
                } else if (userResult.level == "4") {
                    level = 4
                    embedForUserInfo
                        .setColor("#9b2b61")
                        .setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812848165400616/Plat-removebg-preview.png")
                } else if (userResult.level == "5") {
                    level = 5
                    embedForUserInfo
                        .setColor("#a084a3")
                        .setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812847917932554/Highest-removebg-preview.png")
                }

                embedForUserInfo.addFields({
                    name: 'User Tag',
                    value: user.user.tag
                }, {
                    name: 'Level',
                    value: level
                }, {
                    name: 'Nickname',
                    value: member.nickname || 'False',
                }, {
                    name: 'Is Bot',
                    value: user.user.bot || 'False',
                }, {
                    name: 'Joined Server',
                    value: new Date(member.joinedTimestamp).toLocaleDateString()
                }, {
                    name: 'Joined Discord',
                    value: new Date(user.user.createdTimestamp).toLocaleDateString(),
                    inline: true
                }, {
                    name: 'Role Count',
                    value: member.roles.cache.size - 1
                })

                message.channel.send(embedForUserInfo)
            } finally {
                mongoose.connection.close()

            }
        })
    }
}