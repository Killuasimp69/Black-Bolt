const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')
let coolDown = new Set()
let cdSecs = 43200

module.exports = {
    commands: ['daily', 'day'],
    expectedArgs: '',
    callback: async (message, args, Discord, client, mongo) => {
        if (message.guild === null) {
            console.log("returning")
            return
        }
        const user = message.member.user
        await mongo().then(async (mongoose) => {
            try {

                let moneyToBase = 0
                if (message.member.roles.cache.has('838596018856919040')) {
                    //Staff
                    moneyToBase = 100000
                }
                if (message.member.roles.cache.has('974617601667919902')) {
                    //Test Team
                    moneyToBase = 200000
                }

                const embedForMoney = new Discord.MessageEmbed()
                    .setTitle(`$${moneytogive}`)
                    .setDescription(`You just got $${moneytogive} BBC`)
                    .setColor("BLACK")
                    .setFooter(`Your new balance is $${moneyAmount} BBC`)

                const userResult = await userSchema.findOne({ _id: user })

                if (!userResult || !userResult.money) {

                }

            } finally {
                mongoose.connection.close()

            }
        })
    }
}
