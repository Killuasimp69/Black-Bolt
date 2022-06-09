const Discord = require('discord.js');
const { token } = require('./config.json')
const { version } = require('./package.json')
const { name } = require('./package.json')
const client = new Discord.Client();
const path = require('path')
const fs = require('fs')
const mongo = require("./mongo");
const shareSchema = require('./schemas/shareSchema')

console.log(`
###################################
#                                 #
#           BLACK BOLT            #
#                                 #
#              ${version}              #
#                                 #
###################################`)

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

//week reset

setInterval(async () => {
    const newDate = new Date()
    const currentDay = newDate.getDay()
    if(currentDay == 0) {
        await shareSchema.findOneAndUpdate({
            _id: "default"
        }, {
            price: 100000
        }, {
            upsert: true
        })
    }
}, 86400 * 1000)

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
        "with White Bolt",
        "with you mother",
        "with a BBC",
        "with your father",
        `running version ${version}`
    ];

    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        const currentStatus = activities_list[index]
        client.user.setActivity(currentStatus);
        console.clear()
    console.log(`
###################################
#                                 #
#           BLACK BOLT            #
#                                 #
#              ${version}              #
#                                 #
###################################`)
console.log(`Current status: ${currentStatus}`)
    }, 10000);
})

//not commands
const confessions = require('./not commands/confessions')
const welcome = require('./not commands/welcome');
const xp = require('./not commands/xp')
const chests = require('./not commands/chests')
client.on('ready', () => {
    confessions(client)
    welcome(client)
    xp(client)
    chests(client)
})

client.login(token)