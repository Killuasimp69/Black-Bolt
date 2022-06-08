const Items = require("../../items.json")
const userSchema = require('../../schemas/userSchema')
const ItemSchema = require('../../schemas/ItemSchema')
const { prefix } = require('../../config.json')

module.exports = {
    commands: ['store', 'shop'],
    callback: async (message, args, Discord, client, mongo) => {
        if (message.guild === null) {
            return
        }
        const user = message.member.user
        const toUpperCaseContent = message.content.toUpperCase()
        const toUpperCaseArgs0 = args[0].toUpperCase()

        if (args[0]) {

            if (toUpperCaseArgs0 == "LEVELS" || toUpperCaseArgs0 == "LEVEL") {
                const embedForSore = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName} | Store`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setDescription("Here you can find all the levels that are for sale.")
                    .setColor("BLACK")
                    .addFields(
                        {
                            name: `> <:Level1:969799269542412319> Level 1`,
                            value: `\`\`${prefix}buy level 1\`\` | 💵 ${Items.Levels.Level1.Price} BBC`
                        }, {
                        name: "> <:Level2:969799270435782656> Level 2",
                        value: `\`\`${prefix}buy level 2\`\` | 💵 ${Items.Levels.Level2.Price} BBC`
                    }, {
                        name: `> <:Level3:969799270347735081> Level 3`,
                        value: `\`\`${prefix}buy level 3\`\` | 💵 ${Items.Levels.Level3.Price} BBC`
                    }, {
                        name: `> <:Level4:969799270251237436> Level 4`,
                        value: `\`\`${prefix}buy level 4\`\` | 💵 ${Items.Levels.Level4.Price} BBC`
                    }, {
                        name: `> <:Level5:969799270427402340> Level 5`,
                        value: `\`\`${prefix}buy level 5\`\` | 💵 ${Items.Levels.Level5.Price} BBC`
                    })
                    .setFooter(`To buy something please simply just type "${prefix}buy (item) "`)
                message.channel.send(embedForSore)
            }

            if (toUpperCaseArgs0 == "NFTS" || toUpperCaseArgs0 == "NFT") {
                const embedForSore = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName} | Store`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setDescription("Here you can find all the NFTs that are for sale.")
                    .setColor("BLACK")
                    .addFields({
                        name: "Houses",
                        value: "\u200b"
                    }, {
                        name: `> 🛖 Small House`,
                        value: `\`\`${prefix}buy house small\`\` | 💵 ${Items.Houses.Small.Price} BBC`
                    }, {
                        name: "> 🏡 Medium House",
                        value: `\`\`${prefix}buy house medium\`\` | 💵 ${Items.Houses.Medium.Price} BBC`
                    }, {
                        name: `> 🏘️ Large House`,
                        value: `\`\`${prefix}buy house large\`\` | 💵 ${Items.Houses.Large.Price} BBC`
                    }, {
                        name: "Trophy's",
                        value: "\u200b"
                    }, {
                        name: "> 🏆 MeeMoo",
                        value: `\`\`${prefix}buy trophy MeeMoo\`\` | 💵 ${Items.Trophys.MeeMoo.Price} BBC`
                    }, {
                        name: "> 🏆 King",
                        value: `\`\`${prefix}buy trophy King\`\` | 💵 ${Items.Trophys.King.Price} BBC`
                    })
                    .setFooter(`Trophys are coming soon..`)
                message.channel.send(embedForSore)
            }

            if (toUpperCaseArgs0 == "OTHER") {
                const embedForSore = new Discord.MessageEmbed()
                    .setAuthor(`${message.member.displayName} | Store`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                    .setDescription("Here is a list of everything else I sell.")
                    .setColor("BLACK")
                    .addFields(
                        {
                            name: `> 🔇 ${Items.Other.MuteUser.Name}`,
                            value: `\`\`${prefix}buy ${Items.Other.MuteUser.Name} (user)\`\` | 💵 ${Items.Other.MuteUser.Price} BBC`
                        }, {
                        name: `> 🥘 ${Items.Other.VanityCustomRole.Name}`,
                        value: `\`\`${prefix}buy ${Items.Other.VanityCustomRole.Name}\`\` | 💵 ${Items.Other.VanityCustomRole.Price} BBC`
                    }
                    )
                    .setFooter(`To buy something please simply just type "${prefix}buy (item) "`)
                message.channel.send(embedForSore)
            }

        } else {

            const embedForSore = new Discord.MessageEmbed()
                .setAuthor(`${message.member.displayName} | Store`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .setDescription("Here you can find everything that I sell.")
                .setColor("BLACK")
                .addFields(
                    {
                        name: "🌠 Levels",
                        value: `\`\`${prefix}store levels\`\``,
                        inline: true
                    }, {
                    name: "🚗 NFTs",
                    value: `\`\`${prefix}store NFTs\`\``,
                    inline: true
                }, {
                    name: `🐵 Other`,
                    value: `\`\`${prefix}store other\`\``,
                    inline: true
                })
                .setFooter(`To buy something please simply just type "${prefix}buy (item) "`)
            message.channel.send(embedForSore)
        }
    }
}
