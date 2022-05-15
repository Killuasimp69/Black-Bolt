module.exports = {
    commands: ['invite'],
    expectedArgs: '<num1>',
    callback: (message, args, Discord) => {
        const embedForInvite = new Discord.MessageEmbed()
        .setTitle("Click Here")
        .setURL(`https://discord.com/oauth2/authorize?client_id=804610350128955392&scope=bot&permissions=8`)
        .setDescription("Add me to your great sacred place of worship and i will bless you forever.")
        .setColor("BLACK")
        message.channel.send(embedForInvite)
    }
}
