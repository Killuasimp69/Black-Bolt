const Discord = require('discord.js');
const { token } = require('./config.json')
const { version } = require('./package.json')
const client = new Discord.Client();
const path = require('path')
const fs = require('fs')

console.log("==========================")
console.log("COMMANDS")
console.log("==========================")

//makes commands work
client.setMaxListeners(1000)

client.on('ready', () => {
    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    readCommands('commands')
})

//Sets the status of the bot  
client.on('ready', () => {
    const activities_list = [
        "with the %help command",
        "with a cheese sandwich",
        "with some code",
        "with JavaScript",
        "with some kid i found",
        "with Neo ;)",
        "with cheese",
        `running version ${version}`
    ];

    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 10000);
    console.log('==========================')
    console.log('CONNECTIONS')
    console.log('==========================')
    console.log('Status Set!')
})

//not commands
const confessions = require('./not commands/confessions')
const welcome = require('./not commands/welcome')
client.on('ready', () => {
    confessions(client)
    welcome(client)
})

client.login(token)