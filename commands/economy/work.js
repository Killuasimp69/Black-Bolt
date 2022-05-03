const userSchema = require('../../schemas/userSchema')
const { prefix } = require('../../config.json')
let coolDownNormal = new Set()
let cdNSecs = 300
let coolDownBooster = new Set()
let cdBSecs = 60

function getDifference(a, b) {
    return Math.abs(a - b)
}

const workJobs = [
    "You cleaned the floors and made",
    "You delived 9000 pizzas and made",
    "You made 8734 dollars counterfreight cash witch eaquls to",
    "You were higherd for somones stripper birthday party and made",
    "Your hitman skills were higherd and you made",
    "You changed the HDMI channel on your grandmas tv and made",
    "Some crack head on the street told you he would pay you if you gave him a succ. You made",
    "You found 50 ETH on a USB from 10 years ago. Thats the same as",
    "Somone robbed you for 100 mil. Then they relised thats kinda fucked so they gave it all back with a bonus of"]

module.exports = {
    commands: ['work'],
    callback: async (message, args, Discord, client, mongo) => {
        if(message.guild === null) {
            console.log("returning")
            return
        }
        const user = message.member
        await mongo().then(async (mongoose) => {
            try {
                const userResult = await userSchema.findOne({ _id: user.user })
                const randomJobs = Math.floor(Math.random() * (workJobs.length))
                if (message.member.roles.cache.has('808120014690844713')) {
                    if (coolDownBooster.has(message.author.id)) {
                        return message.channel.send("Please wait 1 more minute")
                    } else {

                        const NoLevel = Math.floor(Math.random() * 1000)
                        const Level1 = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000)
                        const Level2 = Math.floor(Math.random() * (20000 - 10000 + 1) + 10000)
                        const Level3 = Math.floor(Math.random() * (40000 - 20000 + 1) + 20000)
                        const Level4 = Math.floor(Math.random() * (80000 - 40000 + 1) + 40000)
                        const Level5 = Math.floor(Math.random() * (120000 - 80000 + 1) + 80000)

                        if (!userResult || !userResult.money || !userResult.level) {

                            const newUserMoney = parseFloat(NoLevel) + parseFloat(1000)

                            await userSchema.findOneAndUpdate({
                                _id: user.user
                            }, {
                                money: newUserMoney
                            }, {
                                upsert: true
                            })

                            const embedForWorkCmd = new Discord.MessageEmbed()
                                .setAuthor(message.member.displayName, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                                .setColor("BLACK")
                                .setTitle(`You made ${NoLevel} BBC`)
                                .setDescription(`${workJobs[randomJobs]} **${NoLevel} BBC**`)
                            message.channel.send(embedForWorkCmd)

                            //cooldown
                            coolDownBooster.add(message.author.id)
                            return setTimeout(() => {
                                coolDownBooster.delete(message.author.id)
                            }, cdBSecs * 1000)

                        }

                        const embedForWorkCmd = new Discord.MessageEmbed()

                        let Money = "false"

                        if (userResult.level == "1") {
                            const difference = Math.abs(1000 - parseFloat(Level1))
                            embedForWorkCmd.setFooter(`Level 1 gave you ${difference} extra BBC`)
                            embedForWorkCmd.setColor("#644223")
                            embedForWorkCmd.setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812847381057556/bronze-removebg-preview.png")
                            Money = Level1
                        } else if (userResult.level == "2") {
                            const difference = Math.abs(10000 - parseFloat(Level2))
                            embedForWorkCmd.setFooter(`Level 2 gave you ${difference} extra BBC`)
                            embedForWorkCmd.setColor("#a7b2b9")
                            embedForWorkCmd.setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812848458993694/silvaa-removebg-preview.png")
                            Money = Level2
                        } else if (userResult.level == "3") {
                            const difference = Math.abs(20000 - parseFloat(Level3))
                            embedForWorkCmd.setFooter(`Level 3 gave you ${difference} extra BBC`)
                            embedForWorkCmd.setColor("#f2ba2d")
                            embedForWorkCmd.setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812847628546078/gowld-removebg-preview.png")
                            Money = Level3
                        } else if (userResult.level == "4") {
                            const difference = Math.abs(40000 - parseFloat(Level4))
                            embedForWorkCmd.setFooter(`Level 4 gave you ${difference} extra BBC`)
                            embedForWorkCmd.setColor("#9b2b61")
                            embedForWorkCmd.setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812848165400616/Plat-removebg-preview.png")
                            Money = Level4
                        } else if (userResult.level == "5") {
                            const difference = Math.abs(80000 - Level5)
                            embedForWorkCmd.setFooter(`Level 5 gave you ${difference} extra BBC`)
                            embedForWorkCmd.setColor("#a084a3")
                            embedForWorkCmd.setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812847917932554/Highest-removebg-preview.png")
                            Money = Level5
                        }

                        if (isNaN(Money)) {
                            return message.channel.send("Money not set correctly. Please contact a admin.")
                        }

                        const newMoney = parseFloat(userResult.money) + parseFloat(Money)

                        await userSchema.findOneAndUpdate({
                            _id: user.user
                        }, {
                            money: newMoney
                        }, {
                            upsert: true
                        })

                        embedForWorkCmd
                            .setAuthor(message.member.displayName, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setColor("BLACK")
                            .setTitle(`You made ${Money} BBC`)
                            .setDescription(`${workJobs[randomJobs]} **${Money} BBC**`)
                        message.channel.send(embedForWorkCmd)

                        //cooldown
                        coolDownBooster.add(message.author.id)
                        setTimeout(() => {
                            coolDownBooster.delete(message.author.id)
                        }, cdBSecs * 1000)
                    }
                } else {
                    if (coolDownNormal.has(message.author.id)) {
                        return message.channel.send("Please wait 5 more minutes")
                    } else {
                        const userResult = await userSchema.findOne({ _id: user.user })

                        const NoLevel = Math.floor(Math.random() * 1000)
                        const Level1 = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000)
                        const Level2 = Math.floor(Math.random() * (20000 - 10000 + 1) + 10000)
                        const Level3 = Math.floor(Math.random() * (40000 - 20000 + 1) + 20000)
                        const Level4 = Math.floor(Math.random() * (80000 - 40000 + 1) + 40000)
                        const Level5 = Math.floor(Math.random() * (120000 - 80000 + 1) + 80000)

                        if (!userResult || !userResult.money || !userResult.level) {

                            const newUserMoney = parseFloat(NoLevel) + parseFloat(1000)

                            await userSchema.findOneAndUpdate({
                                _id: user.user
                            }, {
                                money: newUserMoney
                            }, {
                                upsert: true
                            })

                            const embedForWorkCmd = new Discord.MessageEmbed()
                                .setAuthor(message.member.displayName, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                                .setColor("BLACK")
                                .setTitle(`You made ${NoLevel} BBC`)
                                .setDescription(`${workJobs[randomJobs]} **${NoLevel} BBC**`)
                            message.channel.send(embedForWorkCmd)

                            //cooldown
                            coolDownNormal.add(message.author.id)
                            return setTimeout(() => {
                                coolDownNormal.delete(message.author.id)
                            }, cdBSecs * 1000)

                        }

                        let embedForWorkCmd = new Discord.MessageEmbed()

                        let Money = "false"

                        if (userResult.level == "1") {
                            const difference = Math.abs(1000 - Level1)
                            embedForWorkCmd.setFooter(`Level 1 gave you ${difference} extra BBC`)
                            embedForWorkCmd.setColor("#644223")
                            embedForWorkCmd.setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812847381057556/bronze-removebg-preview.png")
                            Money = Level1
                        } else if (userResult.level == "2") {
                            const difference = Math.abs(10000 - Level2)
                            embedForWorkCmd.setFooter(`Level 2 gave you ${difference} extra BBC`)
                            embedForWorkCmd.setColor("#a7b2b9")
                            embedForWorkCmd.setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812848458993694/silvaa-removebg-preview.png")
                            Money = Level2
                        } else if (userResult.level == "3") {
                            const difference = Math.abs(20000 - Level3)
                            embedForWorkCmd.setFooter(`Level 3 gave you ${difference} extra BBC`)
                            embedForWorkCmd.setColor("#f2ba2d")
                            embedForWorkCmd.setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812847628546078/gowld-removebg-preview.png")
                            Money = Level3
                        } else if (userResult.level == "4") {
                            const difference = Math.abs(40000 - Level4)
                            embedForWorkCmd.setFooter(`Level 4 gave you ${difference} extra BBC`)
                            embedForWorkCmd.setColor("#9b2b61")
                            embedForWorkCmd.setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812848165400616/Plat-removebg-preview.png")
                            Money = Level4
                        } else if (userResult.level == "5") {
                            const difference = Math.abs(80000 - Level5)
                            embedForWorkCmd.setFooter(`Level 5 gave you ${difference} extra BBC`)
                            embedForWorkCmd.setColor("#a084a3")
                            embedForWorkCmd.setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812847917932554/Highest-removebg-preview.png")
                            Money = Level5
                        }

                        embedForWorkCmd
                            .setAuthor(message.member.displayName, user.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setTitle(`You made ${Money} BBC`)
                            .setDescription(`${workJobs[randomJobs]} **${Money} BBC**`)

                        if (isNaN(Money)) {
                            return message.channel.send("Money not set correctly. Please contact a admin.")
                        }

                        const newMoney = parseFloat(userResult.money) + parseFloat(Money)

                        await userSchema.findOneAndUpdate({
                            _id: user.user
                        }, {
                            money: newMoney
                        }, {
                            upsert: true
                        })

                        message.channel.send(embedForWorkCmd)

                        //cooldown
                        coolDownNormal.add(message.author.id)
                        setTimeout(() => {
                            coolDownNormal.delete(message.author.id)
                        }, cdNSecs * 1000)
                    }
                }
            } finally {
                mongoose.connection.close()

            }
        })
    }
}