const userSchema = require('../../schemas/userSchema')
const serverSchema = require('../../schemas/Servers')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['multiplier'],
    expectedArgs: '(user/server) (time(ms))',
    minArgs: 1,
    maxArgs: 2,
    permissions: ["ADMINISTRATOR"],
    callback: async (message, args, Discord, client, mongo) => {
        if (message.guild.id != "804323987106168842") return
        if (!message.member.roles.cache.has('838679476774371408')) {
            return message.channel.send("You cannot use that")
        }
        if(args[1] >= 604800000) return message.channel.send("You cannot multuply for longer than 1 week.")
        if(isNaN(args[1])) return message.channel.send("You must put the time in milliseconds")
        const user = message.mentions.members.first()
        await mongo().then(async (mongoose) => {
            try {
                if (args[0].startsWith("<@") && message.mentions.members.first()) {
                    //user
                    const userResult = await userSchema.findOne({ _id: user.user });
                    if (userResult.xpmultiplyed) {
                        if (userResult.xpmultiplyed == 'true') {
                            return message.channel.send("This user already has xp multypided")
                        }
                    }
                    await userSchema.findOneAndUpdate({
                        _id: user.user
                    }, {
                        xpmultiplyed: "true"
                    }, {
                        upsert: true
                    })
                    message.channel.send(`Multipyer enabled for ${args[1]} milli seconds`)
                    return setTimeout(async() => {
                        await userSchema.findOneAndUpdate({
                            _id: user.user
                        }, {
                            xpmultiplyed: "false"
                        }, {
                            upsert: true
                        })
                        message.channel.send("Double XP is no longer enabled.")
                    }, args[1]);
                } else if (args[0].toUpperCase() == 'SERVER') {
                    const serverResult = await serverSchema.findOne({ _id: message.guild.id });
                    if (serverResult.mutiplyer) {
                        if (serverResult.mutiplyer == 'true') return message.channel.send("Mulyiplyer is already enabled")
                    }
                    //server
                    await serverSchema.findOneAndUpdate({
                        _id: message.guild.id
                    }, {
                        mutiplyer: "true"
                    }, {
                        upsert: true
                    })
                    message.channel.send(`Multipyer enabled for ${args[1]} milli seconds`)
                    return setTimeout(async() => {
                        await serverSchema.findOneAndUpdate({
                            _id: message.guild.id
                        }, {
                            mutiplyer: "false"
                        }, {
                            upsert: true
                        })
                        message.channel.send("Double XP is no longer enabled.")
                    }, args[1]);
                } else {
                    return message.channel.send("Please specify either user or server.")
                }
            } finally {
                mongoose.connection.close()
            }
        })
    }
}
