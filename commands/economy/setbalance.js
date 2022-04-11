const userSchema = require('../../schemas/userSchema')

module.exports = {
    commands: ['setbalance', 'setbal'],
    expectedArgs: '(amount) (user)',
    minArgs: 2,
    maxArgs: 2,
    callback: async (message, args, Discord, client, mongo) => {
        const user = message.mentions.members.first() || message.author

        if (message.author.id != ('555991737072615424') || message.author.id != ('555991737072615424')) {
            return message.channel.send('You do not have permission to use that')
        }

        if(!args[0]) {
            return message.channel.send('Please specify a amount to set')
        }

        if(args[0].startsWith('<@')) {
            return message.channel.send('Please put the user to ping after the number')
        }

        if (isNaN(args[0])) {
            return message.channel.send('Please specify a number not a letter')
        }

        if(!message.mentions.members.first()) {
          return message.channel.send("Specify somone to set a balance for")
        }
       
          await mongo().then(async (mongoose) => {
            try {
              await userSchema.findOneAndUpdate({
                _id: user.user
              }, {
                money: args[0]
              }, {
                upsert: true
              })
            } finally {
                mongoose.connection.close()
            }
          })
        message.channel.send(`Great, the balance was set to "${args[0]}"`)
    }
}