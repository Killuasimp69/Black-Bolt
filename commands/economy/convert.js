const userSchema = require('../../schemas/userSchema')

module.exports = {
    commands: ['convert', 'conv'],
    expectedArgs: '(amount)',
    permissionError: "You need more permissions",
    minArgs: 1,
    maxArgs: 1,
    permissions: [],
    requiredRoles: [],
    economyCheck: "true",
    callback: async (message, args, Discord, client, mongo, prefix) => {
        const user = message.member.user
        await mongo().then(async (mongoose) => {
            try {
                const userResult = await userSchema.findOne({ _id: user })

                if(!userResult || !userResult.xp || !userResult.money) {
                    if(!userResult) {
                        return message.channel.send("You've never used our economy before.")
                    }
                    if(!userResult.xp) {
                        return message.channel.send("You have no xp")
                    }
                    if(!userResult.money) {
                        return message.channel.send(`You have no money, please use the \`\`${prefix}balance\`\` command to get started.`)
                    }
                }

                if(userResult.xp <= args[0]) {
                    return message.channel.send("You do not have enough xp.")
                }

                const moneyToReset = (parseFloat(userResult.xp) / 2) + parseFloat(userResult.money)
                const xpToReset = parseFloat(userResult.xp) - parseFloat(args[0])

                await userSchema.findOneAndUpdate(
                    {
                      _id: user,
                    },
                    {
                      money: moneyToReset,
                    },
                    {
                      upsert: true,
                    }
                  );
                  await userSchema.findOneAndUpdate(
                    {
                      _id: user,
                    },
                    {
                      xp: xpToReset,
                    },
                    {
                      upsert: true,
                    }
                  );

                message.channel.send(`You converted ${args[0]} xp into ${parseFloat(userResult.xp) / 2} BBC`)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}