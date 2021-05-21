const Discord = require('discord.js');

module.exports = client => {
    
    client.on('guildMemberAdd', (member) => {
        if(member.guild.id != '804323987106168842') return;
        const rulesChannel = client.channels.cache.find(channel => channel.id === '804661631036030987')
        const rolesChannel = client.channels.cache.find(channel => channel.id === '804599939459186718')
        const NewsChannel = client.channels.cache.find(channel => channel.id === '804597415209598997')
        const channel = client.channels.cache.find(channel => channel.id === '811736536403804160')

        const embedForWelcome = new Discord.MessageEmbed()
        .setTitle(`Welcome ${member.displayName}`)
        .setDescription(`Please make sure to read all the information under the must read catagtory`)
        .addField(`Rules:`, `⇝ ${rulesChannel}`)
        .addField(`Roles:`, `⇝ ${rolesChannel}`)
        .addField(`News:`, `⇝ ${NewsChannel}`)
        .setImage('https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2F835347430861300621%2F&psig=AOvVaw1BuYxFtb-FIuNeImmKqs78&ust=1614072470430000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJDJg_mW_e4CFQAAAAAdAAAAABAD')
        .setFooter('😈')
        .setTimestamp()
        channel.send(embedForWelcome)
    }) 
}