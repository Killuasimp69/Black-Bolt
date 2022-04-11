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
    callback: async (message, args, Discord, client, mongo) => {
        return message.channel.send("Sorry but this command is not yet available")
        const user = message.member.user
        const MessageContent = message.content.replace(`${prefix}buy `, ``)

        if (message.guild.id != '804323987106168842') return message.content.send("This command cannot be used in this server")

        await mongo().then(async (mongoose) => {
            try {
                const userresult = await userSchema.findOne({ _id: user })

                //fuctions
                //vanity
                async function VanityRole() {
                    if (!userresult || parseFloat(userresult.money) <= parseFloat(Items.VanityCustomRole.Price)) {
                        return message.channel.send("You do not have enough BBC.")
                    }

                    const VanityRole = new Discord.MessageEmbed()
                        .setAuthor(`${Items.VanityCustomRole.Name} | Purchased`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setColor("BLACK")
                        .setDescription(`**${Items.VanityCustomRole.Price}** BBC has been deducted from your account. ${Items.VanityCustomRole.Info}`)
                    message.channel.send(VanityRole)

                    const channel = client.channels.cache.find(channel => channel.id === "936487024347713536")

                    const VanityRoleTransaction = new Discord.MessageEmbed()
                        .setAuthor(`${Items.VanityCustomRole.Name} | Purchased`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .addFields({
                            name: "Member:",
                            value: message.member.user.tag
                        }, {
                            name: "Product:",
                            value: Items.VanityCustomRole.Name
                        }, {
                            name: "Price:",
                            value: Items.VanityCustomRole.Price + "BBC"
                        })
                        .setColor("BLACK")
                    channel.send(VanityRoleTransaction)
                }

                //perms

                function RolePermissions() {

                }

                //mute

                function MuteMember() {
                    if (!userresult || parseFloat(userresult.money) <= parseFloat(Items.MuteUser.Price)) {
                        return message.channel.send("You do not have enough BBC.")
                    }

                    const muteRole = message.member.guild.roles.cache.find(role => role.id === "840074523659599882");
                    message.mentions.members.first().roles.add(muteRole);
                    const embedForMuteMember = new Discord.MessageEmbed()
                        .setAuthor(`${message.mentions.members.first().displayName} | Muted`, message.mentions.members.first().user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .setColor("BLACK")
                        .setDescription(`${message.mentions.members.first().displayName} has been muted for 12 hours.`)
                        .setFooter(`${Items.MuteUser.Price} BBC has been deducted from your acc`)
                    message.channel.send(embedForMuteMember)

                    setTimeout(() => {
                        const muteRole = message.member.guild.roles.cache.find(role => role.id === "840074523659599882");
                        message.mentions.members.first().roles.remove(muteRole);
                    }, cdNSecs * 1000)

                    const channel = client.channels.cache.find(channel => channel.id === "936487024347713536")

                    const VanityRoleTransaction = new Discord.MessageEmbed()
                        .setAuthor(`${Items.MuteUser.Name} | Purchased`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                        .addFields({
                            name: "Member:",
                            value: message.member.user.tag
                        }, {
                            name: "Product:",
                            value: Items.MuteUser.Name
                        }, {
                            name: "Price:",
                            value: Items.MuteUser.Price + "BBC"
                        })
                        .setColor("BLACK")
                    channel.send(VanityRoleTransaction)
                }

                //execute here

                if (args[0] === Items.VanityCustomRole.Name) {
                    VanityRole()
                    const Money = parseFloat(userresult.money) - parseFloat(Items.VanityCustomRole.Price)
                    await userSchema.findOneAndUpdate({
                        _id: user
                    }, {
                        money: Money
                    }, {
                        upsert: true
                    })

                } else if (args[0] === Items.RolePermissions.Name) {
                    RolePermissions()
                } else if (args[0] === Items.MuteUser.Name) {
                    if (!userresult || parseFloat(userresult.money) <= parseFloat(Items.MuteUser.Price)) {
                        return message.channel.send("You do not have enough BBC.")
                    }
                    if (!args[1] || !args[1].startsWith("<@")) {
                        return message.channel.send("You must ping somone to mute")
                    }
                    if (message.mentions.members.first().hasPermission(`BAN_MEMBERS`)) {
                        return message.channel.send("You cannot mute that user.")
                    }
                    MuteMember()
                    const monay = parseFloat(userresult.money) - parseFloat(Items.MuteUser.Price)
                    await userSchema.findOneAndUpdate({
                        _id: user
                    }, {
                        money: monay
                    }, {
                        upsert: true
                    })
                } else {
                    message.channel.send("That is not an item for sale.")
                }

            } finally {
                mongoose.connection.close()

            }
        })
    }
}