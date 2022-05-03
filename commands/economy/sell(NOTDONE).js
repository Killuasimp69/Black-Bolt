const userSchema = require('../../schemas/userSchema')

module.exports = {
    commands: ['work'],
    callback: async (message, args, Discord, client, mongo) => {
        if(message.guild === null) {
            return
        }
        const user = message.member
        await mongo().then(async (mongoose) => {
            try {
                
            } finally {
                mongoose.connection.close()
            }
        })
    }
}