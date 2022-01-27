const Discord = require('discord.js');

module.exports = client => {

    client.on('guildMemberAdd', async (member) => {
        if (member.guild.id != '804323987106168842') return;
        const user = member.user

        const channel = client.channels.cache.find(channel => channel.id === '838571646569807912')

        const msg = await channel.send(`<@${member.id}>`)
        msg.delete()

        let randomDescriptions = [
            `Hey ${member.displayName}, its about time you showed up.`,
            `Wassup ${member.displayName}, we hope you brought cheese.`,
            `Finally, ${member.displayName} is here, im the server bot.`,
            `Nice to see you ${member.displayName}, did you get milk on the way here?`,
            `Welcome to hell ${member.displayName}, nah just kidding we keep this server family friendly`,
            `Hi ${member.displayName} it is I, Black Bolt (im basicly a god here).`,
            `OMG OMG OMG, its ${member.displayName}, sorry its just been a while since i saw a name that sick.`
        ]

        const desc = Math.floor(Math.random() * (randomDescriptions.length))

        client.user.setActivity(`${member.displayName} is our newest member, dont forget to say hello`);

        let info = `${randomDescriptions[desc]} Welcome to Meme Arcade, a fast growing gaming server with memes, active chat and me (the server bot). Im so happy your here. To gain full acess to the server just head to the Rules channel`
        const embedForWelcome = new Discord.MessageEmbed()
            .setTitle(`Welcome ${member.displayName}`)
            .setDescription(info)
            .setImage("https://cdn.discordapp.com/attachments/838595196945563689/855369890534129684/Meme_Arcade.gif")
            .setThumbnail(user.displayAvatarURL({ format: 'jpg', dynamic: true }))
            .setFooter('😈')
            .setColor("BLACK")
            .setTimestamp()
        channel.send(embedForWelcome)

        const welcomeRole = member.guild.roles.cache.find(role => role.id === "838596264199323688")
        const welcomeRole1 = member.guild.roles.cache.find(role => role.id === "838679702842376242")
        const welcomeRole2 = member.guild.roles.cache.find(role => role.id === "838596516938645524")

        member.roles.add(welcomeRole)
        member.roles.add(welcomeRole1)
        member.roles.add(welcomeRole2)

    })
}