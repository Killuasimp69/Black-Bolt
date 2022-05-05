const Discord = require("discord.js")
const {Client, Intents, Collection} = require("discord.js")
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS]})
const fs = require('fs')
const { token } = require('../config.json')

client.commands = new Collection();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith("js"))
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith("js"))
const commandFolders = fs.readdirSync("./src/commands")

async function fun () {
    for (file of functions) {
        require(`./functions/${file}`)(client)
    }

    client.handleEvents(eventFiles, "./src/events")
    client.handleCommands(commandFolders, "./src/commands")
    client.login(token)
}

fun()