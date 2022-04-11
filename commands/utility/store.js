const Items = require("../../items.json")
const userSchema = require('../../schemas/userSchema')
const ItemSchema = require('../../schemas/ItemSchema')

module.exports = {
    commands: ['store', 'shop'],
    callback: async (message, args, Discord, client, mongo) => {
        const user = message.member.user
        const embedForSore = new Discord.MessageEmbed()
        .setAuthor(message.member.displayName, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
        .setColor("BLACK")
        .setThumbnail("https://c.tenor.com/Jwa4vbfY390AAAAC/going-shopping-shopping.gif")
        .addFields({
            name: `${Items.VanityCustomRole.Name} | ${Items.VanityCustomRole.Price} BBC`,
            value: `${Items.VanityCustomRole.Description}`
        }, {
            name: `${Items.RolePermissions.Name} | ${Items.RolePermissions.Price} BBC`,
            value: `${Items.RolePermissions.Description}`
        }, {
            name: `${Items.MuteUser.Name} | ${Items.MuteUser.Price} BBC`,
            value: `${Items.MuteUser.Description}`
        })
        .setFooter("To buy somthing please simply just tpye \"%buy (item) \"")
        message.channel.send(embedForSore)
    }
}
