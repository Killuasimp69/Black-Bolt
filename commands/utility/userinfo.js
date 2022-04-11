const mongo = require('../../mongo')
const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['userinfo'],
    expectedArgs: '<num1>',
    callback: async (message, args, Discord, client) => {
        await mongo().then(async (mongoose) => {
            try {
                const user = message.mentions.members.first() || message.member
                const userResult = await userSchema.findOne({ _id: user.user })
                const member = message.guild.members.cache.get(user.user.id)

                //template
                const embedForUserInfo = new Discord.MessageEmbed()
                    .setAuthor(`User Info`, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setThumbnail(user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setColor("BLACK")

                    //check database
                    if(!userResult || !userResult.catCoins) {
                        await userSchema.findOneAndUpdate({
                            _id: user.user
                        }, {
                            catCoins: '0'
                        }, {
                            upsert: true
                        })

                        embedForUserInfo.addFields({
                            name: 'User Tag',
                            value: user.user.tag
                        }, {
                            name: 'Nickname',
                            value: member.nickname || 'False'
                        }, {
                            name: 'Is Bot',
                            value: user.user.bot || 'False',
                            inline: true
                        }, {
                            name: 'Joined Server',
                            value: new Date(member.joinedTimestamp).toLocaleDateString()
                        }, {
                            name: 'Joined Discord',
                            value: new Date(user.user.createdTimestamp).toLocaleDateString()
                        }, {
                            name: 'Role Count',
                            value: member.roles.cache.size - 1
                        })

                        return message.channel.send(embedForUserInfo)
                    }

                    embedForUserInfo.addFields({
                        name: 'User Tag',
                        value: user.user.tag
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
                    }, {
                        name: 'Cat Coins',
                        value: `${userResult.catCoins}`
                    })

                message.channel.send(embedForUserInfo)
            } finally {
                mongoose.connection.close()

            }
        })
    }
}