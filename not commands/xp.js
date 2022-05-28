const userSchema = require('.././schemas/userSchema')
const serverSchema = require('.././schemas/Servers')
const mongo = require('../mongo')

module.exports = (client) => {
    client.on('message', async message => {
        if (message.guild != "804323987106168842") return
        if (message.channel.id == "838588912041066496" || message.channel.id == "853386908376629309") return
        if (message.author.id == "804610350128955392" || message.author.id == "783789982300373053") return
        await mongo().then(async (mongoose) => {
            try {
                const user = message.member.user
                const userResult = await userSchema.findOne({ _id: user })
                const serverResult = await serverSchema.findOne({ _id: "804323987106168842" })
                let xp = Math.floor(Math.random() * 1000);
                if (serverResult.mutiplyer == "true") {
                    xp = xp * 2
                }
                if (!userResult || !userResult.xp) {
                    xp = 10
                    return await userSchema.findOneAndUpdate(
                        {
                            _id: user,
                        },
                        {
                            xp: xp,
                        },
                        {
                            upsert: true,
                        }
                    );
                }

                if(isNaN(userResult.xp)) return

                if (userResult.mutiplyer == "true") {
                    xp = xp * 2
                }

                let finalXP = xp + userResult.xp

                await userSchema.findOneAndUpdate(
                    {
                        _id: user,
                    },
                    {
                        xp: finalXP,
                    },
                    {
                        upsert: true,
                    }
                );
            } catch {
                mongoose.connection.close()
                console.log("ISSUE IN XP")
            }
        })
    })
}