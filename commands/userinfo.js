module.exports = {
    name: 'userinfo',
    description: 'Gives info on a user',
    execute(client, message, args, Discord, guild) {
        const user = message.member.user
        const member = guild.members.cache.get(user.id)
        const embedForUserInfo = new Discord.MessageEmbed()
        .setAuthor(`User Info`, user.displayAvatarURL({ format: 'jpg', dynamic : true }))
        .setThumbnail(user.displayAvatarURL({ format: 'jpg', dynamic : true }))
        .addFields({
            name: 'User Tag',
            value: user.tag
        }, {
            name: 'Nickname',
            value: member.nickname || 'False'
        }, {
            name: 'Is Bot',
            value: user.bot || 'False'
        }, {
            name: 'Joined Server',
            value: new Date(member.joinedTimestamp).toLocaleDateString()
        }, {
            name: 'Joined Discord',
            value: new Date(user.createdTimestamp).toLocaleDateString()
        }, {
            name: 'Role Count',
            value: member.roles.cache.size 
        })
        message.channel.send(embedForUserInfo)
    }
}