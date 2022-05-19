console.log("==========================")
console.log("BOOTING")
console.log("==========================")

const Discord = require('discord.js');
const { token } = require('./config.json')
const { version } = require('./package.json')
const { name } = require('./package.json')
const client = new Discord.Client();
const path = require('path')
const fs = require('fs')
const mongo = require("./mongo");
const shareSchema = require('./schemas/shareSchema')

var clientinfo = {
    name: name,
    version: version,
    booted: "true",
}

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

//todays shares

setInterval(async () => {
    await mongo().then(async (mongoose) => {
        try {
            const shareResult = await shareSchema.findOne({ _id: "default" })
            await shareSchema.findOneAndUpdate({
                _id: "default"
            }, {
                yesterdayshare: shareResult.price
            }, {
                upsert: true
            })
        } finally {
            mongoose.connection.close()
        }
    })
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

    console.clear()

    setTimeout(() => {
        console.log("==========================")
        console.table(clientinfo)
        console.log("==========================")
        var clientinfo2 = {
            Status: "COMING SOON",
            DataBase: "Connected",
            Final: "Started",
        }
        console.table(clientinfo2)
        console.log("==========================")
    }, 1 * 1000);

    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 10000);
})

//not commands
const confessions = require('./not commands/confessions')
const welcome = require('./not commands/welcome');
const { schema } = require('./schemas/shareSchema');
client.on('ready', () => {
    confessions(client)
    welcome(client)
})

client.login(token)