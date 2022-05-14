const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')
let coolDown = new Set()
let cdSecs = 43200

module.exports = {
    commands: ['daily', 'day'],
    expectedArgs: '',
    callback: async (message, args, Discord, client, mongo) => {
        if(message.guild === null) {
            console.log("returning")
            return
        }
        const user = message.member.user
        await mongo().then(async (mongoose) => {
            try {
                if (message.member.roles.cache.has('838596018856919040')) {
                    if (coolDown.has(message.author.id)) {
                        return message.channel.send("Please return tommorrow")
                    }

                    const userresult = await userSchema.findOne({ _id: user })

                    if (!userresult || !userresult.money) {
                        const moneytogive = Math.floor(Math.random() * 100000)
                        const moneyAmount = parseFloat(moneytogive) + parseFloat("1000")

                        //templates
                        const embedForMoney = new Discord.MessageEmbed()
                            .setTitle(`$${moneytogive}`)
                            .setDescription(`You just got $${moneytogive} BBC`)
                            .setColor("BLACK")
                            .setFooter(`Your new balance is $${moneyAmount} BBC`)

                        //database

                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: moneyAmount
                        }, {
                            upsert: true
                        })

                        //msgs

                        message.channel.send(embedForMoney)

                        coolDown.add(message.author.id)
                        setTimeout(() => {
                            coolDown.delete(message.author.id)
                        }, cdSecs * 1000)
                    } else {

                        const moneytogive = Math.floor(Math.random() * 100000)
                        const moneyAmount = parseFloat(moneytogive) + parseFloat(userresult.money)

                        //templates
                        const embedForMoney = new Discord.MessageEmbed()
                            .setTitle(`$${moneytogive}`)
                            .setDescription(`You just got $${moneytogive} BBC`)
                            .setColor("BLACK")
                            .setFooter(`Your new balance is $${moneyAmount} BBC`)

                        //database

                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: moneyAmount
                        }, {
                            upsert: true
                        })

                        //msgs

                        message.channel.send(embedForMoney)

                        coolDown.add(message.author.id)
                        setTimeout(() => {
                            coolDown.delete(message.author.id)
                        }, cdSecs * 1000)
                    }

                } else {
                    if (coolDown.has(message.author.id)) {
                        return message.channel.send("Please return tommorrow")
                    }

                    const userresult = await userSchema.findOne({ _id: user })

                    if (!userresult || !userresult.money) {
                        const moneytogive = Math.floor(Math.random() * 10000)
                        const moneyAmount = parseFloat(moneytogive) + parseFloat("1000")

                        //templates
                        const embedForMoney = new Discord.MessageEmbed()
                            .setTitle(`$${moneytogive}`)
                            .setDescription(`You just got $${moneytogive} BBC`)
                            .setColor("BLACK")
                            .setFooter(`Your new balance is $${moneyAmount} BBC`)

                        //database

                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: moneyAmount
                        }, {
                            upsert: true
                        })

                        //msgs

                        message.channel.send(embedForMoney)

                        coolDown.add(message.author.id)
                        setTimeout(() => {
                            coolDown.delete(message.author.id)
                        }, cdSecs * 1000)
                    } else {

                        const moneytogive = Math.floor(Math.random() * 10000)
                        const moneyAmount = parseFloat(moneytogive) + parseFloat(userresult.money)

                        //templates
                        const embedForMoney = new Discord.MessageEmbed()
                            .setTitle(`$${moneytogive}`)
                            .setDescription(`You just got $${moneytogive} BBC`)
                            .setColor("BLACK")
                            .setFooter(`Your new balance is $${moneyAmount} BBC`)

                        //database

                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: moneyAmount
                        }, {
                            upsert: true
                        })

                        //msgs

                        message.channel.send(embedForMoney)

                        coolDown.add(message.author.id)
                        setTimeout(() => {
                            coolDown.delete(message.author.id)
                        }, cdSecs * 1000)
                    }

                }

            } finally {
                mongoose.connection.close()

            }
        })
    }
}
