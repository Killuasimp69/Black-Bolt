const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['bet'],
    expectedArgs: '(amount)',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, args, Discord, client, mongo) => {
        const user = message.member.user

        if (isNaN(args[0])) {
            return message.channel.send("Please provide a valid amount")
        }

        if(parseFloat(args[0]) < parseFloat(6)) {
            return message.channel.send("Please bet more than 5 BBC")
        }

        await mongo().then(async (mongoose) => {
            try {

                const userResult = await userSchema.findOne({ _id: user })
                const coinflip = Math.floor(Math.random() * 2) + 1

                //template

                const embedForBetLose = new Discord.MessageEmbed()
                    .setAuthor(message.member.displayName, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setTitle(`Bet - LOSE`)
                    .setThumbnail("https://cdn.discordapp.com/attachments/860400894578786344/861516683196629012/lose_bet.jpg")
                    .setColor("RED")

                const embedForBetWin = new Discord.MessageEmbed()
                    .setAuthor(message.member.displayName, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setTitle(`Bet - WIN`)
                    .setThumbnail("https://cdn.discordapp.com/attachments/860400894578786344/861519854448279581/real_u_win.png")
                    .setColor("GREEN")

                //database

                if (coinflip == 1) {
                    //lose
                    if (!userResult || !userResult.money) {
                        //no user result
                        if (parseFloat("1000") < parseFloat(args[0])) {
                            //not enough money
                            await userSchema.findOneAndUpdate({
                                _id: user
                            }, {
                                money: "1000"
                            }, {
                                upsert: true
                            })
                            return message.channel.send("You dont have enough BBC")
                        }
                        const newuseramt9 = parseFloat("1000") - parseFloat(args[0])
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: newuseramt9
                        }, {
                            upsert: true
                        })
                        embedForBetLose.setDescription(`You just lost **${args[0]} BBC!**
                        
                        *Balance:* ***${newuseramt9} BBC***`)
                        return message.channel.send(embedForBetLose)
                    } else {
                        //lose 
                        //yes user result
                        if (parseFloat(userResult.money) < parseFloat(args[0])) {
                            //not enough money
                            return message.channel.send("You dont have enough BBC")
                        }
                        //yes enough money
                        const newuseramt6 = parseFloat(userResult.money) - parseFloat(args[0])
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: newuseramt6
                        }, {
                            upsert: true
                        })
                        embedForBetLose.setDescription(`You just lost **${args[0]} BBC!**
                        
                        *Balance:* ***${newuseramt6} BBC***`)
                        return message.channel.send(embedForBetLose)
                    }
                } else {
                    if (coinflip == 2) {
                        //win
                        if (!userResult || !userResult.money) {
                            //no user result
                            if (parseFloat("1000") < parseFloat(args[0])) {
                                //not enough money
                                await userSchema.findOneAndUpdate({
                                    _id: user
                                }, {
                                    money: "1000"
                                }, {
                                    upsert: true
                                })
                                return message.channel.send("You dont have enough BBC")
                            }
                            const newuseramt3 = parseFloat("1000") + parseFloat(args[0])
                            await userSchema.findOneAndUpdate({
                                _id: user
                            }, {
                                money: newuseramt3
                            }, {
                                upsert: true
                            })
                            embedForBetWin.setDescription(`You just won **${args[0]} BBC!**
                        
                            *Balance:* ***${newuseramt3} BBC***`)
                            return message.channel.send(embedForBetWin)
                        } else {
                            //win
                            //yes user result
                            if (parseFloat(userResult.money) < parseFloat(args[0])) {
                                //not enough money
                                return message.channel.send("You dont have enough BBC")
                            }
                            //yes enough money
                            const newuseramt2 = parseFloat(userResult.money) + parseFloat(args[0])
                            await userSchema.findOneAndUpdate({
                                _id: user
                            }, {
                                money: newuseramt2
                            }, {
                                upsert: true
                            })
                            embedForBetWin.setDescription(`You just Won **${args[0]} BBC!**
                        
                        *Balance:* ***${newuseramt2} BBC***`)
                            return message.channel.send(embedForBetWin)
                        }
                    } else {
                        message.channel.send("Randomize error")
                    }
                }

            } finally {
                mongoose.connection.close()
            }
        })
    }
}