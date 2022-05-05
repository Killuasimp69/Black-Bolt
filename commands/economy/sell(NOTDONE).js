const userSchema = require('../../schemas/userSchema')
const itemSchema = require('../../schemas/ItemSchema')

module.exports = {
    commands: ['sell'],
    expectedArgs: '(itemID/inv num)',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, args, Discord, client, mongo) => {
        if (message.guild === null) {
            return
        }
        const user = message.member.user
        await mongo().then(async (mongoose) => {
            try {
                if(args[0] == "1" || args[0] == "2" || args[0] == "3" || args[0] == "4" || args[0] == "5" || args[0] == "6" || args[0] == "7" || args[0] == "8" || args[0] == "9" || args[0] == "10") {
                    const itemResult = await itemSchema.findOne({ _id: args[0]})
                    if(!itemResult) {
                        return message.channel.send("That property dose not exist.")
                    }
                    if(itemResult.owner != message.author.id) {
                        return message.channel.send("You are not the owner of that property")
                    }
                    
                }
            } finally {
                mongoose.connection.close()
            }
        })
    }
}