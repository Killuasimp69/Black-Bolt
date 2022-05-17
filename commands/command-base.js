const { prefix } = require('../config.json')
const Discord = require('discord.js')
const mongo = require('../mongo')
const userSchema = require('../schemas/userSchema')

const validatePermissions = (permissions) => {
    const validPermissions = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS'
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unkown permission node "${permission}`)
        }
    }
}

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'You do not have the required permissions to execute this command',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions

    //Ensure command is array

    if (typeof commands === 'string') {
        commands = [commands]
    }

    //Ensure perms is array and valid

    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePermissions(permissions)
    }

    //listen for message

    client.on('message', message => {
        const { member, content, guild } = message
        for (const alias of commands) {
            if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {

                //ensure correct perms
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        message.reply(permissionError)
                    }
                }

                //ensure roles
                for (const requoedRole of requiredRoles) {
                    const role = guild.roles.chache.find(role =>
                        role.name === requoedRole)

                    if (!roles || member.roles.cache.has(role.id)) {
                        message.reply(`You must have the ${requoedRole} role to use this command`)
                    }
                }

                //create args

                const args = content.split(/[ ]+/)

                //remove the command first index
                args.shift()

                //ensure correct args
                if (args.length < minArgs || (
                    maxArgs !== null && args.length > maxArgs
                )) {
                    message.channel.send(`Use \`\`${prefix}${alias} ${expectedArgs}\`\``)
                    return
                }

                //handle code
                callback(message, args, Discord, client, mongo, args.join(' '))

                const randomizerForChest = Math.floor(Math.random() * 100) + 1

                //to chest or not to chest. That is thy question

                if (randomizerForChest == 12) {

                    let filter = m => m.author.id === message.author.id
                    const embedForChest = new Discord.MessageEmbed()
                        .setAuthor(message.member.displayName + " | Found A Chest", message.member.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setDescription("**YOU FOUND A CHEST!** Type ``'cheese'`` to claim before anyone else can.")
                        .setTimestamp()
                        .setColor("GOLD")
                        .setThumbnail("https://cdn.discordapp.com/attachments/974900127602974730/975300721937362965/chest.png")
                    message.channel.send(embedForChest).then(() => {
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        })
                            .then( async message => {
                                message = message.first()
                                if (message.content.toUpperCase() == 'CHEESE') {
                                    const embedForYouwin = new Discord.MessageEmbed()
                                        .setAuthor(message.member.displayName + " | Claimed A Chest", message.member.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                                        .setColor("GOLD")
                                        .setTimestamp()
                                        .setDescription("100 million BBC has been deposited into your account")
                                        .setThumbnail("https://cdn.discordapp.com/attachments/974900127602974730/975300721937362965/chest.png")
                                    await mongo().then(async (mongoose) => {
                                        try {
                                            const userResult = await userSchema.findOne({ _id: message.member.user })
                                            if (!userResult) {
                                                const amount1 = 100000000 + 1000
                                                await userSchema.findOneAndUpdate({
                                                    _id: user
                                                }, {
                                                    money: amount1
                                                }, {
                                                    upsert: true
                                                })
                                                return message.channel.send(embedForYouwin)
                                            }
                                            const amount2 = parseFloat(userResult.money) + 100000000
                                            await userSchema.findOneAndUpdate({
                                                _id: message.member.user
                                            }, {
                                                money: amount2
                                            }, {
                                                upsert: true
                                            })
                                            message.channel.send(embedForYouwin)
                                        } finally {
                                            mongoose.connection.close()
                                        }
                                    })
                                }
                            })
                            .catch(collected => {
                                message.channel.send('Nobody claimed the chest in time *Black Bolt Sadness*');
                            });
                    })
                }
                return
            }
        }
    })
} 