const { prefix } = require('../../config.json')

//i get it, the help command is another level of shitty. I havnt got around to fixing it yet.

module.exports = {
    commands: ['help', 'commands', 'cmds'],
    expectedArgs: '<num1>',
    callback: (message, args, Discord, client) => {
        const user = message.member.user
        if (args[0] == 'economy') {
            const embedForEconCommands = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}| Help Menu`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .setDescription(`**14 economy commands** for your crippling gambling addiction.

                \`\`${prefix}balance\`\`, \`\`${prefix}beg\`\`, \`\`${prefix}give (amount) (user)\`\`, \`\`${prefix}work\`\`, \`\`${prefix}bet (amount)\`\`, \`\`${prefix}daily\`\`, \`\`${prefix}leaderboard\`\`, \`\`${prefix}buy (product) (extra)\`\`
                
                **[Booster Commands](${"https://discordapp.com/channels/804323987106168842/841196171795103754/853816838186336266"} "Boost our server to get special perks")** 
                \`\`${prefix}steal (user)\`\`
                `)
                .setColor('BLACK')
                .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/230/skull-and-crossbones_2620.png")
            return message.channel.send(embedForEconCommands)
        } else if (args[0] == 'utility') {
            const embedForUtilCommands = new Discord.MessageEmbed()
                .setAuthor(`${message.member.displayName}| Help Menu`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .setDescription(`**9 utility commands** that are useful for when you, erm... use me.

                \`\`${prefix}ping\`\`, \`\`${prefix}botinfo\`\`, \`\`${prefix}commands\`\`, \`\`${prefix}invite\`\`, \`\`${prefix}members\`\`, \`\`${prefix}userinfo\`\`, \`\`${prefix}version\`\`, \`\`${prefix}avatar\`\`, \`\`${prefix}store\`\`
                
                **[Booster Commands](${"https://discordapp.com/channels/804323987106168842/841196171795103754/853816838186336266"} "Boost our server to get special perks")** 
                \`\`${prefix}color\`\`
                `)
                .setColor('BLACK')
                .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/230/hammer-and-wrench_1f6e0.png")
            return message.channel.send(embedForUtilCommands)
        } else if (args[0] == 'fun') {
            const embedForFunCommands = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}| Help Menu`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .setDescription(`**10 fun commands** that can amuse even your dying grandma.

                \`\`${prefix}dadjoke\`\`, \`\`${prefix}yomumma\`\`, \`\`${prefix}ppsize\`\`, \`\`${prefix}inspire\`\`, \`\`${prefix}meme\`\`, \`\`${prefix}8ball\`\`

                **[Booster Commands](${"https://discordapp.com/channels/804323987106168842/841196171795103754/853816838186336266"} "Boost our server to get special perks")** 
                \`\`${prefix}hug (user)\`\` \`\`${prefix}kiss (user)\`\` \`\`${prefix}kill (user)\`\`
                `)
                .setColor('BLACK')
                .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/230/yo-yo_1fa80.png")
            return message.channel.send(embedForFunCommands)
        } else
            var embedForNorCommand = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}| Help Menu`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
                .setDescription('Here\'s a list of all my diabolically beloved commands!')
                .addFields({
                    name: "☠️ Economy",
                    value: `\`\`${prefix}help economy\`\`
                    [Hover for info](${message.url} "Join our super addictive economy and race to become the richest")
                    
                    [Invite Me](${"https://discord.com/oauth2/authorize?client_id=804610350128955392&scope=bot&permissions=8"} "Invite me to your own server right here")  • [boosters](${"https://discordapp.com/channels/804323987106168842/841196171795103754/853816838186336266"} "Boost the server to help keep it running")`,
                    inline: true
                }, {
                    name: "🛠️ Utility",
                    value: `\`\`${prefix}help utility\`\`
                    [Hover for info](${message.url} "Here will be the most usfull commands you will ever use")
                    
                    • [Community Server](${"https://discord.gg/Nx8MZSwsfU"} "Join our community server for heaps of fun")`,
                    inline: true
                }, {
                    name: "🪀 Fun",
                    value: `\`\`${prefix}help fun\`\`
                    [Hover for info](${message.url} "Have some fun while you use these badie commands")
                    
                    • [Kill Me](${message.url} "You really thought you could kill a god")`,
                    inline: true
                })
                .setColor('BLACK')
        return message.channel.send(embedForNorCommand)
    }
}