// @ts-nocheck
const userSchema = require('../../schemas/userSchema')
const itemSchema = require('../../schemas/ItemSchema')

module.exports = {
    commands: ['sell'],
    expectedArgs: '(itemID/item type) (inv num)',
    minArgs: 1,
    maxArgs: 2,
    economyCheck: "true",
    callback: async (message, args, Discord, client, mongo) => {
        if (message.guild === null) {
            return
        }
        const user = message.member.user
        await mongo().then(async (mongoose) => {
            try {
                const lowerCase = args[0].toLowerCase()
                if (isNaN(args[1])) {
                    return message.channel.send("Please specify a number")
                }

                const are = parseFloat(args[1]) - 1

                if (lowerCase == "house" || lowerCase == "houses")
                    if (args[1] == "1" || args[1] == "2" || args[1] == "3" || args[1] == "4" || args[1] == "5" || args[1] == "6" || args[1] == "7" || args[1] == "8" || args[1] == "9" || args[1] == "10") {
                        const userResult = await userSchema.findOne({ _id: user })
                        if (!userResult) {
                            return message.channel.send("You do not own any houses")
                        }
                        const argss = userResult.houses.split(/[ ]+/)
                        const toFetch = argss[are]
                        const itemResult = await itemSchema.findOne({ _id: toFetch })
                        if (!itemResult) {
                            return message.channel.send("That property dose not exist.")
                        }
                        if (itemResult.owner != message.author.id) {
                            return message.channel.send("You are not the owner of that property")
                        }

                        await itemSchema.findOneAndUpdate({
                            _id: toFetch
                        }, {
                            owner: "false"
                        }, {
                            upsert: true
                        })
                        let yes = "false"
                        if (argss[9]) {

                            if (args[1] == '1') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`, `${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`)
                                yes = cheese
                            } else if (args[1] == '2') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`, `${argss[0]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`)
                                yes = cheese
                            } else if (args[1] == '3') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`, `${argss[0]} ${argss[1]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`)
                                yes = cheese
                            } else if (args[1] == '4') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`)
                                yes = cheese
                            } else if (args[1] == '5') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`)
                                yes = cheese
                            } else if (args[1] == '6') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`)
                                yes = cheese
                            } else if (args[1] == '7') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[7]} ${argss[8]} ${argss[9]}`)
                                yes = cheese
                            } else if (args[1] == '8') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[8]} ${argss[9]}`)
                                yes = cheese
                            } else if (args[1] == '9') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[9]}`)
                                yes = cheese
                            } else if (args[1] == '10') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]} ${argss[9]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`)
                                yes = cheese
                            }
                            yes = cheese

                        } else if (argss[8]) {

                            if (args[1] == '1') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`, `${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`)
                                yes = cheese
                            } else if (args[1] == '2') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`, `${argss[0]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`)
                                yes = cheese
                            } else if (args[1] == '3') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`, `${argss[0]} ${argss[1]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`)
                                yes = cheese
                            } else if (args[1] == '4') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`)
                                yes = cheese
                            } else if (args[1] == '5') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`)
                                yes = cheese
                            } else if (args[1] == '6') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[6]} ${argss[7]} ${argss[8]}`)
                                yes = cheese
                            } else if (args[1] == '7') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[7]} ${argss[8]}`)
                                yes = cheese
                            } else if (args[1] == '8') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[8]}`)
                                yes = cheese
                            } else if (args[1] == '9') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]} ${argss[8]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`)
                                yes = cheese
                            }
                            yes = cheese

                        } else if (argss[7]) {

                            if (args[1] == '1') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`, `${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`)
                                yes = cheese
                            } else if (args[1] == '2') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`, `${argss[0]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`)
                                yes = cheese
                            } else if (args[1] == '3') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`, `${argss[0]} ${argss[1]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`)
                                yes = cheese
                            } else if (args[1] == '4') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`)
                                yes = cheese
                            } else if (args[1] == '5') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[5]} ${argss[6]} ${argss[7]}`)
                                yes = cheese
                            } else if (args[1] == '6') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[6]} ${argss[7]}`)
                                yes = cheese
                            } else if (args[1] == '7') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[7]}`)
                                yes = cheese
                            } else if (args[1] == '8') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]} ${argss[7]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]}`)
                                yes = cheese
                            }
                            yes = cheese

                        } else if (argss[6]) {

                            if (args[1] == '1') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]}`, `${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]}`)
                                yes = cheese
                            } else if (args[1] == '2') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]}`, `${argss[0]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]}`)
                                yes = cheese
                            } else if (args[1] == '3') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]}`, `${argss[0]} ${argss[1]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]}`)
                                yes = cheese
                            } else if (args[1] == '4') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[4]} ${argss[5]} ${argss[6]}`)
                                yes = cheese
                            } else if (args[1] == '5') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[5]} ${argss[6]}`)
                                yes = cheese
                            } else if (args[1] == '6') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[6]}`)
                                yes = cheese
                            } else if (args[1] == '7') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]} ${argss[6]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]}`)
                                yes = cheese
                            }
                            yes = cheese

                        } else if (argss[5]) {

                            if (args[1] == '1') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]}`, `${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]}`)
                                yes = cheese
                            } else if (args[1] == '2') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]}`, `${argss[0]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]}`)
                                yes = cheese
                            } else if (args[1] == '3') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]}`, `${argss[0]} ${argss[1]} ${argss[3]} ${argss[4]} ${argss[5]}`)
                                yes = cheese
                            } else if (args[1] == '4') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[4]} ${argss[5]}`)
                                yes = cheese
                            } else if (args[1] == '5') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[5]}`)
                                yes = cheese
                            } else if (args[1] == '6') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]} ${argss[5]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]}`)
                                yes = cheese
                            }

                        } else if (argss[4]) {

                            if (args[1] == '1') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]}`, `${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]}`)
                                yes = cheese
                            } else if (args[1] == '2') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]}`, `${argss[0]} ${argss[2]} ${argss[3]} ${argss[4]}`)
                                yes = cheese
                            } else if (args[1] == '3') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]}`, `${argss[0]} ${argss[1]} ${argss[3]} ${argss[4]}`)
                                yes = cheese
                            } else if (args[1] == '4') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[4]}`)
                                yes = cheese
                            } else if (args[1] == '5') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]} ${argss[4]}`, `${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]}`)
                                yes = cheese
                            }

                        } else if (argss[3]) {

                            if (args[1] == '1') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]}`, `${argss[1]} ${argss[2]} ${argss[3]}`)
                                yes = cheese
                            } else if (args[1] == '2') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]}`, `${argss[0]} ${argss[2]} ${argss[3]}`)
                                yes = cheese
                            } else if (args[1] == '3') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]}`, `${argss[0]} ${argss[1]} ${argss[3]}`)
                                yes = cheese
                            } else if (args[1] == '4') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]} ${argss[3]}`, `${argss[0]} ${argss[1]} ${argss[2]}`)
                                yes = cheese
                            }
                            
                        } else if (argss[2]) {

                            if (args[1] == '1') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]}`, `${argss[1]} ${argss[2]}`)
                                yes = cheese
                            } else if (args[1] == '2') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]}`, `${argss[0]} ${argss[2]}`)
                                yes = cheese
                            } else if (args[1] == '3') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]} ${argss[2]}`, `${argss[0]} ${argss[1]}`)
                                yes = cheese
                            }
                    
                        } else if (argss[1]) {

                            if (args[1] == '1') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]}`, `${argss[1]}`)
                                yes = cheese
                            } else if (args[1] == '2') {
                                const cheese = userResult.houses.replace(`${argss[0]} ${argss[1]}`, `${argss[0]}`)
                                yes = cheese
                            }

                        } else if (argss[0]) {
                            yes = ""
                        }

                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            houses: yes
                        }, {
                            upsert: true
                        })
                        const money = parseFloat(userResult.money) + parseFloat(itemResult.worth)
                        await userSchema.findOneAndUpdate({
                            _id: user
                        }, {
                            money: money
                        }, {
                            upsert: true
                        })

                        const embedForSell = new Discord.MessageEmbed()
                        .setAuthor(`${message.member.displayName} | Sold`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setColor("BLACK")
                        .addFields({
                            name: "House Name",
                            value: itemResult.name
                        }, {
                            name: "House Value",
                            value: itemResult.worth
                        }, {
                            name: "House Type",
                            value: itemResult.type
                        }, {
                            name: "House ID",
                            value: itemResult._id
                        })
                        .setThumbnail(itemResult.image)
                        message.channel.send(embedForSell)
                    }
            } finally {
                mongoose.connection.close()
            }
        })
    }
}