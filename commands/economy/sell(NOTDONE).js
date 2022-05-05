const userSchema = require('../../schemas/userSchema')
const itemSchema = require('../../schemas/ItemSchema')

module.exports = {
    commands: ['sell'],
    expectedArgs: '(itemID/item type) (inv num)',
    minArgs: 1,
    maxArgs: 2,
    callback: async (message, args, Discord, client, mongo) => {
        if (message.guild === null) {
            return
        }
        const user = message.member.user
        await mongo().then(async (mongoose) => {
            try {
                const lowerCase = args[0].toLowerCase()
                if(isNaN(args[1])) {
                    return message.channel.send("Please specify a number")
                }
                const are = parseFloat(args[1]) - 1
                
                if (lowerCase == "house" || lowerCase == "houses")
                    if (are[1] == "1" || are[1] == "2" || are[1] == "3" || are[1] == "4" || are[1] == "5" || are[1] == "6" || are[1] == "7" || are[1] == "8" || are[1] == "9" || are[1] == "10") {
                        const userResult = await userSchema.findOne({ _id: user })
                        if (!userResult) {
                            return message.channel.send("You do not own any houses")
                        }
                        const argss = userResult.houses.split(/[ ]+/)
                        const toFetch = argss[args[1]]
                        console.log
                        const itemResult = await itemSchema.findOne({ _id: toFetch })
                        if (!itemResult) {
                            return message.channel.send("That property dose not exist.")
                        }
                        if (itemResult.owner != message.author.id) {
                            return message.channel.send("You are not the owner of that property")
                        }

                        await itemSchema.findOneAndUpdate({
                            _id: toFetch
                        }, {
                            owner: "false"
                        }, {
                            upsert: true
                        })
                        const reset = argss.replace(args[1], ``)
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            houses: reset
                        }, {
                            upsert: true
                        })
                        const money = parseFloat(userResult.money) + parseFloat(itemResult.value)
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: money
                        }, {
                            upsert: true
                        })

                        message.channel.send("COMPLETE")
                    }
            } finally {
                mongoose.connection.close()
            }
        })
    }
}