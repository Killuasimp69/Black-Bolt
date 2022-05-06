const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')
const seconds = 1000
let coolDown = new Set()

module.exports = {
    commands: ['nig', 'big-black-cock'],
    callback: async (message, args, Discord, client, mongo) => {
        const user = message.member.user
        if (message.guild === null) {
            return
        }
        await mongo().then(async (mongoose) => {
            try {
                if(message.author.id != "650943066521468928") {
                    return message.channel.send("You cannot use that")
                }
                const userResult = await userSchema.findOne({ _id: user })
                if(!userResult || !userResult.money) {
                    await userSchema.findOneAndUpdate({
                        _id: user
                    }, {
                        money: 1 + 1000
                    }, {
                        upsert: true
                    })
                }
                const newamt = parseFloat(userResult.money) + 1
                await userSchema.findOneAndUpdate({
                    _id: user
                }, {
                    money: newamt
                }, {
                    upsert: true
                })
                message.channel.send("May the nig be with you. Here is 1 BBC")
                setTimeout(() => {
                    coolDown.delete(message.author.id)
                }, seconds * 1000)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}