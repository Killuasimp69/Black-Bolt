const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['multiplier'],
    expectedArgs: '(true/false)',
    minArgs: 1,
    maxArgs: 1,
    permissions: ["ADMINISTRATOR"],
    callback: async (message, args, Discord, client, mongo) => {
        const user = message.mentions.members.first()
        await mongo().then(async (mongoose) => {
            try {
                //FINISH COMMAND
            } finally {
                mongoose.connection.close()
            }
        })
    }
}
