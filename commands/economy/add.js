const mongo = require('../../mongo')
const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['add'],
    expectedArgs: '(member) (amount)',
    callback: async (message, args, Discord, client) => {
        const user = message.mentions.members.first() || message.member
        await mongo().then(async (mongoose) => {
            try {
                if(message.author.id != "555991737072615424"){
                    return message.content.send("You cannot use that")
                }

                if(!message.mentions.member.first()){
                    return message.channel.send("You must select somone to add.")
                }

                if(isNaN(args[1])) {
                    return message.content.send("Please specify a number")
                }

                message.channel.send("Coming Soon")

            } finally {
                mongoose.connection.close()

            }
        })
    }
}