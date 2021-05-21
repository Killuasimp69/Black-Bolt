module.exports = {
    name: 'AFK',
    description: 'Makes you afk',
    execute(client, message, args, Discord, guild) {
        if(!args0[1]) {
            message.channel.send('Please provide a time: E.G 10 (10 seconds)')
        } else {
            const time = (`${args0[1]}000`)                                       
            const username = message.author.username
            message.member.setNickname(`[AFK] ${username}`)
            setTimeout(() => {
                message.member.setNickname(username)
            }, time)
        }
    }
}