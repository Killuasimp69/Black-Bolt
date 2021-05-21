module.exports = (Discord, client, message) => {
    const prefix = '%'
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);
    const guild = message.guild
    const neo = client.users.cache.find(user => user.id === '555991737072615424')

    if(command) command.execute(client, message, args, Discord, guild, neo);
}