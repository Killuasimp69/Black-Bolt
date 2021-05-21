module.exports = {
    name: 'bring me sheo',
    description: 'Brings you Sheo',
    execute(client, message, args, Discord, guild) {
        const randomizer = Math.floor(Math.random() * 11);
        if(randomizer == 1) {
            message.channel.send('https://cdn.discordapp.com/attachments/820056762001915915/820057757217587200/2Q.png')
        } else if (randomizer == 2) {
            message.channel.send('https://images.uesp.net/thumb/6/6f/SR-npc-Sheogorath.jpg/200px-SR-npc-Sheogorath.jpg')
        } else if (randomizer == 3) {
            message.channel.send('https://i.redd.it/str6ytqr3h651.jpg')
        } else if (randomizer == 4) {
            message.channel.send('https://lh5.googleusercontent.com/5Hs9wGpHnmtxnMZWW5ebm-n3bInmfD-MJR4mzxDt-cGzBDUqj-k-IzvbU3IuXLugLGJlBYRUYR6g1q1uq2JSu61L_-9HPPGF43EXtylkqOFK-k_n3VtrIoozVuXGNornqw')
        } else if (randomizer == 5) {
            message.channel.send('https://i.pinimg.com/originals/71/29/47/71294722b7d296131607d4aafeea4bde.jpg')
        } else if (randomizer == 6) {
            message.channel.send('https://i.pinimg.com/originals/72/04/25/720425ddc465d2325fc73b2bad5453b7.webp')
        } else if (randomizer == 7) {
            message.channel.send('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT42HHvYbibS3JVOE_4e_KmXrd8HKsdGZ16MQ&usqp=CAU')
        } else if (randomizer == 8) {
            message.channel.send('https://static.wikia.nocookie.net/elderscrolls/images/e/e3/Sheogorath.png/revision/latest/top-crop/width/360/height/450?cb=20130221234501')
        } else if (randomizer == 9) {
            message.channel.send('http://pm1.narvii.com/6201/78f2b7af87aa9b5247b3da2bc260991bd4ee96b2_00.jpg')
        } else {
            message.channel.send('https://i.pinimg.com/originals/24/00/e0/2400e0ab7d8bd954b6276f16e30830df.jpg')
        }
    }
}