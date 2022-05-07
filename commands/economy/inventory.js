const userSchema = require('../../schemas/userSchema')
const ItemSchema = require("../../schemas/ItemSchema")
const { prefix } = require('../../config.json')
const mongo = require("../../mongo")

module.exports = {
    commands: ['inventory', 'inv'],
    expectedArgs: '(NFT)',
    minArgs: 0,
    maxArgs: 1,
    callback: async (message, args, Discord, client) => {
        if(message.guild === null) {
            console.log("returning")
            return
        }
        const user = message.member.user
        await mongo().then(async (mongoose) => {
            try {
                const userResult = await userSchema.findOne({ _id: user })
                let housesID = userResult.houses.split(/[ ]+/)
                let lowerCase = "false"
                if (args[0]) {
                    lowerCase = housesID[0].toLowerCase()
                }
                if (args[0] == "houses" || lowerCase == "houses") {
                    if (!userResult || !userResult.money || !userResult.houses) {
                        return message.channel.send("You dont have any houses.")
                    }

                    let embedForHouses = new Discord.MessageEmbed()
                        .setColor("BLACK")
                        .setAuthor(`${message.member.displayName} | Houses`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))

                    if (housesID[4]) {
                        const house1 = await ItemSchema.findOne({ _id: housesID[0] })
                        const house2 = await ItemSchema.findOne({ _id: housesID[1] })
                        const house3 = await ItemSchema.findOne({ _id: housesID[2] })
                        const house4 = await ItemSchema.findOne({ _id: housesID[3] })
                        const house5 = await ItemSchema.findOne({ _id: housesID[4] })
                        embedForHouses.addFields(
                            {
                                name: house1.name,
                                value: `> 💵 **${house1.worth} BBC** | ID: ${house1._id}`
                            }, {
                            name: house2.name,
                            value: `> 💵 **${house2.worth} BBC** | ID: ${house2._id}`
                        }, {
                            name: house3.name,
                            value: `> 💵 **${house3.worth} BBC** | ID: ${house3._id}`
                        }, {
                            name: house4.name,
                            value: `> 💵 **${house4.worth} BBC** | ID: ${house4._id}`
                        }, {
                            name: house5.name,
                            value: `> 💵 **${house5.worth} BBC** | ID: ${house5._id}`
                        })
                        message.channel.send(embedForHouses)
                    } else if (housesID[3]) {
                        const house1 = await ItemSchema.findOne({ _id: housesID[0] })
                        const house2 = await ItemSchema.findOne({ _id: housesID[1] })
                        const house3 = await ItemSchema.findOne({ _id: housesID[2] })
                        const house4 = await ItemSchema.findOne({ _id: housesID[3] })
                        embedForHouses.addFields(
                            {
                                name: house1.name,
                                value: `> 💵 **${house1.worth} BBC** | ID: ${house1._id}`
                            }, {
                            name: house2.name,
                            value: `> 💵 **${house2.worth} BBC** | ID: ${house2._id}`
                        }, {
                            name: house3.name,
                            value: `> 💵 **${house3.worth} BBC** | ID: ${house3._id}`
                        }, {
                            name: house4.name,
                            value: `> 💵 **${house4.worth} BBC** | ID: ${house4._id}`
                        }, {
                            name: "Empty",
                            value: `Slot Empty`
                        })
                        message.channel.send(embedForHouses)
                    } else if (housesID[2]) {
                        const house1 = await ItemSchema.findOne({ _id: housesID[0] })
                        const house2 = await ItemSchema.findOne({ _id: housesID[1] })
                        const house3 = await ItemSchema.findOne({ _id: housesID[2] })
                        embedForHouses.addFields(
                            {
                                name: house1.name,
                                value: `> 💵 **${house1.worth} BBC** | ID: ${house1._id}`
                            }, {
                            name: house2.name,
                            value: `> 💵 **${house2.worth} BBC** | ID: ${house2._id}`
                        }, {
                            name: house3.name,
                            value: `> 💵 **${house3.worth} BBC** | ID: ${house3._id}`
                        }, {
                            name: "Empty",
                            value: `Slot Empty`
                        }, {
                            name: "Empty",
                            value: `Slot Empty`
                        })
                        message.channel.send(embedForHouses)
                    } else if (housesID[1]) {
                        const house1 = await ItemSchema.findOne({ _id: housesID[0] })
                        const house2 = await ItemSchema.findOne({ _id: housesID[1] })
                        embedForHouses.addFields(
                            {
                                name: house1.name,
                                value: `> 💵 **${house1.worth} BBC** | ID: ${house1._id}`
                            }, {
                            name: house2.name,
                            value: `> 💵 **${house2.worth} BBC** | ID: ${house2._id}`
                        }, {
                            name: "Empty",
                            value: `Slot Empty`
                        }, {
                            name: "Empty",
                            value: `Slot Empty`
                        }, {
                            name: "Empty",
                            value: `Slot Empty`
                        })
                        message.channel.send(embedForHouses)
                    } else if (housesID[0]) {
                        const house1 = await ItemSchema.findOne({ _id: housesID[0] })
                        embedForHouses.addFields(
                            {
                                name: house1.name,
                                value: `> 💵 **${house1.worth} BBC** | ID: ${house1._id}`
                            }, {
                            name: "Empty",
                            value: `Slot Empty`
                        }, {
                            name: "Empty",
                            value: `Slot Empty`
                        }, {
                            name: "Empty",
                            value: `Slot Empty`
                        }, {
                            name: "Empty",
                            value: `Slot Empty`
                        })
                        message.channel.send(embedForHouses)
                    } else {
                        message.channel.send("Error 404")
                    }
                } else if (lowerCase == 'cars' || lowerCase == 'car') {
                    return message.channel.send("Cars are currently unavalible.")
                    if (!userResult || !userResult.money) {
                        return message.channel.send("You dont have any Cars.")
                    }
                } else if (!housesID[0]) {
                    const embedForMenu = new Discord.MessageEmbed()
                        .setAuthor(`${message.member.displayName} | Inventory`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setColor("BLACK")
                        .addFields({
                            name: "🏘️ Houses",
                            value: `\`\`${prefix}inventory houses\`\``,
                            inline: true
                        }, {
                            name: "🚙 Cars",
                            value: `\`\`${prefix}inventory cars\`\``,
                            inline: true
                        })
                        .setDescription("Here is the menu to navigate your inventory.")
                        .setFooter(`To get more information on a NFT please simply just type ${prefix}info (item)`)
                    message.channel.send(embedForMenu)
                } else {
                    message.channel.send("That is not a NFT for sale.")
                }
            } finally {
                mongoose.connection.close()
            }
        })
    }
}