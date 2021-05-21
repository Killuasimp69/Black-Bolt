const Discord = require('discord.js');
const { token } = require('./config.json')
const { WebhookId, WebhookToken } = require('./config.json'); 
const { version } = require('./package.json')
const client = new Discord.Client();
console.log('==========================')

//controlls console
let console1 = process.openStdin()
console1.addListener("data", res => {
    let message = res.toString().trim().split(/ +/g)
    if(message == 'online') {
        client.login(token)
        console.log('System: Bot online')
    } else if(message == 'offline') {
        const news = client.channels.cache.find(channel => channel.id === '806441131113054249')
        const embedForOffline = new Discord.MessageEmbed()
        .setTitle('Bot Offline')
        .setDescription('==========================')
        .addField('Bot Name:', 'Black Bolt')
        .addField(`Bot Version:`, `${version}`)
        .addField(`Reason:`, `Manual shutdown`)
        .addField(`Status:`, `Null`)
        .setTimestamp()
        .setColor('RED')
        news.send(embedForOffline)
        setTimeout(() => {
            client.destroy();
            console.log('System: Bot shut down')
            console.log('System: Must restart terminal on next bot start')
        }, 5000)
    } else {
        const channel = client.channels.cache.find(channel => channel.id === '812915796547469314')
        channel.send(message) 
        console.log('System: Message sent')
    }
})

//makes commands work
client.setMaxListeners(1000)

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

//Sets the status of the bot 
client.on('ready', () => {
    const activities_list = [
        "with the %commands command.", 
        "with the toy in your mums bedside draw",
        "with some code", 
        "with JavaScript",
        "with some random kid",
        "with my brother (Spaghetti bot)"
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

//sends messages when the bots online
client.on('ready', () => { 
    const webhook = new Discord.WebhookClient(WebhookId, WebhookToken);
    const embedForWebHookOnline = new Discord.MessageEmbed()
    .setTitle(`Bot Online`)
    .setDescription('==========================')
    .addField('Bot Name:', 'Black Bolt')
    .addField(`Bot Version:`, `${version}`)
    .addField(`Status:`, `Chagning Statuses`)
    .setTimestamp()
    .setColor('GREEN')
    webhook.send(embedForWebHookOnline)
      .catch(console.error);
    console.log('Webhook sent')
})

//logs things that arnt commands
client.on('ready', () => {
    const welcome = require('./Not commands/welcome')
    const news = require('./Not commands/news')
    const confessions = require('./Not commands/confessions')
    welcome(client)
    news(client)
    confessions(client)
    const reactions = require('./Not commands/misc/reactions')
    reactions(client)
})