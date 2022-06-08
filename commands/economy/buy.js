const Items = require("../../items.json")
const { prefix } = require("../../config.json")
const userSchema = require('../../schemas/userSchema')
const ItemSchema = require('../../schemas/ItemSchema')
let cdNSecs = 43200

module.exports = {
    commands: ['buy'],
    expectedArgs: '(item) (other)',
    minArgs: 1,
    maxArgs: 3,
    permissionError: "You need more permissions",
    economyCheck: "true",
    callback: async (message, args, Discord, client, mongo) => {
        if (message.guild === null) {
            return
        }
        const user = message.member.user

        if (message.guild.id != '804323987106168842') return message.channel.send("This command cannot be used in this server")

        await mongo().then(async (mongoose) => {
            try {
                const userresult = await userSchema.findOne({ _id: user })

                //fuctions
                //vanity
                async function VanityRole() {
                    if (!userresult || parseFloat(userresult.money) <= parseFloat(Items.Other.VanityCustomRole.Price)) {
                        return message.channel.send("You do not have enough BBC.")
                    }

                    const VanityRole = new Discord.MessageEmbed()
                        .setAuthor(`${Items.Other.VanityCustomRole.Name} | Purchased`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setColor("BLACK")
                        .setDescription(`**${Items.Other.VanityCustomRole.Price}** BBC has been deducted from your account. ${Items.Other.VanityCustomRole.Info}`)
                    message.channel.send(VanityRole)

                    const channel = client.channels.cache.find(channel => channel.id === "936487024347713536")

                    const VanityRoleTransaction = new Discord.MessageEmbed()
                        .setAuthor(`${Items.Other.VanityCustomRole.Name} | Purchased`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .addFields({
                            name: "Member:",
                            value: message.member.user.tag
                        }, {
                            name: "Product:",
                            value: Items.Other.VanityCustomRole.Name
                        }, {
                            name: "Price:",
                            value: Items.Other.VanityCustomRole.Price + "BBC"
                        })
                        .setColor("RED")
                    channel.send(VanityRoleTransaction)
                }

                //mute

                function MuteMember() {
                    if (!userresult || parseFloat(userresult.money) <= parseFloat(Items.Other.MuteUser.Price)) {
                        return message.channel.send("You do not have enough BBC.")
                    }

                    const muteRole = message.member.guild.roles.cache.find(role => role.id === "840074523659599882");
                    message.mentions.members.first().roles.add(muteRole);
                    const embedForMuteMember = new Discord.MessageEmbed()
                        .setAuthor(`${message.mentions.members.first().displayName} | Muted`, message.mentions.members.first().user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setColor("BLACK")
                        .setDescription(`${message.mentions.members.first().displayName} has been muted for 12 hours.`)
                        .setFooter(`${Items.Other.MuteUser.Price} BBC has been deducted from your acc`)
                    message.channel.send(embedForMuteMember)

                    setTimeout(() => {
                        const muteRole = message.member.guild.roles.cache.find(role => role.id === "840074523659599882");
                        message.mentions.members.first().roles.remove(muteRole);
                    }, cdNSecs * 1000)

                    const channel = client.channels.cache.find(channel => channel.id === "936487024347713536")

                    const VanityRoleTransaction = new Discord.MessageEmbed()
                        .setAuthor(`${Items.Other.MuteUser.Name} | Purchased`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .addFields({
                            name: "Member:",
                            value: message.member.user.tag
                        }, {
                            name: "Product:",
                            value: Items.Other.MuteUser.Name
                        }, {
                            name: "Price:",
                            value: Items.Other.MuteUser.Price + "BBC"
                        })
                        .setColor("BLACK")
                    channel.send(VanityRoleTransaction)
                }

                //execute here
                const ToUpperCase = args[0].toUpperCase()

                if (ToUpperCase == Items.Other.VanityCustomRole.Name.toUpperCase() || ToUpperCase == Items.Other.MuteUser.Name.toUpperCase()) {

                    if (ToUpperCase === Items.Other.MuteUser.Name.toUpperCase()) {
                        if (!userresult || parseFloat(userresult.money) <= parseFloat(Items.Other.MuteUser.Price)) {
                            return message.channel.send("You do not have enough BBC.")
                        }
                        if (!args[1] || !args[1].startsWith("<@")) {
                            return message.channel.send("You must ping someone to mute")
                        }
                        if (message.mentions.members.first().hasPermission(`BAN_MEMBERS`)) {
                            return message.channel.send("You cannot mute that user.")
                        }
                        MuteMember()
                        const monay = parseFloat(userresult.money) - parseFloat(Items.Other.MuteUser.Price)
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: monay
                        }, {
                            upsert: true
                        })

                    } else if (ToUpperCase === Items.Other.VanityCustomRole.Name.toUpperCase()) {

                        VanityRole()
                        const Money = parseFloat(userresult.money) - parseFloat(Items.Other.VanityCustomRole.Price)
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: Money
                        }, {
                            upsert: true
                        })

                    }
                } else if (ToUpperCase.startsWith("LEVEL")) {
                    if (isNaN(args[1])) {
                        return message.channel.send("Please specify a level to buy.")
                    }
                    if (!userresult || !userresult.level) {

                        //Level 1 buy here

                        if (parseFloat(args[1]) != 1) {
                            return message.channel.send("You cannot buy that level.")
                        }

                        if (!userresult || !userresult.money || parseFloat(Items.Levels.Level1.Price) >= parseFloat(userresult.money)) {
                            return message.channel.send("You do not have enough BBC.")
                        }

                        const newMoneyAmount = parseFloat(userresult.money) - parseFloat(Items.Levels.Level1.Price)

                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: newMoneyAmount
                        }, {
                            upsert: true
                        })
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            level: 1
                        }, {
                            upsert: true
                        })
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            levelbadge: "<:Level1:969799269542412319>"
                        }, {
                            upsert: true
                        })

                        const role = message.guild.roles.cache.find(r => r.id === "970499708684468354")
                        message.member.roles.add(role)
                        const embedForLevels = new Discord.MessageEmbed()
                            .setAuthor(`${message.member.displayName} | Level 1`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setColor("#644223")
                            .setDescription(`You are now level 1 and have access to all level 1 perks.
                            [Click Here To View Perks](${"https://discordapp.com/channels/804323987106168842/838592520429764638/840364106501980181"} "View the perks")`)
                            .setFooter(`${Items.Levels.Level1.Price} BBC has been deducted from your account`)
                            .setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812847381057556/bronze-removebg-preview.png")
                        return message.channel.send(embedForLevels)
                    }
                    if (userresult.level == args[1] || parseFloat(userresult.level) >= parseFloat(args[1])) {
                        return message.channel.send("You cannot buy that level.")
                    }

                    if (args[1] == "2") {

                        //level 2

                        if (!userresult || !userresult.level || !userresult.money) {
                            return message.channel.send("You cannot buy that level.")
                        }

                        if (parseFloat(Items.Levels.Level2.Price) >= parseFloat(userresult.money)) {
                            return message.channel.send("You do not have enough BBC.")
                        }

                        if (userresult.level != 1) {
                            return message.channel.send("You cannot buy that level.")
                        }

                        const newMoneyAmount = parseFloat(userresult.money) - parseFloat(Items.Levels.Level2.Price)

                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: newMoneyAmount
                        }, {
                            upsert: true
                        })
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            level: 2
                        }, {
                            upsert: true
                        })
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            levelbadge: "<:Level2:969799270435782656>"
                        }, {
                            upsert: true
                        })

                        const role = message.guild.roles.cache.find(r => r.id === "970499864297353236")
                        message.member.roles.add(role)
                        const embedForLevels = new Discord.MessageEmbed()
                            .setAuthor(`${message.member.displayName} | Level 2`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setColor("#a7b2b9")
                            .setDescription(`You are now level 2 and have access to all level 2 perks.
                            [Click Here To View Perks](${"https://discordapp.com/channels/804323987106168842/838592520429764638/840364106501980181"} "Veiw the perks")`)
                            .setFooter(`${Items.Levels.Level2.Price} BBC has been deducted from your account`)
                            .setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812848458993694/silvaa-removebg-preview.png")
                        message.channel.send(embedForLevels)

                    } else if (args[1] == "3") {

                        //level 3

                        if (!userresult || !userresult.level || !userresult.money) {
                            return message.channel.send("You cannot buy that level.")
                        }

                        if (parseFloat(Items.Levels.Level3.Price) >= parseFloat(userresult.money)) {
                            return message.channel.send("You do not have enough BBC.")
                        }

                        if (userresult.level != 2) {
                            return message.channel.send("You cannot buy that level.")
                        }

                        const newMoneyAmount = parseFloat(userresult.money) - parseFloat(Items.Levels.Level3.Price)

                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: newMoneyAmount
                        }, {
                            upsert: true
                        })
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            level: 3
                        }, {
                            upsert: true
                        })
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            levelbadge: "<:Level3:969799270347735081>"
                        }, {
                            upsert: true
                        })

                        const role = message.guild.roles.cache.find(r => r.id === "970500010938613760")
                        message.member.roles.add(role)
                        const embedForLevels = new Discord.MessageEmbed()
                            .setAuthor(`${message.member.displayName} | Level 3`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setColor("#f2ba2d")
                            .setDescription(`You are now level 3 and have access to all level 3 perks.
                            [Click Here To View Perks](${"https://discordapp.com/channels/804323987106168842/838592520429764638/840364106501980181"} "View the perks")`)
                            .setFooter(`${Items.Levels.Level3.Price} BBC has been deducted from your account`)
                            .setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812847628546078/gowld-removebg-preview.png")
                        message.channel.send(embedForLevels)

                    } else if (args[1] == "4") {

                        //level 4

                        if (!userresult || !userresult.level || !userresult.money) {
                            return message.channel.send("You do not have enough BBC.")
                        }

                        if (parseFloat(Items.Levels.Level4.Price) >= parseFloat(userresult.money)) {
                            return message.channel.send("You do not have enough BBC.")
                        }

                        if (userresult.level != 3) {
                            return message.channel.send("You cannot buy that level.")
                        }

                        const newMoneyAmount = parseFloat(userresult.money) - parseFloat(Items.Levels.Level4.Price)

                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: newMoneyAmount
                        }, {
                            upsert: true
                        })
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            level: 4
                        }, {
                            upsert: true
                        })
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            levelbadge: "<:Level4:969799270251237436>"
                        }, {
                            upsert: true
                        })

                        const role = message.guild.roles.cache.find(r => r.id === "970500037517922356")
                        message.member.roles.add(role)
                        const embedForLevels = new Discord.MessageEmbed()
                            .setAuthor(`${message.member.displayName} | Level 4`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setColor("#9b2b61")
                            .setDescription(`You are now level 4 and have access to all level 4 perks.
                            [Click Here To View Perks](${"https://discordapp.com/channels/804323987106168842/838592520429764638/840364106501980181"} "View the perks")`)
                            .setFooter(`${Items.Levels.Level4.Price} BBC has been deducted from your account`)
                            .setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812848165400616/Plat-removebg-preview.png")
                        message.channel.send(embedForLevels)

                    } else if (args[1] == "5") {

                        //level 5

                        if (!userresult || !userresult.level || !userresult.money) {
                            return message.channel.send("You cannot buy that level.")
                        }

                        if (parseFloat(Items.Levels.Level5.Price) >= parseFloat(userresult.money)) {
                            return message.channel.send("You do not have enough BBC.")
                        }

                        if (userresult.level != 4) {
                            return message.channel.send("You cannot buy that level.")
                        }

                        const newMoneyAmount = parseFloat(userresult.money) - parseFloat(Items.Levels.Level5.Price)

                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: newMoneyAmount
                        }, {
                            upsert: true
                        })
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            level: 5
                        }, {
                            upsert: true
                        })
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            levelbadge: "<:Level5:969799270427402340>"
                        }, {
                            upsert: true
                        })

                        const role = message.guild.roles.cache.find(r => r.id === "970500059705798716")
                        message.member.roles.add(role)
                        const embedForLevels = new Discord.MessageEmbed()
                            .setAuthor(`${message.member.displayName} | Level 5`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setColor("#a084a3")
                            .setDescription(`You are now level 5 and have access to all level 5 perks.
                            [Click Here To View Perks](${"https://discordapp.com/channels/804323987106168842/838592520429764638/840364106501980181"} "View the perks")`)
                            .setFooter(`${Items.Levels.Level5.Price} BBC has been deducted from your account`)
                            .setThumbnail("https://cdn.discordapp.com/attachments/905726406552600586/969812847917932554/Highest-removebg-preview.png")
                        message.channel.send(embedForLevels)

                    } else {
                        return message.channel.send("That is not a purchasable level.")
                    }

                } else if (ToUpperCase == "HOUSE") {
                    if (!userresult || !userresult.money) {
                        return message.channel.send("You do not have enough BBC.")
                    }

                    if (args[1].toUpperCase() == "LARGE") {
                        if (parseFloat(userresult.money) <= parseFloat(Items.Houses.Large.Price)) {
                            return message.channel.send("You do not have enough BBC.")
                        }
                        const ItemResult = await ItemSchema.find({ type: "Large-House" })
                        if (!ItemResult[0]) {
                            return message.channel.send("There are no large houses avalible right now.")
                        }
                        const unowned = ItemResult.find(({ owner }) => owner === 'false')
                        if (!unowned || unowned == "undefined") {
                            return message.channel.send("There are no large houses avalible right now.")
                        }

                        if (!userresult.houses) { } else {
                            const splitA = userresult.houses.split(/[ ]+/)
                            if (splitA[4]) {
                                return message.channel.send("You can only own 5 houses")
                            }
                        }

                        await ItemSchema.findOneAndUpdate({
                            _id: unowned._id
                        }, {
                            owner: message.member.id
                        }, {
                            upsert: true
                        })
                        const Money = parseFloat(userresult.money) - parseFloat(Items.Houses.Large.Price)
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: Money
                        }, {
                            upsert: true
                        })
                        if (!userresult.houses) {
                            const items = unowned._id + " "
                            await userSchema.findOneAndUpdate({
                                _id: user
                            }, {
                                houses: items
                            }, {
                                upsert: true
                            })
                        } else {
                            const items = userresult.houses + unowned._id + " "
                            await userSchema.findOneAndUpdate({
                                _id: user
                            }, {
                                houses: items
                            }, {
                                upsert: true
                            })
                        }
                        const embedForLrgeHouse = new Discord.MessageEmbed()
                            .setAuthor(`${message.member.displayName} | New House`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setDescription("Congratulations on your new house!")
                            .setThumbnail(unowned.image)
                            .setColor("BLACK")
                            .setFooter(`${Items.Houses.Large.Price} BBC has been deducted from your accunt.`)
                        message.channel.send(embedForLrgeHouse)

                    } else if (args[1].toUpperCase() == "MEDIUM") {
                        if (parseFloat(userresult.money) <= parseFloat(Items.Houses.Medium.Price)) {
                            return message.channel.send("You do not have enough BBC.")
                        }
                        const ItemResult = await ItemSchema.find({ type: "Medium-House" })
                        if (!ItemResult[0]) {
                            return message.channel.send("There are no medium houses avalible right now.")
                        }
                        const unowned = ItemResult.find(({ owner }) => owner === 'false')
                        if (!unowned || unowned == "undefined") {
                            return message.channel.send("There are no medium houses avalible right now.")
                        }
                        if (!userresult.houses) { } else {
                            const splitA = userresult.houses.split(/[ ]+/)
                            if (splitA[4]) {
                                return message.channel.send("You can only own 5 houses")
                            }
                        }
                        await ItemSchema.findOneAndUpdate({
                            _id: unowned._id
                        }, {
                            owner: message.member.id
                        }, {
                            upsert: true
                        })
                        const Money = parseFloat(userresult.money) - parseFloat(Items.Houses.Medium.Price)
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: Money
                        }, {
                            upsert: true
                        })
                        if (!userresult.houses) {
                            const items = unowned._id + " "
                            await userSchema.findOneAndUpdate({
                                _id: user
                            }, {
                                houses: items
                            }, {
                                upsert: true
                            })
                        } else {
                            const items = userresult.houses + unowned._id + " "
                            await userSchema.findOneAndUpdate({
                                _id: user
                            }, {
                                houses: items
                            }, {
                                upsert: true
                            })
                        }
                        const embedForMdiumHouse = new Discord.MessageEmbed()
                            .setAuthor(`${message.member.displayName} | New House`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setDescription("Congratulations on your new house!")
                            .setThumbnail(unowned.image)
                            .setColor("BLACK")
                            .setFooter(`${Items.Houses.Medium.Price} BBC has been deducted from your accunt.`)
                        message.channel.send(embedForMdiumHouse)

                    } else if (args[1].toUpperCase() == "SMALL") {
                        if (parseFloat(userresult.money) <= parseFloat(Items.Houses.Small.Price)) {
                            return message.channel.send("You do not have enough BBC.")
                        }
                        const ItemResult = await ItemSchema.find({ type: "Small-House" })
                        if (!ItemResult[0]) {
                            return message.channel.send("There are no small houses avalible right now.")
                        }
                        const unowned = ItemResult.find(({ owner }) => owner === 'false')
                        if (!unowned || unowned == "undefined") {
                            return message.channel.send("There are no small houses avalible right now.")
                        }
                        if (!userresult.houses) { } else {
                            const splitA = userresult.houses.split(/[ ]+/)
                            if (splitA[4]) {
                                return message.channel.send("You can only own 5 houses")
                            }
                        }
                        await ItemSchema.findOneAndUpdate({
                            _id: unowned._id
                        }, {
                            owner: message.member.id
                        }, {
                            upsert: true
                        })
                        const Money = parseFloat(userresult.money) - parseFloat(Items.Houses.Small.Price)
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: Money
                        }, {
                            upsert: true
                        })
                        if (!userresult.houses) {
                            const items = unowned._id + " "
                            await userSchema.findOneAndUpdate({
                                _id: user
                            }, {
                                houses: items
                            }, {
                                upsert: true
                            })
                        } else {
                            const items = userresult.houses + unowned._id + " "
                            await userSchema.findOneAndUpdate({
                                _id: user
                            }, {
                                houses: items
                            }, {
                                upsert: true
                            })
                        }
                        const embedForMdiumHouse = new Discord.MessageEmbed()
                            .setAuthor(`${message.member.displayName} | New House`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                            .setDescription("Congratulations on your new house!")
                            .setThumbnail(unowned.image)
                            .setColor("BLACK")
                            .setFooter(`${Items.Houses.Small.Price} BBC has been deducted from your accunt.`)
                        message.channel.send(embedForMdiumHouse)
                    } else if (ToUpperCase == "CARS") {
                        return message.channel.send("Cars are currently unavailable")
                    } else if (ToUpperCase == "STOCKS") {
                        return message.channel.send("Stocks are on there way and will be releasing soon.")
                        if (isNaN(args[1])) {
                            message.channel.send("You must specify to buy a number.")
                        }
                        if (parseFloat(args[1]) <= 1) {
                            return message.channel.send("You must buy more than 1 share.")
                        }
                    } else if (ToUpperCase == "TROPHY") {
                        return message.channel.send("Sorry, Trophys are coming soon.")
                        const args1ToUpperCase = args[1].toUpperCase()
                        if (args1ToUpperCase == "MEEMOO") {
                            //MEEMOO
                            if (!userresult || !userresult.money) {
                                return message.channel.send("You do not have enough Money.")
                            }
                            if (parseFloat(userresult.money) <= parseFloat(Items.Trophys.MeeMoo.Price)) {
                                return message.channel.send("You do not have enough BBC.")
                            }
                            if (message.member.roles.cache.has('892770075977859133')) {
                                return message.channel.send("You already own this Trophy.")
                            }
                        } else if (args1ToUpperCase == "KING") {
                            //KING
                            if (!userresult || !userresult.money) {
                                return message.channel.send("You do not have enough Money.")
                            }
                            if (parseFloat(userresult.money) <= parseFloat(Items.Trophys.King.Price)) {
                                return message.channel.send("You do not have enough BBC.")
                            }
                            if (message.member.roles.cache.has('983924171480399962')) {
                                return message.channel.send("You already own this Trophy.")
                            }
                        } else {
                            return message.channel.send("That is not a trophy")
                        }
                    }
                } else {
                    message.channel.send("That is not an item for sale.")
                }
            } finally {
                mongoose.connection.close()
            }
        })
    }
}
